"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUsers, FaCheck } from 'react-icons/fa';
import { BackButton, CampaignDetailsLayout, CampaignAvailabilityActions } from '@/components';

export default function CampaignRequestDetails() {
  const router = useRouter();

  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const campaignRequest = {
    id: '#CR001',
    organizerName: 'Red Cross Society',
    campaignTitle: 'Emergency Blood Drive - City Hospital',
    date: '2025-07-15',
    location: 'City Hospital, Downtown',
    expectedDonors: 150,
    contactNumber: '+94 77 123 4567',
    requestTime: '2:15 PM',
    status: 'Pending',
    urgency: 'High',
    description: 'Urgent blood drive campaign needed due to recent accidents and increased demand. We need all blood types but especially O-negative and AB-positive.',
    startTime: '9:00 AM',
    endTime: '5:00 PM',
    bloodTypesNeeded: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    organizerEmail: 'coordinator@redcross.lk',
    facilities: ['Registration area', 'Medical screening', 'Donation beds (10)', 'Recovery area', 'Refreshment station'],
    notes: 'Please provide mobile donation unit and additional medical staff as this is a high-volume campaign.'
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <BackButton fallbackUrl="/blood_bank/campaigns/requests" className="hover:shadow-md" />
        </div>

        <CampaignDetailsLayout
          campaignRequest={campaignRequest}
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
                  <FaUsers className="text-blue-500 text-lg" />
                  <p className="text-sm font-medium text-blue-700">Expected Donors</p>
                </div>
                <p className="text-2xl font-bold text-blue-800">{campaignRequest.expectedDonors}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm font-medium text-red-700 mb-2">Blood Types Needed</p>
                <div className="flex flex-wrap gap-1">
                  {campaignRequest.bloodTypesNeeded.map((type) => (
                    <span key={type} className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm font-medium text-gray-700 mb-3">Required Facilities</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {campaignRequest.facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                  <FaCheck className="text-green-500 text-sm" />
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
            handleReject={() => {
              if (!rejectReason.trim()) return;
              console.log('Campaign rejected:', campaignRequest.id, 'Reason:', rejectReason);
              setShowRejectModal(false);
              router.push('/blood_bank/campaigns');
            }}
            handleAccept={() => {
              console.log('Campaign accepted:', campaignRequest.id);
              router.push('/blood_bank/campaigns');
            }}
          />
        </div>
      </div>
    </div>
  );
}
