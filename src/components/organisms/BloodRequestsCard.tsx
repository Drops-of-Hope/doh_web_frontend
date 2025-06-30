import React from 'react';
import { FaMapMarkerAlt, FaExclamationTriangle, FaUser, FaHeart } from 'react-icons/fa';

interface BloodRequest {
  id: string;
  patientName?: string;
  bloodType: string;
  unitsNeeded: number;
  urgency: string;
  hospital: string;
  location: string;
  contactNumber: string;
  requestTime?: string;
  sentTime?: string;
  status: string;
  donorsNotified?: number;
  responses?: number;
}

interface BloodRequestsCardProps {
  title: string;
  requests: BloodRequest[];
  showEmergencyFormat?: boolean;
}

const BloodRequestsCard: React.FC<BloodRequestsCardProps> = ({ 
  title, 
  requests, 
  showEmergencyFormat = false 
}) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'text-red-600 bg-red-50';
      case 'High': return 'text-orange-600 bg-orange-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-50';
      case 'Fulfilled': return 'text-blue-600 bg-blue-50';
      case 'Expired': return 'text-gray-600 bg-gray-50';
      case 'Pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4 w-1/2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          See more
        </button>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            {showEmergencyFormat ? (
              <>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-500" />
                    <span className="font-medium text-gray-800">{request.id}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status}
                  </div>
                </div>
                
                <div className="flex flex-col text-sm text-gray-600 space-y-2">
                  <div className='flex justify-between space-x-4'>
                    <div className='text-red-600'>
                      <span className="font-medium">Blood Type:</span> {request.bloodType}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{request.hospital}, {request.location}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span><FaUser className="inline mr-1" />{request.donorsNotified} notified</span>
                      <span><FaHeart className="inline mr-1 text-red-400" />{request.responses} responses</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Sent at:</span> {request.sentTime}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex flex-col text-sm text-gray-600 space-y-2">
                    <div className='flex flex-between space-x-4'>
                      <div className='text-red-600'>
                        <span className="font-medium">Blood Type:</span> {request.bloodType}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>{request.hospital}, {request.location}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="font-medium">Requested at:</span> {request.requestTime}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodRequestsCard;