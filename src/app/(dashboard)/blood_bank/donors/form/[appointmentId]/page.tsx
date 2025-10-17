"use client";

import {
  PreScreeningFormDisplay,
  MedicalOfficerEvaluation,
  AddBloodUnit,
} from "@/components";
import { ReactElement, useState } from "react";
import { useGetDonationFormByAppointmentIdQuery } from "@/store/api/donationFormApi";
import { useParams, useRouter } from "next/navigation";

export default function Form(): ReactElement {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const router = useRouter();

  const { appointmentId } = useParams();

  // Make sure appointmentId is a string (pick the first if array)
  const appointmentIdStr = Array.isArray(appointmentId)
    ? appointmentId[0]
    : appointmentId;

  // Only call the query if we have a valid string
  const {
    data: formsData,
    isLoading,
    error,
  } = useGetDonationFormByAppointmentIdQuery(appointmentIdStr || "");

  const formData = formsData?.[0];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
    } else {
      router.push("/blood_bank/donors");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const renderCurrentStep = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent mb-4"></div>
            <p className="text-gray-600 text-lg">Loading form...</p>
          </div>
        </div>
      );
    }

    if (error || !formData) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Form Not Available
            </h3>
            <p className="text-gray-600 mb-4">
              The donation form hasn't been filled yet. Please refresh the page
              once the form is completed.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return <PreScreeningFormDisplay formData={formData} />;
      case 2:
        return <MedicalOfficerEvaluation />;
      case 3:
        return <AddBloodUnit />;
      default:
        return <PreScreeningFormDisplay formData={formData} />;
    }
  };

  return (
    <div className="min-h-[100vh] p-4 pt-2 bg-[#f8f8f8]">
      <div className="">
        {/* Current step content */}
        <div className="mb-6">{renderCurrentStep()}</div>

        {/* Pagination controls */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-400 text-white hover:bg-gray-600"
            }`}
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentStep(i + 1)}
                className={`w-8 h-8 rounded-full font-medium transition-colors ${
                  currentStep === i + 1
                    ? "bg-blue-500 text-white"
                    : currentStep > i + 1
                    ? "bg-gray-200 text-gray-600"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {currentStep === totalSteps ? "Go Back" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
