"use client";

import React, { useState } from "react";

interface Slot {
  id: number;
  from: string;
  to: string;
  donorName: string;
  bloodType: string;
}

export default function DonationSlotsPage() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [restTime, setRestTime] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);

  const generateTokens = () => {
    // Dummy token generation for demonstration
    const dummySlots: Slot[] = [
      {
        id: 1,
        from: "10:00 AM",
        to: "10:20 AM",
        donorName: "John Doe",
        bloodType: "A+",
      },
      {
        id: 2,
        from: "10:30 AM",
        to: "10:50 AM",
        donorName: "Jane Smith",
        bloodType: "B-",
      },
    ];
    setSlots(dummySlots);
  };

  const cancelToken = (id: number) => {
    setSlots((prev) => prev.filter((slot) => slot.id !== id));
  };

  return (
    <div className="p-6">

      {/* Input Section in a Box */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        
    
        {/* Row 1: Start Time and End Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border border-gray-500 p-2 rounded-lg w-3/4 text-gray-700"
              id="startTime"
            />
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border border-gray-500 p-2 rounded-lg w-3/4 text-gray-700"
              id="endTime"
            />
          </div>
        </div>

        {/* Row 2: Duration and Rest Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duration per donation
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="In minutes"
              className="border border-gray-500 p-2 rounded-lg w-3/4 text-gray-700"
              id="duration"
            />
          </div>
          
          <div>
            <label htmlFor="restTime" className="block text-sm font-medium text-gray-700 mb-1">
              Rest time between appointments
            </label>
            <input
              type="number"
              value={restTime}
              onChange={(e) => setRestTime(e.target.value)}
              placeholder="In minutes"
              className="border border-gray-500 p-2 rounded-lg w-3/4 text-gray-700"
              id="restTime"
            />
          </div>
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mt-5"
          onClick={generateTokens}
        >
          Generate Tokens
        </button>
      </div>

      {/* Tokens Section */}
      <div className="grid gap-4">
        {slots.map((slot, index) => (
          <div
            key={slot.id}
            className="bg-white shadow-md rounded-xl p-4 flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Token #{index + 1}
              </h3>
              <p className="text-sm text-gray-700">
                <span className="font-medium">From:</span> {slot.from}{" "}
                <span className="ml-4 font-medium">To:</span> {slot.to}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Donor Name:</span> {slot.donorName}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Blood Type:</span> {slot.bloodType}
              </p>
            </div>
            <button
              onClick={() => cancelToken(slot.id)}
              className="text-red-600 hover:text-red-800 text-lg font-bold"
              title="Cancel Token"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}