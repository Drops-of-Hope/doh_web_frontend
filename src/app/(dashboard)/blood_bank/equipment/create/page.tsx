"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCreateBloodEquipmentMutation } from '@/store/api/bloodEquipmentApi';
import { BackButton } from '@/components';
import { FaTools, FaSave, FaTimes } from 'react-icons/fa';

export default function CreateEquipmentPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [createEquipment, { isLoading }] = useCreateBloodEquipmentMutation();

  const [formData, setFormData] = useState({
    type: '',
    serialNumber: '',
    manufacturer: '',
    model: '',
    purchaseDate: '',
    warrantyExpiry: '',
    locatedMedEstId: '',
    status: 'OPERATIONAL',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [testingConnection, setTestingConnection] = useState(false);

  // Test backend connectivity
  const testBackendConnection = async () => {
    setTestingConnection(true);
    try {
      console.log('Testing backend connection...');
      const response = await fetch('http://localhost:5000/api/blood-equipment/');
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        alert(`✅ Backend Connected!\n\nStatus: ${response.status}\nEquipment count: ${data?.data?.length || 0}\n\nBackend is working correctly!`);
      } else {
        alert(`⚠️ Backend responded with error:\n\nStatus: ${response.status}\nMessage: ${data?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      alert(`❌ Cannot connect to backend!\n\nError: ${error}\n\nPlease ensure:\n1. Backend is running on http://localhost:5000\n2. No CORS issues\n3. Network is accessible`);
    } finally {
      setTestingConnection(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.type.trim()) {
      newErrors.type = 'Equipment type is required';
    }
    if (!formData.serialNumber.trim()) {
      newErrors.serialNumber = 'Serial number is required';
    }
    if (!formData.manufacturer.trim()) {
      newErrors.manufacturer = 'Manufacturer is required';
    }
    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }
    if (!formData.purchaseDate) {
      newErrors.purchaseDate = 'Purchase date is required';
    }
    if (!formData.warrantyExpiry) {
      newErrors.warrantyExpiry = 'Warranty expiry date is required';
    }
    if (!formData.locatedMedEstId.trim()) {
      newErrors.locatedMedEstId = 'Medical establishment ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const payload = {
        ...formData,
        purchaseDate: new Date(formData.purchaseDate).toISOString(),
        warrantyExpiry: new Date(formData.warrantyExpiry).toISOString(),
      };
      
      console.log('=== EQUIPMENT CREATION DEBUG ===');
      console.log('API Endpoint: http://localhost:5000/api/blood-equipment/');
      console.log('Payload being sent:', JSON.stringify(payload, null, 2));
      
      const result = await createEquipment(payload).unwrap();
      
      console.log('✅ Success! Equipment created:', result);
      alert('Equipment created successfully!');
      router.push('/blood_bank/equipment');
    } catch (error: any) {
      console.error('❌ ERROR - Failed to create equipment');
      console.error('Full error object:', error);
      console.error('Error status:', error?.status);
      console.error('Error data:', error?.data);
      console.error('Error message:', error?.message);
      
      // Check for network/connection errors
      if (error?.status === 'FETCH_ERROR' || !error?.status) {
        alert('❌ Cannot connect to backend server!\n\nPlease check:\n1. Backend is running on http://localhost:5000\n2. No CORS issues\n3. Check browser console for details');
        return;
      }
      
      // Extract detailed error message
      let errorMessage = 'Failed to create equipment.';
      
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.data?.error) {
        errorMessage = error.data.error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.status) {
        errorMessage = `Server error: ${error.status}`;
      }
      
      alert(`❌ Error: ${errorMessage}\n\nCheck the console for more details.`);
    }
  };

  const handleCancel = () => {
    router.push('/blood_bank/equipment');
  };

  return (
    <div className="min-h-screen p-4 bg-[#f8f8f8]">
      {/* Back Button */}
      <div className="mb-6">
        <BackButton fallbackUrl="/blood_bank/equipment" />
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaTools className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Add New Equipment</h1>
              <p className="text-sm text-gray-500">Register new blood bank equipment</p>
            </div>
          </div>
          
          {/* Backend Test Button */}
          <button
            type="button"
            onClick={testBackendConnection}
            disabled={testingConnection}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 text-sm font-medium"
          >
            {testingConnection ? 'Testing...' : '🔌 Test Backend'}
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Equipment Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Equipment Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipment Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  placeholder="e.g., REFRIGERATOR, CENTRIFUGE, BLOOD_WARMER"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 ${
                    errors.type ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Serial Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.serialNumber}
                  onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                  placeholder="e.g., RF-2024-003"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 ${
                    errors.serialNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.serialNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.serialNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manufacturer <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.manufacturer}
                  onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                  placeholder="e.g., Panasonic Healthcare"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 ${
                    errors.manufacturer ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.manufacturer && (
                  <p className="mt-1 text-sm text-red-600">{errors.manufacturer}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="e.g., MBR-305D"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 ${
                    errors.model ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.model && (
                  <p className="mt-1 text-sm text-red-600">{errors.model}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="OPERATIONAL">Operational</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="DECOMMISSIONED">Decommissioned</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location & Dates */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Location & Dates</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medical Establishment ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.locatedMedEstId}
                  onChange={(e) => handleInputChange('locatedMedEstId', e.target.value)}
                  placeholder="e.g., 73d67585-efd9-4a62-9554-ca1fe1e2ab85"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 ${
                    errors.locatedMedEstId ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.locatedMedEstId && (
                  <p className="mt-1 text-sm text-red-600">{errors.locatedMedEstId}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  The ID of the medical establishment where this equipment is located
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purchase Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
                    errors.purchaseDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.purchaseDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.purchaseDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warranty Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.warrantyExpiry}
                  onChange={(e) => handleInputChange('warrantyExpiry', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
                    errors.warrantyExpiry ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.warrantyExpiry && (
                  <p className="mt-1 text-sm text-red-600">{errors.warrantyExpiry}</p>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">💡 Tips</h3>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Ensure the serial number is unique</li>
                  <li>• Verify the medical establishment ID exists</li>
                  <li>• Keep equipment documentation for reference</li>
                  <li>• Regular maintenance logs will be added separately</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              <FaTimes className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <FaSave className="w-4 h-4" />
              {isLoading ? 'Creating...' : 'Create Equipment'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
