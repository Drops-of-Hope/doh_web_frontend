"use client";

import React from "react";
import { TransitInfo } from '../../../../../../types/blood-donation'; 


const transitData: TransitInfo[] = [
  {
    from: "Central Blood Bank",
    to: "General Hospital",
    estimatedDelivery: "2 hrs 30 mins",
    bloodGroup: "O+",
    units: 4,
  },
  {
    from: "Northern Blood Center",
    to: "City Medical Clinic",
    estimatedDelivery: "1 hr 15 mins",
    bloodGroup: "A-",
    units: 2,
  },
];

export default function TransitPage() {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6 text-black">Blood Sample Transit</h1>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
        {transitData.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 flex flex-col justify-between h-full"
          >
            <div className="flex justify-between mb-4 w-full items-center">
              <div>
                <p className="text-gray-500 text-sm font-semibold">From:</p>
                <p className="text-gray-800 font-medium">{item.from}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold">To:</p>
                <p className="text-gray-800 font-medium">{item.to}</p>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
