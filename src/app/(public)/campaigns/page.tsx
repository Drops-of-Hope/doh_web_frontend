"use client";

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { CampaignCard } from '@/components';

interface Campaign {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  availableSlots: number;
  totalSlots: number;
  bloodTypesNeeded: string[];
  priority: 'urgent' | 'high' | 'normal';
  distance: string;
  status: 'active' | 'full' | 'new';
}

export default function Campaigns() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [bloodTypeFilter, setBloodTypeFilter] = useState<string>('all');

  const campaigns: Campaign[] = [
    {
      id: 1,
      title: "Emergency Blood Drive - General Hospital",
      date: "2025-06-30",
      time: "09:00 AM - 05:00 PM",
      location: "Colombo General Hospital, Ward Place",
      organizer: "Sri Lanka Red Cross",
      availableSlots: 25,
      totalSlots: 50,
      bloodTypesNeeded: ["O-", "A+", "B-"],
      priority: "urgent",
      distance: "2.5 km",
      status: "active"
    },
    {
      id: 2,
      title: "Community Blood Collection Drive",
      date: "2025-07-02",
      time: "08:00 AM - 04:00 PM",
      location: "Narahenpita Community Center",
      organizer: "National Blood Transfusion Service",
      availableSlots: 0,
      totalSlots: 40,
      bloodTypesNeeded: ["AB+", "O+"],
      priority: "normal",
      distance: "1.2 km",
      status: "full"
    },
    {
      id: 3,
      title: "University Blood Donation Campaign",
      date: "2025-07-05",
      time: "10:00 AM - 06:00 PM",
      location: "University of Colombo, Main Hall",
      organizer: "University Medical Center",
      availableSlots: 45,
      totalSlots: 60,
      bloodTypesNeeded: ["A-", "B+", "O-"],
      priority: "high",
      distance: "3.8 km",
      status: "new"
    },
    {
      id: 4,
      title: "Monthly Corporate Blood Drive",
      date: "2025-07-08",
      time: "11:00 AM - 03:00 PM",
      location: "World Trade Center, Colombo 01",
      organizer: "Corporate Health Initiative",
      availableSlots: 18,
      totalSlots: 30,
      bloodTypesNeeded: ["A+", "AB-"],
      priority: "normal",
      distance: "4.2 km",
      status: "active"
    }
  ];

  const bloodTypes: string[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleBookCampaign = (campaignId: number) => {
    console.log(`Booking campaign with ID: ${campaignId}`);
  };

  return (
    <div className="bg-gradient-blue-primary-120 min-h-screen">
      <div className="mt-[5%] p-12 min-h-[40vh] flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Upcoming Donation <span className='text-[#F8314C]'>Campaigns</span>
          </h1>
          <p className="text-md text-gray-500 max-w-2xl mx-auto">
            Your contribution saves lives. Find a campaign near you.
          </p>
        </div>
      </div>

      <div className="p-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 -mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location or center"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
              </select>

              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
              >
                <option value="all">All Campaigns</option>
                <option value="Colombo">Available Slots</option>
              </select>

              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={bloodTypeFilter}
                onChange={(e) => setBloodTypeFilter(e.target.value)}
              >
                <option value="all">All Blood Types</option>
                {bloodTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign: Campaign) => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                onBook={handleBookCampaign}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}