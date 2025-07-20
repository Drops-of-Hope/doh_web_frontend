"use client";

import React, { useState } from 'react';
import { Activity, UserCheck, UserX } from 'lucide-react';
import { EvaluationData, ValidationErrors } from '../../../types';
import { DonorFitnessAssessment } from '@/components';

const MedicalOfficerEvaluation: React.FC = () => {
  const [evaluationData, setEvaluationData] = useState<EvaluationData>({
    donorFitness: '', 
    fitnessReason: '',
    
    weight: '',
    
    systolicBP: '',
    diastolicBP: '',
    pulseRate: '',
    temperature: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = (field: keyof EvaluationData, value: string): void => {
    setEvaluationData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const isFit = evaluationData.donorFitness === 'fit';

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Medical Officer Evaluation
        </h1>
        <p className="text-gray-600 mt-2">Complete medical assessment for blood donation eligibility</p>
      </div>

      <div className="space-y-8">
        {/* Donor Fitness Assessment */}
        <DonorFitnessAssessment
          evaluationData={evaluationData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        {/* Physical Measurements & Vital Signs - Only show if fit */}
        {isFit && (
          <>
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                Physical Measurements
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={evaluationData.weight}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('weight', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 65.5"
                  />
                  {errors.weight && <p className="text-red-600 text-sm mt-1">{errors.weight}</p>}
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Activity className="text-green-600" size={24} />
                Vital Signs
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BP (mmHg) *
                  </label>
                  <input
                    type="number"
                    value={evaluationData.systolicBP}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('systolicBP', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 120"
                  />
                  {errors.systolicBP && <p className="text-red-600 text-sm mt-1">{errors.systolicBP}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVS Status Pulse (/min) *
                  </label>
                  <input
                    type="number"
                    value={evaluationData.pulseRate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('pulseRate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 72"
                  />
                  {errors.pulseRate && <p className="text-red-600 text-sm mt-1">{errors.pulseRate}</p>}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Final Decision
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                
                <button
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  <UserX size={24} />
                  Reject Donor
                </button>
                                <button
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-green-50 text-green-600 hover:bg-green-100 font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  <UserCheck size={24} />
                  Accept Donor
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MedicalOfficerEvaluation;