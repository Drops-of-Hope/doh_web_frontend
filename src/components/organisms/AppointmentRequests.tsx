"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SearchBar, AppointmentTableRow } from '@/components';
import {
  formatDisplayDate,
  sortAppointments
} from '@/lib/appointmentUtils';
import { useGetAppointmentsByMedicalEstablishmentQuery } from '@/store/api/appointmentsApi';
import { useSession } from "next-auth/react";


export default function AppointmentRequestsTable() {
  const { data: session } = useSession();
  const medicalEstablishmentId = session?.decodedIdToken?.sub;

  const { data: appointments = [], isLoading, isError } = useGetAppointmentsByMedicalEstablishmentQuery(
    medicalEstablishmentId ?? '',
    {
      skip: !medicalEstablishmentId, // skip the query if undefined or empty
    }
  );

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bloodTypeFilter, setBloodTypeFilter] = useState<string>('all');
  const [statusFilter] = useState<string>('all');
  const [sortBy] = useState<string>('date');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const itemsPerPage = 10;

  // Adjust filtering for actual appointment data shape
  const filteredData = appointments.filter((item) => {
    // Assuming item.donor.bloodGroup and item.status exist
    const bloodTypeMatch =
      bloodTypeFilter === "all" ||
      (item.donor?.bloodGroup === bloodTypeFilter);
    const statusMatch = statusFilter === "all" || item.scheduled === statusFilter;

    // Assuming appointmentDate is ISO string
    const itemDate = new Date(item.appointmentDate).toISOString().split("T")[0];
    const dateMatch = itemDate === selectedDate;

    const searchMatch =
      searchQuery === "" ||
      item.donor?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.donor?.bloodGroup?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.scheduled.toLowerCase().includes(searchQuery.toLowerCase());

    return bloodTypeMatch && statusMatch && dateMatch && searchMatch;
  });

  const sortedData = sortAppointments(filteredData, sortBy);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleRowClick = () => {
    router.push("/blood_bank/donors/appointment");
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  if (isLoading)
    return <div className="p-8 text-center text-gray-500">Loading appointments...</div>;

  if (isError)
    return <div className="p-8 text-center text-red-500">Failed to load appointments.</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
      <div className="p-8 border-b border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Donation Appointment Requests</h2>
          <Link
            href="/blood_bank/donors/list"
            className="text-blue-500 hover:text-blue-700 transition-colors duration-150 text-sm font-medium"
          >
            View All
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <SearchBar
              title='Search...'
              onSearch={handleSearch}
              value={searchQuery}
            />
          </div>
          <div className="flex gap-3 items-center flex-wrap">
            <div className="flex flex-col">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white text-sm text-gray-900"
              />
            </div>
            <select
              value={bloodTypeFilter}
              onChange={(e) => setBloodTypeFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white text-sm text-gray-900"
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
        </div>
        <div className="mt-4 text-sm text-gray-600">
          {selectedDate === today ? (
            <span className="font-medium text-blue-600">Showing todays appointments</span>
          ) : (
            <span>Showing appointments for {formatDisplayDate(selectedDate)}</span>
          )}
          {filteredData.length === 0 && (
            <span className="ml-2 text-amber-600">
              - {searchQuery ? 'No matching results found' : 'No appointments found for this date'}
            </span>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Blood Group</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((request) => (
                <AppointmentTableRow
                  key={request.id}
                  request={request}
                  onClick={handleRowClick}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg font-medium text-gray-900 mb-1">
                      {searchQuery ? 'No matching results' : 'No appointments found'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {searchQuery
                        ? `No appointments match "${searchQuery}" for ${selectedDate === today ? 'today' : formatDisplayDate(selectedDate)}`
                        : `No appointments scheduled for ${selectedDate === today ? 'today' : formatDisplayDate(selectedDate)}`}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {paginatedData.length > 0 && (
        <div className="px-8 py-6 border-t border-gray-100 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors duration-150 text-sm font-medium"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors duration-150 text-sm font-medium"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}