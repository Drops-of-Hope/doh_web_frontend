"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetAllBloodEquipmentQuery } from '@/store/api/bloodEquipmentApi';
import { FaCheckCircle, FaExclamationTriangle, FaClock, FaEye } from 'react-icons/fa';

interface BloodEquipmentListProps {
  /** Optional filter by status */
  statusFilter?: 'all' | 'OPERATIONAL' | 'MAINTENANCE' | 'DECOMMISSIONED';
  /** Optional limit on number of items to display */
  limit?: number;
  /** Show actions column */
  showActions?: boolean;
  /** Enable row click navigation */
  enableRowClick?: boolean;
}

export default function BloodEquipmentList({
  statusFilter = 'all',
  limit,
  showActions = true,
  enableRowClick = true,
}: BloodEquipmentListProps): React.JSX.Element {
  const router = useRouter();
  
  // Fetch all equipment using RTK Query
  const { data: equipmentData = [], isLoading, isError, error } = useGetAllBloodEquipmentQuery();

  // Filter and limit data
  const filteredData = React.useMemo(() => {
    let filtered = equipmentData;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(eq => eq.status === statusFilter);
    }
    
    // Apply limit
    if (limit && limit > 0) {
      filtered = filtered.slice(0, limit);
    }
    
    return filtered;
  }, [equipmentData, statusFilter, limit]);

  const handleRowClick = (id: string) => {
    if (enableRowClick) {
      router.push(`/blood_bank/equipment/${id}`);
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'OPERATIONAL':
        return {
          icon: <FaCheckCircle className="w-4 h-4" />,
          label: 'Operational',
          className: 'bg-green-100 text-green-800 border-green-200',
        };
      case 'MAINTENANCE':
        return {
          icon: <FaClock className="w-4 h-4" />,
          label: 'Maintenance',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        };
      case 'DECOMMISSIONED':
        return {
          icon: <FaExclamationTriangle className="w-4 h-4" />,
          label: 'Decommissioned',
          className: 'bg-red-100 text-red-800 border-red-200',
        };
      default:
        return {
          icon: null,
          label: status,
          className: 'bg-gray-100 text-gray-800 border-gray-200',
        };
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-gray-600">Loading equipment data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
        <div className="flex items-center">
          <FaExclamationTriangle className="w-6 h-6 text-red-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-red-800">Error Loading Equipment</h3>
            <p className="text-sm text-red-600 mt-1">
              {error && 'status' in error 
                ? `Error ${error.status}: Unable to fetch equipment data`
                : 'Failed to load equipment. Please try again later.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (filteredData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <p className="text-gray-500">No equipment found.</p>
          {statusFilter !== 'all' && (
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your filter criteria.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Serial Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Manufacturer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purchase Date
              </th>
              {showActions && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((equipment) => {
              const statusDisplay = getStatusDisplay(equipment.status);
              return (
                <tr
                  key={equipment.id}
                  onClick={() => handleRowClick(equipment.id)}
                  className={`${
                    enableRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''
                  } transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {equipment.serialNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {equipment.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {equipment.manufacturer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {equipment.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {equipment.medicalEstablishment?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border ${statusDisplay.className}`}
                    >
                      {statusDisplay.icon}
                      {statusDisplay.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(equipment.purchaseDate)}
                  </td>
                  {showActions && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/blood_bank/equipment/${equipment.id}`);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        aria-label={`View details for ${equipment.serialNumber}`}
                      >
                        <FaEye className="w-4 h-4" />
                        <span className="text-xs font-medium">View</span>
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Footer with count */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredData.length}</span> equipment
          {limit && equipmentData.length > limit && (
            <span> of <span className="font-semibold">{equipmentData.length}</span> total</span>
          )}
        </p>
      </div>
    </div>
  );
}
