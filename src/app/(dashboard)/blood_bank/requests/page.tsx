"use client";

import React, { useState } from 'react';
import { Heart, ArrowUp, ArrowDown, Clock, Plus, Truck } from 'lucide-react';
import { MetricCard, Button } from '@/components';
import { useRouter } from 'next/navigation';

type TabType = 'incoming' | 'outgoing';

export default function RequestPage() {
  const router = useRouter();
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

  return (
    <div className="min-h-[100vh] p-4 bg-[#f8f8f8]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          iconBgColor="#EF4444"
          heading="Total Requests"
          body="All blood requests"
          count={127}
          icon={<Heart className="w-6 h-6 text-white" />}
        />
        
        <MetricCard
          iconBgColor="#F59E0B"
          heading="Incoming Requests"
          body="From hospitals & banks"
          count={89}
          icon={<ArrowDown className="w-6 h-6 text-white" />}
        />
        
        <MetricCard
          iconBgColor="#10B981"
          heading="Outgoing Requests"
          body="To donors & facilities"
          count={38}
          icon={<ArrowUp className="w-6 h-6 text-white" />}
        />
        
        <MetricCard
          iconBgColor="#8B5CF6"
          heading="In Transit"
          body="Currently being delivered"
          count={23}
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
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-100"
                onClick={() => router.push('/blood_bank/requests/request_details')}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">City Hospital</h4>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Blood Type: O+ | Quantity: 4 units</p>
                  <p className="text-sm text-gray-600">Priority: High</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Regional Blood Bank</h4>
                    <span className="text-sm text-gray-500">5 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Blood Type: AB- | Quantity: 2 units</p>
                  <p className="text-sm text-gray-600">Priority: Medium</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Emergency Medical Center</h4>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Blood Type: A+ | Quantity: 6 units</p>
                  <p className="text-sm text-gray-600">Priority: Low</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4">Outgoing Requests</h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Donor Network A</h4>
                    <span className="text-sm text-gray-500">1 hour ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Blood Type: B+ | Quantity: 3 units</p>
                  <p className="text-sm text-gray-600">Status: Pending</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Central Blood Facility</h4>
                    <span className="text-sm text-gray-500">3 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Blood Type: O- | Quantity: 5 units</p>
                  <p className="text-sm text-gray-600">Status: Confirmed</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Mobile Donation Unit</h4>
                    <span className="text-sm text-gray-500">6 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Blood Type: A- | Quantity: 2 units</p>
                  <p className="text-sm text-gray-600">Status: In Progress</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}