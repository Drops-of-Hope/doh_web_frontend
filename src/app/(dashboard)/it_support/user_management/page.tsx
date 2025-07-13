"use client";

import React, { useState } from "react";
import {
  FaUser,
  FaHospital,
  FaTint,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
import { Button, StatCard } from "@/components";
import { dummyDonors, dummyBloodBanks, dummyHospitals } from "@/constants/User";
import { DonorCard, BloodBankCard, HospitalCard } from "@/components";

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
                  ? "bg-blue-400 text-white"
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
                  ? "bg-blue-400 text-white"
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
                  ? "bg-blue-400 text-white"
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
          <div>
          <Button
            title="Add User"
            containerStyles="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-3xl transition-colors duration-200 flex items-center gap-2"
            handleClick={handleAddUser}
            leftIcon={<FaPlus />}
          />
        </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 rounded-lg p-5">

        {getFilteredData().length === 0 ? (
          <p className="text-center py-8 text-gray-500">
            No {activeTab} found matching your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeTab === "donors" &&
              filteredDonors.map((donor) => (
                <DonorCard key={donor.id} donor={donor} />
              ))}

            {activeTab === "bloodbanks" &&
              filteredBloodBanks.map((bloodBank) => (
                <BloodBankCard key={bloodBank.id} bloodBank={bloodBank} />
              ))}

            {activeTab === "hospitals" &&
              filteredHospitals.map((hospital) => (
                <HospitalCard key={hospital.id} hospital={hospital} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}