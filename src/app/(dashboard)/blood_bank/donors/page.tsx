"use client";

import React from 'react';

import { FaUser, FaCalendarDay, FaHeart } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import { MetricCard, MapComponent, AppointmentRequestsTable, Button } from '@/components';
import { useRouter } from 'next/navigation';
import { useGetDonorsQuery } from '@/store/api/donorsApi';
import normalizeDonor from '@/lib/donorUtils';

export default function BloodDonationDashboard() {
  const router = useRouter();
  const { data: donorsResp, isLoading: donorsLoading, isError: donorsError } = useGetDonorsQuery();
  const donorsFromApi = React.useMemo(() => {
    if (!donorsResp) return [];
    return Array.isArray(donorsResp) ? donorsResp : (donorsResp as any).data ?? [];
  }, [donorsResp]);

  const donors = donorsFromApi.slice(0, 3).map((raw: any) => normalizeDonor(raw));

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
      
      {/* Donors List preview */}
      <div className="mt-12 mb-12 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Donors List</h2>
            <p className="text-gray-600 text-sm">Recent registered donors - quick preview</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/blood_bank/donors/donors_list')}
              className="text-blue-500 hover:text-blue-700 transition-colors duration-150 text-sm font-medium"
            >
              View all
            </button>
          </div>
        </div>

        <div className="p-6 pt-0">
          {donorsLoading && (
            <div className="p-4 text-sm text-gray-500">Loading donors…</div>
          )}
          {donorsError && !donorsLoading && (
            <div className="p-4 text-sm text-red-600">Failed to load donors.</div>
          )}
          {!donorsLoading && !donorsError && (
            <ul className="divide-y divide-gray-100">
              {donors.map((d: any) => (
                <li key={d.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{d.name}</div>
                    <div className="text-xs text-gray-500">{d.bloodGroup}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{d.donationBadge}</span>
                    <div className="text-sm font-semibold text-gray-700">{d.pointsEarned ?? '-' } pts</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
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