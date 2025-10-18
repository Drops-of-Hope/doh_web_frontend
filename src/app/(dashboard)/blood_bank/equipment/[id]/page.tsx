"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetBloodEquipmentByIdQuery, useUpdateBloodEquipmentMutation } from '@/store/api/bloodEquipmentApi';
import { BackButton } from '@/components';
import { FaTools, FaEdit, FaSave, FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaIndustry } from 'react-icons/fa';

export default function EquipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const equipmentId = params.id as string;

  const { data: equipment, isLoading, isError } = useGetBloodEquipmentByIdQuery(equipmentId, {
    skip: !equipmentId,
  });

  const [updateEquipment, { isLoading: isUpdating }] = useUpdateBloodEquipmentMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    serialNumber: '',
    manufacturer: '',
    model: '',
    status: '',
  });

  React.useEffect(() => {
    if (equipment) {
      setFormData({
        type: equipment.type,
        serialNumber: equipment.serialNumber,
        manufacturer: equipment.manufacturer,
        model: equipment.model,
        status: equipment.status,
      });
    }
  }, [equipment]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (equipment) {
      setFormData({
        type: equipment.type,
        serialNumber: equipment.serialNumber,
        manufacturer: equipment.manufacturer,
        model: equipment.model,
        status: equipment.status,
      });
    }
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      await updateEquipment({
        id: equipmentId,
        data: formData,
      }).unwrap();
      
      setIsEditing(false);
      alert('Equipment updated successfully');
    } catch (error) {
      console.error('Failed to update equipment:', error);
      alert('Failed to update equipment');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPERATIONAL':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'MAINTENANCE':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'DECOMMISSIONED':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 bg-[#f8f8f8]">
        <p className="text-gray-600">Loading equipment details...</p>
      </div>
    );
  }

  if (isError || !equipment) {
    return (
      <div className="min-h-screen p-4 bg-[#f8f8f8]">
        <BackButton fallbackUrl="/blood_bank/equipment" />
        <p className="text-red-600 mt-4">Error loading equipment details. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-[#f8f8f8]">
      {/* Back Button */}
      <div className="mb-6">
        <BackButton fallbackUrl="/blood_bank/equipment" />
      </div>

      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaTools className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {equipment.serialNumber}
              </h1>
              <p className="text-sm text-gray-500">Equipment ID: {equipment.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaEdit className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  disabled={isUpdating}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  <FaTimes className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <FaSave className="w-4 h-4" />
                  {isUpdating ? 'Saving...' : 'Save'}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-4 py-2 inline-flex text-sm font-semibold rounded-full border ${getStatusColor(equipment.status)}`}>
            {equipment.status}
          </span>
        </div>
      </div>

      {/* Equipment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaIndustry className="text-blue-600" />
            Equipment Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{equipment.type}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.serialNumber}
                  onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{equipment.serialNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.manufacturer}
                  onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{equipment.manufacturer}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{equipment.model}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              {isEditing ? (
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="OPERATIONAL">Operational</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="DECOMMISSIONED">Decommissioned</option>
                </select>
              ) : (
                <p className="text-gray-900">{equipment.status}</p>
              )}
            </div>
          </div>
        </div>

        {/* Location & Dates */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaCalendarAlt className="text-blue-600" />
            Location & Dates
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FaMapMarkerAlt className="text-gray-500" />
                Medical Establishment
              </label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-900 font-medium">
                  {equipment.medicalEstablishment?.name || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  {equipment.medicalEstablishment?.address || ''}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ID: {equipment.locatedMedEstId}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
              <p className="text-gray-900">
                {new Date(equipment.purchaseDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Expiry</label>
              <p className={`text-gray-900 ${new Date(equipment.warrantyExpiry) < new Date() ? 'text-red-600 font-semibold' : ''}`}>
                {new Date(equipment.warrantyExpiry).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {new Date(equipment.warrantyExpiry) < new Date() && (
                  <span className="ml-2 text-xs">(Expired)</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Logs */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Maintenance Logs</h2>
        {equipment.maintenanceLogs && equipment.maintenanceLogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performed By</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {equipment.maintenanceLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {new Date(log.maintenanceDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{log.type || log.maintenanceType || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{log.performedBy || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {log.cost ? `$${log.cost.toFixed(2)}` : 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No maintenance logs recorded</p>
        )}
      </div>

      {/* Calibration Logs */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Calibration Logs</h2>
        {equipment.calibrationLogs && equipment.calibrationLogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Calibration Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Calibration</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performed By</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Result</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {equipment.calibrationLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {new Date(log.calibrationDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {log.nextCalibrationDate ? new Date(log.nextCalibrationDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{log.performedBy || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{log.result}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No calibration logs recorded</p>
        )}
      </div>
    </div>
  );
}
