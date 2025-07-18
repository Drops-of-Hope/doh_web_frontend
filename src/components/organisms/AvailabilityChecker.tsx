import React from 'react';
import { CheckCircle, XCircle, Clock, X, Search } from 'lucide-react';

interface AvailabilityData {
  available: boolean;
  currentStock: number;
  requestedQuantity: number;
  bloodType: string;
  estimatedDeliveryTime: string;
}

interface AvailabilityCheckerProps {
  availabilityData: AvailabilityData | null;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
  requestStatus: 'pending' | 'accepted' | 'rejected';
}

// Button component
interface ButtonProps {
  title: string;
  containerStyles: string;
  handleClick: () => void;
  leftIcon?: React.ReactNode;
  iconSpacing?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  containerStyles, 
  handleClick, 
  leftIcon, 
  iconSpacing = 'gap-2', 
  disabled = false 
}) => (
  <button
    onClick={handleClick}
    disabled={disabled}
    className={`px-4 py-2 ${iconSpacing} flex items-center justify-center ${containerStyles}`}
  >
    {leftIcon}
    {title}
  </button>
);

export const AvailabilityChecker: React.FC<AvailabilityCheckerProps> = ({ 
  availabilityData, 
  onClose,
  onAccept,
  onReject,
  requestStatus
}) => {
  if (!availabilityData) return null;

  const { available, currentStock, requestedQuantity, bloodType, estimatedDeliveryTime } = availabilityData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Availability Check</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Availability Status */}
          <div className="mb-6">
            <div className={`flex items-center gap-3 p-4 rounded-lg ${
              available ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              {available ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
              <div>
                <p className={`font-semibold ${available ? 'text-green-800' : 'text-red-800'}`}>
                  {available ? 'Available' : 'Not Available'}
                </p>
                <p className={`text-sm ${available ? 'text-green-600' : 'text-red-600'}`}>
                  {available 
                    ? `${bloodType} blood type is available for the requested quantity`
                    : `Insufficient ${bloodType} blood type in stock`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Blood Type</p>
              <p className="font-semibold text-gray-900">{bloodType}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Current Stock</p>
              <p className="font-semibold text-gray-900">{currentStock} units</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Requested Quantity</p>
              <p className="font-semibold text-gray-900">{requestedQuantity} units</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <p className={`font-semibold ${available ? 'text-green-600' : 'text-red-600'}`}>
                {available ? 'In Stock' : 'Insufficient Stock'}
              </p>
            </div>
          </div>

          {/* Estimated Delivery Time */}
          {available && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-800">Estimated Delivery Time</p>
                  <p className="text-sm text-blue-600">{estimatedDeliveryTime}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons - Only show if request is still pending */}
          {requestStatus === 'pending' && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                title="Accept Request"
                containerStyles="bg-green-500 hover:bg-green-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 flex-1"
                handleClick={onAccept}
                leftIcon={<CheckCircle className="w-5 h-5" />}
                iconSpacing="gap-2"
              />
              <Button
                title="Reject Request"
                containerStyles="bg-red-500 hover:bg-red-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 flex-1"
                handleClick={onReject}
                leftIcon={<XCircle className="w-5 h-5" />}
                iconSpacing="gap-2"
              />
            </div>
          )}

          {/* Status Message */}
          {requestStatus === 'accepted' && (
            <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-3 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Request Accepted</span>
              </div>
            </div>
          )}

          {requestStatus === 'rejected' && (
            <div className="bg-red-100 border border-red-300 text-red-800 px-6 py-3 rounded-lg">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                <span className="font-medium">Request Rejected</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};