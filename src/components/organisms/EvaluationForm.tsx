import React from "react";
import { Activity, UserCheck, UserX } from "lucide-react";
import { EvaluationData, ValidationErrors } from "../../../types";

interface EvaluationFormProps {
  evaluationData: EvaluationData;
  errors: ValidationErrors;
  errorMessage: string;
  isCreatingVital: boolean;
  onInputChange: (field: keyof EvaluationData, value: string) => void;
  onAcceptDonor: () => void;
  onRejectDonor: () => void;
}

export const EvaluationForm: React.FC<EvaluationFormProps> = ({
  evaluationData,
  errors,
  errorMessage,
  isCreatingVital,
  onInputChange,
  onAcceptDonor,
  onRejectDonor,
}) => {
  const isFit = evaluationData.donorFitness === "fit";
  if (!isFit) return null;

  // Convert numeric values safely
  const weight = parseFloat(evaluationData.weight) || 0;
  const bp = parseFloat(evaluationData.systolicBP) || 0;
  const pulse = parseFloat(evaluationData.pulseRate) || 0;

  // Check if all required fields are entered
  const allFieldsEntered =
    evaluationData.weight.trim() !== "" &&
    evaluationData.systolicBP.trim() !== "" &&
    evaluationData.pulseRate.trim() !== "";

  // Threshold logic
  const weightValid = weight >= 50;
  const bpValid = bp >= 90 && bp <= 180;
  const pulseValid = pulse >= 60 && pulse <= 100; // Normal healthy pulse range

  const isEligible = weightValid && bpValid && pulseValid;

  return (
    <>
      {/* Physical Measurements */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          Physical Measurements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg) *
            </label>
            <input
              type="number"
              step="0.1"
              value={evaluationData.weight}
              onChange={(e) => onInputChange("weight", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
              placeholder="e.g., 65.5"
            />
            {errors.weight && (
              <p className="text-red-600 text-sm mt-1">{errors.weight}</p>
            )}
          </div>
        </div>
      </div>

      {/* Vital Signs */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Activity className="text-blue-600" size={24} />
          Vital Signs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              BP (mmHg) *
            </label>
            <input
              type="number"
              value={evaluationData.systolicBP}
              onChange={(e) => onInputChange("systolicBP", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
              placeholder="e.g., 120"
            />
            {errors.systolicBP && (
              <p className="text-red-600 text-sm mt-1">{errors.systolicBP}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVS Status Pulse (/min) *
            </label>
            <input
              type="number"
              value={evaluationData.pulseRate}
              onChange={(e) => onInputChange("pulseRate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
              placeholder="e.g., 72"
            />
            {errors.pulseRate && (
              <p className="text-red-600 text-sm mt-1">{errors.pulseRate}</p>
            )}
          </div>
        </div>
      </div>

      {/* Eligibility Message */}
      {allFieldsEntered && (
        <div className="mt-4 p-4 rounded-lg text-center font-medium">
          {isEligible ? (
            <p className="text-green-700 border-green-300 rounded-lg p-2">
              This donor is eligible to donate. Donor’s current health vitals
              are within the acceptable range for safe blood donation.
            </p>
          ) : (
            <p className="text-red-700 bg-red-100 border-red-300 rounded-lg p-2">
              This donor cannot donate. Donor’s current health vitals are not
              within the acceptable range for safe blood donation.
            </p>
          )}
        </div>
      )}

      {/* Final Decision */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Final Decision
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRejectDonor}
            disabled={isCreatingVital}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UserX size={24} />
            Reject Donor
          </button>

          <button
            onClick={onAcceptDonor}
            disabled={!isEligible || isCreatingVital}
            className="flex items-center justify-center gap-3 px-6 py-3 bg-green-50 text-green-600 hover:bg-green-100 font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UserCheck size={24} />
            {isCreatingVital ? "Saving..." : "Accept Donor"}
          </button>
        </div>

        {/* Error Messages */}
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="text-center font-medium">{errorMessage}</p>
          </div>
        )}
      </div>
    </>
  );
};
