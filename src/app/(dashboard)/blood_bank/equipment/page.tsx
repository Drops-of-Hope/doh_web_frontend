"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useGetAllBloodEquipmentQuery, useDeleteBloodEquipmentMutation } from '@/store/api/bloodEquipmentApi';
import { MetricCard, SearchBar } from '@/components';
import { FaTools, FaCheckCircle, FaExclamationTriangle, FaClock, FaPlus, FaEye, FaTrash } from 'react-icons/fa';

export default function EquipmentPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Fetch all equipment
  const { data: equipmentData = [], isLoading, isError } = useGetAllBloodEquipmentQuery();
  const [deleteEquipment, { isLoading: isDeleting }] = useDeleteBloodEquipmentMutation();

  // Calculate metrics
  const totalEquipment = equipmentData.length;
  const operationalCount = equipmentData.filter(eq => eq.status === 'OPERATIONAL').length;
  const maintenanceCount = equipmentData.filter(eq => eq.status === 'MAINTENANCE').length;
  const decommissionedCount = equipmentData.filter(eq => eq.status === 'DECOMMISSIONED').length;

  // Filter equipment
  const filteredEquipment = equipmentData.filter(equipment => {
    const matchesSearch = 
      equipment.serialNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.type?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || equipment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      try {
        await deleteEquipment(id).unwrap();
        alert('Equipment deleted successfully');
      } catch (error) {
        console.error('Failed to delete equipment:', error);
        alert('Failed to delete equipment');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPERATIONAL':
        return 'text-green-600 bg-green-50';
      case 'MAINTENANCE':
        return 'text-yellow-600 bg-yellow-50';
      case 'DECOMMISSIONED':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 bg-[#f8f8f8]">
        <p className="text-gray-600">Loading equipment...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen p-4 bg-[#f8f8f8]">
        <p className="text-red-600">Error loading equipment. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-[#f8f8f8]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Blood Equipment Management</h1>
        <p className="text-sm text-gray-500">Manage and monitor blood bank equipment</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          iconBgColor="#E8F5E9"
          heading="Total Equipment"
          body="All registered equipment"
          count={totalEquipment}
          icon={<FaTools className="w-6 h-6 text-green-600" />}
        />
        <MetricCard
          iconBgColor="#E3F2FD"
          heading="Operational"
          body="Currently in use"
          count={operationalCount}
          icon={<FaCheckCircle className="w-6 h-6 text-blue-600" />}
        />
        <MetricCard
          iconBgColor="#FFF9E6"
          heading="In Maintenance"
          body="Under maintenance"
          count={maintenanceCount}
          icon={<FaClock className="w-6 h-6 text-yellow-600" />}
        />
        <MetricCard
          iconBgColor="#FEF2F2"
          heading="Decommissioned"
          body="Out of service"
          count={decommissionedCount}
          icon={<FaExclamationTriangle className="w-6 h-6 text-red-600" />}
        />
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="flex-1 w-full">
            <SearchBar 
              title="Search by serial number, manufacturer, model, or type..."
              value={searchQuery}
              onSearch={setSearchQuery}
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="OPERATIONAL">Operational</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="DECOMMISSIONED">Decommissioned</option>
            </select>

            <button
              onClick={() => router.push('/blood_bank/equipment/create')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              Add Equipment
            </button>
          </div>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serial Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manufacturer / Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purchase Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEquipment.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    {searchQuery || statusFilter !== 'all' 
                      ? 'No equipment found matching your filters' 
                      : 'No equipment registered yet'}
                  </td>
                </tr>
              ) : (
                filteredEquipment.map((equipment) => (
                  <tr key={equipment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {equipment.serialNumber}
                      </div>
                      <div className="text-xs text-gray-500">ID: {equipment.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{equipment.type}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{equipment.manufacturer}</div>
                      <div className="text-xs text-gray-500">{equipment.model}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {equipment.medicalEstablishment?.name || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {equipment.medicalEstablishment?.address || ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(equipment.purchaseDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(equipment.status)}`}>
                        {equipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/blood_bank/equipment/${equipment.id}`)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View Details"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(equipment.id)}
                          disabled={isDeleting}
                          className="text-red-600 hover:text-red-900 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 text-sm text-gray-500 text-center">
        Showing {filteredEquipment.length} of {totalEquipment} equipment
      </div>
    </div>
  );
}
