"use client";

import React, { useEffect, useState } from "react";
import { useGetHealthVitalsByAppointmentIdQuery } from "@/store/api/healthVitalsApi";

interface HealthVitalsDisplayProps {
  appointmentId: string;
}

const HealthVitalsDisplay: React.FC<HealthVitalsDisplayProps> = ({ appointmentId }) => {
  const {
    data: healthVitals,
    isLoading,
    isError,
    error,
  } = useGetHealthVitalsByAppointmentIdQuery(appointmentId, {
    skip: !appointmentId,
  });

  const [displayData, setDisplayData] = useState<{
    userName: string;
    weight: number;
    bp: number;
    cvsPulse: number;
    appointmentDate: string;
  } | null>(null);

  useEffect(() => {
    if (healthVitals && healthVitals.length > 0) {
      const vital = healthVitals[0];
      setDisplayData({
        userName: vital.user?.name || "N/A",
        weight: vital.weight,
        bp: vital.bp,
        cvsPulse: vital.cvsPulse,
        appointmentDate: vital.appointment?.appointmentDate
          ? new Date(vital.appointment.appointmentDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A",
      });
    }
  }, [healthVitals]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-semibold mb-2">Error Loading Health Vitals</h3>
        <p className="text-red-600">
          {error && "data" in error && typeof error.data === "object" && error.data !== null
            ? (error.data as { message?: string }).message || "Failed to load health vitals data."
            : "Failed to load health vitals data."}
        </p>
      </div>
    );
  }

  if (!healthVitals || healthVitals.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-gray-600 text-center">No health vitals data available for this appointment.</p>
      </div>
    );
  }

  if (!displayData) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Health Vitals Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Name */}
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Donor Name</p>
          <p className="text-lg font-semibold text-gray-800">{displayData.userName}</p>
        </div>

        {/* Appointment Date */}
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Appointment Date</p>
          <p className="text-lg font-semibold text-gray-800">{displayData.appointmentDate}</p>
        </div>

        {/* Weight */}
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Weight</p>
          <p className="text-lg font-semibold text-gray-800">{displayData.weight} kg</p>
        </div>

        {/* Blood Pressure */}
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Blood Pressure</p>
          <p className="text-lg font-semibold text-gray-800">{displayData.bp} mmHg</p>
        </div>

        {/* CVS Pulse */}
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">CVS Pulse</p>
          <p className="text-lg font-semibold text-gray-800">{displayData.cvsPulse} bpm</p>
        </div>
      </div>
    </div>
  );
};

export default HealthVitalsDisplay;
