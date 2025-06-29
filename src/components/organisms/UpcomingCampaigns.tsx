"use client";
import { Button } from '@/components';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { ReactNode } from 'react';

interface Campaign {
  id: number;
  name: string;
  date: string;
  bookedSlots: number;
  capacity: number;
  icon: ReactNode;
  bgColor: string;
}

interface UpcomingCampaignsProps {
  maxRows?: number | null;
  showCreateButton?: boolean;
}

export default function UpcomingCampaigns({ 
  maxRows = null, 
  showCreateButton = true 
}: UpcomingCampaignsProps) {
  const upcomingCampaigns = [
    {
      id: 1,
      name: "Emergency Relief Fund",
      date: "2025-07-05",
      bookedSlots: 65,
      capacity: 100,
      icon: <FaHandHoldingHeart className="text-white text-lg" />,
      bgColor: "bg-red-500",
    },
    {
      id: 2,
      name: "Medical Equipment Drive",
      date: "2025-07-05",
      bookedSlots: 78,
      capacity: 120,
      icon: <FaHandHoldingHeart className="text-white text-lg" />,
      bgColor: "bg-red-500",
    },
    {
      id: 3,
      name: "Community Health Screening",
      date: "2025-07-10",
      bookedSlots: 45,
      capacity: 80,
      icon: <FaHandHoldingHeart className="text-white text-lg" />,
      bgColor: "bg-blue-500",
    },
    {
      id: 4,
      name: "Blood Drive for Children",
      date: "2025-07-15",
      bookedSlots: 32,
      capacity: 60,
      icon: <FaHandHoldingHeart className="text-white text-lg" />,
      bgColor: "bg-green-500",
    },
  ];

  // Limit campaigns based on maxRows prop
  const displayedCampaigns = maxRows ? upcomingCampaigns.slice(0, maxRows) : upcomingCampaigns;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#2D3748]">Upcoming Campaigns</h2>
      </div>
      
      <div className="">
        {displayedCampaigns.map((campaign, index) => {
          const progress = Math.round((campaign.bookedSlots / campaign.capacity) * 100);

          return (
            <div
              key={campaign.id}
              className={`flex items-center justify-between py-3 px-3 rounded-lg transition hover:bg-gray-100 ${
                index < displayedCampaigns.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${campaign.bgColor} flex items-center justify-center`}>
                  {campaign.icon}
                </div>
                <div>
                  <h3 className="font-medium text-[#2D3748]">{campaign.name}</h3>
                  <p className="text-sm text-gray-500">{campaign.date}</p>
                  <p className="text-xs text-gray-400">{campaign.bookedSlots}/{campaign.capacity} slots filled</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="flex gap-2 mt-4">
          <Button
            title="View All"
            containerStyles="bg-white text-red-500 border border-red-200 hover:bg-red-50 text-sm font-medium rounded-md"
            handleClick={() => console.log('View All clicked')}
          />
          {showCreateButton && (
            <Button
              title="Create Campaign"
              containerStyles="bg-blue-400 hover:bg-blue-500 text-white text-sm font-medium rounded-md"
              handleClick={() => console.log('Create Campaign clicked')}
            />
          )}
        </div>
      </div>
    </div>
  );
}