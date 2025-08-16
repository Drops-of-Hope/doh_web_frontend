"use client";

import React, { useState } from "react";
import SearchBar from "@/components/molecules/SearchBar";

// Sample donor data - replace with actual API data
const donorData = [
  {
    id: 1,
    name: "John Doe",
    bloodGroup: "A+",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "Completed",
    phone: "+1 234 567 8901",
    email: "john.doe@email.com"
  },
  {
    id: 2,
    name: "Jane Smith",
    bloodGroup: "O-",
    date: "2024-01-16",
    time: "11:30 AM",
    status: "Scheduled",
    phone: "+1 234 567 8902",
    email: "jane.smith@email.com"
  },
  {
    id: 3,
    name: "Mike Johnson",
    bloodGroup: "B+",
    date: "2024-01-14",
    time: "02:15 PM",
    status: "Cancelled",
    phone: "+1 234 567 8903",
    email: "mike.johnson@email.com"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    bloodGroup: "AB-",
    date: "2024-01-17",
    time: "09:45 AM",
    status: "Completed",
    phone: "+1 234 567 8904",
    email: "sarah.wilson@email.com"
  },
  {
    id: 5,
    name: "David Brown",
    bloodGroup: "O+",
    date: "2024-01-18",
    time: "03:20 PM",
    status: "Scheduled",
    phone: "+1 234 567 8905",
    email: "david.brown@email.com"
  }
];

export default function ListPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter donors based on search term
  const filteredDonors = donorData.filter(donor =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Donor Appointments</h1>
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
              Donor Details ({filteredDonors.length} records)
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
                {filteredDonors.map((donor) => (
                  <tr key={donor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {donor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                          <div className="text-sm text-gray-500">{donor.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {donor.bloodGroup}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donor.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donor.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(donor.status)}`}>
                        {donor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {donor.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredDonors.length === 0 && (
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