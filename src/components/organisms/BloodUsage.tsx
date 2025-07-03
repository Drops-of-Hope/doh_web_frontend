import React from 'react';
import { FaUser, FaHospital, FaClock } from 'react-icons/fa';

interface BloodUsage {
  id: number;
  bloodType: string;
  unitsUsed: number;
  recipientId: string;
  department: string;
  time: string;
  status: 'Completed' | 'In Progress' | 'Preparing';
}

type BloodType = 'O+' | 'A+' | 'B+' | 'AB+' | 'O-' | 'A-' | 'B-' | 'AB-';

const BloodUsage: React.FC = () => {
  const todaysUsage: BloodUsage[] = [
    {
      id: 1,
      bloodType: 'O+',
      unitsUsed: 2,
      recipientId: 'PT-2024-001',
      department: 'Emergency',
      time: '08:30 AM',
      status: 'Completed'
    },
    {
      id: 3,
      bloodType: 'B+',
      unitsUsed: 3,
      recipientId: 'PT-2024-078',
      department: 'ICU',
      time: '11:45 AM',
      status: 'In Progress'
    },
    {
      id: 6,
      bloodType: 'A-',
      unitsUsed: 1,
      recipientId: 'PT-2024-117',
      department: 'Oncology',
      time: '03:30 PM',
      status: 'Preparing'
    },
    {
      id: 7,
      bloodType: 'B-',
      unitsUsed: 1,
      recipientId: 'PT-2024-117',
      department: 'Oncology',
      time: '03:30 PM',
      status: 'Preparing'
    }
  ];

  const getStatusColor = (status: BloodUsage['status']): string => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Preparing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalUnitsUsed: number = todaysUsage.reduce((sum: number, item: BloodUsage) => sum + item.unitsUsed, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-md font-semibold text-gray-700">Today's Blood Usage</h2>
        <a href="#" className="text-gray-500 hover:text-blue-800 text-sm">
          View All
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-700">Blood Type</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Units</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {todaysUsage.map((usage: BloodUsage) => (
              <tr key={usage.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2">
                  <span className="text-gray-900 font-medium">
                    {usage.bloodType}
                  </span>
                </td>
                <td className="py-3 px-2 font-medium text-gray-900">{usage.unitsUsed}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(usage.status)}`}>
                    {usage.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodUsage;