"use client";

import React, { useState } from 'react';
import { AvailabilityChecker, ActionButtons, RejectionSection, BackButton, RequestDetailsCard } from '@/components';
import { BloodRequest, AvailabilityData, RequestStatus } from '../../../../../../types';

const mockRequestData: BloodRequest = {
  id: '1',
  patientName: 'John Smith',
  bloodGroup: 'O+',
  quantity: 4,
  requestedDate: '2024-01-20',
  deadline: '2024-01-21 10:00 AM',
  hospital: 'City Hospital',
  contactDetails: {
    phone: '011-123-4567',
    email: 'emergency@cityhospital.com'
  },
  priority: 'High',
  requestTime: '2 hours ago',
  reason: 'Emergency surgery required'
};

export default function RequestDetailsPage() {
  const [showAvailability, setShowAvailability] = useState(false);
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData | null>(null);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('pending');
  const [hasCheckedAvailability, setHasCheckedAvailability] = useState(false);
  const [showRejectionSection, setShowRejectionSection] = useState(false);

  const handleCheckAvailability = async () => {
    const mockAvailability: AvailabilityData = {
      available: Math.random() > 0.3,
      currentStock: Math.floor(Math.random() * 10) + 1,
      requestedQuantity: mockRequestData.quantity,
      bloodType: mockRequestData.bloodGroup,
      estimatedDeliveryTime: '2-4 hours'
    };

    setAvailabilityData(mockAvailability);
    setShowAvailability(true);
    setHasCheckedAvailability(true);
  };

  const handleAccept = () => {
    setRequestStatus('accepted');
    setShowRejectionSection(false);
    setShowAvailability(false);
    console.log('Request accepted:', mockRequestData.id);
  };

  const handleRejectClick = () => {
    setShowRejectionSection(true);
    setShowAvailability(false);
  };

  const handleReject = (reason: string) => {
    setRequestStatus('rejected');
    setShowRejectionSection(false);
    console.log('Request rejected:', mockRequestData.id, 'Reason:', reason);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4 pb-24">
      <div className="mb-6">
        <BackButton 
          fallbackUrl="/blood_bank/requests/request_details"
          className="hover:shadow-md"
        />
      </div>

      <RequestDetailsCard 
        request={mockRequestData}
        requestStatus={requestStatus}
      />

      {showRejectionSection && (
        <RejectionSection onReject={handleReject} />
      )}

      {showAvailability && (
        <AvailabilityChecker 
          availabilityData={availabilityData}
          onClose={() => setShowAvailability(false)}
          onAccept={handleAccept}
          onReject={handleRejectClick}
          requestStatus={requestStatus}
        />
      )}

      <ActionButtons
        requestStatus={requestStatus}
        onCheckAvailability={handleCheckAvailability}
        onAccept={handleAccept}
        onReject={handleRejectClick}
        hasCheckedAvailability={hasCheckedAvailability}
      />
    </div>
  );
}
