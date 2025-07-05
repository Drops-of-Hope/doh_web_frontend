import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaHeart, FaEye } from 'react-icons/fa';
import Image from 'next/image';

interface Campaign {
  id: string;
  title: string;
  description: string;
  bannerImage: string;
  status: string;
  date: string;
  time: string;
  location: string;
  currentDonors: number;
  targetDonors: number;
  bloodBank: string;
}

// Mock data for ongoing campaigns
const mockOngoingCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Emergency Blood Drive - City Hospital',
    description: 'Urgent need for all blood types due to recent accidents. Join us in saving lives by donating blood.',
    bannerImage: '/assets/banner.webp',
    status: 'active',
    date: '2025-07-15',
    time: '9:00 AM - 5:00 PM',
    location: 'City Hospital Main Campus',
    currentDonors: 45,
    targetDonors: 100,
    bloodBank: 'City Hospital Blood Bank'
  }
];

interface OngoingCampaignProps {
  ongoingCampaigns?: Campaign[];
  onViewDetails?: (campaignId: string) => void;
}

const OngoingCampaign: React.FC<OngoingCampaignProps> = ({ 
  ongoingCampaigns = mockOngoingCampaigns, 
  onViewDetails 
}) => {
  const getProgressPercentage = (current: number, target: number): number => {
    return Math.min((current / target) * 100, 100);
  };

  const handleViewDetails = (campaignId: string) => {
    if (onViewDetails) {
      onViewDetails(campaignId);
    }
  };

  return (
    <div className="space-y-6">
      {ongoingCampaigns.map((campaign) => (
        <div 
          key={campaign.id} 
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="flex gap-6">
            <div className="w-1/4 relative h-48"> 
              <Image
                src={campaign.bannerImage}
                alt={campaign.title}
                fill
                className="object-cover rounded-l-lg"
              />
            </div>
            <div className="w-2/3 p-6 flex flex-col items-center justify-center">
                <div>
                <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-[#2D3748]">
                  {campaign.title}
                </h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                  {campaign.status.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{campaign.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCalendarAlt className="text-gray-500" />
                  {campaign.date} • {campaign.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaMapMarkerAlt className="text-gray-500" />
                  {campaign.location}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Donors Progress</span>
                  <span className="text-sm font-medium text-gray-900">
                    {campaign.currentDonors}/{campaign.targetDonors}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full"
                    style={{ 
                      width: `${getProgressPercentage(campaign.currentDonors, campaign.targetDonors)}%` 
                    }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaHeart className="text-red-500" />
                  {campaign.bloodBank}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleViewDetails(campaign.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
                  >
                    <FaEye />
                    View Details
                  </button>
                </div>
              </div>
                </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OngoingCampaign;