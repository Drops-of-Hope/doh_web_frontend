'use client';

import React from 'react';
import Image from 'next/image';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaEye, FaEdit } from 'react-icons/fa';

interface Campaign {
  id: string;
  title: string;
  description: string;
  bannerImage: string;
  date: string;
  time: string;
  location: string;
  targetDonors: number;
  currentDonors: number;
}

// Mock data
const upcomingCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Blood Drive for Children Hospital',
    description: 'Help us save lives by donating blood for children in need. Your donation can make a real difference in a child\'s life.',
    bannerImage: '/assets/banner2.jpg',
    date: 'July 15, 2025',
    time: '9:00 AM - 4:00 PM',
    location: 'City Community Center',
    targetDonors: 150,
    currentDonors: 47
  },
  {
    id: '3',
    title: 'Corporate Blood Donation Day',
    description: 'Join leading companies in our community for a special corporate blood donation event. Together we can save lives.',
    bannerImage: '/assets/banner3.jpeg',
    date: 'July 25, 2025',
    time: '8:00 AM - 3:00 PM',
    location: 'Business District Plaza',
    targetDonors: 100,
    currentDonors: 28
  }
];

const UpcomingCampaignWithBanner: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {upcomingCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative w-full h-48">
              <Image
                src={campaign.bannerImage}
                alt={campaign.title}
                fill
                style={{ objectFit: 'cover' }}
                priority={true} // Optional: helps with LCP for important images
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-[#2D3748]">{campaign.title}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  UPCOMING
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCalendarAlt className="text-gray-500" />
                  {campaign.date} • {campaign.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaMapMarkerAlt className="text-gray-500" />
                  {campaign.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaUsers className="text-gray-500" />
                  Target: {campaign.targetDonors} donors
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{campaign.currentDonors}</span> pre-registered
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm">
                    <FaEye />
                    View
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm">
                    <FaEdit />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingCampaignWithBanner;
