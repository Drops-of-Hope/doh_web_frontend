"use client";

import { useState } from "react";
import { BackButton } from "@/components";
import { useRouter, useParams } from "next/navigation";

const CUTOFF_OD = 0.5;

export default function HivTestInputPage() {
  const router = useRouter();
  const { bloodId } = useParams();
  const bloodIdStr = Array.isArray(bloodId) ? bloodId[0] : bloodId;

  const [odValue, setOdValue] = useState<string>("");
  const [saved, setSaved] = useState(false);

  const od = parseFloat(odValue);
  const validOd = !isNaN(od) && od >= 0;

  const sco = validOd ? od / CUTOFF_OD : NaN;
  const interpretation = validOd
    ? sco < 1
      ? "Negative"
      : "Reactive / Positive"
    : "-";

  const handleSave = () => {
    if (!validOd) return;
    // TODO: wire up API call to save HIV test result for bloodIdStr
    setSaved(true);
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

        <div className="bg-white shadow rounded p-6">
          <label className="block text-sm font-medium text-gray-700">
            Optical Density (OD)
          </label>
          <input
            type="number"
            step="0.001"
            min="0"
            value={odValue}
            onChange={(e) => {
              setOdValue(e.target.value);
              setSaved(false);
            }}
            className="mt-2 w-1/2 border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Enter OD value"
          />

          <div className="mt-4">
            <div className="text-sm text-gray-600">
              Cutoff OD value: <strong>{CUTOFF_OD}</strong>
            </div>
            <div className="mt-2">
              S/CO Ratio: <strong>{validOd ? sco.toFixed(3) : "-"}</strong>
            </div>
            <div className="mt-1">
              Interpretation: <strong>{interpretation}</strong>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={!validOd}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Save Result
            </button>

            {saved && (
              <div className="text-green-600">
                Result saved locally (no API).
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
