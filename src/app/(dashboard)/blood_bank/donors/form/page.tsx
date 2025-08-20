"use client";

import { PreScreeningFormDisplay, MedicalOfficerEvaluation, AddBloodUnit } from "@/components";
import { ReactElement, useState } from "react";
import { FormData } from '../../../../../../types';

export default function Form(): ReactElement {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3; 

  const formData: FormData = {
    // Required fields
    id: "donation-001", // You'll need to generate or provide this
    dateTime: new Date().toISOString(), // Current timestamp
    
    userId: "user-456", // Optional - provide if available
    
    // Previous Donation History
    hasDonatedBefore: true,
    anyDifficulty: "Felt slightly dizzy after my second donation, but it passed after resting for 10 minutes",
    medicalAdvice: false,
    
    // Current Health Status  
    feelingWell: true,
    anyDiseases: {
      diabetes: true,
      asthma: true,
      hypertension: false,
      heartDisease: false,
      // Add other diseases as needed with boolean values
    },
    takingMedicines: false,
    anySurgery: true,
    workingLater: false,
    pregnant: false,
    
    // Past Medical History
    haveHepatitis: false,
    haveTB: true,
    
    // During past 12 months
    hasDengue: false,
    hadVaccination: true,
    tattoos: true,
    haveImprisonment: false,
    travelledAbroad: true,
    receivedBlood: false,
    hadMalaria: true,
    
    // Recent Health History
    hadLongFever: false,
    hadtoothExtraction: false,
    bookAspirin: true,
    
    // Risk Factors & Final
    Acknowledgement: true,
    highRisk: false,
    hadWeightLoss: false,
    
    // Additional fields from interface not covered above
    chemotherapy: false
  };
  
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
    switch (currentStep) {
      case 1:
        return <PreScreeningFormDisplay formData={formData} />;
      case 2:
        return (
          <MedicalOfficerEvaluation />
        );
      case 3:
        return (
          <AddBloodUnit />
        );
      default:
        return <PreScreeningFormDisplay formData={formData} />;
    }
  };

  return (
    <div className="min-h-[100vh] p-4 pt-2 bg-[#f8f8f8]">
      <div className="">

        {/* Current step content */}
        <div className="mb-6">
          {renderCurrentStep()}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-400 text-white hover:bg-gray-600'
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
                    ? 'bg-blue-500 text-white'
                    : currentStep > i + 1
                    ? 'bg-gray-200 text-gray-600'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
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
            {currentStep === totalSteps ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}