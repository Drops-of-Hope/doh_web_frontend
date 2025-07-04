"use client";

import { MetricCard, SearchBar } from '@/components';
import { FaFlask, FaExclamationTriangle, FaCheckCircle, FaClipboardCheck, FaSearch, FaSort, FaFilter } from 'react-icons/fa';

export default function TestPage() {

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="flex p-2 gap-3">
        <MetricCard
          iconBgColor="#EBF8FF"
          heading="Untested Blood Units"
          body="Pending laboratory testing after donation"
          count={247}
          icon={<FaFlask className="w-6 h-6 text-blue-600" />}
        />
        <MetricCard
          iconBgColor="#F8F9FA"
          heading="Tests Done This Week"
          body="Blood units that failed safety screening"
          count={324}
          icon={<FaClipboardCheck className="w-6 h-6 text-gray-600" />}
        />
        <MetricCard
          iconBgColor="#F0FDF4"
          heading="Tests Passed This Week"
          body="Blood units that passed safety screening"
          count={185}
          icon={<FaCheckCircle className="w-6 h-6 text-green-600" />}
        />
        <MetricCard
          iconBgColor="#FEF2F2"
          heading="Failed Tests This Week"
          body="Blood units that failed safety screening"
          count={12}
          icon={<FaExclamationTriangle className="w-6 h-6 text-red-600" />}
        />

      </div>

      <div className="bg-white rounded-lg shadow-sm mt-4 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <SearchBar title='Search by blood unit id, donor id...' />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 items-center">

            <div className="flex items-center gap-2">
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="all">All Blood Types</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="id">Sort by ID</option>
                <option value="bloodType">Sort by Blood Type</option>
                <option value="status">Sort by Status</option>
                <option value="testDate">Sort by Date</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}