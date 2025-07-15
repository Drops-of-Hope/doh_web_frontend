"use client";

import React from "react";

interface ForwardGrouping {
  antiA: string;
  antiB: string;
  antiD: string;
  normalSaline: string;
}

interface BloodTypeResultProps {
  forwardGrouping: ForwardGrouping;
  bloodType: { abo: string; rh: string; full: string } | null;
}

const BloodTypeResult: React.FC<BloodTypeResultProps> = ({ forwardGrouping, bloodType }) => {
  if (!bloodType) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Blood Type Result</h3>

      {bloodType.abo === "Invalid" ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 font-bold text-2xl mb-2">{bloodType.full}</div>
          <p className="text-red-600 text-sm">
            Please recheck your results. Normal saline should not show agglutination.
          </p>
        </div>
      ) : (
        <div className="p-6">
          <div className="text-center mb-4">
            <div className="text-red-500 font-bold text-4xl mb-2">{bloodType.full}</div>
            <p className="text-gray-500 text-lg">
              ABO Group: <span className="font-semibold">{bloodType.abo}</span> | Rh Factor:{" "}
              <span className="font-semibold">{bloodType.rh}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Test Results Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Anti-A:</span>
                  <span className={forwardGrouping.antiA === "Agglutination" ? "text-red-600" : "text-green-600"}>
                    {forwardGrouping.antiA}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Anti-B:</span>
                  <span className={forwardGrouping.antiB === "Agglutination" ? "text-red-600" : "text-green-600"}>
                    {forwardGrouping.antiB}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Anti-D:</span>
                  <span className={forwardGrouping.antiD === "Agglutination" ? "text-red-600" : "text-green-600"}>
                    {forwardGrouping.antiD}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Normal Saline:</span>
                  <span className={forwardGrouping.normalSaline === "No Agglutination" ? "text-green-600" : "text-red-600"}>
                    {forwardGrouping.normalSaline}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Can Donate To</h4>
              <div className="text-sm text-gray-600">
                {bloodType.abo === "O" && bloodType.rh === "Negative" && "Universal Donor"}
                {bloodType.abo === "AB" && bloodType.rh === "Positive" && "AB+ only"}
                {bloodType.abo === "A" && bloodType.rh === "Positive" && "A+, AB+"}
                {bloodType.abo === "A" && bloodType.rh === "Negative" && "A+, A-, AB+, AB-"}
                {bloodType.abo === "B" && bloodType.rh === "Positive" && "B+, AB+"}
                {bloodType.abo === "B" && bloodType.rh === "Negative" && "B+, B-, AB+, AB-"}
                {bloodType.abo === "AB" && bloodType.rh === "Negative" && "AB+, AB-"}
                {bloodType.abo === "O" && bloodType.rh === "Positive" && "O+, A+, B+, AB+"}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Can Receive From</h4>
              <div className="text-sm text-gray-600">
                {bloodType.abo === "AB" && bloodType.rh === "Positive" && "Universal Recipient"}
                {bloodType.abo === "O" && bloodType.rh === "Negative" && "O- only"}
                {bloodType.abo === "A" && bloodType.rh === "Positive" && "A+, A-, O+, O-"}
                {bloodType.abo === "A" && bloodType.rh === "Negative" && "A-, O-"}
                {bloodType.abo === "B" && bloodType.rh === "Positive" && "B+, B-, O+, O-"}
                {bloodType.abo === "B" && bloodType.rh === "Negative" && "B-, O-"}
                {bloodType.abo === "AB" && bloodType.rh === "Negative" && "A-, B-, AB-, O-"}
                {bloodType.abo === "O" && bloodType.rh === "Positive" && "O+, O-"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodTypeResult;