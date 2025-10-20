"use client";

import React, { Suspense, useMemo, useState } from "react";
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

// Helper formatters
const formatBloodGroup = (bg?: string): string =>
  bg ? bg.replace("_", " ").replace("POSITIVE", "+").replace("NEGATIVE", "-").replace(/\s+/g, "") : "";
const toUrgency = (u?: string): "High" | "Medium" | "Low" => {
  const v = (u || "").toUpperCase();
  if (v === "CRITICAL" || v === "HIGH") return "High";
  if (v === "MEDIUM") return "Medium";
  return "Low";
};

function RequestDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get("id") ?? "";
  const { data: requestData, isLoading, isError } = useGetRequestByIdQuery(
    { requestId },
    { skip: !requestId }
  );
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
    const bloodGroup = formatBloodGroup(requestData?.data?.bloodGroup);
    const mockAvailability: AvailabilityData = {
      available: Math.random() > 0.3,
      currentStock: Math.floor(Math.random() * 10) + 1,
      requestedQuantity: unitsRequested,
      bloodType: bloodGroup,
      estimatedDeliveryTime: "2-4 hours",
    };

    setAvailabilityData(mockAvailability);
    setShowAvailability(true);
    setHasCheckedAvailability(true);
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
      deadline: d.requestDeliveryTime || "",
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

export default function RequestDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f8f8] p-4 pb-24">Loading...</div>}>
      <RequestDetailsContent />
    </Suspense>
  );
}
