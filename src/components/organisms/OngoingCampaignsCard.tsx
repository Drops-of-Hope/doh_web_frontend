"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaUsers, FaMapMarkerAlt, FaHeart, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';

interface OngoingCampaign {
  id: string;
  title: string;
  organizer: string;
  location: string;
  startDate: string;
  endDate: string;
  targetDonors: number;
  registeredDonors: number;
  completedDonations: number;
  currentStatus: string;
}

interface OngoingCampaignsCardProps {
  title: string;
  campaigns: OngoingCampaign[];
  enableNavigation?: boolean;
}

const OngoingCampaignsCard: React.FC<OngoingCampaignsCardProps> = ({ 
  title, 
  campaigns, 
  enableNavigation = false
}) => {
  const router = useRouter();

  const handleCampaignClick = (campaignId: string) => {
    if (enableNavigation) {
      router.push(`/blood_bank/campaigns/Ongoing?id=${campaignId}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-50';
      case 'Paused': return 'text-yellow-600 bg-yellow-50';
      case 'Completed': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const calculateProgress = (completed: number, target: number) => {
    return Math.round((completed / target) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4 w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          {enableNavigation && (
            <p className="text-sm text-blue-600 mt-1">Click on campaigns to view details and registered donors</p>
          )}
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div 
            key={campaign.id} 
            className={`border border-gray-200 rounded-lg p-4 transition-colors ${
              enableNavigation
                ? 'hover:bg-blue-50 hover:border-blue-300 cursor-pointer hover:shadow-md' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => handleCampaignClick(campaign.id)}
            title={enableNavigation ? 'Click to view details and registered donors' : ''}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-800">{campaign.title}</span>
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.currentStatus)}`}>
                      {campaign.currentStatus}
                    </div>
                    {enableNavigation && (
                      <FaChevronRight className="text-blue-500 text-sm" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col text-sm text-gray-600 space-y-2">
                  <div className='flex justify-between space-x-4'>
                    <div className='text-blue-600'>
                      <span className="font-medium">Organizer:</span> {campaign.organizer}
                    </div>
                    <div className='text-green-600'>
                      <span className="font-medium">Progress:</span> {calculateProgress(campaign.completedDonations, campaign.targetDonors)}%
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{campaign.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-gray-400" />
                    <span>{campaign.startDate} - {campaign.endDate}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <FaUsers className="text-blue-500" />
                      <span className="text-sm">Registered: {campaign.registeredDonors}/{campaign.targetDonors}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaHeart className="text-red-500" />
                      <span className="text-sm">Completed: {campaign.completedDonations}</span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress(campaign.completedDonations, campaign.targetDonors)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingCampaignsCard;
