"use client";

import { MetricCard, SearchBar, TestTable } from "@/components";
import {
  FaFlask,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClipboardCheck,
} from "react-icons/fa";
import { useGetBloodTestCountsMutation } from "@/store/api/bloodTestApi";
import { useEffect, useState } from "react";

export default function TestPage() {
  const [fetchCounts, { data }] =
    useGetBloodTestCountsMutation();
  const [query, setQuery] = useState<string>("");
  const [bloodType, setBloodType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"id" | "collectionDate" | "expiryDate">(
    "id"
  );

  useEffect(() => {
    // Fetch counts on mount
    fetchCounts();
  }, [fetchCounts]);

  const untestedUnits = data?.untested_units ?? 0;
  const testsDoneThisMonth = data?.tests_done_this_month ?? 0;
  const testsPassedThisMonth = data?.tests_passed_this_month ?? 0;
  const failedTestsThisMonth = data?.failed_tests_this_month ?? 0;

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="flex p-2 gap-3">
        <MetricCard
          iconBgColor="#EBF8FF"
          heading="Untested Blood Units"
          body="Pending laboratory testing after donation"
          count={untestedUnits}
          icon={<FaFlask className="w-6 h-6 text-blue-600" />}
        />
        <MetricCard
          iconBgColor="#F8F9FA"
          heading="Tests Done This Month"
          body="Blood units that tested for safety screening"
          count={testsDoneThisMonth}
          icon={<FaClipboardCheck className="w-6 h-6 text-gray-600" />}
        />
        <MetricCard
          iconBgColor="#F0FDF4"
          heading="Pass Tests This Month"
          body="Blood units that passed safety screening"
          count={testsPassedThisMonth}
          icon={<FaCheckCircle className="w-6 h-6 text-green-600" />}
        />
        <MetricCard
          iconBgColor="#FEF2F2"
          heading="Fail Tests This Month"
          body="Blood units that failed safety screening"
          count={failedTestsThisMonth}
          icon={<FaExclamationTriangle className="w-6 h-6 text-red-600" />}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm mt-4 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <SearchBar
              title="Search by blood unit id, donor id..."
              value={query}
              onSearch={setQuery}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-400"
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
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "id" | "collectionDate" | "expiryDate"
                  )
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-400"
              >
                <option value="id">Sort by ID</option>
                <option value="collectionDate">Sort by Collection Date</option>
                <option value="expiryDate">Sort by Expiry Date</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <TestTable searchQuery={query} bloodType={bloodType} sortBy={sortBy} />
    </div>
  );
}
