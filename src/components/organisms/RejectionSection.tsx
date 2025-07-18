"use client"
import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

// Button component
interface ButtonProps {
  title: string;
  containerStyles: string;
  handleClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  containerStyles, 
  handleClick, 
  disabled = false 
}) => (
  <button
    onClick={handleClick}
    disabled={disabled}
    className={`px-4 py-2 flex items-center justify-center ${containerStyles}`}
  >
    {title}
  </button>
);

// Types
interface RejectionSectionProps {
  onReject: (reason: string) => void;
}

export const RejectionSection: React.FC<RejectionSectionProps> = ({ onReject }) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const predefinedReasons = [
    'Insufficient blood stock',
    'Blood type not available',
    'Request information incomplete',
    'Priority conflict with other requests',
    'Delivery logistics not feasible',
    'Quality concerns',
    'Other'
  ];

  const handleReject = () => {
    const finalReason = selectedReason === 'Other' ? rejectionReason : selectedReason;
    if (finalReason.trim()) {
      onReject(finalReason);
    }
  };

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
    if (reason !== 'Other') {
      setRejectionReason('');
    }
  };

  const isSubmitDisabled = !selectedReason || (selectedReason === 'Other' && !rejectionReason.trim());

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-red-500">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-semibold text-gray-900">Reject Request</h3>
      </div>

      {/* Warning Message */}
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
        <p className="text-sm text-red-800">
          Please provide a reason for rejecting this blood request. This will help improve our service and inform the requesting hospital.
        </p>
      </div>

      {/* Predefined Reasons */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">Select a reason:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {predefinedReasons.map((reason) => (
            <label 
              key={reason} 
              className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="rejectionReason"
                value={reason}
                checked={selectedReason === reason}
                onChange={() => handleReasonSelect(reason)}
                className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">{reason}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Custom Reason Input */}
      {selectedReason === 'Other' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Please specify the reason:
          </label>
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter your reason for rejection..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          title="Submit Rejection"
          containerStyles={`rounded-lg font-medium transition-colors px-6 py-3 ${
            isSubmitDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-700 text-white'
          }`}
          handleClick={handleReject}
          disabled={isSubmitDisabled}
        />
      </div>
    </div>
  );
};