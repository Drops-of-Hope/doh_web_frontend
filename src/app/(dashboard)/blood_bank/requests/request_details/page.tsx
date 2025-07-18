"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Phone, Building, User, Droplets } from 'lucide-react';
import { AvailabilityChecker, ActionButtons, RejectionSection } from '@/components';

// Types
interface ContactDetails {
  phone: string;
  email: string;
}

interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: string;
  quantity: number;
  requestedDate: string;
  hospital: string;
  contactDetails: ContactDetails;
  priority: 'High' | 'Medium' | 'Low';
  requestTime: string;
  reason: string;
}

interface AvailabilityData {
  available: boolean;
  currentStock: number;
  requestedQuantity: number;
  bloodType: string;
  estimatedDeliveryTime: string;
}

type RequestStatus = 'pending' | 'accepted' | 'rejected';

// Mock data for the request details
const mockRequestData: BloodRequest = {
  id: '1',
  patientName: 'John Smith',
  bloodGroup: 'O+',
  quantity: 4,
  requestedDate: '2024-01-20',
  hospital: 'City Hospital',
  contactDetails: {
    phone: '+1 (555) 123-4567',
    email: 'emergency@cityhospital.com'
  },
  priority: 'High',
  requestTime: '2 hours ago',
  reason: 'Emergency surgery required'
};

export default function RequestDetailsPage() {
  const router = useRouter();
  const [showAvailability, setShowAvailability] = useState(false);
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData | null>(null);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('pending');
  const [hasCheckedAvailability, setHasCheckedAvailability] = useState(false);
  const [showRejectionSection, setShowRejectionSection] = useState(false);

  const handleBackClick = () => {
    router.push('/blood_bank/requests');
  };

  const handleCheckAvailability = async () => {
    // Mock availability check
    const mockAvailability: AvailabilityData = {
      available: Math.random() > 0.3, // 70% chance of being available
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
    setShowAvailability(false); // Close the availability checker
    console.log('Request accepted:', mockRequestData.id);
  };

  const handleRejectClick = () => {
    setShowRejectionSection(true);
    setShowAvailability(false); // Close the availability checker
  };

  const handleReject = (reason: string) => {
    setRequestStatus('rejected');
    setShowRejectionSection(false);
    console.log('Request rejected:', mockRequestData.id, 'Reason:', reason);
  };

  const getStatusColor = (status: RequestStatus): string => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: RequestStatus): string => {
    switch (status) {
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      default: return 'Pending';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4 pb-24">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackClick}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Request Details</h1>
              <p className="text-sm text-gray-500">Blood request from {mockRequestData.hospital}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(requestStatus)}`}>
              {getStatusText(requestStatus)}
            </span>
            <span className="text-sm text-gray-500">{mockRequestData.requestTime}</span>
          </div>
        </div>
      </div>

      {/* Request Details Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Patient Name</p>
                <p className="font-medium text-gray-900">{mockRequestData.patientName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-500">Blood Group</p>
                <p className="font-medium text-gray-900">{mockRequestData.bloodGroup}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Requested Date</p>
                <p className="font-medium text-gray-900">{mockRequestData.requestedDate}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Hospital</p>
                <p className="font-medium text-gray-900">{mockRequestData.hospital}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Contact Details</p>
                <p className="font-medium text-gray-900">{mockRequestData.contactDetails.phone}</p>
                <p className="text-sm text-gray-500">{mockRequestData.contactDetails.email}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Quantity Required</p>
              <p className="font-medium text-gray-900">{mockRequestData.quantity} units</p>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">Reason for Request</p>
          <p className="font-medium text-gray-900">{mockRequestData.reason}</p>
        </div>
      </div>

      {/* Rejection Section - Shows inline below main content */}
      {showRejectionSection && (
        <RejectionSection onReject={handleReject} />
      )}

      {/* Availability Checker */}
      {showAvailability && (
        <AvailabilityChecker 
          availabilityData={availabilityData}
          onClose={() => setShowAvailability(false)}
          onAccept={handleAccept}
          onReject={handleRejectClick}
          requestStatus={requestStatus}
        />
      )}

      {/* Action Buttons */}
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