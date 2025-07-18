"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaPhone, FaClock, FaExclamationTriangle, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import { BackButton, Button } from '@/components';

export default function CampaignRequestDetails() {
  const router = useRouter();
  
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Hardcoded data matching the first campaign request
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
    
    // Simulate API call
    setTimeout(() => {
      setIsCheckingAvailability(false);
      setAvailabilityChecked(true);
    }, 2000);
  };

  const handleAccept = () => {
    // Handle campaign acceptance
    console.log('Campaign accepted:', campaignRequest.id);
    alert('Campaign request has been accepted successfully!');
    router.push('/blood_bank/campaigns');
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    
    // Handle campaign rejection
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

  return (
    <div className="min-h-[100vh] p-4 bg-[#f8f8f8]">
      <div className="mb-6">
        <BackButton fallbackUrl="/blood_bank/campaigns" className="hover:shadow-md" />
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{campaignRequest.campaignTitle}</h1>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(campaignRequest.status)}`}>
                  {campaignRequest.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(campaignRequest.urgency)}`}>
                  <FaExclamationTriangle className="inline mr-1" />
                  {campaignRequest.urgency} Priority
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Request ID</p>
              <p className="font-mono text-lg font-semibold">{campaignRequest.id}</p>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">{campaignRequest.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <FaCalendarAlt className="text-blue-500" />
              <div>
                <p className="text-sm font-medium">Date</p>
                <p>{campaignRequest.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaClock className="text-green-500" />
              <div>
                <p className="text-sm font-medium">Time</p>
                <p>{campaignRequest.startTime} - {campaignRequest.endTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt className="text-red-500" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p>{campaignRequest.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaign Details */}
          <div className="space-y-6">
            {/* Organizer Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Organizer Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaUsers className="text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Organization</p>
                    <p className="font-medium">{campaignRequest.organizerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Contact Number</p>
                    <p className="font-medium">{campaignRequest.contactNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Request Submitted</p>
                    <p className="font-medium">{campaignRequest.requestTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Requirements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Campaign Requirements</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Expected Donors</p>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-blue-500" />
                    <span className="text-lg font-semibold">{campaignRequest.expectedDonors}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Blood Types Needed</p>
                  <div className="flex flex-wrap gap-2">
                    {campaignRequest.bloodTypesNeeded.map((type) => (
                      <span key={type} className="px-2 py-1 bg-red-50 text-red-600 text-sm font-medium rounded-md border border-red-200">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Required Facilities</p>
                  <ul className="space-y-1">
                    {campaignRequest.facilities.map((facility, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCheck className="text-green-500 text-xs" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Additional Notes</p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{campaignRequest.notes}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Availability Check & Actions */}
          <div className="space-y-6">
            {/* Availability Check */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Availability Check</h2>
              
              {!isCheckingAvailability && !availabilityChecked ? (
                <div className="text-center py-6">
                  <FaSearch className="text-4xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Check availability for the requested date and time</p>
                  <Button
                    title="Check Availability"
                    containerStyles="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg"
                    handleClick={handleAvailabilityCheck}
                    leftIcon={<FaSearch />}
                  />
                </div>
              ) : isCheckingAvailability ? (
                <div className="text-center py-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-500">Checking availability...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <FaCheck className="text-lg" />
                    <span className="font-medium">Date & Time Available</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-700">Staff Available</p>
                      <p className="text-lg font-semibold text-green-800">8 members</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-700">Equipment</p>
                      <p className="text-lg font-semibold text-green-800">Available</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-700">Mobile Unit</p>
                    <p className="text-sm text-blue-600">Unit #3 available for deployment</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {availabilityChecked && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Actions</h2>
                <div className="space-y-3">
                  <Button
                    title="Accept Campaign Request"
                    containerStyles="w-full bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg"
                    handleClick={handleAccept}
                    leftIcon={<FaCheck />}
                  />
                  <Button
                    title="Reject Campaign Request"
                    containerStyles="w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg"
                    handleClick={() => setShowRejectModal(true)}
                    leftIcon={<FaTimes />}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
