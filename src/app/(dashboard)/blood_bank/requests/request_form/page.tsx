"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RequestFormUI } from '@/components';
import {
  EnhancedBloodRequestFormData,
  FormErrors
} from '../../../../../../types';

export default function RequestFormContainer() {
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
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
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
        const newErrors = { ...(errors.bloodTypeRequests || {}) };
        delete newErrors[id];
        setErrors(prev => ({ ...prev, bloodTypeRequests: newErrors }));
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
    <div className=''>
    <RequestFormUI
      formData={formData}
      errors={errors}
      isSubmitting={isSubmitting}
      onInputChange={handleInputChange}
      onBloodTypeRequestChange={handleBloodTypeRequestChange}
      onAddBloodTypeRequest={addBloodTypeRequest}
      onRemoveBloodTypeRequest={removeBloodTypeRequest}
      onSubmit={handleSubmit}
      router={router}
    />
    </div>
  );
}
