"use client";

import { PreScreeningFormDisplay, MedicalOfficerEvaluation, AddBloodUnit } from "@/components";
import { ReactElement, useState } from "react";
import { useGetDonationFormByIdQuery } from "@/store/api/donationFormApi"; 
import { BloodDonationForm } from "@/store/api/donationFormApi";

export default function Form(): ReactElement {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // 👇 Example: you’ll get this ID from route params or props
  const formId = "7bb02404-02f7-4b30-bd77-9806560f9009";

  // Fetch form data
  const { data: formData, isLoading, error } = useGetDonationFormByIdQuery(formId);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Form completed");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    if (isLoading) return <p>Loading form...</p>;
    if (error) return <p className="text-red-500">Failed to load donation form</p>;
    if (!formData) return <p>No form data found</p>;

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
            {currentStep === totalSteps ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
