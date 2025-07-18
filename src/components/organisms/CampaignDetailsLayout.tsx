'use client';
import React from 'react';
import {
  FaCalendarAlt, FaClock, FaMapMarkerAlt, FaExclamationTriangle,
} from 'react-icons/fa';

interface CampaignRequest {
  id: string;
  organizerName: string;
  campaignTitle: string;
  date: string;
  location: string;
  expectedDonors: number;
  contactNumber: string;
  requestTime: string;
  status: string;
  urgency: string;
  description: string;
  startTime: string;
  endTime: string;
  bloodTypesNeeded: string[];
  organizerEmail: string;
  facilities: string[];
  notes: string;
}

interface Props {
  campaignRequest: CampaignRequest;
  formatDate: (dateString: string) => string;
  getStatusColor: (status: string) => string;
  getUrgencyColor: (urgency: string) => string;
}

export default function CampaignDetailsLayout({
  campaignRequest,
  formatDate,
  getStatusColor,
  getUrgencyColor,
}: Props) {
  return (
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
          </div>
          <div className="text-sm text-gray-500">
            <p>Request ID: <span className="font-medium">{campaignRequest.id}</span></p>
            <p>Submitted: <span className="font-medium">{campaignRequest.requestTime}</span></p>
          </div>
          
        </div>
        <div className="text-gray-600">{campaignRequest.description}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-4">
              <div className="flex items-center gap-4 text-gray-600">
                <FaCalendarAlt className="text-gray-500 text-sm" />
                <div>
                  <p className="text-xs font-medium text-gray-500">Date</p>
                  <p className="text-sm font-semibold">{formatDate(campaignRequest.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <FaClock className="text-gray-500 text-sm" />
                <div>
                  <p className="text-xs font-medium text-gray-500">Time</p>
                  <p className="text-sm font-semibold">{campaignRequest.startTime} - {campaignRequest.endTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <FaMapMarkerAlt className="text-gray-500 text-sm" />
                <div>
                  <p className="text-xs font-medium text-gray-500">Location</p>
                  <p className="text-sm font-semibold">{campaignRequest.location}</p>
                </div>
              </div>
            </div>
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
  );
}
