"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AvailabilityChecker,
  ActionButtons,
  RejectionSection,
  BackButton,
  RequestDetailsCard,
} from "@/components";
import {
  BloodRequest,
  AvailabilityData,
  RequestStatus,
} from "../../../../../../types";

const mockRequestData: BloodRequest = {
  id: "1",
  patientName: "John Smith",
  bloodGroup: "O+",
  quantity: 4,
  requestedDate: "2024-01-20",
  deadline: "2024-01-21 10:00 AM",
  hospital: "City Hospital",
  contactDetails: {
    phone: "011-123-4567",
    email: "emergency@cityhospital.com",
  },
  priority: "High",
  requestTime: "2 hours ago",
  reason: "Emergency surgery required",
};

export default function RequestDetailsPage() {
  const router = useRouter();
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
    const mockAvailability: AvailabilityData = {
      available: Math.random() > 0.3,
      currentStock: Math.floor(Math.random() * 10) + 1,
      requestedQuantity: mockRequestData.quantity,
      bloodType: mockRequestData.bloodGroup,
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
    console.log("Request rejected:", mockRequestData.id, "Reason:", reason);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4 pb-24">
      <div className="mb-6">
        <BackButton
          fallbackUrl="/blood_bank/requests/request_details"
          className="hover:shadow-md"
        />
      </div>

      <RequestDetailsCard
        request={mockRequestData}
        requestStatus={requestStatus}
        transitStatus={transitStatus}
        transitDetails={transitDetails}
      />

      {/* Transit Status Section */}
      {requestStatus === "accepted" && (
        <div className="my-4 p-4 bg-blue-50 border border-blue-200 rounded">
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
