"use client";
import { useState } from 'react';
import { FaPlus, FaCalendarAlt, FaHeart, FaEye } from 'react-icons/fa';
import { RequestCampaign, OngoingCampaign, UpcomingCampaignWithBanner, BrowseCampaigns } from '@/components';

export default function CampaignPage() {
  const [activeTab, setActiveTab] = useState<'request' | 'ongoing' | 'upcoming' | 'browse'>('request');

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">

<div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm border border-gray-100">
        {[
          { key: 'request', label: 'Request Campaign', icon: FaPlus },
          { key: 'ongoing', label: 'Ongoing Campaigns', icon: FaHeart },
          { key: 'upcoming', label: 'My Upcoming', icon: FaCalendarAlt },
          { key: 'browse', label: 'Browse Others', icon: FaEye }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === tab.key
                ? 'text-gray-800'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="text-sm" />
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-red-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'request' && (
        <div className=''>
            <RequestCampaign />
        </div>
      )}

      {/* Ongoing Campaigns Section */}
      {activeTab === 'ongoing' && (
        <div> 
            <OngoingCampaign />
        </div>
      )}

      {/* Upcoming Campaigns Section */}
      {activeTab === 'upcoming' && (
        <div className=''> 
            <UpcomingCampaignWithBanner />
        </div>
      )}

      {/* Browse Other Campaigns Section */}
      {activeTab === 'browse' && (
        <div className=''>
            <BrowseCampaigns />
        </div>
      )}
    </div>
  );
}