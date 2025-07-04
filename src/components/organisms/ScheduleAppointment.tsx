"use client";

import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

export default function ScheduleAppointment() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const locations = [
    { id: 1, name: 'City General Hospital', address: '123 Main St, Downtown' },
    { id: 2, name: 'Community Health Center', address: '456 Oak Ave, Midtown' },
    { id: 3, name: 'Red Cross Blood Drive', address: '789 Pine Rd, Uptown' },
    { id: 4, name: 'University Medical Center', address: '321 College Blvd, Campus' }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleSchedule = () => {
    if (selectedLocation && selectedDate && selectedTime) {
      // Handle appointment scheduling logic here
      console.log('Appointment scheduled:', { selectedLocation, selectedDate, selectedTime });
    }
  };

  return (
    <div id="section-1" className="relative h-[100vh] w-full bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="h-full flex flex-col items-center justify-center p-4 md:p-8">
        
        <div className='w-full max-w-4xl flex justify-between p-4'>
            <div className="text-center mb-8 md:mb-12">
                <div className="text-lg md:text-2xl text-red-500 font-medium mb-2">SCHEDULE YOUR</div>
          
                <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
                    <div className="text-4xl md:text-6xl font-semibold font-landing-heading bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent tracking-wider">
                    DONATION
                    </div>
  
                </div>
          
                <div className="text-gray-600 mt-4 text-sm md:text-base">Choose your preferred location, date, and time</div>
            </div>
            <div className='rounded-full bg-gradient-to-br from-white to-[#B3D0E9] shadow-2xl h-46 w-46'>
                
            </div>
        </div>

        <div className="w-full max-w-4xl">
          <div className="bg-gradient-to-br from-white to-[#dbe8f4] border border-gray-200 shadow-2xl shadow-gray-200/20 rounded-3xl p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-gray-50/20 rounded-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
              
              {/* Location Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-lg">
                    <FaMapMarkerAlt className="text-red-500 w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">Location</h3>
                </div>
                
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                >
                  <option value="">Select a location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name} - {location.address}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-lg">
                    <FaCalendarAlt className="text-blue-500 w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">Date</h3>
                </div>
                
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                />
              </div>

              {/* Time Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-lg">
                    <FaClock className="text-green-500 w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">Time</h3>
                </div>
                
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  min="09:00"
                  max="17:00"
                  className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleSchedule}
                className="bg-white/10 backdrop-blur-xl border border-white/20 text-gray-600 font-medium text-sm tracking-wider transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 shadow-md rounded-xl px-8 py-3 inline-flex items-center gap-2"
              >
                SCHEDULE APPOINTMENT
                <FaArrowRight size={12} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom decorative text */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <div>Your donation can save up to <span className="font-bold text-red-500">3 lives</span></div>
          <div className="mt-1">Thank you for being a hero!</div>
        </div>
      </div>
    </div>
  );
}