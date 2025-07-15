"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface BloodGroupData {
  id: string;
  bloodGroup: string;
  availableUnits: number;
  expiredUnits: number;
  lastRestocked: string;
  lastUpdated: string;
}

interface StockStatus {
  status: 'critical' | 'low' | 'normal';
  label: string;
  color: string;
}


export default function BloodInventoryTable(): React.JSX.Element {

  const router = useRouter();

  const bloodGroupData: BloodGroupData[] = [
    { id: 'BG-001', bloodGroup: 'O+', availableUnits: 156, expiredUnits: 2, lastRestocked: 'May 15, 2025', lastUpdated: 'Today' },
    { id: 'BG-002', bloodGroup: 'A+', availableUnits: 89, expiredUnits: 1, lastRestocked: 'May 12, 2025', lastUpdated: 'Yesterday' },
    { id: 'BG-003', bloodGroup: 'B+', availableUnits: 134, expiredUnits: 0, lastRestocked: 'May 14, 2025', lastUpdated: 'Jan 12, 2019' },
    { id: 'BG-004', bloodGroup: 'AB+', availableUnits: 67, expiredUnits: 3, lastRestocked: 'May 13, 2025', lastUpdated: 'Jan 14, 2019' },
    { id: 'BG-005', bloodGroup: 'O-', availableUnits: 45, expiredUnits: 1, lastRestocked: 'May 16, 2025', lastUpdated: 'Jan 24, 2019' },
    { id: 'BG-006', bloodGroup: 'A-', availableUnits: 123, expiredUnits: 1, lastRestocked: 'May 11, 2025', lastUpdated: 'Jan 01, 2019' },
    { id: 'BG-007', bloodGroup: 'B-', availableUnits: 78, expiredUnits: 0, lastRestocked: 'May 17, 2025', lastUpdated: 'May 12, 2019' },
    { id: 'BG-008', bloodGroup: 'AB-', availableUnits: 34, expiredUnits: 0, lastRestocked: 'May 18, 2025', lastUpdated: 'Jan 08, 2019' },
  ];

  const getStockStatus = (units: number): StockStatus => {
    if (units <= 50) {
      return { status: 'critical', label: 'Critical Low', color: 'bg-red-100 text-red-800 border-red-200' };
    } else if (units <= 80) {
      return { status: 'low', label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    }
    return { status: 'normal', label: 'Normal', color: 'bg-green-100 text-green-800 border-green-200' };
  };

  const handleRowClick = () => {
    router.push('/blood_bank/inventory/blood_group');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Units</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expired Units</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Restocked</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bloodGroupData.map((item) => {
              const stockStatus = getStockStatus(item.availableUnits);
              return (
                <tr key={item.id} 
                onClick={handleRowClick}
                className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                    {item.bloodGroup}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.availableUnits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${stockStatus.color}`}>
                      {stockStatus.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.expiredUnits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lastRestocked}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
