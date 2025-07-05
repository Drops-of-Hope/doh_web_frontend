"use client";
import { FaPlus, FaMapMarkerAlt, FaHandHoldingHeart } from 'react-icons/fa';

interface BloodBank {
  id: string;
  name: string;
  location: string;
  contact: string;
  distance: string;
}

export default function RequestCampaign() {
  // Mock data for blood banks
  const nearbyBloodBanks: BloodBank[] = [
    { id: '1', name: 'City Central Blood Bank', location: 'Downtown, Colombo', contact: '+94 11 234 5678', distance: '2.3 km' },
    { id: '2', name: 'National Blood Bank', location: 'Borella, Colombo', contact: '+94 11 345 6789', distance: '4.1 km' }
  ];

  const handleRequestClick = () => {
    // Handle campaign request
    console.log('Campaign request clicked');
  };

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-semibold text-[#2D3748]">Request New Campaign</h2>
            <p className="text-sm text-gray-500 mt-1">Partner with nearby blood banks to organize your donation campaign</p>
          </div>
          <button
            onClick={handleRequestClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition-colors"
          >
            <FaPlus className="text-sm" />
            New Request
          </button>
        </div>
      </div>

      {/* Nearby Blood Banks */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-[#2D3748] mb-4">Nearby Blood Banks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nearbyBloodBanks.map((bank) => (
            <div key={bank.id} className="border border-gray-200 rounded-lg p-4 transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{bank.name}</h4>
                <span className="text-sm text-gray-500">{bank.distance}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <FaMapMarkerAlt className="text-red-500" />
                {bank.location}
              </div>
              <div className="text-sm text-gray-600">
                Contact: {bank.contact}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Completed Campaigns History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-1/2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#2D3748]">Completed Campaigns</h2>
        </div>
        
        <div className="">
          {[
            {
              id: 1,
              name: "World Blood Donor Day Drive",
              date: "2025-06-14",
              icon: <FaHandHoldingHeart className="text-white text-lg" />,
              bgColor: "bg-red-500",
            },
            {
              id: 2,
              name: "University Health Fair",
              date: "2025-06-20",
              icon: <FaHandHoldingHeart className="text-white text-lg" />,
              bgColor: "bg-red-500",
            },
            {
              id: 3,
              name: "Corporate Wellness Campaign",
              date: "2025-06-28",
              icon: <FaHandHoldingHeart className="text-white text-lg" />,
              bgColor: "bg-red-500",
            }
          ].slice(0, 3).map((campaign, index) => {

            return (
              <div
                key={campaign.id}
                className={`flex items-center justify-between py-3 px-3 rounded-lg transition hover:bg-gray-100 ${
                  index < 2 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-medium text-[#2D3748]">{campaign.name}</h3>
                    <p className="text-sm text-gray-500">{campaign.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => console.log('View All clicked')}
              className="bg-white text-red-500 border border-red-200 hover:bg-red-50 text-sm font-medium rounded-md px-4 py-2 transition-colors"
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}