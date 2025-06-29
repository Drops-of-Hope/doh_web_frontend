import React from 'react';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa';

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

interface CampaignCardProps {
  campaign: Campaign;
  onBook?: (campaignId: number) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onBook }) => {
  const handleBookClick = () => {
    if (campaign.status !== 'full' && onBook) {
      onBook(campaign.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-gray-700 flex-1">{campaign.title}</h3>
        </div>

        <div className="flex items-center mb-3 text-gray-600">
          <FaCalendarAlt className="mr-2 text-blue-500" />
          <span className="text-sm">{campaign.date}</span>
        </div>
        
        <div className="flex items-center mb-3 text-gray-600">
          <FaClock className="mr-2 text-gray-500" />
          <span className="text-sm">{campaign.time}</span>
        </div>
        
        <div className="flex items-center mb-3 text-gray-600">
          <FaMapMarkerAlt className="mr-2 text-green-600" />
          <span className="text-sm">{campaign.location}</span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Available Slots</span>
            <span className="text-sm font-bold text-gray-700">
              {campaign.availableSlots}/{campaign.totalSlots}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#F8314C] h-2 rounded-full" 
              style={{ width: `${((campaign.totalSlots - campaign.availableSlots) / campaign.totalSlots) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-4">
          <span className="text-sm font-medium text-gray-600 block mb-2">Blood Types Needed Most:</span>
          <div className="flex flex-wrap gap-2">
            {campaign.bloodTypesNeeded.map((type: string) => (
              <span key={type} className="px-2 py-1 bg-red-50 text-[#F8314C] text-xs font-semibold rounded-full border border-red-200">
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button
            onClick={handleBookClick}
            disabled={campaign.status === 'full'}
            className={`px-3 py-1 rounded-3xl font-semibold text-sm transition-colors duration-200 ${
              campaign.status === 'full'
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-red-100 border border-red-500 text-red-500 font-medium hover:bg-red-200 cursor-pointer'
            }`}
          >
            {campaign.status === 'full' ? 'Fully Booked' : 'Book'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;