"use client";
import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetCampaignByIdQuery, useSetCampaignApprovalMutation } from '@/store/api/campaignsApi';
import { useSession } from 'next-auth/react';
import { BackButton, CampaignDetailsLayout, CampaignAvailabilityActions } from '@/components';

export default function CampaignRequestDetailsById() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const campaignId = Array.isArray(params?.campaignId) ? params?.campaignId[0] : (params?.campaignId as string);

  const { data: campaign, isLoading, isError } = useGetCampaignByIdQuery(campaignId ?? '', {
    skip: !campaignId,
  });

  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [setApproval] = useSetCampaignApprovalMutation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'Rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const requestViewModel = useMemo(() => {
    if (!campaign) return null;

    // Resolve status from API
    const statusRaw = campaign.isApproved || campaign.status || 'PENDING';
    const status = statusRaw === 'PENDING' ? 'Pending' : statusRaw === 'APPROVED' ? 'Approved' : statusRaw === 'REJECTED' ? 'Rejected' : 'Pending';

    // Support both startTime/endTime and startDate/endDate shapes
    const start = campaign.startTime || campaign.startDate || '';
    const end = campaign.endTime || campaign.endDate || '';

    return {
      id: campaign.id,
      organizerName: campaign.organizer?.organization || campaign.organizer?.name || 'Organizer',
      campaignTitle: campaign.title,
      date: start,
      location: campaign.location,
      expectedDonors: campaign.expectedDonors ?? campaign.goalBloodUnits ?? 0,
      contactNumber: campaign.organizer?.phone || campaign.medicalEstablishment?.contactNumber || campaign.contactPersonPhone || '',
      requestTime: campaign.createdAt ? new Date(campaign.createdAt).toLocaleString() : '',
      status,
      urgency: 'Medium', // No urgency in API; defaulting
      description: campaign.description || '',
      startTime: start ? new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      endTime: end ? new Date(end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      bloodTypesNeeded: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], // Not in API; placeholder
      organizerEmail: campaign.organizer?.email || '',
      facilities: ['Registration area', 'Medical screening', 'Donation beds (10)', 'Recovery area', 'Refreshment station'], // Not in API; placeholder
      notes: campaign.requirements?.notes || '',
    };
  }, [campaign]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <BackButton fallbackUrl="/blood_bank/campaigns/requests" className="hover:shadow-md" />
          <div className="bg-white rounded-lg shadow-sm p-6 mt-4">Loading campaign details...</div>
        </div>
      </div>
    );
  }

  if (isError || !requestViewModel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <BackButton fallbackUrl="/blood_bank/campaigns/requests" className="hover:shadow-md" />
          <div className="bg-white rounded-lg shadow-sm p-6 mt-4 text-red-600">Failed to load campaign details.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <BackButton fallbackUrl="/blood_bank/campaigns/requests" className="hover:shadow-md" />
        </div>

        {feedback && (
          <div className={`mb-4 p-4 rounded-lg border ${
            feedback.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {feedback.message}
          </div>
        )}

        <CampaignDetailsLayout
          campaignRequest={requestViewModel}
          formatDate={formatDate}
          getStatusColor={getStatusColor}
          getUrgencyColor={getUrgencyColor}
        />

        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Campaign Requirements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-blue-700">Expected Donors</span>
                </div>
                <p className="text-2xl font-bold text-blue-800">{requestViewModel.expectedDonors}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm font-medium text-red-700 mb-2">Blood Types Needed</p>
                <div className="flex flex-wrap gap-1">
                  {requestViewModel.bloodTypesNeeded.map((type) => (
                    <span key={type} className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm font-medium text-gray-700 mb-3">Required Facilities</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {requestViewModel.facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                  <span className="text-sm">•</span>
                  <span className="text-sm text-gray-700">{facility}</span>
                </div>
              ))}
            </div>
          </div>

          <CampaignAvailabilityActions
            availabilityChecked={availabilityChecked}
            isCheckingAvailability={isCheckingAvailability}
            setAvailabilityChecked={setAvailabilityChecked}
            setIsCheckingAvailability={setIsCheckingAvailability}
            showRejectModal={showRejectModal}
            setShowRejectModal={setShowRejectModal}
            rejectReason={rejectReason}
            setRejectReason={setRejectReason}
            handleReject={async () => {
              if (!rejectReason.trim()) return;
              try {
                await setApproval({ campaignId: requestViewModel.id, approval: 'rejected', token: session?.accessToken }).unwrap();
                setFeedback({ type: 'success', message: 'Campaign request has been rejected.' });
                setShowRejectModal(false);
                // Refresh data to reflect new status
                // navigate back after a short delay
                setTimeout(() => router.push('/blood_bank/campaigns'), 800);
              } catch {
                setFeedback({ type: 'error', message: 'Failed to reject the campaign. Please try again.' });
              }
            }}
            handleAccept={async () => {
              try {
                await setApproval({ campaignId: requestViewModel.id, approval: 'accepted', token: session?.accessToken }).unwrap();
                setFeedback({ type: 'success', message: 'Campaign request has been accepted.' });
                // navigate back after a short delay
                setTimeout(() => router.push('/blood_bank/campaigns'), 800);
              } catch {
                setFeedback({ type: 'error', message: 'Failed to accept the campaign. Please try again.' });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
