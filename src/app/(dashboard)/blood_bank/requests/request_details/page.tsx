"use client";

import React, { useState } from 'react';
import { Calendar, Phone, Building, Clock, AlertCircle } from 'lucide-react';
import { AvailabilityChecker, ActionButtons, RejectionSection, BackButton } from '@/components';

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
  deadline: string;
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

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4 pb-24">
      {/* Header */}
      <div className="mb-6">
                  <BackButton 
                    fallbackUrl="/blood_bank/requests/request_details"
                    className="hover:shadow-md"
                  />
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Request Details</h1>
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Blood Unit Request</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(mockRequestData.priority)}`}>
            {mockRequestData.priority} Priority
          </span>
        </div>

        {/* Blood Request Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="flex items-start gap-3">
            <div>
              <p className="text-sm text-gray-500">Blood Group</p>
              <p className="font-semibold text-lg text-red-600">{mockRequestData.bloodGroup}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Quantity Required</p>
              <p className="font-semibold text-lg text-gray-900">{mockRequestData.quantity} units</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Requested Date</p>
              <p className="font-medium text-gray-900">{mockRequestData.requestedDate}</p>
            </div>
          </div>
        </div>

        {/* Deadline Section */}
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg w-1/3">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-sm text-orange-600 font-medium">Deadline</p>
              <p className="font-semibold text-orange-800">{mockRequestData.deadline}</p>
            </div>
          </div>
        </div>

        {/* Hospital and Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-start gap-3">
            <Building className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Hospital</p>
              <p className="font-medium text-gray-900">{mockRequestData.hospital}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Contact Details</p>
              <p className="font-medium text-gray-900">{mockRequestData.contactDetails.phone}</p>
              <p className="text-sm text-gray-500">{mockRequestData.contactDetails.email}</p>
            </div>
          </div>
        </div>

        {/* Reason Section */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Reason for Request</p>
          <p className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg">{mockRequestData.reason}</p>
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