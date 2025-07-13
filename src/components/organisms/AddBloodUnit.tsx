"use client";
import { useState } from "react";

interface FormData {
  bloodUnitCode: string;
  startTime: string;
  endTime: string;
  volumeCollected: string;
  bloodBagType: string;
}

interface FormErrors {
  bloodUnitCode?: string;
  startTime?: string;
  endTime?: string;
  volumeCollected?: string;
  bloodBagType?: string;
}

export default function AddBloodUnit() {
  const [formData, setFormData] = useState<FormData>({
    bloodUnitCode: '',
    startTime: '',
    endTime: '',
    volumeCollected: '',
    bloodBagType: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const bloodBagTypes = [
    { value: 'Q', label: 'Q - Quadruple Bag' },
    { value: 'T', label: 'T - Triple Bag' },
    { value: 'D', label: 'D - Double Bag' },
    { value: 'S', label: 'S - Single Bag' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Add Blood Unit</h2>
      </div>

      <div className="space-y-6">
        {/* Blood Unit Code */}
        <div>
          <label htmlFor="bloodUnitCode" className="block text-sm font-medium text-gray-700 mb-2">
            Blood Unit Code *
          </label>
          <input
            type="text"
            id="bloodUnitCode"
            name="bloodUnitCode"
            value={formData.bloodUnitCode}
            onChange={handleInputChange}
            className={`w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.bloodUnitCode ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter blood unit code (e.g., BU001234)"
          />
          {errors.bloodUnitCode && (
            <p className="mt-1 text-sm text-red-600">{errors.bloodUnitCode}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
              Start Time *
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.startTime ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.startTime && (
              <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>
            )}
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
              End Time *
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.endTime ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.endTime && (
              <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="volumeCollected" className="block text-sm font-medium text-gray-700 mb-2">
            Volume Collected (ml) *
          </label>
          <input
            type="number"
            id="volumeCollected"
            name="volumeCollected"
            value={formData.volumeCollected}
            onChange={handleInputChange}
            min="1"
            step="1"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.volumeCollected ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter volume in ml (e.g., 450)"
          />
          {errors.volumeCollected && (
            <p className="mt-1 text-sm text-red-600">{errors.volumeCollected}</p>
          )}
        </div>

        <div>
          <label htmlFor="bloodBagType" className="block text-sm font-medium text-gray-700 mb-2">
            Blood Bag Type *
          </label>
          <select
            id="bloodBagType"
            name="bloodBagType"
            value={formData.bloodBagType}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.bloodBagType ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select blood bag type</option>
            {bloodBagTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.bloodBagType && (
            <p className="mt-1 text-sm text-red-600">{errors.bloodBagType}</p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}