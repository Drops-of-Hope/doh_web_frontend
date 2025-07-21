"use client";

import React from "react";

// Extended TransitInfo type to include processing fee information
interface TransitInfo {
  from: string;
  to: string;
  estimatedDelivery: string;
  bloodGroup: string;
  units: number;
  isPrivateHospital?: boolean;
  processingFee?: number;
  processingFeePerUnit?: number;
}

const transitData: TransitInfo[] = [
  {
    from: "Central Blood Bank",
    to: "General Hospital",
    estimatedDelivery: "2 hrs 30 mins",
    bloodGroup: "O+",
    units: 4,
    isPrivateHospital: false,
  },
  {
    from: "Northern Blood Center",
    to: "City Medical Clinic",
    estimatedDelivery: "1 hr 15 mins",
    bloodGroup: "A-",
    units: 2,
    isPrivateHospital: true,
    processingFeePerUnit: 1000,
    processingFee: 2000, // 2 units × $75
  },
  {
    from: "Western Blood Bank",
    to: "Private Healthcare Center",
    estimatedDelivery: "3 hrs 45 mins",
    bloodGroup: "B+",
    units: 6,
    isPrivateHospital: true,
    processingFeePerUnit: 1000,
    processingFee: 4000, // 6 units × $75
  },
];

export default function TransitPage() {
  return (
    <div className="p-5">

      <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
        {transitData.map((item, index) => (
          <div
            key={index}
            className={`bg-white shadow-md rounded-2xl p-6 border ${
              item.isPrivateHospital ? 'border-blue-200 bg-white' : 'border-gray-200'
            } flex flex-col justify-between h-full`}
          >
            <div className="flex justify-between mb-4 w-full items-center">
              <div>
                <p className="text-gray-500 text-sm font-semibold">From:</p>
                <p className="text-gray-800 font-medium">{item.from}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-gray-500 text-sm font-semibold">To:</p>
                <p className="text-gray-800 font-medium">{item.to}</p>
                {item.isPrivateHospital && (
                  <span className="mt-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">
                    Private Hospital
                  </span>
                )}
              </div>
            </div>

            <div className="grid gap-4 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Estimated delivery time:</span>{" "}
                {item.estimatedDelivery}
              </p>
              <p>
                <span className="font-semibold">Blood group:</span>{" "}
                {item.bloodGroup}
              </p>
              <p>
                <span className="font-semibold">No. of units:</span>{" "}
                {item.units}
              </p>
              
              {item.isPrivateHospital && item.processingFee && (
                <div className="mt-4 pt-4 border-t border-orange-200">
                  <div className="bg-orange-50 rounded-lg p-3">
                    <h4 className="font-semibold text-orange-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      Processing Fee Breakdown
                    </h4>
                    <div className="text-sm text-orange-800 space-y-1">
                      <p>
                        <span className="font-medium">Fee per unit:</span> LKR {item.processingFeePerUnit}
                      </p>
                      <p>
                        <span className="font-medium">Units:</span> {item.units}
                      </p>
                      <p className="font-semibold border-t border-orange-200 pt-2 mt-2">
                        <span>Total processing fee:</span> LKR {item.processingFee}
                      </p>
                    </div>
                    <p className="text-xs text-orange-600 mt-2 italic">
                      Covers testing, processing, storage & logistics costs
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}