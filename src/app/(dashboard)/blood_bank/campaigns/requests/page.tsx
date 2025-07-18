"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaClock, FaExclamationTriangle,
  FaCheck, FaTimes, FaSearch
} from 'react-icons/fa';
import { BackButton, Button } from '@/components';

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

  const handleAvailabilityCheck = () => {
    setIsCheckingAvailability(true);
    setTimeout(() => {
      setIsCheckingAvailability(false);
      setAvailabilityChecked(true);
    }, 2000);
  };

  const handleAccept = () => {
    console.log('Campaign accepted:', campaignRequest.id);
    alert('Campaign request has been accepted successfully!');
    router.push('/blood_bank/campaigns');
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    console.log('Campaign rejected:', campaignRequest.id, 'Reason:', rejectReason);
    setShowRejectModal(false);
    alert('Campaign request has been rejected.');
    router.push('/blood_bank/campaigns');
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <BackButton fallbackUrl="/blood_bank/campaigns/requests" className="hover:shadow-md" />
        </div>

        {/* Combined Campaign and Organizer Info */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Campaign Info - 2/3 */}
          <div className="w-full lg:w-2/3 space-y-4 bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800 mb-3">{campaignRequest.campaignTitle}</h1>
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(campaignRequest.status)}`}>
                    {campaignRequest.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(campaignRequest.urgency)}`}>
                    <FaExclamationTriangle className="inline mr-1" />
                    {campaignRequest.urgency} Priority
                  </span>
                </div>
                
                {/* Date, Time, and Location */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaCalendarAlt className="text-gray-500 text-sm" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">Date</p>
                      <p className="text-sm font-semibold">{formatDate(campaignRequest.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaClock className="text-gray-500 text-sm" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">Time</p>
                      <p className="text-sm font-semibold">{campaignRequest.startTime} - {campaignRequest.endTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-gray-500 text-sm" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">Location</p>
                      <p className="text-sm font-semibold">{campaignRequest.location}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <p>Request ID: <span className="font-medium">{campaignRequest.id}</span></p>
                <p>Submitted: <span className="font-medium">{campaignRequest.requestTime}</span></p>
              </div>
            </div>
            <p className="text-gray-600">{campaignRequest.description}</p>
          </div>

          {/* Organizer Info - 1/3 */}
          <div className="w-full lg:w-1/3 space-y-4 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800">Organizer Information</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Organization</p>
                <p className="font-semibold text-gray-800">{campaignRequest.organizerName}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Contact Number</p>
                <p className="font-semibold text-gray-800">{campaignRequest.contactNumber}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="font-semibold text-gray-800">{campaignRequest.organizerEmail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col gap-3">
          {/* Left Column - Campaign Requirements */}
          <div className="space-y-6">
            {/* Campaign Requirements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Campaign Requirements</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div>
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
              </div>
            </div>
          </div>

          {/* Right Column - Availability & Actions */}
          <div className="space-y-6">
            {/* Availability Check */}
            <div className="bg-white rounded-lg shadow-sm p-4 flex justify-between">

              {!isCheckingAvailability && !availabilityChecked ? (
                <div className="text-center py-2 flex justify-between w-full">
                  <p className="text-gray-500 mb-4">Check availability for the requested date and time</p>
                  <Button
                    title="Check Availability"
                    containerStyles="w-1/4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
                    handleClick={handleAvailabilityCheck}
                    leftIcon={<FaSearch />}
                  />
                </div>
              ) : isCheckingAvailability ? (
                <div className="text-center py-6 w-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-500">Checking availability...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600 mb-4">
                    <span className="font-medium">Date & Time Available</span>
                  </div>

                  <div className="space-y-3 flex gap-6">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">Staff Available</p>
                      <p className="text-sm font-semibold text-gray-800">8 members</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">Equipment Status</p>
                      <p className="text-sm font-semibold text-gray-800">Available</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">Mobile Unit</p>
                      <p className="text-sm text-gray-600">Unit #3 available for deployment</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {availabilityChecked && (
              <div className="p-6">
                <div className="flex gap-4">
                  <Button
                    title="Reject Campaign"
                    containerStyles="w-1/5 bg-red-50 text-red-500 border border-red-500 hover:bg-red-100 font-medium py-1 px-2 rounded-lg"
                    handleClick={() => setShowRejectModal(true)}
                    leftIcon={<FaTimes />}
                  />
                  <Button
                    title="Accept Campaign"
                    containerStyles="w-1/5 bg-green-50 text-green-600 border border-green-600 hover:bg-green-100 font-medium py-1 px-2 rounded-lg"
                    handleClick={handleAccept}
                    leftIcon={<FaCheck />}
                  />

                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Reject Campaign Request</h3>
            <p className="text-gray-600 mb-4">Please provide a reason for rejecting this campaign request:</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <div className="flex justify-end gap-3 mt-4">
              <Button
                title="Cancel"
                containerStyles="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                handleClick={() => setShowRejectModal(false)}
              />
              <Button
                title="Reject"
                containerStyles="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                handleClick={handleReject}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}