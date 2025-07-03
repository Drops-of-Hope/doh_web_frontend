"use client";

import React from 'react';
import { FaBoxes, FaExclamationTriangle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { MetricCard } from '@/components';

export default function InventoryPage() {
  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <MetricCard
          iconBgColor="#3B82F6"
          heading="Total Units"
          body="Blood units in stock"
          count={1247}
          icon={<FaBoxes size={24} className="text-white" />}
        />
        
        <MetricCard
          iconBgColor="#EF4444"
          heading="Low Blood Stock"
          body="Units below threshold"
          count={23}
          icon={<FaExclamationTriangle size={24} className="text-white" />}
        />
        
        <MetricCard
          iconBgColor="#DC2626"
          heading="Expired Units"
          body="Units past expiration"
          count={8}
          icon={<FaTimesCircle size={24} className="text-white" />}
        />
        
        <MetricCard
          iconBgColor="#f97316"
          heading="Expiring Soon"
          body="Units expiring in 7 days"
          count={45}
          icon={<FaClock size={24} className="text-white" />}
        />
      </div>
    </div>
  );
}