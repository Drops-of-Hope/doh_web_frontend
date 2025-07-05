"use client";

import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaEye } from 'react-icons/fa';
import { SearchBar } from '@/components';
import Image from 'next/image';

interface Campaign {
  id: string;
  title: string;
  description: string;
  organizer: string;
  bannerImage: string;
  date: string;
  time: string;
  location: string;
  targetDonors: number;
  currentDonors: number;
  status: 'ongoing' | 'upcoming' | 'completed';
}

// Mock data for other campaigns
const otherCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Emergency Blood Drive',
    description: 'Critical shortage of O-negative blood type. Join us in this urgent mission to save lives.',
    organizer: 'City Medical Center',
    bannerImage: '/assets/banner3.jpeg',
    date: 'July 12, 2025',
    time: '8:00 AM - 6:00 PM',
    location: 'Downtown Medical Center',
    targetDonors: 200,
    currentDonors: 145,
    status: 'ongoing'
  },
  {
    id: '4',
    title: 'Corporate Partnership Drive',
    description: 'Major corporations team up for a large-scale blood donation event.',
    organizer: 'Business Alliance',
    bannerImage: '/assets/banner3.jpeg',
    date: 'July 22, 2025',
    time: '7:00 AM - 5:00 PM',
    location: 'Business District Center',
    targetDonors: 300,
    currentDonors: 67,
    status: 'upcoming'
  },
  {
    id: '5',
    title: 'Veterans Memorial Blood Drive',
    description: 'Honor our veterans by participating in this special memorial blood drive event.',
    organizer: 'Veterans Association',
    bannerImage: '/assets/banner2.jpg',
    date: 'July 8, 2025',
    time: '9:00 AM - 4:00 PM',
    location: 'Veterans Memorial Hall',
    targetDonors: 100,
    currentDonors: 89,
    status: 'ongoing'
  }
];

const BrowseCampaigns: React.FC = () => {

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex gap-4">
          <div className="">
            <SearchBar title='Search Campaigns' />
          </div>
        </div>
      </div>

      {/* Other Campaigns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {otherCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative w-full h-48">
              <Image
                src={campaign.bannerImage}
                alt={campaign.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-[#2D3748]">{campaign.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  campaign.status === 'ongoing' 
                    ? 'bg-green-100 text-green-800' 
                    : campaign.status === 'upcoming'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-3">Organized by: {campaign.organizer}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCalendarAlt className="text-gray-500" />
                  {campaign.date} • {campaign.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaMapMarkerAlt className="text-gray-500" />
                  {campaign.location}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{campaign.currentDonors}</span>/{campaign.targetDonors} donors
                </div>
                <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm">
                                    <FaEye />
                                    View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCampaigns;