"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { MetricCard, CampaignRequestsCard } from '@/components';
import { FaExclamationTriangle, FaClock, FaTrophy, FaUsers, FaHeart } from 'react-icons/fa';

export default function CampaignPage() {
  const router = useRouter();
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

  const ongoingCampaigns = [
    {
      id: '#OC001',
      organizerName: 'Red Cross Society',
      campaignTitle: 'Emergency Blood Drive - City Hospital',
      date: '2025-07-10 to 2025-07-20',
      location: 'City Hospital, Downtown',
      expectedDonors: 150,
      contactNumber: '+94 77 123 4567',
      requestTime: 'Active since Jul 10',
      status: 'Ongoing',
      urgency: 'High'
    },
    {
      id: '#OC002',
      organizerName: 'Tech Solutions Ltd',
      campaignTitle: 'Corporate Wellness Blood Drive',
      date: '2025-07-15 to 2025-07-25',
      location: 'World Trade Center, Colombo',
      expectedDonors: 200,
      contactNumber: '+94 77 456 7890',
      requestTime: 'Active since Jul 15',
      status: 'Ongoing',
      urgency: 'Medium'
    }
  ];

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="flex justify-center gap-6 mt-4">
        <MetricCard heading="Campaign Requests" body="Pending organizer requests" count={8} icon={<FaExclamationTriangle className="text-white" />} iconBgColor="#FB7373" />
        <MetricCard heading="Ongoing Campaigns" body="Currently active campaigns" count={2} icon={<FaHeart className="text-white" />} iconBgColor="#10B981" />
        <MetricCard heading="Upcoming Campaigns" body="Scheduled this month" count={12} icon={<FaClock className="text-white" />} iconBgColor="#4A90E2" />
        <MetricCard heading="Total Campaigns Held" body="All time campaigns" count={147} icon={<FaTrophy className="text-white" />} iconBgColor="#9B59B6" />
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button className="bg-[#FB7373] hover:bg-red-400 text-white font-medium rounded-lg px-4 py-2 transition-colors duration-200">Create Campaign</button>
      </div>
      <div className='flex flex-col gap-4'>
        <CampaignRequestsCard title="Ongoing Campaigns" campaigns={ongoingCampaigns} enableNavigation />
        <CampaignRequestsCard title="Campaign Requests from Organizers" campaigns={campaignRequests} enableNavigation />
        <CampaignRequestsCard title="Upcoming Campaigns" campaigns={upcomingCampaigns} />
        <CampaignRequestsCard title="Campaign History" campaigns={campaignHistory} showHistoryFormat />
      </div>
    </div>
  );
}
