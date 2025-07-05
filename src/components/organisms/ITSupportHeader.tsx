"use client";

import { Button } from '@/components';

interface ITSupportHeaderProps {
  name?: string;
  email?: string;
  employeeId?: string;
  department?: string;
  role?: string;
  phoneNumber?: string;
  accessLevel?: string;
  lastLogin?: string;
  onEdit?: () => void;
  onAddPhoneNumber?: () => void;
}

export default function ITSupportHeader({
  name = "Kamal Wijesinghe",
  email = "kamal.admin@bloodbank.lk",
  employeeId = "EMP-IT-2024-001",
  department = "Information Technology",
  role = "System Administrator",
  phoneNumber = "011-789-4561",
  accessLevel = "Super Admin",
  lastLogin = "2025-07-05 08:30 AM",
  onEdit,
  onAddPhoneNumber
}: ITSupportHeaderProps) {
  // Generate initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Profile Content */}
      <div className="p-8">
        {/* Header with Profile Picture, Name and Edit Button */}
        <div className="flex items-start gap-6 mb-8">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">
                {getInitials(name)}
              </span>
            </div>
          </div>
          
          {/* Name and Details */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-semibold text-[#2D3748] mb-2">{name}</h1>
            <p className="text-gray-600 text-lg mb-3">{email}</p>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                accessLevel === 'Super Admin' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {accessLevel}
              </span>
              <span className="text-sm text-gray-500">Employee ID: {employeeId}</span>
            </div>
          </div>
          
          {/* Edit Button */}
          <div className="flex-shrink-0">
            <Button
              title="Edit"
              containerStyles="bg-[#FB7373] hover:bg-red-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              handleClick={onEdit}
            />
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admin Details Section */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-medium text-[#2D3748] mb-6">Admin Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  value={department}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={role}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-600 mb-3"
                />
                <button
                  onClick={onAddPhoneNumber}
                  className="text-[#FB7373] text-sm font-medium hover:underline"
                >
                  + Add Phone Number
                </button>
              </div>

              {/* Last Login */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Login
                </label>
                <input
                  type="text"
                  value={lastLogin}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* System Access Section */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-medium text-[#2D3748] mb-6">System Access</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Access Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Level
                </label>
                <input
                  type="text"
                  value={accessLevel}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>

              {/* System Permissions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Permissions
                </label>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    User Management
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    System Config
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    Database Access
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    Reports & Analytics
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}