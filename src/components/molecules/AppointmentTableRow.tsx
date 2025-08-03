import React from 'react';
import { getStatusColor, getBloodGroupColor, Appointment } from '@/lib/appointmentUtils';

interface RowProps {
  request: Appointment;
  onClick: () => void;
}

const AppointmentTableRow: React.FC<RowProps> = ({ request, onClick }) => {
  return (
    <tr
      className="border-b border-gray-50 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
      onClick={onClick}
    >
      <td className="px-6 py-4 text-sm font-medium text-gray-900">{request.name}</td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border w-12 text-center inline-block ${getBloodGroupColor(request.bloodGroup)}`}>
          {request.bloodGroup}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{request.date}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{request.time}</td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
          {request.status}
        </span>
      </td>
    </tr>
  );
};

export default AppointmentTableRow;