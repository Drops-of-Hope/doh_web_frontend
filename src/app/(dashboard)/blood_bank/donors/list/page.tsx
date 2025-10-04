"use client";

import React, { useState } from "react";
import SearchBar from "@/components/molecules/SearchBar";
import {
  formatDisplayDate
} from '@/lib/appointmentUtils';
import { useGetAppointmentsByMedicalEstablishmentQuery } from '@/store/api/appointmentsApi';
import { useSession } from "next-auth/react";
import { Appointment } from "../../../../../../types";


export default function ListPage() {
  const { data: session } = useSession();
    const [searchTerm, setSearchTerm] = useState("");
    const medicalEstablishmentId = session?.decodedIdToken?.sub;
  
    const { data: appointments = [], isLoading, isError } = useGetAppointmentsByMedicalEstablishmentQuery(
      medicalEstablishmentId ?? '',
      {
        skip: !medicalEstablishmentId, // skip the query if undefined or empty
      }
    );

  // Filter by donor name, blood group, or status
  const filteredAppointments = appointments.filter((appt: Appointment) =>
    appt.donor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appt.donor?.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appt.scheduled.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-[100vh] p-4 pt-2 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <p className="text-gray-600">View all donor details and appointment history</p>
        </div>

        {/* Search Bar Component */}
        <SearchBar
          title="Search Donors"
          onSearch={(query) => setSearchTerm(query)}
          value={searchTerm}
        />

        {/* Donor Details Chart */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Donor Details ({filteredAppointments.length} records)
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Group
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
  {filteredAppointments.map((appt) => (
    <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
      {/* Donor Info */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {appt.donor?.name?.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{appt.donor?.name}</div>
            <div className="text-sm text-gray-500">{appt.donor?.email}</div>
          </div>
        </div>
      </td>

      {/* Blood Group */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          {appt.donor?.bloodGroup}
        </span>
      </td>

      {/* Date */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatDisplayDate(appt.appointmentDate)}
      </td>

      {/* Time */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {appt.slot?.startTime} - {appt.slot?.endTime}
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appt.scheduled)}`}
        >
          {appt.scheduled}
        </span>
      </td>

      {/* Contact */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {appt.donor?.email}
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>

          {/* Empty State */}
          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                <p className="text-lg font-medium">No donors found</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}