"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BackButton } from '@/components';
import { 
  FaUsers, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaHeart, 
  FaPhoneAlt, 
  FaClock, 
  FaUserMd, 
  FaTrophy,
  FaTint,
  FaChartLine,
  FaUserCheck,
  FaEye
} from 'react-icons/fa';

export default function OngoingCampaignPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaignId = searchParams.get('id');
  const [selectedTab, setSelectedTab] = useState('overview');

  // Hardcoded campaign data for the ongoing campaign
  const campaignData = {
    id: '#OC001',
    title: 'Emergency Blood Drive - City Hospital',
    organizer: 'Red Cross Society',
    location: 'City Hospital, Downtown',
    startDate: '2025-07-10',
    endDate: '2025-07-20',
    targetDonors: 150,
    registeredDonors: 89,
    completedDonations: 67,
    currentStatus: 'Active',
    description: 'Emergency blood collection drive to support critical patients at City Hospital. We need volunteers to donate blood for various blood types.',
    contactPerson: 'Dr. Sarah Fernando',
    contactNumber: '+94 77 123 4567',
    email: 'sarah.fernando@redcross.lk',
    urgency: 'High',
    daysRemaining: 4
  };

  // Hardcoded registered donors data with names and ages
  const registeredDonors = [
    { 
      id: 'D001', 
      name: 'Kamal Perera', 
      age: 28, 
      bloodType: 'O+', 
      phone: '+94 77 111 2222', 
      registeredDate: '2025-07-10', 
      status: 'Completed', 
      donationTime: '9:30 AM',
      donationDate: '2025-07-15'
    },
    { 
      id: 'D002', 
      name: 'Nimal Silva', 
      age: 35, 
      bloodType: 'A+', 
      phone: '+94 71 333 4444', 
      registeredDate: '2025-07-10', 
      status: 'Completed', 
      donationTime: '10:15 AM',
      donationDate: '2025-07-15'
    },
    { 
      id: 'D003', 
      name: 'Priya Jayawardena', 
      age: 26, 
      bloodType: 'B+', 
      phone: '+94 76 555 6666', 
      registeredDate: '2025-07-11', 
      status: 'Completed', 
      donationTime: '11:00 AM',
      donationDate: '2025-07-16'
    },
    { 
      id: 'D004', 
      name: 'Saman Rathnayake', 
      age: 42, 
      bloodType: 'AB+', 
      phone: '+94 77 777 8888', 
      registeredDate: '2025-07-11', 
      status: 'Scheduled', 
      donationTime: '2:00 PM',
      donationDate: '2025-07-19'
    },
    { 
      id: 'D005', 
      name: 'Dilani Fernando', 
      age: 29, 
      bloodType: 'O-', 
      phone: '+94 71 999 0000', 
      registeredDate: '2025-07-12', 
      status: 'Scheduled', 
      donationTime: '2:30 PM',
      donationDate: '2025-07-19'
    },
    { 
      id: 'D006', 
      name: 'Mahesh Gunasekara', 
      age: 31, 
      bloodType: 'A-', 
      phone: '+94 76 111 2222', 
      registeredDate: '2025-07-12', 
      status: 'Scheduled', 
      donationTime: '3:00 PM',
      donationDate: '2025-07-20'
    },
    { 
      id: 'D007', 
      name: 'Chamari Wickramasinghe', 
      age: 24, 
      bloodType: 'B-', 
      phone: '+94 77 333 4444', 
      registeredDate: '2025-07-13', 
      status: 'Registered', 
      donationTime: 'TBD',
      donationDate: 'TBD'
    },
    { 
      id: 'D008', 
      name: 'Ruwan Bandara', 
      age: 38, 
      bloodType: 'AB-', 
      phone: '+94 71 555 6666', 
      registeredDate: '2025-07-13', 
      status: 'Registered', 
      donationTime: 'TBD',
      donationDate: 'TBD'
    },
    { 
      id: 'D009', 
      name: 'Sanduni Rajapaksa', 
      age: 27, 
      bloodType: 'O+', 
      phone: '+94 76 777 8888', 
      registeredDate: '2025-07-14', 
      status: 'Registered', 
      donationTime: 'TBD',
      donationDate: 'TBD'
    },
    { 
      id: 'D010', 
      name: 'Thilan Madushanka', 
      age: 33, 
      bloodType: 'A+', 
      phone: '+94 77 999 0000', 
      registeredDate: '2025-07-14', 
      status: 'Registered', 
      donationTime: 'TBD',
      donationDate: 'TBD'
    }
  ];

  // Blood packets collected data
  const bloodPacketsData = [
    { type: 'O+', collected: 18, target: 30, percentage: 60, color: 'bg-red-500' },
    { type: 'A+', collected: 15, target: 25, percentage: 60, color: 'bg-blue-500' },
    { type: 'B+', collected: 12, target: 20, percentage: 60, color: 'bg-green-500' },
    { type: 'AB+', collected: 8, target: 15, percentage: 53, color: 'bg-purple-500' },
    { type: 'O-', collected: 6, target: 20, percentage: 30, color: 'bg-red-600' },
    { type: 'A-', collected: 4, target: 15, percentage: 27, color: 'bg-blue-600' },
    { type: 'B-', collected: 3, target: 15, percentage: 20, color: 'bg-green-600' },
    { type: 'AB-', collected: 1, target: 10, percentage: 10, color: 'bg-purple-600' }
  ];

  const dailyProgress = [
    { day: 'Day 1 (Jul 10)', donations: 12, target: 15, date: '2025-07-10' },
    { day: 'Day 2 (Jul 11)', donations: 15, target: 15, date: '2025-07-11' },
    { day: 'Day 3 (Jul 12)', donations: 18, target: 15, date: '2025-07-12' },
    { day: 'Day 4 (Jul 13)', donations: 14, target: 15, date: '2025-07-13' },
    { day: 'Day 5 (Jul 14)', donations: 8, target: 15, date: '2025-07-14' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500 text-white';
      case 'Scheduled': return 'bg-blue-500 text-white';
      case 'Registered': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getBloodTypeColor = (type: string) => {
    const colors = {
      'O+': 'bg-red-500 text-white',
      'O-': 'bg-red-600 text-white',
      'A+': 'bg-blue-500 text-white',
      'A-': 'bg-blue-600 text-white',
      'B+': 'bg-green-500 text-white',
      'B-': 'bg-green-600 text-white',
      'AB+': 'bg-purple-500 text-white',
      'AB-': 'bg-purple-600 text-white'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500 text-white';
  };

  const calculateProgress = () => {
    return Math.round((campaignData.completedDonations / campaignData.targetDonors) * 100);
  };

  const completedDonors = registeredDonors.filter(donor => donor.status === 'Completed');
  const scheduledDonors = registeredDonors.filter(donor => donor.status === 'Scheduled');
  const pendingDonors = registeredDonors.filter(donor => donor.status === 'Registered');

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <BackButton />
        
        {/* Campaign Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{campaignData.title}</h1>
              <div className="flex items-center gap-6 text-base text-gray-700">
                <div className="flex items-center gap-2">
                  <FaUsers className="text-blue-600" />
                  <span className="font-medium">Organizer:</span> {campaignData.organizer}
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span className="font-medium">Location:</span> {campaignData.location}
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-600" />
                  <span className="font-medium">Duration:</span> {campaignData.startDate} to {campaignData.endDate}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-2">
                {campaignData.currentStatus}
              </div>
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                {campaignData.daysRemaining} days remaining
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold text-gray-800">Campaign Progress</span>
              <span className="text-lg font-bold text-gray-700">{campaignData.completedDonations}/{campaignData.targetDonors} donations</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                style={{ width: `${calculateProgress()}%` }}
              >
                <span className="text-white text-xs font-bold">{calculateProgress()}%</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-blue-800 mb-2">Contact Information</h3>
            <div className="flex gap-6 text-blue-700">
              <div className="flex items-center gap-2">
                <FaUserMd className="text-blue-600" />
                <span className="font-medium">Contact Person:</span> {campaignData.contactPerson}
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-blue-600" />
                <span className="font-medium">Phone:</span> {campaignData.contactNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6 border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: FaEye },
                { id: 'donors', label: 'Registered Donors', icon: FaUserCheck },
                { id: 'progress', label: 'Blood Collection Progress', icon: FaChartLine },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSelectedTab(id)}
                  className={`py-4 px-2 border-b-2 font-bold text-base flex items-center gap-2 ${
                    selectedTab === id
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                  }`}
                >
                  <Icon />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Total Registered</p>
                      <p className="text-3xl font-bold">{campaignData.registeredDonors}</p>
                    </div>
                    <FaUsers className="text-blue-200 text-3xl" />
                  </div>
                </div>
                
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Completed Donations</p>
                      <p className="text-3xl font-bold">{campaignData.completedDonations}</p>
                    </div>
                    <FaHeart className="text-green-200 text-3xl" />
                  </div>
                </div>
                
                <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100 text-sm font-medium">Pending Donations</p>
                      <p className="text-3xl font-bold">{campaignData.registeredDonors - campaignData.completedDonations}</p>
                    </div>
                    <FaClock className="text-yellow-200 text-3xl" />
                  </div>
                </div>

                {/* Daily Progress Chart */}
                <div className="md:col-span-3 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaChartLine className="text-blue-600" />
                    Daily Progress
                  </h3>
                  <div className="space-y-3">
                    {dailyProgress.map((day, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-800">{day.day}</span>
                        <div className="flex items-center gap-4">
                          <div className="w-32 bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${day.donations >= day.target ? 'bg-green-500' : 'bg-blue-500'}`}
                              style={{ width: `${Math.min((day.donations / day.target) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-gray-700">{day.donations}/{day.target}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'donors' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Registered Donors ({registeredDonors.length})</h3>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Completed ({completedDonors.length})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Scheduled ({scheduledDonors.length})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Registered ({pendingDonors.length})</span>
                    </div>
                  </div>
                </div>

                {/* Donors Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Donor Info</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Age</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Blood Type</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Registered Date</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Donation Time</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {registeredDonors.map((donor) => (
                        <tr key={donor.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12">
                                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                                  <span className="text-sm font-bold text-white">
                                    {donor.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-base font-bold text-gray-900">{donor.name}</div>
                                <div className="text-sm font-medium text-gray-600">ID: {donor.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">{donor.age} years</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1 text-sm font-bold rounded-full ${getBloodTypeColor(donor.bloodType)}`}>
                              {donor.bloodType}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">{donor.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">{donor.registeredDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                            {donor.donationTime}
                            {donor.donationDate !== 'TBD' && (
                              <div className="text-sm text-gray-600">{donor.donationDate}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1 text-sm font-bold rounded-full ${getStatusColor(donor.status)}`}>
                              {donor.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === 'progress' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaTint className="text-red-600" />
                  Blood Packets Collection Progress
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bloodPacketsData.map((blood) => (
                    <div key={blood.type} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex px-3 py-1 text-sm font-bold rounded-full ${getBloodTypeColor(blood.type)}`}>
                          {blood.type}
                        </span>
                        <span className="text-lg font-bold text-gray-800">{blood.collected}/{blood.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                        <div
                          className={`h-4 rounded-full transition-all duration-300 ${blood.color}`}
                          style={{ width: `${blood.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-center">
                        <span className="text-lg font-bold text-gray-700">{blood.percentage}%</span>
                        <p className="text-sm text-gray-600 font-medium">collected</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaTrophy className="text-yellow-300" />
                    Collection Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{bloodPacketsData.reduce((sum, blood) => sum + blood.collected, 0)}</p>
                      <p className="text-blue-100 font-medium">Total Packets Collected</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">{bloodPacketsData.reduce((sum, blood) => sum + blood.target, 0)}</p>
                      <p className="text-blue-100 font-medium">Total Target</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">
                        {Math.round((bloodPacketsData.reduce((sum, blood) => sum + blood.collected, 0) / bloodPacketsData.reduce((sum, blood) => sum + blood.target, 0)) * 100)}%
                      </p>
                      <p className="text-blue-100 font-medium">Overall Progress</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
