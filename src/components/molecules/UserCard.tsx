import React from "react";
import {
  FaHospital,
  FaTint,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Avatar } from "@/constants/User";

// Types
interface Donor {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  bloodType: string;
  status: string;
}

interface BloodBank {
  id: string;
  name: string;
  location: string;
  contact: string;
}

interface Hospital {
  id: string;
  name: string;
  location: string;
  type: string;
}

// Donor Card Component
export const DonorCard = ({ donor }: { donor: Donor }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 transition-shadow border border-gray-100">
    <div className="flex items-center space-x-4">
      <Avatar size={50} />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">
          {donor.name}
        </h3>
        <div className="flex items-center mt-1 text-gray-500 text-sm">
          <span className="truncate">{donor.email}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              donor.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {donor.status}
          </span>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
            {donor.bloodType}
          </span>
        </div>
      </div>
    </div>
  </div>
);

// Blood Bank Card Component
export const BloodBankCard = ({ bloodBank }: { bloodBank: BloodBank }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100">
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
        <FaTint className="text-red-600" size={20} />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 mb-1">
          {bloodBank.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
        </p>
        <div className="flex items-center mt-1 text-gray-500 text-sm">
          <FaMapMarkerAlt
            className="mr-1 text-blue-500"
            size={12}
          />
          <span>{bloodBank.location}</span>
        </div>
        <div className="flex items-center mt-1 text-gray-500 text-sm">
          <FaPhone className="mr-1 text-green-500" size={12} />
          <span>{bloodBank.contact}</span>
        </div>
      </div>
    </div>
  </div>
);

// Hospital Card Component
export const HospitalCard = ({ hospital }: { hospital: Hospital }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100">
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <FaHospital className="text-blue-600" size={20} />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 mb-1">
          {hospital.name}
        </h3>
        <div className="flex items-center mt-1 text-gray-500 text-sm">
          <FaMapMarkerAlt
            className="mr-1 text-blue-500"
            size={12}
          />
          <span>{hospital.location}</span>
        </div>
        <span className="inline-block mt-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
          {hospital.type}
        </span>
      </div>
    </div>
  </div>
);