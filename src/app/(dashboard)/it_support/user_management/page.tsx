"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FaUser,
  FaHospital,
  FaTint,
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPlus,
} from "react-icons/fa";
import { Button, StatCard } from "@/components";

const dummyDonors = [
  {
    id: "1",
    name: "John Doe",
    avatar: "/images/avatar-placeholder.png",
    email: "john.doe@example.com",
    phoneNumber: "+1 123-456-7890",
    bloodType: "O+",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "/images/avatar-placeholder.png",
    email: "jane.smith@example.com",
    phoneNumber: "+1 987-654-3210",
    bloodType: "A-",
    status: "Active",
  },
  {
    id: "3",
    name: "Michael Johnson",
    avatar: "/images/avatar-placeholder.png",
    email: "michael.j@example.com",
    phoneNumber: "+1 555-123-4567",
    bloodType: "B+",
    status: "Inactive",
  },
];

const dummyBloodBanks = [
  {
    id: "1",
    name: "Central Blood Bank",
    location: "Downtown Medical District",
    contact: "+1 555-123-4567",
  },
  {
    id: "2",
    name: "LifeSource Blood Services",
    location: "North Side",
    contact: "+1 555-789-0123",
  },
  {
    id: "3",
    name: "Regional Blood Center",
    location: "West Medical Complex",
    contact: "+1 555-456-7890",
  },
];

const dummyHospitals = [
  {
    id: "1",
    name: "General Hospital",
    location: "City Center",
    type: "General Care",
  },
  {
    id: "2",
    name: "St. Mary's Medical Center",
    location: "East District",
    type: "Specialized Care",
  },
  {
    id: "3",
    name: "Children's Hospital",
    location: "South Campus",
    type: "Pediatric Care",
  },
];

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState("donors");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddUser = () => {
    console.log("Add User clicked");
  };

  const filteredDonors = dummyDonors.filter(
    (donor) =>
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBloodBanks = dummyBloodBanks.filter(
    (bloodBank) =>
      bloodBank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bloodBank.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHospitals = dummyHospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFilteredData = () => {
    switch (activeTab) {
      case "donors":
        return filteredDonors;
      case "bloodbanks":
        return filteredBloodBanks;
      case "hospitals":
        return filteredHospitals;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      {/* Header Section */}
      <div className="text-[#2D3748] flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-sm text-gray-500">
            Manage all users across the platform
          </p>
        </div>
        <div>
          <Button
            title="Add User"
            containerStyles="bg-[#FB7373] hover:bg-red-600 text-white font-medium rounded-3xl transition-colors duration-200 flex items-center gap-2"
            handleClick={handleAddUser}
            leftIcon={<FaPlus />}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex justify-between gap-4 mb-6">
        <StatCard
          title="Total Donors"
          count={dummyDonors.length.toString()}
          icon={<FaUser />}
          iconBgColor="#FB7373"
        />
        <StatCard
          title="Blood Banks"
          count={dummyBloodBanks.length.toString()}
          icon={<FaTint />}
          iconBgColor="#FB7373"
        />
        <StatCard
          title="Hospitals"
          count={dummyHospitals.length.toString()}
          icon={<FaHospital />}
          iconBgColor="#FB7373"
        />
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("donors")}
              className={`flex items-center px-4 py-2 rounded-md font-medium text-sm transition ${
                activeTab === "donors"
                  ? "bg-[#FB7373] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaUser className="mr-2" />
              Donors
            </button>
            <button
              onClick={() => setActiveTab("bloodbanks")}
              className={`flex items-center px-4 py-2 rounded-md font-medium text-sm transition ${
                activeTab === "bloodbanks"
                  ? "bg-[#FB7373] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaTint className="mr-2" />
              Blood Banks
            </button>
            <button
              onClick={() => setActiveTab("hospitals")}
              className={`flex items-center px-4 py-2 rounded-md font-medium text-sm transition ${
                activeTab === "hospitals"
                  ? "bg-[#FB7373] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaHospital className="mr-2" />
              Hospitals
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 rounded-lg p-5">
        <h2 className="flex items-center text-lg font-semibold mb-4 text-gray-900">
          {activeTab === "donors" && (
            <>
              <FaUser className="mr-2 text-red-600" /> Donors
            </>
          )}
          {activeTab === "bloodbanks" && (
            <>
              <FaTint className="mr-2 text-red-600" /> Blood Banks
            </>
          )}
          {activeTab === "hospitals" && (
            <>
              <FaHospital className="mr-2 text-red-600" /> Hospitals
            </>
          )}
        </h2>

        {getFilteredData().length === 0 ? (
          <p className="text-center py-8 text-gray-500">
            No {activeTab} found matching your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeTab === "donors" &&
              filteredDonors.map((donor) => (
                <div
                  key={donor.id}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={donor.avatar}
                      alt={donor.name}
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {donor.name}
                      </h3>
                      <div className="flex items-center mt-1 text-gray-500 text-sm">
                        <FaEnvelope className="mr-1 text-blue-500" size={12} />
                        <span className="truncate">{donor.email}</span>
                      </div>
                      <div className="flex items-center mt-1 text-gray-500 text-sm">
                        <FaPhone className="mr-1 text-green-500" size={12} />
                        <span>{donor.phoneNumber}</span>
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
              ))}

            {activeTab === "bloodbanks" &&
              filteredBloodBanks.map((bloodBank) => (
                <div
                  key={bloodBank.id}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100"
                >
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
              ))}

            {activeTab === "hospitals" &&
              filteredHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100"
                >
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
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
