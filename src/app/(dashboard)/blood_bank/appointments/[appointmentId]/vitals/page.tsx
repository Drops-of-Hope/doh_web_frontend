"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetAppointmentByIdQuery } from "@/store/api/appointmentsApi";
import { HealthVitalsDisplay, BackButton } from "@/components";

/**
 * Advanced example showing how to integrate HealthVitalsDisplay 
 * with existing appointment data fetching.
 * 
 * This demonstrates:
 * - Using multiple API hooks together
 * - Handling loading states for multiple queries
 * - Combining different data sources in one view
 * - Following the project's standard patterns
 */
export default function AppointmentDetailsWithVitalsPage() {
  const { appointmentId } = useParams();
  const appointmentIdStr = Array.isArray(appointmentId) 
    ? appointmentId[0] 
    : appointmentId;

  // Fetch appointment details
  const {
    data: appointmentData,
    isLoading: isLoadingAppointment,
    isError: isAppointmentError,
  } = useGetAppointmentByIdQuery(appointmentIdStr || "", {
    skip: !appointmentIdStr,
  });

  if (isLoadingAppointment) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isAppointmentError || !appointmentData) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <BackButton />
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-6">
            <h3 className="text-red-800 font-semibold mb-2">Error Loading Appointment</h3>
            <p className="text-red-600">Failed to load appointment details.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}
        <BackButton />

        {/* Page Title */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Appointment Details
          </h1>
          <p className="text-gray-600 mt-2">
            Viewing details for appointment on{" "}
            {new Date(appointmentData.appointmentDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Appointment Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Appointment Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Donor Name</p>
              <p className="text-lg font-semibold text-gray-800">
                {appointmentData.donor?.name || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Blood Group</p>
              <p className="text-lg font-semibold text-gray-800">
                {appointmentData.donor?.bloodGroup || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-semibold text-gray-800">
                {appointmentData.donor?.email || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-lg font-semibold text-gray-800">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    appointmentData.scheduled === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : appointmentData.scheduled === "COMPLETED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {appointmentData.scheduled}
                </span>
              </p>
            </div>
            {appointmentData.slot && (
              <>
                <div>
                  <p className="text-sm text-gray-600">Start Time</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {appointmentData.slot.startTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">End Time</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {appointmentData.slot.endTime}
                  </p>
                </div>
              </>
            )}
            {appointmentData.medicalEstablishment && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Medical Establishment</p>
                <p className="text-lg font-semibold text-gray-800">
                  {appointmentData.medicalEstablishment.name}
                </p>
                {appointmentData.medicalEstablishment.address && (
                  <p className="text-sm text-gray-600 mt-1">
                    {appointmentData.medicalEstablishment.address}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Health Vitals Component */}
        {appointmentIdStr && <HealthVitalsDisplay appointmentId={appointmentIdStr} />}
      </div>
    </div>
  );
}
