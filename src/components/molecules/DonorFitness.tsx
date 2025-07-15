"use client";

import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { EvaluationData, ValidationErrors } from '../../../types';

interface DonorFitnessAssessmentProps {
  evaluationData: EvaluationData;
  errors: ValidationErrors;
  onInputChange: (field: keyof EvaluationData, value: string) => void;
}

const DonorFitnessAssessment: React.FC<DonorFitnessAssessmentProps> = ({
  evaluationData,
  errors,
  onInputChange
}) => {
  const isUnfit = evaluationData.donorFitness === 'unfit';
  const isFit = evaluationData.donorFitness === 'fit';

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <AlertCircle className="text-blue-600" size={24} />
        Donor Fitness Assessment
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Donor Fitness Status *
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => onInputChange('donorFitness', 'fit')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                isFit 
                  ? 'border-green-600 bg-green-50 text-green-700' 
                  : 'border-gray-300 hover:border-green-600'
              }`}
            >
              <Check size={20} />
              Fit for Donation
            </button>
            <button
              type="button"
              onClick={() => onInputChange('donorFitness', 'unfit')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                isUnfit 
                  ? 'border-red-500 bg-red-50 text-red-700' 
                  : 'border-gray-300 hover:border-red-400'
              }`}
            >
              <X size={20} />
              Unfit for Donation
            </button>
          </div>
          {errors.donorFitness && <p className="text-red-600 text-sm mt-1">{errors.donorFitness}</p>}
        </div>

        {isUnfit && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Unfitness *
            </label>
            <textarea
              value={evaluationData.fitnessReason}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onInputChange('fitnessReason', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              placeholder="Please provide detailed reason for declaring donor unfit..."
            />
            {errors.fitnessReason && <p className="text-red-600 text-sm mt-1">{errors.fitnessReason}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorFitnessAssessment;