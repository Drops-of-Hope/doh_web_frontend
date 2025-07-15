"use client";
import React from 'react';

interface CompatibilityInfoProps {
  compatibleWith: string[];
  canReceiveFrom: string[];
}

export default function CompatibilityInfo({ compatibleWith, canReceiveFrom }: CompatibilityInfoProps): React.JSX.Element {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-1/3">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Compatibility Information</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">Can Donate To</p>
          <div className="flex flex-wrap gap-2">
            {compatibleWith.map((type, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">Can Receive From</p>
          <div className="flex flex-wrap gap-2">
            {canReceiveFrom.map((type, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
