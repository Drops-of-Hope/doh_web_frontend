"use client";
import React from 'react';
import { FaBoxes, FaExclamationTriangle, FaTimesCircle, FaClock, FaFileExport } from 'react-icons/fa';
import { MetricCard, BloodInventoryTable, PieChartWithLegend, BloodUsage, DonationUsageChart } from '@/components';

export default function InventoryPage() {

  const bloodTypeData = [
    { name: 'O+', value: 45 },
    { name: 'A+', value: 38 },
    { name: 'B+', value: 28 },
    { name: 'AB+', value: 15 },
    { name: 'O-', value: 22 },
    { name: 'A-', value: 18 }
  ];

  const handleExportReport = () => {
    console.log('Exporting inventory report...');
  };

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

      <div className=''>
        <BloodInventoryTable />
      </div>

      <div className='mt-4 w-full flex justify-between gap-3'>
        <div className='w-1/2'>
          <PieChartWithLegend 
            title="Available Blood Packets"
            data={bloodTypeData}
          />
        </div>
        <div className='w-1/2'>
          <BloodUsage />
        </div>
      </div>

      <div className='mt-4 w-full flex'>
        <DonationUsageChart />
      </div>

      <div className='mt-8 mb-6 w-full flex justify-center'>
        <div className='bg-white rounded-lg shadow-md p-6 w-full flex justify-between'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4 text-center'>
            Export Inventory Report
          </h3>
          <button 
            onClick={handleExportReport}
            className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'
          >
            <FaFileExport size={18} />
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
}