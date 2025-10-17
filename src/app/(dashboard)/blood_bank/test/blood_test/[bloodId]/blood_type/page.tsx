"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { BloodTypeResult } from "@/components";
import { useUpdateBloodTestMutation } from "@/store/api/bloodTestApi";
import { useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ForwardGrouping {
  antiA: string;
  antiB: string;
  antiD: string;
  normalSaline: string;
}

interface ResultInputProps {
  value: string;
  onChange: (value: string) => void;
  options?: string[];
  colorTheme?: "blue" | "yellow" | "gray";
}

const ResultInput: React.FC<ResultInputProps> = ({
  value,
  onChange,
  options = ["Agglutination", "No Agglutination"],
  colorTheme,
}) => {
  const getColorClasses = (theme?: "blue" | "yellow" | "gray"): string => {
    switch (theme) {
      case "blue":
        return "focus:ring-blue-500 focus:border-blue-500 border-blue-200 text-gray-600";
      case "yellow":
        return "focus:ring-yellow-500 focus:border-yellow-500 border-yellow-200 text-gray-600";
      case "gray":
      default:
        return "focus:ring-gray-500 focus:border-gray-500 border-gray-300 text-gray-600";
    }
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-2 border rounded-md focus:ring-2 focus:border-transparent ${getColorClasses(
        colorTheme
      )}`}
    >
      <option value="">Select...</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

const BloodGroupingResultsPage: React.FC = () => {
  const { bloodId } = useParams();
  const bloodIdStr = Array.isArray(bloodId) ? bloodId[0] : bloodId;

  const mapBloodTypeForBackend = (full: string) => {
    if (!full) return "";
    const [abo, rh] = [full.slice(0, -1), full.slice(-1)];
    return `${abo}_${rh === "+" ? "POSITIVE" : "NEGATIVE"}`.toUpperCase();
  };

  const [updateBloodTest, { isLoading }] = useUpdateBloodTestMutation();
  const handleSubmit = async () => {
    if (!bloodType || bloodType.full === "Invalid Test") return;

    const aboTestMapped = mapBloodTypeForBackend(bloodType.full);

    try {
      await updateBloodTest({
        bloodId: bloodIdStr!,
        data: { aboTest: aboTestMapped },
      }).unwrap();
      console.log("Blood test updated successfully!");
      toast.success("Blood test updated successfully!");
    } catch (err) {
      console.error("Failed to update blood test:", err);
      toast.error("Failed to update blood test. Please try again.");
    }
  };

  const [forwardGrouping, setForwardGrouping] = useState<ForwardGrouping>({
    antiA: "",
    antiB: "",
    antiD: "",
    normalSaline: "",
  });

  const handleChange = (field: keyof ForwardGrouping, value: string) => {
    setForwardGrouping((prev) => ({ ...prev, [field]: value }));
  };

  const isFormComplete = Object.values(forwardGrouping).every(Boolean);

  // Blood type determination logic
  const determineBloodType = (): {
    abo: string;
    rh: string;
    full: string;
  } | null => {
    if (!isFormComplete) return null;

    const { antiA, antiB, antiD, normalSaline } = forwardGrouping;

    if (normalSaline === "Agglutination") {
      return { abo: "Invalid", rh: "Invalid", full: "Invalid Test" };
    }

    let abo = "";
    if (antiA === "Agglutination" && antiB === "Agglutination") {
      abo = "AB";
    } else if (antiA === "Agglutination" && antiB === "No Agglutination") {
      abo = "A";
    } else if (antiA === "No Agglutination" && antiB === "Agglutination") {
      abo = "B";
    } else if (antiA === "No Agglutination" && antiB === "No Agglutination") {
      abo = "O";
    }

    const rh = antiD === "Agglutination" ? "Positive" : "Negative";
    const rhSymbol = antiD === "Agglutination" ? "+" : "-";

    return {
      abo,
      rh,
      full: `${abo}${rhSymbol}`,
    };
  };

  const bloodType = determineBloodType();

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4">
      <div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Blood Grouping Test
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-blue-700 mb-2 flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full" /> Anti‑A
              </label>
              <ResultInput
                value={forwardGrouping.antiA}
                onChange={(val) => handleChange("antiA", val)}
                colorTheme="blue"
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-yellow-700 mb-2 flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-500 rounded-full" /> Anti‑B
              </label>
              <ResultInput
                value={forwardGrouping.antiB}
                onChange={(val) => handleChange("antiB", val)}
                colorTheme="yellow"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-500 rounded-full" /> Anti‑D
              </label>
              <ResultInput
                value={forwardGrouping.antiD}
                onChange={(val) => handleChange("antiD", val)}
                colorTheme="gray"
              />
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-300 rounded-full" /> Normal
                Saline
              </label>
              <ResultInput
                value={forwardGrouping.normalSaline}
                onChange={(val) => handleChange("normalSaline", val)}
                colorTheme="gray"
              />
            </div>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>

        <BloodTypeResult
          forwardGrouping={forwardGrouping}
          bloodType={bloodType}
        />

        <div className="flex justify-end gap-4 mb-6">
          {isFormComplete && (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-600 border border-green-600 rounded-lg font-medium transition-colors hover:bg-green-100"
            >
              <Check size={18} /> Finalize & Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodGroupingResultsPage;
