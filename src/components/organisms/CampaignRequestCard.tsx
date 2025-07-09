"use client";
import React from 'react';
import { FaTrophy, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';

interface Campaign {
  id: string;
  organizerName?: string;
  campaignTitle: string;
  date: string;
  location: string;
  expectedDonors: number;
  bookedSlots?: number;
  contactNumber?: string;
  requestTime?: string;
  status: string;
  actualDonors?: number;
  unitsCollected?: number;
  urgency?: string;
}

interface CampaignRequestsCardProps {
  title: string;
  campaigns: Campaign[];
  showHistoryFormat?: boolean;
}

const CampaignRequestsCard: React.FC<CampaignRequestsCardProps> = ({ 
  title, 
  campaigns, 
  showHistoryFormat = false 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-50';
      case 'Pending': return 'text-yellow-600 bg-yellow-50';
      case 'Rejected': return 'text-red-600 bg-red-50';
      case 'Completed': return 'text-blue-600 bg-blue-50';
      case 'Scheduled': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'text-orange-600 bg-orange-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            {showHistoryFormat ? (
              <>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-blue-500" />
                    <span className="font-medium text-gray-800">{campaign.campaignTitle}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </div>
                </div>
                <div className="flex flex-col text-sm text-gray-600 space-y-2">
                  <div className='flex justify-between space-x-4'>
                    <div className='text-blue-600'>
                      <span className="font-medium">Date:</span> {campaign.date}
                    </div>
                    <div className="text-green-600">
                      <span className="font-medium">Units Collected:</span> {campaign.unitsCollected}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{campaign.location}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span><FaUsers className="inline mr-1" />Expected: {campaign.expectedDonors}</span>
                      <span><FaUsers className="inline mr-1 text-green-400" />Actual: {campaign.actualDonors}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Organizer:</span> {campaign.organizerName}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-800">{campaign.campaignTitle}</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </div>
                  </div>
                  <div className="flex flex-col text-sm text-gray-600 space-y-2">
                    <div className='flex justify-between space-x-4'>
                      <div className='text-blue-600'>
                        <span className="font-medium">Date:</span> {campaign.date}
                      </div>
                      {campaign.urgency && (
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(campaign.urgency)}`}>
                          {campaign.urgency}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>{campaign.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUsers className="text-gray-400" />
                      <span>Expected Donors: {campaign.expectedDonors}</span>
                    </div>
                    {campaign.bookedSlots && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">{campaign.bookedSlots}/{campaign.expectedDonors} slots filled</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.round((campaign.bookedSlots / campaign.expectedDonors) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {campaign.requestTime && (
                      <div className="mt-2 text-sm text-gray-500">
                        <span className="font-medium">Requested at:</span> {campaign.requestTime}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignRequestsCard;