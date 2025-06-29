"use client";
import { Button, StatCard, UpcomingCampaigns, DonationBanner } from '@/components';
import { FaCampground, FaUsers, FaCalendarAlt, FaHeart, FaHandHoldingHeart } from 'react-icons/fa';

export default function HomePage() {

  // Blood group data with corresponding heights
  const bloodGroupData = [
    { group: 'A+', height: 120 },
    { group: 'A-', height: 180 },
    { group: 'B+', height: 220 },
    { group: 'B-', height: 160 },
    { group: 'AB+', height: 280 },
    { group: 'AB-', height: 200 },
    { group: 'O+', height: 240 },
    { group: 'O-', height: 180 },
  ];

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="text-[#2D3748] flex justify-between">
        <div>
          <h1 className="font-semibold">Hello, Nadhiya</h1>
          <p className="text-s text-gray-500">Here's your summary for the day</p>
        </div>
        <div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-pink-50 px-3 py-2 rounded-full border border-red-200 shadow-sm">
            <FaHeart className="text-red-500 text-sm" />
            <span className="text-sm font-medium text-red-700">Silver Organizer</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-4">
        <StatCard 
          title="Total Campaigns Organized"
          count="10"
          icon={<FaCampground />}
          iconBgColor="#FB7373"
        />
        <StatCard 
          title="Total Donors Registered"
          count="1000"
          icon={<FaUsers />}
          iconBgColor="#3B82F6"
        />
        <StatCard 
          title="Upcoming Campaigns"
          count="2"
          icon={<FaCalendarAlt />}
          iconBgColor="#F59E0B"
        />
      </div>
      <div className='flex'>
        <div className='mt-8 w-1/2 mr-4'>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-[#2D3748]">Ongoing Campaign</h2>
              <button className="px-3 py-1.5 bg-[#FB7373] text-white text-sm font-medium rounded-md hover:bg-red-400 transition-colors">
                View Details
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm text-gray-500">Total Registered Donors</span>
                <span className="text-sm text-gray-400">100</span>
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-[#2D3748]">68 Donations</h3>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">+24% than last</span>
              </div>
            </div>

            <div className="">
              <div className="flex items-end justify-between gap-1 h-32">
                {bloodGroupData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-gradient-to-t from-red-400 to-red-500 rounded-sm w-full"
                      style={{ height: `${(data.height / 280) * 120}px`, width: '30px' }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between gap-1">
                {bloodGroupData.map((data, index) => (
                  <div key={index} className="flex-1 text-center">
                    <span className="text-xs text-gray-600 font-medium">{data.group}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 w-1/2">
                <UpcomingCampaigns maxRows={2} />
        </div>
      </div>
      <div className='flex mt-8 w-1/2'>
                <DonationBanner />
      </div>
    </div>
  );
}