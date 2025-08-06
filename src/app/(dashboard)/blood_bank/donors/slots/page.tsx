"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useGetSlotsByMedicalEstablishmentQuery } from '@/store/api/slotsApi'; 
import { useSession } from "next-auth/react";

interface Slot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  medicalEstablishmentId: string;
}

interface SlotsResponse {
  slots?: Slot[];
}

const calculateDuration = (start: string, end: string): number => {
  const startDate = new Date(`1970-01-01T${start}`);
  const endDate = new Date(`1970-01-01T${end}`);
  return Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60));
};

export default function DonationSlotsPage() {
  const { data: session } = useSession();
  const medicalEstablishmentId = session?.decodedIdToken?.sub;

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [restTime, setRestTime] = useState("");

  const { data } = useGetSlotsByMedicalEstablishmentQuery(medicalEstablishmentId || "", {
    skip: !medicalEstablishmentId,
  });

  const slots = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : (data as SlotsResponse).slots || [];
  }, [data]);
  const hasSlots = slots.length > 0;

  useEffect(() => {
    if (slots && slots.length > 0) {
      const sortedSlots = [...slots].sort((a, b) =>
        a.startTime.localeCompare(b.startTime)
      );

      const firstSlot = sortedSlots[0];
      const lastSlot = sortedSlots[sortedSlots.length - 1];

      setStartTime(firstSlot.startTime);
      setEndTime(lastSlot.endTime);

      const firstSlotDuration = calculateDuration(firstSlot.startTime, firstSlot.endTime);
      setDuration(firstSlotDuration.toString());

      if (sortedSlots.length >= 2) {
        const secondSlot = sortedSlots[1];
        const restMinutes = calculateDuration(firstSlot.endTime, secondSlot.startTime);
        setRestTime(restMinutes.toString());
      } else {
        setRestTime("0");
      }
    }
  }, [slots]);

  return (
    <div className="min-h-[100vh] p-4 pt-2 bg-[#f8f8f8]">
      {/* Input Section */}
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
              disabled={hasSlots}
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
              disabled={hasSlots}
            />
          </div>
        </div>

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
              disabled={hasSlots}
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
              disabled={hasSlots}
            />
          </div>
        </div>
        <button
          className={`px-4 py-2 rounded-lg mt-5 transition ${
            hasSlots ? 'bg-gray-300 cursor-not-allowed text-gray-600' : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          onClick={() => {}}
          disabled={hasSlots}
        >
          Generate Slots
        </button>
      </div>

      {/* Display Slots */}
      <div className="grid gap-4">
        {slots.map((slot: Slot, index: number) => (
          <div
            key={slot.id}
            className="bg-white shadow-sm rounded-xl p-4 flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Slot #{index + 1}
              </h3>
              <p className="text-sm text-gray-700">
                <span className="font-medium">From:</span> {slot.startTime}{" "}
                <span className="ml-4 font-medium">To:</span> {slot.endTime}
              </p>
            </div>
            <button
              onClick={() => {}}
              className="text-red-600 hover:text-red-800 text-lg font-bold"
              title="Cancel Slot"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}