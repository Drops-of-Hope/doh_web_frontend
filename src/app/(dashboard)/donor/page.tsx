"use client";

import { FaHeart, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaTint, FaClock } from "react-icons/fa";
import { StatCard, UpcomingCampaigns } from "@/components";

export default function HomePage() {

  const lastDonationDate = new Date('2024-03-15'); 
  const currentDate = new Date();
  const fourMonthsInMs = 4 * 30 * 24 * 60 * 60 * 1000; 
  
  const timeSinceLastDonation = currentDate.getTime() - lastDonationDate.getTime();
  const isEligible = timeSinceLastDonation >= fourMonthsInMs;
  
  const nextEligibleDate = new Date(lastDonationDate.getTime() + fourMonthsInMs);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="text-[#2D3748] flex justify-between">
        <div>
          <h1 className="font-semibold">Hello, Nadhiya</h1>
          <p className="text-s text-gray-500">Your summary for the day</p>
        </div>
        <div className="">
          <div className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-pink-50 px-3 py-2 rounded-full border border-red-200 shadow-sm">
            <FaHeart className="text-red-500 text-sm" />
            <span className="text-sm font-medium text-red-700">Silver Donor</span>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 flex items-center justify-center p-2">
          <div className="grid grid-cols-2 gap-4 w-full">
            <StatCard 
              title="Total Donations"
              count="12"
              icon={<FaTint />}
              iconBgColor="#CE121A"
            />
            <StatCard 
              title="Years Donating" 
              count="2" 
              icon={<FaCalendarAlt />} 
              iconBgColor="#FB7373" 
            />
            <StatCard 
              title="Accepted Donations"
              count="11"
              icon={<FaCheckCircle />}
              iconBgColor="#06bc84"
            />
            <StatCard 
              title="Days Since Last"
              count={Math.floor(timeSinceLastDonation / (24 * 60 * 60 * 1000))}
              icon={<FaClock />}
              iconBgColor="#f7b444"
            />

          </div>
        </div>
        <div className="w-1/2 p-4">
          {isEligible ? (

            <div className="bg-gradient-blue-primary-120 border border-blue-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-[#F8314C] text-xl" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#F8314C]">You are Eligible to Donate!</h2>
                  <p className="text-gray-600 text-sm">You can donate blood today</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100 text-sm">
                <p className="text-blue-400 mb-2">
                  <span className="font-medium">Last Donation:</span> {formatDate(lastDonationDate)}
                </p>
              </div>
            </div>
          ) : (

            <div className="bg-gradient-blue-primary-120 border border-blue-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <FaTimesCircle className="text-[#F8314C] text-xl" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#F8314C]">Not Eligible to Donate Yet</h2>
                  <p className="text-gray-600 text-sm">You need to wait before your next donation</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100 text-sm space-y-3">
                <p className="text-blue-400 mb-2">
                  <span className="font-medium">Last Donation:</span> {formatDate(lastDonationDate)}
                </p>
                <div className="text-gray-700">
                  <span className="font-medium">Next Eligible Date:</span> {formatDate(nextEligibleDate)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="mt-4 w-1/2 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#2D3748]">Upcoming Appointment</h2>
          </div>
          <div className="">
            <div className="flex items-center justify-between py-3 px-3 rounded-lg transition hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <FaHeart className="text-red-500 text-sm" />
                </div>
                <div>
                  <h3 className="font-medium text-[#2D3748]">Blood Donation Appointment</h3>
                  <p className="text-sm text-gray-500">July 15, 2025 at 10:00 AM</p>
                  <p className="text-xs text-gray-400">Colombo General Hospital</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Confirmed
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="bg-gray-200 text-gray-400 border border-gray-200 text-sm font-medium rounded-md px-4 py-2 cursor-not-allowed"
                disabled
              >
                Make Appointment
              </button>
              <button
                className="bg-blue-400 hover:bg-blue-500 text-white text-sm font-medium rounded-md px-4 py-2"
                onClick={() => console.log('Reschedule clicked')}
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 w-1/2">
            <UpcomingCampaigns maxRows={1} showCreateButton={false} />
        </div>
      </div>
    </div>
  );
}