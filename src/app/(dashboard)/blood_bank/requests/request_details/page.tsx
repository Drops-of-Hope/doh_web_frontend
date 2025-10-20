"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AvailabilityChecker,
  ActionButtons,
  RejectionSection,
  BackButton,
  RequestDetailsCard,
} from "@/components";
import { AvailabilityData, RequestStatus } from "../../../../../../types";
import { useGetRequestByIdQuery } from "@/store/api/RequestsApi";
import { useCheckAvailabilityByDeadlineMutation } from "@/store/api/inventoryApi";
import { useSession } from "next-auth/react";

// Helper formatters
const formatBloodGroup = (bg?: string): string =>
  bg ? bg.replace("_", " ").replace("POSITIVE", "+").replace("NEGATIVE", "-").replace(/\s+/g, "") : "";
const toUrgency = (u?: string): "High" | "Medium" | "Low" => {
  const v = (u || "").toUpperCase();
  if (v === "CRITICAL" || v === "HIGH") return "High";
  if (v === "MEDIUM") return "Medium";
  return "Low";
};

// Combine delivery date and time into a single local datetime string (YYYY-MM-DD HH:MM:SS)
const combineDeliveryDateTime = (dateIso?: string, timeField?: string): string | null => {
  if (!dateIso && !timeField) return null;

  // Prefer an explicit date from either timeField (if date-only) or dateIso
  const tf = (timeField || "").trim();
  let dateString: string | null = null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(tf)) {
    dateString = tf; // timeField carries date
  } else if (dateIso) {
    // Derive YYYY-MM-DD from ISO date
    const d = new Date(dateIso);
    if (!isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const da = String(d.getDate()).padStart(2, '0');
      dateString = `${y}-${m}-${da}`;
    }
  }

  // Determine time portion (24h)
  let hour = 15; // default 15:00 if none provided
  let minute = 0;

  const parseAmPm = (s: string): { h: number; m: number } | null => {
    // examples: 3 PM, 3:30 PM, 12 AM, 12:15 am
    const m = s.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
    if (!m) return null;
    let h = parseInt(m[1], 10);
    const min = m[2] ? parseInt(m[2], 10) : 0;
    const suffix = m[3].toUpperCase();
    if (suffix === 'AM') {
      if (h === 12) h = 0;
    } else if (suffix === 'PM') {
      if (h !== 12) h += 12;
    }
    return { h, m: min };
  };

  // Range like "09:00-10:00" or "3 PM - 4 PM" or mixed
  const rangeAmPm = tf.match(/^(.+?)\s*-\s*(.+)$/);
  if (rangeAmPm) {
    const endRaw = rangeAmPm[2].trim();
    // Try AM/PM first
    const ap = parseAmPm(endRaw);
    if (ap) {
      hour = ap.h; minute = ap.m;
    } else if (/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.test(endRaw)) {
      const m = endRaw.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/)!;
      hour = parseInt(m[1], 10);
      minute = parseInt(m[2], 10);
    }
  } else if (parseAmPm(tf)) {
    const ap = parseAmPm(tf)!;
    hour = ap.h; minute = ap.m;
  } else if (/^(\d{1,2})(?::(\d{2}))?$/.test(tf)) {
    // Numeric time-only like '14' or '14:30'
    const m = tf.match(/^(\d{1,2})(?::(\d{2}))?$/)!;
    hour = parseInt(m[1], 10);
    minute = m[2] ? parseInt(m[2], 10) : 0;
  } else if (/^\d{4}-\d{2}-\d{2}T(\d{2}):(\d{2})(?::\d{2})?/.test(tf)) {
    // Full ISO provided in timeField; extract hour/min directly without TZ conversion
    const m = tf.match(/^\d{4}-\d{2}-\d{2}T(\d{2}):(\d{2})/)!;
    hour = parseInt(m[1], 10);
    minute = parseInt(m[2], 10);
    // If timeField also contains date and we didn't pick a date yet, use that date part
    if (!dateString) dateString = tf.slice(0, 10);
  }

  if (!dateString) return null;

  const hh = String(hour).padStart(2, '0');
  const mm = String(minute).padStart(2, '0');
  return `${dateString} ${hh}:${mm}:00`;
};

export default function RequestDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get("id") ?? "";
  const { data: session } = useSession();
  const medicalEstablishmentId = session?.decodedIdToken?.sub as string | undefined;
  // inventory_id is assumed to be the same as medical establishment id; adjust if different
  const inventoryId = medicalEstablishmentId;
  const { data: requestData, isLoading, isError } = useGetRequestByIdQuery(
    { requestId },
    { skip: !requestId }
  );
  const [checkAvailability] = useCheckAvailabilityByDeadlineMutation();
  const [showAvailability, setShowAvailability] = useState(false);
  const [availabilityData, setAvailabilityData] =
    useState<AvailabilityData | null>(null);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("pending");
  const [hasCheckedAvailability, setHasCheckedAvailability] = useState(false);
  const [showRejectionSection, setShowRejectionSection] = useState(false);
  // Transit status: 'not_started' | 'ongoing' | 'completed'
  const [transitStatus, setTransitStatus] = useState<
    "not_started" | "ongoing" | "completed"
  >(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("transitStatus") as
          | "not_started"
          | "ongoing"
          | "completed") || "not_started"
      );
    }
    return "not_started";
  });

  // Define a type for transit details or use 'unknown' if the structure is not known
  type TransitDetails =
    | {
        transporter: string;
        driverName: string;
        driverContact: string;
        emergencyContact: string;
        vehicle: string;
        departureTime: string;
        note: string;
      }
    | undefined;

  const [transitDetails, setTransitDetails] = useState<TransitDetails>(() => {
    if (typeof window !== "undefined") {
      const details = localStorage.getItem("transitDetails");
      return details ? JSON.parse(details) : undefined;
    }
    return undefined;
  });

  // Keep transit status/details in sync if user returns from transit form
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const status =
        (localStorage.getItem("transitStatus") as
          | "not_started"
          | "ongoing"
          | "completed") || "not_started";
      setTransitStatus(status);
      const details = localStorage.getItem("transitDetails");
      setTransitDetails(details ? JSON.parse(details) : undefined);
    }
  }, []);

  const handleCheckAvailability = async () => {
    const unitsRequested = requestData?.data?.unitsRequired ?? 0;
    const rawBloodGroup = requestData?.data?.bloodGroup || "";
    // Convert backend enum-like to display format used by API, e.g., O_POSITIVE -> O+
    const bloodGroup = formatBloodGroup(rawBloodGroup);
    // Deadline: ONLY send the date portion YYYY-MM-DD
    const deadlineDate = (() => {
      const combined = combineDeliveryDateTime(
        requestData?.data?.requestDeliveryDate,
        requestData?.data?.requestDeliveryTime
      );
      // combined is like 'YYYY-MM-DD HH:MM:SS'; take date part
      return combined ? combined.slice(0, 10) : (requestData?.data?.requestDeliveryDate?.slice(0,10) || "");
    })();

  if (!inventoryId || !bloodGroup || !unitsRequested || !deadlineDate) {
      // Minimal guard; you may want to show a toast
      setAvailabilityData({
        available: false,
        currentStock: 0,
        requestedQuantity: unitsRequested,
        bloodType: bloodGroup,
        estimatedDeliveryTime: "",
      });
      setShowAvailability(true);
      setHasCheckedAvailability(true);
      return;
    }

    try {
      const res = await checkAvailability({
        medical_establishment_id: inventoryId,
        blood_group: bloodGroup,
        number_of_units_requested: unitsRequested,
        deadline: deadlineDate,
      }).unwrap();
      const availableUnits = res?.available_units ?? 0;
      const isAvailable = availableUnits >= unitsRequested;
      setAvailabilityData({
        available: isAvailable,
        currentStock: availableUnits,
        requestedQuantity: unitsRequested,
        bloodType: bloodGroup,
        estimatedDeliveryTime: isAvailable ? "2-4 hours" : "",
      });
    } catch {
      setAvailabilityData({
        available: false,
        currentStock: 0,
        requestedQuantity: unitsRequested,
        bloodType: bloodGroup,
        estimatedDeliveryTime: "",
      });
    } finally {
      setShowAvailability(true);
      setHasCheckedAvailability(true);
    }
  };

  const handleAccept = () => {
    setRequestStatus("accepted");
    setShowRejectionSection(false);
    setShowAvailability(false);
    setTransitStatus("ongoing");
    // Redirect to transit form page
    router.push("/blood_bank/requests/request_details/transit");
  };

  const handleRejectClick = () => {
    setShowRejectionSection(true);
    setShowAvailability(false);
  };

  const handleReject = (reason: string) => {
    setRequestStatus("rejected");
    setShowRejectionSection(false);
    console.log("Request rejected:", requestId, "Reason:", reason);
  };

  const requestView = useMemo(() => {
    const d = requestData?.data;
    if (!d) return null;
    return {
      id: d.id,
      patientName: d.requestReason || "Request",
      bloodGroup: formatBloodGroup(d.bloodGroup),
      quantity: d.unitsRequired,
      requestedDate: d.requestDeliveryDate ? new Date(d.requestDeliveryDate).toLocaleDateString() : "",
      deadline: combineDeliveryDateTime(d.requestDeliveryDate, d.requestDeliveryTime) || "",
      hospital: d.requestingBloodBank?.name || d.medicalEstablishment?.name || "",
      contactDetails: {
        phone: "",
        email: "",
      },
      priority: toUrgency(d.urgencyLevel),
      requestTime: d.createdAt ? new Date(d.createdAt).toLocaleString() : "",
      reason: d.requestReason || "",
    };
  }, [requestData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] p-4 pb-24">
        <div className="mb-6">
          <BackButton fallbackUrl="/blood_bank/requests" className="hover:shadow-md" />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">Loading request details...</div>
      </div>
    );
  }

  if (isError || !requestView) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] p-4 pb-24">
        <div className="mb-6">
          <BackButton fallbackUrl="/blood_bank/requests" className="hover:shadow-md" />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-red-600">Failed to load request details.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4 pb-24">
      <div className="mb-6">
        <BackButton
          fallbackUrl="/blood_bank/requests"
          className="hover:shadow-md"
        />
      </div>

      <RequestDetailsCard
        request={requestView}
        requestStatus={requestStatus}
        transitStatus={transitStatus}
        transitDetails={transitDetails}
      />

      {/* Transit Status Section */}
      {requestStatus === "accepted" && (
        <div className="my-4 p-4 bg-blue-50 border border-blue-200 rounded text-gray-600">
          <span className="font-semibold">Transit Status: </span>
          {transitStatus === "not_started" && "Not started"}
          {transitStatus === "ongoing" && "Ongoing"}
          {transitStatus === "completed" && "Completed"}
        </div>
      )}

      {showRejectionSection && <RejectionSection onReject={handleReject} />}

      {showAvailability && (
        <AvailabilityChecker
          availabilityData={availabilityData}
          onClose={() => setShowAvailability(false)}
          onAccept={handleAccept}
          onReject={handleRejectClick}
          requestStatus={requestStatus}
        />
      )}

      <ActionButtons
        requestStatus={requestStatus}
        onCheckAvailability={handleCheckAvailability}
        onAccept={handleAccept}
        onReject={handleRejectClick}
        hasCheckedAvailability={hasCheckedAvailability}
      />
    </div>
  );
}
