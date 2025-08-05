"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useGetSlotsByMedicalEstablishmentQuery } from '@/store/api/slotsApi'; 
import { useSession } from "next-auth/react";

interface Slot {
  id: string;
  startTime: string;
  endTime: string;
  tokenNumber: number;
  isAvailable: boolean;
  medicalEstablishmentId: string;
}

// Define the API response type
interface SlotsResponse {
  slots?: Slot[];
}

// Helper function to calculate duration between two times
const calculateDuration = (start: string, end: string): number => {
  const startDate = new Date(`1970-01-01T${start}`);
  const endDate = new Date(`1970-01-01T${end}`);
  return Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60));
};

export default function DonationSlotsPage() {
  const { data: session, status } = useSession();
  console.log(session?.decodedIdToken?.sub);
  const medicalEstablishmentId = session?.decodedIdToken?.sub;
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [restTime, setRestTime] = useState("");

  const { data } = useGetSlotsByMedicalEstablishmentQuery(medicalEstablishmentId || "", {
    skip: !medicalEstablishmentId,
  });

  // Memoize slots calculation to prevent dependency changes
  const slots = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : (data as SlotsResponse).slots || [];
  }, [data]);

  // Effect to populate form fields when slots exist
  useEffect(() => {
    if (slots && slots.length > 0) {
      // Sort slots by token number to get proper order
      const sortedSlots = [...slots].sort((a, b) => a.tokenNumber - b.tokenNumber);
      
      // Start time: first token's start time
      const firstToken = sortedSlots[0];
      setStartTime(firstToken.startTime);
      
      // End time: last token's end time
      const lastToken = sortedSlots[sortedSlots.length - 1];
      setEndTime(lastToken.endTime);
      
      // Duration: duration of the first token
      const firstTokenDuration = calculateDuration(firstToken.startTime, firstToken.endTime);
      setDuration(firstTokenDuration.toString());
      
      // Rest time: difference between start time of 2nd token and end time of 1st token
      if (sortedSlots.length >= 2) {
        const secondToken = sortedSlots[1];
        const restMinutes = calculateDuration(firstToken.endTime, secondToken.startTime);
        setRestTime(restMinutes.toString());
      } else {
        setRestTime("0");
      }
    }
  }, [slots]);

  return (
    <div className="min-h-[100vh] p-4 pt-2 bg-[#f8f8f8]">

      {/* Input Section in a Box */}
      <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
    
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
          onClick={() => {}}
        >
          Generate Tokens
        </button>
      </div>

      {/* Tokens Section */}
      <div className="grid gap-4">
        {slots.map((slot: Slot) => (
          <div
            key={slot.id}
            className="bg-white shadow-sm rounded-xl p-4 flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Token #{slot.tokenNumber}
              </h3>
              <p className="text-sm text-gray-700">
                <span className="font-medium">From:</span> {slot.startTime}{" "}
                <span className="ml-4 font-medium">To:</span> {slot.endTime}
              </p>
            </div>
            <button
              onClick={() => {}}
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