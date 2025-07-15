
"use client";

import React, { useState } from 'react';
import { Button } from '@/components';
import { BloodRequestFormData } from '../../../../../../types';
import { FaTint, FaClock, FaExclamationTriangle, FaHospital, FaMapMarkerAlt } from 'react-icons/fa';
import { ArrowLeft, Calendar, Clock, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FormErrors {
  [key: string]: string;
}

export default function RequestForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<BloodRequestFormData>({
    bloodType: '',
    unitsRequired: '',
    urgencyLevel: '',
    reasonForRequest: '',
    specificPatientNeed: '',
    requestedDeliveryTime: '',
    requestFrom: '',
    contactNumber: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = [
    { value: 'routine', label: 'Routine', color: 'text-green-600 bg-green-50' },
    { value: 'urgent', label: 'Urgent', color: 'text-orange-600 bg-orange-50' },
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

  const handleInputChange = (field: keyof BloodRequestFormData, value: string) => {
    setFormData((prev: BloodRequestFormData) => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: FormErrors) => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.bloodType) newErrors.bloodType = 'Blood type is required';
    if (!formData.unitsRequired) newErrors.unitsRequired = 'Number of units is required';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      
      // Redirect to requests page after successful submission
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

  return (
    <div className="min-h-[100vh] p-4 bg-[#f8f8f8]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FaTint className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Blood Request Form</h1>
                <p className="text-gray-600">Submit a new blood request to nearby blood banks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blood Type and Units */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaTint className="text-red-600" />
              Blood Requirements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Type Needed *
                </label>
                <select
                  value={formData.bloodType}
                  onChange={(e) => handleInputChange('bloodType', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${
                    errors.bloodType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="" className="text-gray-600">Select blood type</option>
                  {bloodTypes.map(type => (
                    <option key={type} value={type} className="text-gray-800">{type}</option>
                  ))}
                </select>
                {errors.bloodType && <p className="mt-1 text-sm text-red-600">{errors.bloodType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Units Required *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.unitsRequired}
                  onChange={(e) => handleInputChange('unitsRequired', e.target.value)}
                  placeholder="e.g., 2"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-600 ${
                    errors.unitsRequired ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.unitsRequired && <p className="mt-1 text-sm text-red-600">{errors.unitsRequired}</p>}
              </div>
            </div>
          </div>

          {/* Urgency Level */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle className="text-orange-600" />
              Urgency Level
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <FaExclamationTriangle className="text-yellow-600" />
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
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${
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

          {/* Delivery Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="text-green-600" />
              Delivery Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requested Delivery Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.requestedDeliveryTime}
                  onChange={(e) => handleInputChange('requestedDeliveryTime', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${
                    errors.requestedDeliveryTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.requestedDeliveryTime && <p className="mt-1 text-sm text-red-600">{errors.requestedDeliveryTime}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  placeholder="e.g., +94 77 123 4567"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-600 ${
                    errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.contactNumber && <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>}
              </div>
            </div>
          </div>

          {/* Request From */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaHospital className="text-blue-600" />
              Request From
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                List of Nearby Blood Banks/Hospitals *
              </label>
              <div className="space-y-2">
                {nearbyBloodBanks.map(bank => (
                  <label key={bank.value} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
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