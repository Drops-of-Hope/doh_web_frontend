"use client";

import { useState } from "react";
import { BackButton } from "@/components";
import { useParams } from "next/navigation";
import { useUpdateHivTestMutation } from "@/store/api/bloodTestApi";

const CUTOFF_OD = 0.5;

export default function HivTestInputPage() {
  const { bloodId } = useParams();
  const bloodIdStr = Array.isArray(bloodId) ? bloodId[0] : bloodId;

  const [odValue, setOdValue] = useState<string>("");
  const [saved, setSaved] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [updateHivTest, { isLoading: isSaving }] = useUpdateHivTestMutation();

  const od = parseFloat(odValue);
  const validOd = !isNaN(od) && od >= 0;

  const sco = validOd ? od / CUTOFF_OD : NaN;
  const isPositive = validOd && sco >= 1;
  const interpretation = validOd
    ? sco < 1
      ? "Negative"
      : "Reactive / Positive"
    : "-";

  const handleCalculate = () => {
    if (!validOd) return;

    setShowResult(false);
    setIsCalculating(true);

    setTimeout(() => {
      setIsCalculating(false);
      setShowResult(true);
    }, 800);
  };

  const handleSave = () => {
    if (!validOd) return;

    // reset any previous states
    setSaveError(null);
    setSaved(false);

    // call mutation
    updateHivTest({ bloodId: bloodIdStr!, data: { hivTest: isPositive } })
      .unwrap()
      .then(() => {
        setSaved(true);
      })
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
              Enter the Optical Density (OD) value of the blood unit derived
              from the HIV test to determine if the unit is HIV positive or
              negative.
            </p>
          </div>

          <label className="block text-sm font-medium text-gray-700">
            Optical Density (OD)
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="number"
              step="0.001"
              min="0"
              value={odValue}
              onChange={(e) => {
                setOdValue(e.target.value);
                setSaved(false);
                setShowResult(false);
              }}
              className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Enter OD value"
            />
            <button
              onClick={handleCalculate}
              disabled={!validOd}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 whitespace-nowrap"
            >
              Calculate
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <div className="text-sm text-gray-600">
              Cutoff OD value: <strong>{CUTOFF_OD}</strong>
            </div>
            <div className="text-sm text-gray-600">
              S/CO Ratio:{" "}
              <strong>{validOd && showResult ? sco.toFixed(3) : "-"}</strong>
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

          {showResult && validOd && (
            <div
              className={`mt-6 p-6${
                isPositive ? "bg-red-50 border-red-300" : ""
              }`}
            >
              <div className="text-sm font-medium text-gray-600 mb-2">
                Test Result
              </div>
              <div
                className={`text-3xl font-bold ${
                  isPositive ? "text-red-600" : "text-green-700"
                }`}
              >
                {interpretation}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={!validOd || !showResult || isSaving}
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
