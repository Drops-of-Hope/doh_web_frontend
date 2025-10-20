"use client";
import React, { useMemo } from 'react';
import { MetricCard, CampaignRequestsCard } from '@/components';
import { FaExclamationTriangle, FaClock, FaTrophy, FaUsers } from 'react-icons/fa';
import { useGetPendingCampaignsByMedicalEstablishmentQuery, useGetUpcomingCampaignsByMedicalEstablishmentQuery, useGetCampaignSummaryByMedicalEstablishmentQuery, useGetCompletedCampaignsByMedicalEstablishmentQuery } from '@/store/api/campaignsApi';
import type { CampaignDto, CompletedCampaignDto } from '@/store/api/campaignsApi';
import { useSession } from 'next-auth/react';

export default function CampaignPage() {
  const { data: session } = useSession();
  const medicalEstablishmentId = session?.decodedIdToken?.sub;

  const { data: pendingData, isLoading: pendingLoading, isError: pendingError } =
    useGetPendingCampaignsByMedicalEstablishmentQuery(
      { medicalEstablishmentId: medicalEstablishmentId ?? '', page: 1, limit: 2 },
      { skip: !medicalEstablishmentId }
    );

  const { data: upcomingData, isLoading: upcomingLoading, isError: upcomingError } =
    useGetUpcomingCampaignsByMedicalEstablishmentQuery(
      { medicalEstablishmentId: medicalEstablishmentId ?? '', page: 1, limit: 5 },
      { skip: !medicalEstablishmentId }
    );

  const { data: completedData, isLoading: completedLoading, isError: completedError } =
    useGetCompletedCampaignsByMedicalEstablishmentQuery(
      { medicalEstablishmentId: medicalEstablishmentId ?? '', page: 1, limit: 5 },
      { skip: !medicalEstablishmentId }
    );

  const { data: summaryData } =
    useGetCampaignSummaryByMedicalEstablishmentQuery(
      { medicalEstablishmentId: medicalEstablishmentId ?? '' },
      { skip: !medicalEstablishmentId }
    );

  // Prefer data.data.campaigns if present, else data.campaigns
  const pendingCampaignsRaw = useMemo<CampaignDto[]>(() => (
    (pendingData?.data?.campaigns ?? pendingData?.campaigns ?? []) as CampaignDto[]
  ), [pendingData]);

  const campaignRequests = useMemo(() => {
    return pendingCampaignsRaw.map((c) => ({
      id: c.id,
      organizerName: c.organizer?.name ?? '',
      campaignTitle: c.title,
      date: c.startTime ? new Date(c.startTime).toLocaleDateString() : '',
      location: c.location,
      expectedDonors: c.expectedDonors ?? 0,
      contactNumber: c.contactPersonPhone,
      requestTime: c.createdAt ? new Date(c.createdAt).toLocaleString() : undefined,
      status: c.isApproved === 'PENDING' ? 'Pending' : c.isApproved === 'APPROVED' ? 'Approved' : c.isApproved === 'REJECTED' ? 'Rejected' : 'Pending',
      urgency: undefined,
    }));
  }, [pendingCampaignsRaw]);
  // Prefer data.data.campaigns if present, else data.campaigns
  const upcomingCampaignsRaw = useMemo<CampaignDto[]>(() => (
    (upcomingData?.data?.campaigns ?? upcomingData?.campaigns ?? []) as CampaignDto[]
  ), [upcomingData]);

  const organizerName = (org?: { name?: string } | string): string =>
    typeof org === 'string' ? org : org?.name ?? '';

  const upcomingCampaigns = useMemo(() => {
    return upcomingCampaignsRaw.map((c) => ({
      id: c.id,
  organizerName: organizerName(c.organizer as { name?: string } | undefined),
      campaignTitle: c.title,
      date: c.startTime ? new Date(c.startTime).toLocaleDateString() : '',
      location: c.location,
      expectedDonors: c.expectedDonors ?? 0,
      bookedSlots: c.participantsCount ?? undefined,
      contactNumber: c.contactPersonPhone,
      status: c.status ?? 'Scheduled',
    }));
  }, [upcomingCampaignsRaw]);

  // Prefer data.data.campaigns if present, else data.campaigns
  const completedCampaignsRaw = useMemo<CompletedCampaignDto[]>(() => (
    (completedData?.data?.campaigns ?? completedData?.campaigns ?? []) as CompletedCampaignDto[]
  ), [completedData]);

  const campaignHistory = useMemo(() => {
    return completedCampaignsRaw.map((c) => ({
      id: c.id,
  organizerName: organizerName(c.organizer),
      campaignTitle: c.title,
      date: c.date ? new Date(c.date).toLocaleDateString() : '',
      location: c.location,
  expectedDonors: c.expectedDonors ?? 0,
  actualDonors: c.actualDonors ?? 0,
  unitsCollected: c.unitsCollected ?? 0,
      status: c.status ?? 'Completed',
    }));
  }, [completedCampaignsRaw]);

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="flex justify-center gap-6 mt-4">
        <MetricCard heading="Campaign Requests" body="Pending organizer requests" count={summaryData?.data?.pendingRequests ?? campaignRequests.length} icon={<FaExclamationTriangle className="text-white" />} iconBgColor="#FB7373" />
        <MetricCard heading="Upcoming Campaigns" body="Scheduled this month" count={summaryData?.data?.upcomingCampaigns ?? upcomingCampaigns.length} icon={<FaClock className="text-white" />} iconBgColor="#4A90E2" />
        <MetricCard heading="Total Campaigns Held" body="All time campaigns" count={summaryData?.data?.totalCampaignsHeld ?? 0} icon={<FaTrophy className="text-white" />} iconBgColor="#9B59B6" />
        <MetricCard heading="Total Campaign Donors" body="From recent campaigns" count={summaryData?.data?.totalCampaignDonors ?? 0} icon={<FaUsers className="text-white" />} iconBgColor="#27AE60" />
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
        {upcomingLoading && (
          <div className="bg-white rounded-lg shadow-md p-6">Loading upcoming campaigns...</div>
        )}
        {upcomingError && (
          <div className="bg-white rounded-lg shadow-md p-6 text-red-600">Failed to load upcoming campaigns.</div>
        )}
        {!upcomingLoading && !upcomingError && (
          <CampaignRequestsCard title="Upcoming Campaigns" campaigns={upcomingCampaigns} />
        )}
        {completedLoading && (
          <div className="bg-white rounded-lg shadow-md p-6">Loading campaign history...</div>
        )}
        {completedError && (
          <div className="bg-white rounded-lg shadow-md p-6 text-red-600">Failed to load campaign history.</div>
        )}
        {!completedLoading && !completedError && (
          <CampaignRequestsCard title="Campaign History" campaigns={campaignHistory} showHistoryFormat />
        )}
      </div>
    </div>
  );
}
