import React from 'react';
import { FaTint, FaPlus, FaTrash } from 'react-icons/fa';

interface BloodTypeRequest {
  id: string;
  bloodType: string;
  unitsRequired: string;
}

interface FormErrors {
  bloodTypeRequests?: { [key: string]: { bloodType?: string; unitsRequired?: string } };
}

interface BloodTypeRequestsSectionProps {
  bloodTypeRequests: BloodTypeRequest[];
  errors: FormErrors;
  onBloodTypeRequestChange: (id: string, field: 'bloodType' | 'unitsRequired', value: string) => void;
  onAddBloodTypeRequest: () => void;
  onRemoveBloodTypeRequest: (id: string) => void;
}

const BloodTypeRequestsSection: React.FC<BloodTypeRequestsSectionProps> = ({
  bloodTypeRequests,
  errors,
  onBloodTypeRequestChange,
  onAddBloodTypeRequest,
  onRemoveBloodTypeRequest
}) => {
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const getTotalUnits = () => {
    return bloodTypeRequests.reduce((total, request) => {
      return total + (parseInt(request.unitsRequired) || 0);
    }, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaTint className="text-red-600" />
          Blood Requirements
        </h2>
        <div className="text-sm text-gray-600">
          Total Units: <span className="font-semibold text-gray-800">{getTotalUnits()}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {bloodTypeRequests.map((request, index) => (
          <div key={request.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-700">Blood Type Request #{index + 1}</h3>
              {bloodTypeRequests.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveBloodTypeRequest(request.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Type *
                </label>
                <select
                  value={request.bloodType}
                  onChange={(e) => onBloodTypeRequestChange(request.id, 'bloodType', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${
                    errors.bloodTypeRequests?.[request.id]?.bloodType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="" className="text-gray-600">Select blood type</option>
                  {bloodTypes.map(type => (
                    <option key={type} value={type} className="text-gray-800">{type}</option>
                  ))}
                </select>
                {errors.bloodTypeRequests?.[request.id]?.bloodType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bloodTypeRequests[request.id].bloodType}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Units *
                </label>
                <input
                  type="number"
                  min="1"
                  value={request.unitsRequired}
                  onChange={(e) => onBloodTypeRequestChange(request.id, 'unitsRequired', e.target.value)}
                  placeholder="e.g., 2"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-600 ${
                    errors.bloodTypeRequests?.[request.id]?.unitsRequired ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.bloodTypeRequests?.[request.id]?.unitsRequired && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bloodTypeRequests[request.id].unitsRequired}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={onAddBloodTypeRequest}
          className="w-1/3 border-1 border-gray-300 rounded-lg p-2 text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaPlus className="w-4 h-4" />
          Add Another Blood Type
        </button>
      </div>
    </div>
  );
};

export default BloodTypeRequestsSection;