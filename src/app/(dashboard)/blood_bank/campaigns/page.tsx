"use client";
import React from 'react';
import { MetricCard, CampaignRequestsCard } from '@/components';
import { FaExclamationTriangle, FaClock, FaTrophy, FaUsers } from 'react-icons/fa';

export default function CampaignPage() {
  const campaignRequests = [
    {
      id: '#CR001',
      organizerName: 'Red Cross Society',
      campaignTitle: 'Emergency Blood Drive - City Hospital',
      date: '2025-07-15',
      location: 'City Hospital, Downtown',
      expectedDonors: 150,
      contactNumber: '+94 77 123 4567',
      requestTime: '2:15 PM',
      status: 'Pending',
      urgency: 'High'
    },
    {
      id: '#CR002',
      organizerName: 'Lions Club Colombo',
      campaignTitle: 'Monthly Community Blood Drive',
      date: '2025-07-20',
      location: 'Community Center, Nugegoda',
      expectedDonors: 200,
      contactNumber: '+94 71 987 6543',
      requestTime: '1:45 PM',
      status: 'Approved',
      urgency: 'Medium'
    },
    {
      id: '#CR003',
      organizerName: 'University Medical Faculty',
      campaignTitle: 'Student Blood Donation Campaign',
      date: '2025-07-25',
      location: 'University of Colombo',
      expectedDonors: 300,
      contactNumber: '+94 11 258 9630',
      requestTime: '11:30 AM',
      status: 'Pending',
      urgency: 'Low'
    }
  ];

  const upcomingCampaigns = [
    {
      id: '#UC001',
      organizerName: 'Rotary Club',
      campaignTitle: 'Corporate Blood Drive',
      date: '2025-07-12',
      location: 'World Trade Center, Colombo',
      expectedDonors: 180,
      bookedSlots: 95,
      contactNumber: '+94 77 456 7890',
      status: 'Scheduled'
    },
    {
      id: '#UC002',
      organizerName: 'Buddhist Temple Society',
      campaignTitle: 'Temple Festival Blood Drive',
      date: '2025-07-18',
      location: 'Gangaramaya Temple',
      expectedDonors: 120,
      bookedSlots: 78,
      contactNumber: '+94 71 234 5678',
      status: 'Scheduled'
    }
  ];

  const campaignHistory = [
    {
      id: '#CH001',
      organizerName: 'Red Cross Society',
      campaignTitle: 'Weekend Blood Drive',
      date: '2025-07-05',
      location: 'National Hospital, Colombo',
      expectedDonors: 200,
      actualDonors: 185,
      unitsCollected: 170,
      status: 'Completed'
    },
    {
      id: '#CH002',
      organizerName: 'Youth Organization',
      campaignTitle: 'Youth Blood Donation Day',
      date: '2025-06-28',
      location: 'BMICH, Colombo',
      expectedDonors: 250,
      actualDonors: 280,
      unitsCollected: 265,
      status: 'Completed'
    }
  ];

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="text-[#2D3748] flex justify-between">
        <div>
          <h1 className="font-semibold">Campaign Management</h1>
          <p className="text-s text-gray-500">Manage blood donation campaigns and requests</p>
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <MetricCard heading="Campaign Requests" body="Pending organizer requests" count={8} icon={<FaExclamationTriangle className="text-white" />} iconBgColor="#FB7373" />
        <MetricCard heading="Upcoming Campaigns" body="Scheduled this month" count={12} icon={<FaClock className="text-white" />} iconBgColor="#4A90E2" />
        <MetricCard heading="Total Campaigns Held" body="All time campaigns" count={147} icon={<FaTrophy className="text-white" />} iconBgColor="#9B59B6" />
        <MetricCard heading="Active Donors" body="From recent campaigns" count={2847} icon={<FaUsers className="text-white" />} iconBgColor="#27AE60" />
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-[#FB7373] hover:bg-red-400 text-white font-medium rounded-lg px-6 py-3 font-normal transition-colors duration-200">Create Campaign</button>
      </div>
      <div className='flex flex-col gap-4'>
        <CampaignRequestsCard title="Campaign Requests from Organizers" campaigns={campaignRequests} />
        <CampaignRequestsCard title="Upcoming Campaigns" campaigns={upcomingCampaigns} />
        <CampaignRequestsCard title="Campaign History" campaigns={campaignHistory} showHistoryFormat />
      </div>
    </div>
  );
}
