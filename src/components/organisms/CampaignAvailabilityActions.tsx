"use client";
import React from 'react';
import { FaSearch, FaTimes, FaCheck } from 'react-icons/fa';
import { Button } from '@/components';

interface Props {
  availabilityChecked: boolean;
  isCheckingAvailability: boolean;
  setAvailabilityChecked: (val: boolean) => void;
  setIsCheckingAvailability: (val: boolean) => void;
  showRejectModal: boolean;
  setShowRejectModal: (val: boolean) => void;
  rejectReason: string;
  setRejectReason: (val: string) => void;
  handleReject: () => void;
  handleAccept: () => void;
}

export default function CampaignAvailabilityActions({
  availabilityChecked,
  isCheckingAvailability,
  setAvailabilityChecked,
  setIsCheckingAvailability,
  showRejectModal,
  setShowRejectModal,
  rejectReason,
  setRejectReason,
  handleReject,
  handleAccept
}: Props) {
  const handleAvailabilityCheck = () => {
    setIsCheckingAvailability(true);
    setTimeout(() => {
      setIsCheckingAvailability(false);
      setAvailabilityChecked(true);
    }, 2000);
  };

  return (
    <>
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
    </>
  );
}
