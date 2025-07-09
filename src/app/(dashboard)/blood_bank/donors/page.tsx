"use client";

import { useState } from 'react';
import { FaUser, FaCalendarDay, FaHeart } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import { MetricCard, SearchBar, MapComponent } from '@/components';
import { appointmentRequests } from './data.js';

export default function BloodDonationDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [bloodTypeFilter, setBloodTypeFilter] = useState('all');
  const [statusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const itemsPerPage = 10;

  const filteredData = appointmentRequests.filter(item => {
    const bloodTypeMatch = bloodTypeFilter === 'all' || item.bloodGroup === bloodTypeFilter;
    const statusMatch = statusFilter === 'all' || item.status === statusFilter;
    return bloodTypeMatch && statusMatch;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'bloodGroup':
        return a.bloodGroup.localeCompare(b.bloodGroup);
      case 'date':
      default:
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    return status === 'Confirmed' 
      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
      : 'bg-amber-100 text-amber-700 border border-amber-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center sm:items-stretch">
          <div className="flex-1 max-w-sm">
            <MetricCard
              iconBgColor="#EBF8FF"
              heading="No. of donors"
              body="Total registered blood donors"
              count={250}
              icon={<FaUser className="w-6 h-6 text-blue-600" />}
            />
          </div>
          <div className="flex-1 max-w-sm">
            <MetricCard
              iconBgColor="#F0FDF4"
              heading="Appointments today"
              body="Blood donation appointments scheduled"
              count={23}
              icon={<FaCalendarDay className="w-6 h-6 text-green-600" />}
            />
          </div>
          <div className="flex-1 max-w-sm">
            <MetricCard
              iconBgColor="#FEF2F2"
              heading="Active donors"
              body="Active donors this month"
              count={180}
              icon={<FaHeart className="w-6 h-6 text-red-600" />}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Donation Appointment Requests</h2>
          
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <SearchBar title='Search...' />
            </div>

            <div className="flex gap-3 items-center">
              
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

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white text-sm text-gray-900"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="bloodGroup">Sort by Blood Group</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
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
              {paginatedData.map((request) => (
                <tr key={request.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{request.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold border border-red-200">
                      {request.bloodGroup}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{request.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{request.time}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
      </div>

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