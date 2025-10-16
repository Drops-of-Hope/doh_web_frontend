"use client";
import React, { useMemo } from 'react';
import { MetricCard, CampaignRequestsCard } from '@/components';
import { FaExclamationTriangle, FaClock, FaTrophy, FaUsers } from 'react-icons/fa';
import { useGetPendingCampaignsByMedicalEstablishmentQuery } from '@/store/api/campaignsApi';
import { useSession } from 'next-auth/react';

export default function CampaignPage() {
  const { data: session } = useSession();
  const medicalEstablishmentId = session?.decodedIdToken?.sub;

  const { data: pendingData, isLoading: pendingLoading, isError: pendingError } =
    useGetPendingCampaignsByMedicalEstablishmentQuery(
      { medicalEstablishmentId: medicalEstablishmentId ?? '', page: 1, limit: 2 },
      { skip: !medicalEstablishmentId }
    );

  // Prefer data.data.campaigns if present, else data.campaigns
  const pendingCampaignsRaw = pendingData?.data?.campaigns ?? pendingData?.campaigns ?? [];

  const campaignRequests = useMemo(() => {
    return pendingCampaignsRaw.map((c) => ({
      id: c.id,
      organizerName: c.organizer?.name ?? '',
      campaignTitle: c.title,
      date: new Date(c.startTime).toLocaleDateString(),
      location: c.location,
      expectedDonors: c.expectedDonors,
      contactNumber: c.contactPersonPhone,
      requestTime: c.createdAt ? new Date(c.createdAt).toLocaleString() : undefined,
      status: c.isApproved === 'PENDING' ? 'Pending' : c.isApproved === 'APPROVED' ? 'Approved' : c.isApproved === 'REJECTED' ? 'Rejected' : 'Pending',
      urgency: undefined,
    }));
  }, [pendingCampaignsRaw]);

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
      <div className="flex justify-center gap-6 mt-4">
        <MetricCard heading="Campaign Requests" body="Pending organizer requests" count={campaignRequests.length} icon={<FaExclamationTriangle className="text-white" />} iconBgColor="#FB7373" />
        <MetricCard heading="Upcoming Campaigns" body="Scheduled this month" count={12} icon={<FaClock className="text-white" />} iconBgColor="#4A90E2" />
        <MetricCard heading="Total Campaigns Held" body="All time campaigns" count={147} icon={<FaTrophy className="text-white" />} iconBgColor="#9B59B6" />
        <MetricCard heading="Total Campaign Donors" body="From recent campaigns" count={2847} icon={<FaUsers className="text-white" />} iconBgColor="#27AE60" />
      </div>
      <div className="flex justify-end mt-6">
        <button className="bg-[#FB7373] hover:bg-red-400 text-white font-medium rounded-lg px-4 py-2 transition-colors duration-200">Create Campaign</button>
      </div>
      <div className='flex flex-col gap-4'>
        {pendingLoading && (
          <div className="bg-white rounded-lg shadow-md p-6">Loading campaign requests...</div>
        )}
        {pendingError && (
          <div className="bg-white rounded-lg shadow-md p-6 text-red-600">Failed to load campaign requests.</div>
        )}
        {!pendingLoading && !pendingError && (
          <CampaignRequestsCard title="Campaign Requests from Organizers" campaigns={campaignRequests} enableNavigation />
        )}
        <CampaignRequestsCard title="Upcoming Campaigns" campaigns={upcomingCampaigns} />
        <CampaignRequestsCard title="Campaign History" campaigns={campaignHistory} showHistoryFormat />
      </div>
    </div>
  );
}
