import React from 'react';
import { Calendar, Phone, Building, Clock, AlertCircle } from 'lucide-react';
import { BloodRequest, RequestStatus } from '../../../types';

interface Props {
  request: BloodRequest;
  requestStatus: RequestStatus;
}

export const RequestDetailsCard: React.FC<Props> = ({ request, requestStatus }) => {
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
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Request Details</h1>
            <p className="text-sm text-gray-500">Blood request from {request.hospital}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(requestStatus)}`}>
              {getStatusText(requestStatus)}
            </span>
            <span className="text-sm text-gray-500">{request.requestTime}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Blood Unit Request</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(request.priority)}`}>
            {request.priority} Priority
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500">Blood Group</p>
            <p className="font-semibold text-lg text-red-600">{request.bloodGroup}</p>
          </div>

          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Quantity Required</p>
              <p className="font-semibold text-lg text-gray-900">{request.quantity} units</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Requested Date</p>
              <p className="font-medium text-gray-900">{request.requestedDate}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg w-1/3">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-sm text-orange-600 font-medium">Deadline</p>
              <p className="font-semibold text-orange-800">{request.deadline}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-start gap-3">
            <Building className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Hospital</p>
              <p className="font-medium text-gray-900">{request.hospital}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Contact Details</p>
              <p className="font-medium text-gray-900">{request.contactDetails.phone}</p>
              <p className="text-sm text-gray-500">{request.contactDetails.email}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Reason for Request</p>
          <p className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg">{request.reason}</p>
        </div>
      </div>
    </>
  );
};