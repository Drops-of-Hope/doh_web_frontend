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
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/blood_bank/donors");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    if (isLoading) return <p>Loading form...</p>;
    if (error)
      return <p className="text-red-500">Form not filled yet, refresh page once filled</p>;
    if (!formData) return <p>form not filled yet, refresh page once filled</p>;

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
