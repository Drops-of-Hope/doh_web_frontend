"use client";

import { Button } from '@/components';

interface CampaignOrganizerHeaderProps {
  name?: string;
  email?: string;
  address?: string;
  region?: string;
  phoneNumber?: string;
  donorName?: string;
  onEdit?: () => void;
  onAddPhoneNumber?: () => void;
}

export default function CampaignOrganizerHeader({
  name = "Hope Foundation",
  email = "campaigns@hopefoundation.lk",
  address = "No. 25, Galle Road, Colombo 03",
  region = "Colombo",
  phoneNumber = "011-234-5678",
  donorName = "Nadhiya Perera",
  onEdit,
  onAddPhoneNumber
}: CampaignOrganizerHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Cover Image Section */}
      <div className="h-40 bg-gradient-to-r from-blue-200 to-blue-300 flex items-center justify-center">
        <span className="text-gray-600 text-lg">cover image goes here</span>
      </div>

      {/* Profile Content */}
      <div className="p-6">
        {/* Header with Name and Edit Button */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl font-semibold text-[#2D3748] mb-1">{name}</h1>
            <p className="text-gray-500">{email}</p>
          </div>
          <Button
            title="Edit"
            containerStyles="bg-[#FB7373] hover:bg-red-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            handleClick={onEdit}
          />
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Organization Details Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-[#2D3748] mb-4">Organization Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region
                </label>
                <input
                  type="text"
                  value={region}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 mb-2"
                />
                <button
                  onClick={onAddPhoneNumber}
                  className="text-[#FB7373] text-sm font-medium hover:underline"
                >
                  + Add Phone Number
                </button>
              </div>
            </div>
          </div>

          {/* Connected Donor Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-[#2D3748] mb-4">Connected Donor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Donor Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donor Name
                </label>
                <input
                  type="text"
                  value={donorName}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}