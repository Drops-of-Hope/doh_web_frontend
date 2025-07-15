"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface BloodUnit {
  id: string;
  donorId: string;
  bloodType: string;
  status: string;
  testDate: string;
  collectionDate: string;
}

export default function TestTable() {
  const router = useRouter();

  const bloodUnitsData: BloodUnit[] = [
    { id: 'BU001', donorId: 'D12345', bloodType: 'O+', status: 'Pending', testDate: '2024-01-15', collectionDate: '2024-01-14' },
    { id: 'BU002', donorId: 'D12346', bloodType: 'A-', status: 'In Progress', testDate: '2024-01-15', collectionDate: '2024-01-14' },
    { id: 'BU003', donorId: 'D12347', bloodType: 'B+', status: 'Completed', testDate: '2024-01-14', collectionDate: '2024-01-13' },
    { id: 'BU004', donorId: 'D12348', bloodType: 'AB-', status: 'Pending', testDate: '2024-01-15', collectionDate: '2024-01-14' },
    { id: 'BU005', donorId: 'D12349', bloodType: 'O-', status: 'Failed', testDate: '2024-01-14', collectionDate: '2024-01-13' },
    { id: 'BU006', donorId: 'D12350', bloodType: 'A+', status: 'Pending', testDate: '2024-01-15', collectionDate: '2024-01-14' },
    { id: 'BU007', donorId: 'D12351', bloodType: 'B-', status: 'In Progress', testDate: '2024-01-15', collectionDate: '2024-01-14' },
    { id: 'BU008', donorId: 'D12352', bloodType: 'AB+', status: 'Completed', testDate: '2024-01-13', collectionDate: '2024-01-12' },
    { id: 'BU009', donorId: 'D12353', bloodType: 'O+', status: 'Pending', testDate: '2024-01-15', collectionDate: '2024-01-14' },
    { id: 'BU010', donorId: 'D12354', bloodType: 'A-', status: 'In Progress', testDate: '2024-01-15', collectionDate: '2024-01-14' },
    { id: 'BU011', donorId: 'D12355', bloodType: 'B+', status: 'Completed', testDate: '2024-01-14', collectionDate: '2024-01-13' },
    { id: 'BU012', donorId: 'D12356', bloodType: 'AB-', status: 'Pending', testDate: '2024-01-15', collectionDate: '2024-01-14' },
    { id: 'BU013', donorId: 'D12357', bloodType: 'O-', status: 'Failed', testDate: '2024-01-14', collectionDate: '2024-01-13' },
    { id: 'BU014', donorId: 'D12358', bloodType: 'A+', status: 'Pending', testDate: '2024-01-15', collectionDate: '2024-01-14' },
    { id: 'BU015', donorId: 'D12359', bloodType: 'B-', status: 'In Progress', testDate: '2024-01-15', collectionDate: '2024-01-14' },
    { id: 'BU016', donorId: 'D12360', bloodType: 'AB+', status: 'Completed', testDate: '2024-01-13', collectionDate: '2024-01-12' },
    { id: 'BU017', donorId: 'D12361', bloodType: 'O+', status: 'Pending', testDate: '2024-01-15', collectionDate: '2024-01-14' },
    { id: 'BU018', donorId: 'D12362', bloodType: 'A-', status: 'In Progress', testDate: '2024-01-15', collectionDate: '2024-01-14' },
    { id: 'BU019', donorId: 'D12363', bloodType: 'B+', status: 'Completed', testDate: '2024-01-14', collectionDate: '2024-01-13' },
    { id: 'BU020', donorId: 'D12364', bloodType: 'AB-', status: 'Pending', testDate: '2024-01-15', collectionDate: '2024-01-14' },
    { id: 'BU021', donorId: 'D12365', bloodType: 'O-', status: 'Failed', testDate: '2024-01-14', collectionDate: '2024-01-13' },
    { id: 'BU022', donorId: 'D12366', bloodType: 'A+', status: 'Pending', testDate: '2024-01-15', collectionDate: '2024-01-14' },
    { id: 'BU023', donorId: 'D12367', bloodType: 'B-', status: 'In Progress', testDate: '2024-01-15', collectionDate: '2024-01-14' },
    { id: 'BU024', donorId: 'D12368', bloodType: 'AB+', status: 'Completed', testDate: '2024-01-13', collectionDate: '2024-01-12' },
    { id: 'BU025', donorId: 'D12369', bloodType: 'O+', status: 'Pending', testDate: '2024-01-15', collectionDate: '2024-01-14' },
  ];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(bloodUnitsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = bloodUnitsData.slice(startIndex, endIndex);
  
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleRowClick = () => {
    router.push('./test/blood_test');
  };

  // Function to get blood type badge color
  const getBloodTypeBadgeColor = (bloodType: string): string => {
    switch (bloodType) {
      case 'O+':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'O-':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'A+':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'A-':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'B+':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'B-':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'AB+':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'AB-':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="">

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Blood units available for testing</h2>
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, bloodUnitsData.length)} of {bloodUnitsData.length} entries
          </p>
        </div>
        
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((item: BloodUnit) => (
              <tr 
                key={item.id} 
                onClick={() => handleRowClick()}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.donorId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBloodTypeBadgeColor(item.bloodType)}`}>
                    {item.bloodType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.collectionDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg border ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <FaChevronLeft className="w-4 h-4 mr-1" />
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page: number) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-3 text-sm font-medium rounded-full ${
                    currentPage === page
                      ? 'bg-blue-400 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg border ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <FaChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}