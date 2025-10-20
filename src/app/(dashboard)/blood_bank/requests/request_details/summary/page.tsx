"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BackButton, RequestDetailsCard } from "@/components";

export default function RequestDetailsSummaryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f8f8] p-4 pb-24">Loading...</div>}>
      <SummaryContent />
    </Suspense>
  );
}

type TransitStatus = "not_started" | "ongoing" | "completed";

// Shape saved by the transit form
type TransitDetailsLocal = {
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  vehicleType: string;
  estimatedDeparture: string;
  estimatedArrival: string;
  emergencyContact: string;
  notes: string;
  departureTime?: string;
  status?: string;
};

// Shape expected by RequestDetailsCard
type TransitDetailsCard = {
  transporter: string;
  driverName: string;
  driverContact: string;
  emergencyContact: string;
  vehicle: string;
  departureTime: string;
  note: string;
};

function SummaryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get("id") ?? "";

  // Read and normalize transit details saved by the transit form
  let transitStatus: TransitStatus = "not_started";
  let localDetails: TransitDetailsLocal | undefined = undefined;
  if (typeof window !== "undefined") {
    const statusRaw = localStorage.getItem("transitStatus");
    if (statusRaw === "not_started" || statusRaw === "ongoing" || statusRaw === "completed") {
      transitStatus = statusRaw;
    }
    const detailsRaw = localStorage.getItem("transitDetails");
    if (detailsRaw) {
      try {
        const parsed = JSON.parse(detailsRaw) as unknown;
        if (
          parsed &&
          typeof parsed === "object" &&
          "driverName" in parsed &&
          "driverPhone" in parsed
        ) {
          localDetails = parsed as TransitDetailsLocal;
        }
      } catch {
        // ignore parse errors
      }
    }
  }

  const transitDetails: TransitDetailsCard | undefined = localDetails
    ? {
        transporter: localDetails.vehicleType || "Transport",
        driverName: localDetails.driverName,
        driverContact: localDetails.driverPhone,
        emergencyContact: localDetails.emergencyContact,
        vehicle: `${localDetails.vehicleType ?? ""} ${localDetails.vehicleNumber ?? ""}`.trim(),
        departureTime: localDetails.estimatedDeparture || localDetails.departureTime || "",
        note: localDetails.notes || "",
      }
    : undefined;
  const eta = localDetails?.estimatedArrival || "--";

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4 pb-24">
      <div className="mb-6">
        <BackButton fallbackUrl="/blood_bank/requests" className="hover:shadow-md" />
      </div>

      {/* Request details card placeholder (could fetch by id if desired) */}
      <div className="mb-4">
        <RequestDetailsCard
          request={{
            id: requestId || "-",
            patientName: "Request",
            bloodGroup: "-",
            quantity: 0,
            requestedDate: "",
            deadline: "",
            hospital: "",
            contactDetails: { phone: "", email: "" },
            priority: "Low",
            requestTime: "",
            reason: "",
          }}
          requestStatus={"accepted"}
          transitStatus={transitStatus}
          transitDetails={transitDetails}
        />
      </div>

      {/* Transit Status Banner with improved visibility using same base colors */}
      {transitDetails && (
        <div className="my-4 p-5 rounded-lg border bg-blue-100/70 border-blue-300 text-blue-900 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-blue-900">Transit In Progress</p>
              <p className="text-sm text-blue-800/90 mt-1">
                Driver: <span className="font-medium">{transitDetails.driverName}</span> · Phone: {transitDetails.driverContact} · Vehicle: {transitDetails.vehicle}
              </p>
              <p className="text-sm text-blue-800/90">
                ETA: <span className="font-medium">{eta}</span> · Emergency Contact: {transitDetails.emergencyContact}
              </p>
              {transitDetails.note && (
                <p className="text-sm text-blue-800/90 mt-1">Notes: {transitDetails.note}</p>
              )}
            </div>
            <div>
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                onClick={() => router.push(`/blood_bank/requests`) }
              >
                Back to Requests
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
