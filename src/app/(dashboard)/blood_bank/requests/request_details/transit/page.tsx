// app/blood_bank/requests/request_details/transit/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components";

interface TransitFormData {
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  vehicleType: string;
  estimatedDeparture: string;
  estimatedArrival: string;
  emergencyContact: string;
  notes: string;
}

export default function TransitFormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<TransitFormData>({
    driverName: "",
    driverPhone: "",
    vehicleNumber: "",
    vehicleType: "ambulance",
    estimatedDeparture: "",
    estimatedArrival: "",
    emergencyContact: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<TransitFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<TransitFormData> = {};

    if (!formData.driverName.trim()) {
      newErrors.driverName = "Driver name is required";
    }

    if (!formData.driverPhone.trim()) {
      newErrors.driverPhone = "Driver phone is required";
    } else if (!/^[0-9-+\s()]+$/.test(formData.driverPhone)) {
      newErrors.driverPhone = "Please enter a valid phone number";
    }

    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = "Vehicle number is required";
    }

    if (!formData.estimatedDeparture) {
      newErrors.estimatedDeparture = "Estimated departure time is required";
    }

    if (!formData.estimatedArrival) {
      newErrors.estimatedArrival = "Estimated arrival time is required";
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = "Emergency contact is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof TransitFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store transit details in localStorage (in a real app, this would be an API call)
      if (typeof window !== "undefined") {
        localStorage.setItem("transitStatus", "ongoing");
        localStorage.setItem(
          "transitDetails",
          JSON.stringify({
            ...formData,
            departureTime: new Date().toISOString(),
            status: "ongoing",
          })
        );
      }

      // Redirect back to request details page
      router.push("/blood_bank/requests/request_details");
    } catch (error) {
      console.error("Error submitting transit form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <BackButton
            fallbackUrl="/blood_bank/requests/request_details"
            className="mb-4 hover:shadow-md transition-shadow"
          />
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Transit Arrangement
            </h1>
            <p className="text-gray-600">
              Please fill in the transportation details for blood delivery
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
            <h2 className="text-xl font-semibold text-white mb-1">
              Transportation Details
            </h2>
            <p className="text-red-100 text-sm">
              All fields marked with * are required
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Driver Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Driver Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Driver Name *
                  </label>
                  <input
                    type="text"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                      errors.driverName
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter driver's full name"
                  />
                  {errors.driverName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.driverName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Driver Phone *
                  </label>
                  <input
                    type="tel"
                    name="driverPhone"
                    value={formData.driverPhone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                      errors.driverPhone
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="011-123-4567"
                  />
                  {errors.driverPhone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.driverPhone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Vehicle Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Number *
                  </label>
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                      errors.vehicleNumber
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="ABC-1234"
                  />
                  {errors.vehicleNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.vehicleNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Type
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  >
                    <option value="ambulance">Ambulance</option>
                    <option value="refrigerated_van">Refrigerated Van</option>
                    <option value="medical_transport">Medical Transport</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Timing Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Timing Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Departure *
                  </label>
                  <input
                    type="datetime-local"
                    name="estimatedDeparture"
                    value={formData.estimatedDeparture}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                      errors.estimatedDeparture
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.estimatedDeparture && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.estimatedDeparture}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Arrival *
                  </label>
                  <input
                    type="datetime-local"
                    name="estimatedArrival"
                    value={formData.estimatedArrival}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                      errors.estimatedArrival
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.estimatedArrival && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.estimatedArrival}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Emergency Contact
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact Number *
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                    errors.emergencyContact
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Emergency contact number"
                />
                {errors.emergencyContact && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.emergencyContact}
                  </p>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Additional Notes
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Any special instructions or notes for the transport..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Initiate Transit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
