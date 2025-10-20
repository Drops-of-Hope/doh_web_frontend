"use client";

import React from "react";
import { HealthVitalsDisplay } from "@/components";

/**
 * Example page demonstrating how to use the HealthVitalsDisplay component
 * 
 * This page shows health vitals for a specific appointment.
 * In a real application, you would get the appointmentId from route parameters,
 * query strings, or props.
 */
export default function HealthVitalsExamplePage() {
  // Example appointment ID - replace with actual appointment ID from your app
  const appointmentId = "8b65ddh3-0w95-4bda-bbce-2a5096bd5dh4";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Health Vitals Example
        </h1>
        
        <HealthVitalsDisplay appointmentId={appointmentId} />
      </div>
    </div>
  );
}
