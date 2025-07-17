"use client";

import React, { useState } from 'react';
import { Button, BackButton } from '@/components';
import { BloodRequestFormData } from '../../../../../../types';
import { FaTint, FaClock, FaExclamationTriangle, FaHospital, FaMapMarkerAlt, FaPlus, FaTrash, FaUsers } from 'react-icons/fa';
import { ArrowLeft, Calendar, Clock, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BloodTypeRequest {
  id: string;
  bloodType: string;
  unitsRequired: string;
}

interface EnhancedBloodRequestFormData extends Omit<BloodRequestFormData, 'bloodType' | 'unitsRequired'> {
  bloodTypeRequests: BloodTypeRequest[];
  notifyDonors: boolean;
}

interface FormErrors {
  urgencyLevel?: string;
  reasonForRequest?: string;
  requestedDeliveryTime?: string;
  requestFrom?: string;
  contactNumber?: string;
  specificPatientNeed?: string;
  additionalNotes?: string;
  bloodTypeRequests?: { [key: string]: { bloodType?: string; unitsRequired?: string } };
}


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

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const urgencyLevels = [
    { value: 'routine', label: 'Routine', color: 'text-green-600 bg-green-50' },
    { value: 'emergency', label: 'Emergency', color: 'text-red-600 bg-red-50' }
  ];

  const reasonsForRequest = [
    { value: 'low_inventory', label: 'Low Inventory' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'specific_patient', label: 'Specific Patient Need' }
  ];

  const nearbyBloodBanks = [
    { value: 'city_general', label: 'City General Hospital Blood Bank', location: 'Downtown District' },
    { value: 'national_hospital', label: 'National Hospital Blood Bank', location: 'Borella' },
    { value: 'private_hospital', label: 'Private Hospital Blood Bank', location: 'Nugegoda' },
    { value: 'teaching_hospital', label: 'Teaching Hospital Blood Bank', location: 'Colombo 08' }
  ];

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

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'routine': return <Clock className="w-4 h-4" />;
      case 'urgent': return <FaClock className="w-4 h-4" />;
      case 'emergency': return <FaExclamationTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getTotalUnits = () => {
    return formData.bloodTypeRequests.reduce((total, request) => {
      return total + (parseInt(request.unitsRequired) || 0);
    }, 0);
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
          {/* Blood Type and Units */}
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
              {formData.bloodTypeRequests.map((request, index) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-700">Blood Type Request #{index + 1}</h3>
                    {formData.bloodTypeRequests.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBloodTypeRequest(request.id)}
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
                        onChange={(e) => handleBloodTypeRequestChange(request.id, 'bloodType', e.target.value)}
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
                        onChange={(e) => handleBloodTypeRequestChange(request.id, 'unitsRequired', e.target.value)}
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
                onClick={addBloodTypeRequest}
                className="w-1/3 border-1 border-gray-300 rounded-lg p-2 text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <FaPlus className="w-4 h-4" />
                Add Another Blood Type
              </button>
            </div>
          </div>

          {/* Urgency Level */}
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
                    onChange={(e) => handleInputChange('urgencyLevel', e.target.value)}
                    className="sr-only"
                  />
                  <div className={`border-2 rounded-lg p-4 transition-all ${
                    formData.urgencyLevel === level.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
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
            {errors.urgencyLevel && <p className="mt-2 text-sm text-red-600">{errors.urgencyLevel}</p>}
          </div>

          {/* Reason for Request */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              Reason for Request
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Reason *
                </label>
                <select
                  value={formData.reasonForRequest}
                  onChange={(e) => handleInputChange('reasonForRequest', e.target.value)}
                  className={`w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${
                    errors.reasonForRequest ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="" className="text-gray-600">Select reason</option>
                  {reasonsForRequest.map(reason => (
                    <option key={reason.value} value={reason.value} className="text-gray-800">{reason.label}</option>
                  ))}
                </select>
                {errors.reasonForRequest && <p className="mt-1 text-sm text-red-600">{errors.reasonForRequest}</p>}
              </div>

              {formData.reasonForRequest === 'specific_patient' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specific Patient Need Details *
                  </label>
                  <textarea
                    value={formData.specificPatientNeed}
                    onChange={(e) => handleInputChange('specificPatientNeed', e.target.value)}
                    rows={3}
                    placeholder="Please provide details about the specific patient need..."
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-600 ${
                      errors.specificPatientNeed ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.specificPatientNeed && <p className="mt-1 text-sm text-red-600">{errors.specificPatientNeed}</p>}
                </div>
              )}
            </div>
          </div>

          {/* Delivery Time */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="text-purple-600" />
              Delivery Time
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requested Delivery Time *
              </label>
              <input
                type="datetime-local"
                value={formData.requestedDeliveryTime}
                onChange={(e) => handleInputChange('requestedDeliveryTime', e.target.value)}
                className={`w-full md:w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${
                  errors.requestedDeliveryTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.requestedDeliveryTime && <p className="mt-1 text-sm text-red-600">{errors.requestedDeliveryTime}</p>}
            </div>
          </div>

          {/* Request From */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              Request From
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  List of Nearby Blood Banks/Hospitals *
                </label>
                <div className="space-y-2">
                  {nearbyBloodBanks.map(bank => (
                    <label key={bank.value} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="requestFrom"
                        value={bank.value}
                        checked={formData.requestFrom === bank.value}
                        onChange={(e) => handleInputChange('requestFrom', e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{bank.label}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <FaMapMarkerAlt className="w-3 h-3" />
                          {bank.location}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.requestFrom && <p className="mt-2 text-sm text-red-600">{errors.requestFrom}</p>}
              </div>

              {/* Donor Notification Checkbox */}
              <div className="pt-2 border-t border-gray-200">
                <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifyDonors}
                    onChange={(e) => handleInputChange('notifyDonors', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800">
                      Request and notify matching eligible donors nearby
                    </span>
                  </div>
                </label>
                <p className="text-xs text-gray-600 mt-1 ml-7">
                  This will send notifications to registered donors in your area who match the required blood types
                </p>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Additional Notes
            </h2>
            
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              rows={4}
              placeholder="Any additional information or special requirements..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-600"
            />
          </div>

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