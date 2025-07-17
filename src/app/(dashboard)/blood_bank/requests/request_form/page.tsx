"use client";

import React, { useState } from 'react';
import { Button, BackButton, BloodTypeRequestsSection, RequestFormSections } from '@/components';
import { BloodRequestFormData } from '../../../../../../types';
import { FaTint } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { 
  EnhancedBloodRequestFormData, 
  FormErrors, 
  BloodTypeRequest,
  urgencyLevels,
  reasonsForRequest,
  nearbyBloodBanks
} from '../../../../../../types';

export default function RequestForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<EnhancedBloodRequestFormData>({
    bloodTypeRequests: [{ id: '1', bloodType: '', unitsRequired: '' }],
    urgencyLevel: '',
    reasonForRequest: '',
    specificPatientNeed: '',
    requestedDeliveryTime: '',
    requestFrom: '',
    contactNumber: '',
    additionalNotes: '',
    notifyDonors: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof EnhancedBloodRequestFormData, value: string | boolean) => {
    if (field === 'bloodTypeRequests') return;

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleBloodTypeRequestChange = (id: string, field: 'bloodType' | 'unitsRequired', value: string) => {
    setFormData(prev => ({
      ...prev,
      bloodTypeRequests: prev.bloodTypeRequests.map(request =>
        request.id === id ? { ...request, [field]: value } : request
      )
    }));

    if (errors.bloodTypeRequests?.[id]?.[field]) {
      setErrors(prev => ({
        ...prev,
        bloodTypeRequests: {
          ...(prev.bloodTypeRequests || {}),
          [id]: {
            ...(prev.bloodTypeRequests?.[id] || {}),
            [field]: undefined
          }
        }
      }));
    }
  };

  const addBloodTypeRequest = () => {
    const newId = Date.now().toString();
    setFormData(prev => ({
      ...prev,
      bloodTypeRequests: [...prev.bloodTypeRequests, { id: newId, bloodType: '', unitsRequired: '' }]
    }));
  };

  const removeBloodTypeRequest = (id: string) => {
    if (formData.bloodTypeRequests.length > 1) {
      setFormData(prev => ({
        ...prev,
        bloodTypeRequests: prev.bloodTypeRequests.filter(request => request.id !== id)
      }));

      if (errors.bloodTypeRequests?.[id]) {
        const newBloodTypeErrors = { ...(errors.bloodTypeRequests || {}) };
        delete newBloodTypeErrors[id];
        setErrors(prev => ({
          ...prev,
          bloodTypeRequests: newBloodTypeErrors
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const bloodTypeErrors: { [key: string]: { bloodType?: string; unitsRequired?: string } } = {};

    formData.bloodTypeRequests.forEach(request => {
      const requestErrors: { bloodType?: string; unitsRequired?: string } = {};
      if (!request.bloodType) requestErrors.bloodType = 'Blood type is required';
      if (!request.unitsRequired) {
        requestErrors.unitsRequired = 'Number of units is required';
      } else if (parseInt(request.unitsRequired) <= 0) {
        requestErrors.unitsRequired = 'Units must be greater than 0';
      }
      if (Object.keys(requestErrors).length > 0) {
        bloodTypeErrors[request.id] = requestErrors;
      }
    });

    const bloodTypeCounts = formData.bloodTypeRequests.reduce((acc, request) => {
      if (request.bloodType) acc[request.bloodType] = (acc[request.bloodType] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    Object.entries(bloodTypeCounts).forEach(([bloodType, count]) => {
      if (count > 1) {
        formData.bloodTypeRequests.forEach(request => {
          if (request.bloodType === bloodType) {
            bloodTypeErrors[request.id] = {
              ...(bloodTypeErrors[request.id] || {}),
              bloodType: 'Duplicate blood type detected'
            };
          }
        });
      }
    });

    if (Object.keys(bloodTypeErrors).length > 0) {
      newErrors.bloodTypeRequests = bloodTypeErrors;
    }

    if (!formData.urgencyLevel) newErrors.urgencyLevel = 'Urgency level is required';
    if (!formData.reasonForRequest) newErrors.reasonForRequest = 'Reason for request is required';
    if (!formData.requestedDeliveryTime) newErrors.requestedDeliveryTime = 'Delivery time is required';
    if (!formData.requestFrom) newErrors.requestFrom = 'Request source is required';
    if (!formData.contactNumber) newErrors.contactNumber = 'Contact number is required';

    if (formData.reasonForRequest === 'specific_patient' && !formData.specificPatientNeed) {
      newErrors.specificPatientNeed = 'Patient details are required for specific patient need';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      router.push('/blood_bank/requests');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100vh] p-4 bg-[#f8f8f8]">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <BackButton 
            fallbackUrl="/blood_bank/requests/request_form"
            className="hover:shadow-md"
          />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FaTint className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Blood Request Form</h1>
                <p className="text-gray-600">Submit a new blood request</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blood Type and Units - Using the separate component */}
          <BloodTypeRequestsSection
            bloodTypeRequests={formData.bloodTypeRequests}
            errors={errors}
            onBloodTypeRequestChange={handleBloodTypeRequestChange}
            onAddBloodTypeRequest={addBloodTypeRequest}
            onRemoveBloodTypeRequest={removeBloodTypeRequest}
          />

          {/* Form Sections */}
          <RequestFormSections
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            urgencyLevels={urgencyLevels}
            reasonsForRequest={reasonsForRequest}
            nearbyBloodBanks={nearbyBloodBanks}
          />

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              <Button
                title={isSubmitting ? "Submitting..." : "Submit Request"}
                containerStyles={`${
                  isSubmitting ? 'bg-gray-400' : 'bg-[#FB7373] hover:bg-red-400'
                } text-white font-medium rounded-lg transition-colors duration-200`}
                handleClick={handleSubmit}
                leftIcon={isSubmitting ? undefined : <FaTint className="w-4 h-4" />}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}