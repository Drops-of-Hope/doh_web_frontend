"use client";

import { FaUser, FaCalendarDay, FaHeart, FaFileAlt } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import {
  MetricCard,
  MapComponent,
  AppointmentRequestsTable,
} from "@/components";
import { useRouter } from "next/navigation";
import { useGetDonorCountsMutation } from "@/store/api/DonorsApi";
import { useEffect } from "react";

export default function BloodDonationDashboard() {
  const router = useRouter();
  const [getCounts, { data, isLoading }] = useGetDonorCountsMutation();

  useEffect(() => {
    getCounts();
  }, [getCounts]);

  const counts = data?.data;

  return (
    <div className="min-h-[100vh] p-4 pt-2 bg-[#f8f8f8]">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center sm:items-stretch">
          <div className="flex-1 max-w-sm">
            <MetricCard
              iconBgColor="#EBF8FF"
              heading="No. of donors"
              body="Total registered blood donors"
              count={isLoading ? 0 : counts?.totalDonors ?? 0}
              icon={<FaUser className="w-6 h-6 text-blue-600" />}
            />
          </div>
          <div className="flex-1 max-w-sm">
            <MetricCard
              iconBgColor="#F0FDF4"
              heading="Appointments today"
              body="Blood donation appointments scheduled"
              count={isLoading ? 0 : counts?.appointmentsToday ?? 0}
              icon={<FaCalendarDay className="w-6 h-6 text-green-600" />}
            />
          </div>
          <div className="flex-1 max-w-sm">
            <MetricCard
              iconBgColor="#FEF2F2"
              heading="Active donors"
              body="Active donors this month"
              count={isLoading ? 0 : counts?.donationsThisMonth ?? 0}
              icon={<FaHeart className="w-6 h-6 text-red-600" />}
            />
          </div>
        </div>
      </div>

      <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Appointment Management
            </h3>
            <p className="text-gray-600 text-sm">
              Manage your appointment time slots and tokens here
            </p>
          </div>
          <button
            onClick={() => router.push("/blood_bank/donors/slots")}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-600 font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform"
          >
            <span className="flex items-center gap-2">
              <FaCalendarDay className="w-4 h-4" />
              Manage Slots
            </span>
          </button>
        </div>
      </div>

      <AppointmentRequestsTable />
            {/* Bottom action bar */}
        <div className="mt-4 mb-4 flex justify-end">
          <button
            onClick={() => router.push("/blood_bank/donors/reports")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm flex items-center gap-2"
          >
            <FaFileAlt className="w-4 h-4" />
            Generate Reports
          </button>
        </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            Donor Distribution Map
          </h2>
          <p className="text-gray-600 mt-2">
            Geographic distribution of registered donors across Sri Lanka
          </p>
        </div>
        
        <div className="p-8">
          <MapComponent />
        </div>
      </div>

    </div>
  );
}
