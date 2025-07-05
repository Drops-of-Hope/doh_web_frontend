"use client";
import { useState } from 'react';
import { FaPlus, FaCalendarAlt, FaHeart, FaEye } from 'react-icons/fa';
import { RequestCampaign, OngoingCampaign, UpcomingCampaignWithBanner, BrowseCampaigns } from '@/components';

type TabKey = 'request' | 'ongoing' | 'upcoming' | 'browse';

const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: 'request', label: 'Request Campaign', icon: FaPlus },
  { key: 'ongoing', label: 'Ongoing Campaigns', icon: FaHeart },
  { key: 'upcoming', label: 'My Upcoming', icon: FaCalendarAlt },
  { key: 'browse', label: 'Browse Others', icon: FaEye },
];

export default function CampaignPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('request');

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm border border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
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

      {activeTab === 'request' && <RequestCampaign />}
      {activeTab === 'ongoing' && <OngoingCampaign />}
      {activeTab === 'upcoming' && <UpcomingCampaignWithBanner />}
      {activeTab === 'browse' && <BrowseCampaigns />}
    </div>
  );
}
