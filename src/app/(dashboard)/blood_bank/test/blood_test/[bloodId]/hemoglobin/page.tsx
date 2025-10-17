"use client";

import { useState } from "react";
import { BackButton } from "@/components";
import { useParams } from "next/navigation";
import { useUpdateHemoglobinTestMutation } from "@/store/api/bloodTestApi";

// Recommended hemoglobin thresholds (g/L) — example values:
// Male: >= 130 g/L (13.0 g/dL -> 130 g/L), Female: >= 120 g/L
// For simplicity, we'll use a general safe cutoff of 120 g/L (as in your example payload)
const SAFE_HEMOGLOBIN_CUTOFF = 120;

export default function HemoglobinInputPage() {
  const { bloodId } = useParams();
  const bloodIdStr = Array.isArray(bloodId) ? bloodId[0] : bloodId;

  const [value, setValue] = useState<string>("");
  const [saved, setSaved] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [updateHemoglobinTest, { isLoading: isSaving }] =
    useUpdateHemoglobinTestMutation();

  const hem = parseFloat(value);
  const validHem = !isNaN(hem) && hem >= 0;

  const isSafe = validHem ? hem >= SAFE_HEMOGLOBIN_CUTOFF : false;
  const interpretation = validHem ? (isSafe ? "Safe" : "Unsafe") : "-";

  const handleCalculate = () => {
    if (!validHem) return;

    setShowResult(false);
    setIsCalculating(true);

    setTimeout(() => {
      setIsCalculating(false);
      setShowResult(true);
    }, 600);
  };

  const handleSave = () => {
    if (!validHem) return;

    setSaveError(null);
    setSaved(false);

    updateHemoglobinTest({ bloodId: bloodIdStr!, data: { hemoglobin: hem } })
      .unwrap()
      .then(() => setSaved(true))
      .catch((err: unknown) => {
        const getErrorMessage = (e: unknown): string => {
          if (typeof e === "string") return e;
          if (e && typeof e === "object") {
            const obj = e as Record<string, unknown>;
            if (
              "data" in obj &&
              obj["data"] &&
              typeof obj["data"] === "object"
            ) {
              const d = obj["data"] as Record<string, unknown>;
              if ("message" in d && typeof d["message"] === "string")
                return d["message"] as string;
            }
            if ("message" in obj && typeof obj["message"] === "string")
              return obj["message"] as string;
          }
          return "Failed to save result";
        };

        setSaveError(getErrorMessage(err));
      });
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4">
      <div className="">
        <div className="mb-6">
          <BackButton
            fallbackUrl={`/blood_bank/test/blood_test/${bloodIdStr}`}
            className="hover:shadow-md"
          />
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <div className="mb-6 p-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">
              Instructions
            </h3>
            <p className="text-sm text-blue-800">
              Enter the hemoglobin value (in g/L) for this blood unit. Values
              equal to or above {SAFE_HEMOGLOBIN_CUTOFF} g/L will be marked as
              safe.
            </p>
          </div>

          <label className="block text-sm font-medium text-gray-700">
            Hemoglobin (g/L)
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="number"
              step="1"
              min="0"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setSaved(false);
                setShowResult(false);
              }}
              className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Enter hemoglobin value in g/L"
            />
            <button
              onClick={handleCalculate}
              disabled={!validHem}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 whitespace-nowrap"
            >
              Calculate
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <div className="text-sm text-gray-600">
              Safe cutoff: <strong>{SAFE_HEMOGLOBIN_CUTOFF} g/L</strong>
            </div>
            <div className="text-sm text-gray-600">
              Value:{" "}
              <strong>{validHem && showResult ? `${hem} g/L` : "-"}</strong>
            </div>
          </div>

          {isCalculating && (
            <div className="mt-6 p-4 rounded-lg border-2 border-gray-300 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Calculating result...
                </span>
              </div>
            </div>
          )}

          {showResult && validHem && (
            <div
              className={`mt-6 p-6 ${isSafe ? "" : "bg-red-50 border-red-300"}`}
            >
              <div className="text-sm font-medium text-gray-600 mb-2">
                Test Result
              </div>
              <div
                className={`text-3xl font-bold ${
                  isSafe ? "text-green-700" : "text-red-600"
                }`}
              >
                {interpretation}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={!validHem || !showResult || isSaving}
              className="bg-green-50 text-green-500 border border-green-500 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Result"}
            </button>

            {saved && (
              <div className="text-green-600">Result saved successfully.</div>
            )}

            {saveError && (
              <div className="text-red-600">Error: {saveError}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
