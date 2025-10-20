"use client";

import React, { useMemo, useState } from 'react';
import { Heart, ArrowUp, ArrowDown, Clock, Plus, Truck } from 'lucide-react';
import { MetricCard, Button } from '@/components';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useGetIncomingPendingRequestsQuery, useGetOutgoingPendingRequestsQuery, useGetRequestsSummaryQuery } from '@/store/api/RequestsApi';

type TabType = 'incoming' | 'outgoing';

export default function RequestPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const medicalEstablishmentId = session?.decodedIdToken?.sub;
  const [activeTab, setActiveTab] = useState<TabType>('incoming');

  const handleNewRequest = (): void => {
    router.push('/blood_bank/requests/request_form');
  };

  const handleManageTransits = (): void => {
    router.push('/blood_bank/requests/transit');
  };

  const handleTabChange = (tab: TabType): void => {
    setActiveTab(tab);
  };

  // Fetch summary
  const { data: summaryData } = useGetRequestsSummaryQuery(
    { medicalEstablishmentId: medicalEstablishmentId ?? '' },
    { skip: !medicalEstablishmentId }
  );

  // Fetch incoming (recipient)
  const { data: incomingData, isLoading: incomingLoading, isError: incomingError } = useGetIncomingPendingRequestsQuery(
    { medicalEstablishmentId: medicalEstablishmentId ?? '' },
    { skip: !medicalEstablishmentId }
  );

  // Fetch outgoing (requester). The endpoint expects bloodBankId; using same id
  const { data: outgoingData, isLoading: outgoingLoading, isError: outgoingError } = useGetOutgoingPendingRequestsQuery(
    { medicalEstablishmentId: medicalEstablishmentId ?? '' },
    { skip: !medicalEstablishmentId }
  );

  const incomingRequests = useMemo(() => incomingData?.data ?? [], [incomingData]);
  const outgoingRequests = useMemo(() => outgoingData?.data ?? [], [outgoingData]);

  return (
    <div className="min-h-[100vh] p-4 bg-[#f8f8f8]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          iconBgColor="#EF4444"
          heading="Total Requests"
          body="All blood requests"
          count={summaryData?.data?.total ?? (incomingRequests.length + outgoingRequests.length)}
          icon={<Heart className="w-6 h-6 text-white" />}
        />
        
        <MetricCard
          iconBgColor="#F59E0B"
          heading="Incoming Requests"
          body="From hospitals & banks"
          count={summaryData?.data?.incoming ?? incomingRequests.length}
          icon={<ArrowDown className="w-6 h-6 text-white" />}
        />
        
        <MetricCard
          iconBgColor="#10B981"
          heading="Outgoing Requests"
          body="To donors & facilities"
          count={summaryData?.data?.outgoing ?? outgoingRequests.length}
          icon={<ArrowUp className="w-6 h-6 text-white" />}
        />
        
        <MetricCard
          iconBgColor="#8B5CF6"
          heading="In Transit"
          body="Currently being delivered"
          count={summaryData?.data?.inTransit ?? 0}
          icon={<Clock className="w-6 h-6 text-white" />}
        />
      </div>
      
      <div className="flex justify-end mb-6 gap-3">
        <Button
          title="Manage Transits"
          containerStyles="bg-blue-50 hover:bg-blye-100 text-blue-500 border border-blue-500 rounded-lg font-medium transition-colors"
          handleClick={handleManageTransits}
          leftIcon={<Truck className="w-5 h-5" />}
          iconSpacing="gap-2"
        />
        <Button
          title="New Request"
          containerStyles="bg-blue-500 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          handleClick={handleNewRequest}
          leftIcon={<Plus className="w-5 h-5" />}
          iconSpacing="gap-2"
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-2">
        <div className='flex items-center justify-center'>
            <div className="flex border-b border-gray-200 w-2/3 items-center justify-center rounded-full shadow-sm">
            <button
                onClick={() => handleTabChange('incoming')}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === 'incoming'
                    ? 'text-blue-600 border-b-3 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
            >
                <ArrowDown className="w-5 h-5" />
                Incoming Requests
            </button>
            <button
                onClick={() => handleTabChange('outgoing')}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === 'outgoing'
                    ? 'text-blue-600 border-b-3 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
            >
                <ArrowUp className="w-5 h-5" />
                Outgoing Requests
            </button>
            </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 text-gray-600">
          {activeTab === 'incoming' ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">Incoming Requests</h3>
              {incomingLoading && (
                <div className="bg-white rounded-lg shadow-sm p-6">Loading incoming requests...</div>
              )}
              {incomingError && (
                <div className="bg-white rounded-lg shadow-sm p-6 text-red-600">Failed to load incoming requests.</div>
              )}
              {!incomingLoading && !incomingError && (
                <div className="space-y-4">
                  {incomingRequests.length === 0 && (
                    <div className="p-4 border border-gray-200 rounded-lg text-gray-500">No incoming requests.</div>
                  )}
                  {incomingRequests.map((req) => (
                    <div key={req.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => router.push(`/blood_bank/requests/request_details?id=${req.id}`)}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{req.requestingBloodBank?.name || 'Unknown Requester'}</h4>
                        <span className="text-sm text-gray-500">{new Date(req.createdAt || '').toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Blood Type: {req.bloodGroup?.replace('_', ' ').replace('POSITIVE','+').replace('NEGATIVE','-')} | Quantity: {req.unitsRequired} units</p>
                      <p className="text-sm text-gray-600">Priority: {req.urgencyLevel?.toLowerCase() === 'high' ? 'High' : req.urgencyLevel?.toLowerCase() === 'medium' ? 'Medium' : 'Low'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4">Outgoing Requests</h3>
              {outgoingLoading && (
                <div className="bg-white rounded-lg shadow-sm p-6">Loading outgoing requests...</div>
              )}
              {outgoingError && (
                <div className="bg-white rounded-lg shadow-sm p-6 text-red-600">Failed to load outgoing requests.</div>
              )}
              {!outgoingLoading && !outgoingError && (
                <div className="space-y-4">
                  {outgoingRequests.length === 0 && (
                    <div className="p-4 border border-gray-200 rounded-lg text-gray-500">No outgoing requests.</div>
                  )}
                  {outgoingRequests.map((req) => (
                    <div key={req.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{req.medicalEstablishment?.name || 'Unknown Recipient'}</h4>
                        <span className="text-sm text-gray-500">{new Date(req.createdAt || '').toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Blood Type: {req.bloodGroup?.replace('_', ' ').replace('POSITIVE','+').replace('NEGATIVE','-')} | Quantity: {req.unitsRequired} units</p>
                      <p className="text-sm text-gray-600">Status: {req.status?.toLowerCase().replace(/^./, (c) => c.toUpperCase())}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}