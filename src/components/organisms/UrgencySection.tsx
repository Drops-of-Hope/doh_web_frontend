"use client";

import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';
import { FaClock, FaExclamationTriangle } from 'react-icons/fa';

interface Props {
  formData: {
    urgencyLevel: string;
  };
  setFormData: (updater: (prev: any) => any) => void;
  errors: {
    urgencyLevel?: string;
  };
}

const urgencyLevels = [
  { value: 'routine', label: 'Routine', color: 'text-green-600 bg-green-50' },
  { value: 'emergency', label: 'Emergency', color: 'text-red-600 bg-red-50' }
];

const UrgencySection: React.FC<Props> = ({ formData, setFormData, errors }) => {
  const handleChange = (value: string) => {
    setFormData(prev => ({ ...prev, urgencyLevel: value }));
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'routine': return <Clock className="w-4 h-4" />;
      case 'emergency': return <FaExclamationTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <AlertCircle className="text-orange-600" />
        Urgency Level
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {urgencyLevels.map(level => (
          <label key={level.value} className="cursor-pointer">
            <input
              type="radio"
              name="urgencyLevel"
              value={level.value}
              checked={formData.urgencyLevel === level.value}
              onChange={() => handleChange(level.value)}
              className="sr-only"
            />
            <div
              className={`border-2 rounded-lg p-4 transition-all ${
                formData.urgencyLevel === level.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-3">
                {getUrgencyIcon(level.value)}
                <div>
                  <div className="font-medium text-gray-800">{level.label}</div>
                  <div className={`text-sm px-2 py-1 rounded ${level.color} inline-block mt-1`}>
                    {level.label}
                  </div>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>

      {errors.urgencyLevel && (
        <p className="mt-2 text-sm text-red-600">{errors.urgencyLevel}</p>
      )}
    </div>
  );
};

export default UrgencySection;
