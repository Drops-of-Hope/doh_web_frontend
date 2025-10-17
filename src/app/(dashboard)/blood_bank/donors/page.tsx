"use client";

import { FaUser, FaCalendarDay, FaHeart } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import { MetricCard, MapComponent, AppointmentRequestsTable } from '@/components';
import { useRouter } from 'next/navigation';

export default function BloodDonationDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-[100vh] p-4 pt-2 bg-[#f8f8f8]">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center sm:items-stretch">
          <div className="flex-1 max-w-sm">
            <MetricCard
              iconBgColor="#EBF8FF"
              heading="No. of donors"
              body="Total registered blood donors"
              count={19}
              icon={<FaUser className="w-6 h-6 text-blue-600" />}
            />
          </div>
          <div className="flex-1 max-w-sm">
            <MetricCard
              iconBgColor="#F0FDF4"
              heading="Appointments today"
              body="Blood donation appointments scheduled"
              count={2}
              icon={<FaCalendarDay className="w-6 h-6 text-green-600" />}
            />
          </div>
          <div className="flex-1 max-w-sm">
            <MetricCard
              iconBgColor="#FEF2F2"
              heading="Active donors"
              body="Active donors this month"
              count={6}
              icon={<FaHeart className="w-6 h-6 text-red-600" />}
            />
          </div>
        </div>
      </div>

      <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Appointment Management</h3>
            <p className="text-gray-600 text-sm">Manage your appointment time slots and tokens here</p>
          </div>
          <button 
            onClick={() => router.push('/blood_bank/donors/slots')} 
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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Donor Distribution Map</h2>
          <p className="text-gray-600 mt-2">Geographic distribution of registered donors across Sri Lanka</p>
        </div>
        <div className="p-8">
          <MapComponent />
        </div>
      </div>
    </div>
  );
}