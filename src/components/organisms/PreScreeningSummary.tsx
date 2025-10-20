"use client";
import React from "react";
import type { FormData } from "../../../types";

interface PreScreeningSummaryProps {
  formData: FormData;
}

const PreScreeningSummary: React.FC<PreScreeningSummaryProps> = ({ formData }) => {
  // Determine eligibility based on formData
  const determineEligibility = () => {
    const riskyConditions = [
      formData.medicalAdvice,
      !formData.feelingWell,
      Object.values(formData.anyDiseases || {}).some(Boolean),
      formData.haveHepatitis,
      formData.haveTB,
      formData.pregnant,
      formData.hasDengue,
      formData.hadLongFever,
      formData.hadtoothExtraction,
      formData.bookAspirin,
      formData.highRisk,
      formData.hadWeightLoss,
      formData.tattoos,
      formData.receivedBlood,
      formData.travelledAbroad,
    ];

    const minorConcerns = [
      formData.takingMedicines,
      formData.anySurgery,
      formData.workingLater,
      formData.hadVaccination,
      formData.hadMalaria,
    ];

    const hasRisky = riskyConditions.some(Boolean);
    const hasMinor = minorConcerns.some(Boolean);

    if (hasRisky) {
      return {
        status: "Risky (Not Fit)",
        message:
          "One or more high-risk or disqualifying conditions were identified (e.g., recent illness, infection history, medication use, pregnancy, or recent high-risk exposure). The donor should not donate at this time.",
      };
    }

    if (hasMinor) {
      return {
        status: "Further Review Needed",
        message:
          "Some responses indicate minor or unclear concerns (e.g., recent medication, surgery, or vaccinations). Doctor’s review is recommended before confirming eligibility.",
      };
    }

    return {
      status: "Fit to Donate",
      message:
        "No disqualifying conditions or risk factors identified. Donor appears medically fit to donate.",
    };
  };

  const result = determineEligibility();

  return (
    <div
      className={`border-l-4 rounded-md p-4 mb-6 ${
        result.status === "Risky (Not Fit)"
          ? "border-red-500 bg-red-50 text-red-700"
          : result.status === "Further Review Needed"
          ? "border-yellow-500 bg-yellow-50 text-yellow-700"
          : "border-green-500 bg-green-50 text-green-700"
      }`}
    >
      <h3 className="font-semibold text-lg mb-1">
        Eligibility Status: {result.status}
      </h3>
      <p className="text-sm">{result.message}</p>
    </div>
  );
};

export default PreScreeningSummary;
