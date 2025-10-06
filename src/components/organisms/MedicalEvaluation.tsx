"use client";

import React, { useState } from 'react';
import { Activity, UserCheck, UserX } from 'lucide-react';
import { EvaluationData, ValidationErrors } from '../../../types';
import { DonorFitnessAssessment } from '@/components';
import { useCreateHealthVitalMutation } from '@/store/api/healthVitalsApi';
import { useParams } from "next/navigation";
import { useGetAppointmentByIdQuery } from '@/store/api/appointmentsApi';

// Extended interfaces to properly type the API response
interface ExtendedDonor {
  id: string;
  name: string;
  email: string;
  bloodGroup: string;
  nic?: string;
  createdAt?: string;
  donationBadge?: string;
  isActive?: boolean;
  profileImageUrl?: string | null;
  totalDonations?: number;
  totalPoints?: number;
  updatedAt?: string;
  nextEligible?: string | null;
}

interface AppointmentSlot {
  startTime: string;
  endTime: string;
}

interface MedicalEstablishment {
  id: string;
  name: string;
}

interface AppointmentData {
  id: string;
  appointmentDate: string;
  donor: ExtendedDonor;
  slot: AppointmentSlot;
  medicalEstablishment: MedicalEstablishment;
}

const MedicalOfficerEvaluation: React.FC = () => {
  const { appointmentId } = useParams();
  
  // Fetch appointment data from API
  const { 
    data: appointmentData, 
    isLoading, 
    isError
  } = useGetAppointmentByIdQuery(appointmentId as string, {
    skip: !appointmentId
  });
  
  // Type guard to ensure we have properly typed appointment data
  const typedAppointmentData = appointmentData as AppointmentData | undefined;
  const userId = typedAppointmentData?.donor.id;

  // Health Vitals Mutation
  const [createHealthVital, { isLoading: isCreatingVital }] = useCreateHealthVitalMutation();

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
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

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
    
    // Clear messages when user makes changes
    setSuccessMessage('');
    setErrorMessage('');
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!evaluationData.donorFitness) {
      newErrors.donorFitness = 'Please select donor fitness status';
    }
    
    if (evaluationData.donorFitness === 'unfit' && !evaluationData.fitnessReason) {
      newErrors.fitnessReason = 'Please provide reason for unfitness';
    }
    
    if (evaluationData.donorFitness === 'fit') {
      if (!evaluationData.weight || parseFloat(evaluationData.weight) <= 0) {
        newErrors.weight = 'Please enter a valid weight';
      }
      
      if (!evaluationData.systolicBP || parseFloat(evaluationData.systolicBP) <= 0) {
        newErrors.systolicBP = 'Please enter a valid blood pressure';
      }
      
      if (!evaluationData.pulseRate || parseFloat(evaluationData.pulseRate) <= 0) {
        newErrors.pulseRate = 'Please enter a valid pulse rate';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAcceptDonor = async () => {
    if (!validateForm()) {
      return;
    }

    if (!userId || !appointmentId) {
      setErrorMessage('Missing user or appointment information');
      return;
    }

    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Create health vital record
      await createHealthVital({
        userId,
        appointmentId: appointmentId as string,
        weight: parseFloat(evaluationData.weight),
        bp: parseFloat(evaluationData.systolicBP),
        cvsPulse: parseFloat(evaluationData.pulseRate),
      }).unwrap();

      setSuccessMessage('Health vitals added successfully and donor accepted!');
      
      // TODO: Navigate to next step or update appointment status
      // router.push('/next-page');
      
    } catch (error) {
      console.error('Failed to save health vitals:', error);
      setErrorMessage('Failed to save health vitals. Please try again.');
    }
  };

  const handleRejectDonor = () => {
    if (!evaluationData.donorFitness) {
      setErrors({ donorFitness: 'Please select donor fitness status' });
      return;
    }

    if (evaluationData.donorFitness === 'unfit' && !evaluationData.fitnessReason) {
      setErrors({ fitnessReason: 'Please provide reason for rejection' });
      return;
    }

    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');

    // TODO: Implement rejection logic (update appointment status, send notification, etc.)
    setErrorMessage(`Donor rejected. Reason: ${evaluationData.fitnessReason}`);
  };

  const isFit = evaluationData.donorFitness === 'fit';

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <p className="text-gray-600">Loading appointment details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <p className="text-red-600">Error loading appointment details. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Medical Officer Evaluation
        </h1>

        
        {typedAppointmentData && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Donor:</span> {typedAppointmentData.donor.name}
            </p>
            <p className="text-sm text-red-600">
              <span className="font-medium">Blood Group:</span> {typedAppointmentData.donor.bloodGroup}
            </p>
          </div>
        )}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2 ">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={evaluationData.weight}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('weight', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
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
                  onClick={handleRejectDonor}
                  disabled={isCreatingVital}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <UserX size={24} />
                  Reject Donor
                </button>
                
                <button
                  onClick={handleAcceptDonor}
                  disabled={isCreatingVital}
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-green-50 text-green-600 hover:bg-green-100 font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <UserCheck size={24} />
                  {isCreatingVital ? 'Saving...' : 'Accept Donor'}
                </button>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="">
                  <p className="text-center font-medium">{successMessage}</p>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <p className="text-center font-medium">{errorMessage}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MedicalOfficerEvaluation;