"use client";

import { useState } from 'react';
import { FaQrcode, FaCalendarDay, FaClock, FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa';
import { RecentDonations, BackButton, DonorProfileCard } from '@/components';
import { useRouter, useParams } from 'next/navigation';
import { useGetAppointmentByIdQuery } from '@/store/api/appointmentsApi';

interface DonationHistory {
  id: number;
  date: string;
  type: string;
  location: string;
}

interface DonorDetails {
  id: string;
  nic: string;
  email: string;
  name: string;
  bloodGroup: string;
  createdAt: string;
  donationBadge: string;
  isActive: boolean;
  profileImageUrl?: string | null;
  totalDonations: number;
  totalPoints: number;
  updatedAt: string;
  nextEligible?: string | null;
}

export default function Appointment() {
  const router = useRouter();
  const params = useParams();
  const appointmentId = params.appointmentId as string;
  
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<string>('');

  // Fetch appointment data from API
  const { 
    data: appointmentData, 
    isLoading, 
    isError, 
    error 
  } = useGetAppointmentByIdQuery(appointmentId, {
    skip: !appointmentId
  });

  const donationHistory: DonationHistory[] = [
    { id: 1, date: "2024-12-15", type: "Whole Blood", location: "Colombo Blood Bank" },
    { id: 2, date: "2024-09-10", type: "Whole Blood", location: "Kandy General Hospital" },
    { id: 3, date: "2024-06-05", type: "Whole Blood", location: "Colombo Blood Bank" }
  ];

  const handleQRScan = () => {
    setShowQRScanner(true);
    setTimeout(() => {
      setScanResult("QR_CODE_VERIFIED");
      setShowQRScanner(false);
    }, 2000);
  };

  const handleViewForm = () => {
    router.push(`/blood_bank/donors/appointment/form/${appointmentId}`);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string, startTime: string): string => {
    // Convert 24-hour format to 12-hour format with AM/PM
    const [hours, minutes] = startTime.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-[100vh] p-4 pt-2 bg-[#f8f8f8]">
        <div className="mb-6">
          <BackButton 
            fallbackUrl="/blood_bank/donors/appointment"
            className="hover:shadow-md"
          />
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  // Error state - also check for missing donor data and required nested properties
  if (isError || !appointmentData || !appointmentData.donor || !appointmentData.slot || !appointmentData.medicalEstablishment) {
    return (
      <div className="min-h-[100vh] p-4 pt-2 bg-[#f8f8f8]">
        <div className="mb-6">
          <BackButton 
            fallbackUrl="/blood_bank/donors/appointment"
            className="hover:shadow-md"
          />
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-2">⚠️</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {!appointmentData 
                ? 'Appointment Not Found' 
                : !appointmentData.donor 
                  ? 'Donor Information Missing'
                  : !appointmentData.slot
                    ? 'Appointment Slot Information Missing'
                    : 'Medical Establishment Information Missing'}
            </h2>
            <p className="text-gray-600">
              {error && 'data' in error 
                ? (error.data as any)?.message || 'The requested appointment could not be found.'
                : !appointmentData 
                  ? 'The requested appointment could not be found.'
                  : !appointmentData.donor 
                    ? 'Donor information is missing for this appointment.'
                    : !appointmentData.slot
                      ? 'Appointment slot information is missing.'
                      : 'Medical establishment information is missing.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Create a properly typed donor object that matches DonorDetails interface
  const donorData: DonorDetails = {
    id: appointmentData.donor.id,
    name: appointmentData.donor.name,
    email: appointmentData.donor.email,
    bloodGroup: appointmentData.donor.bloodGroup,
    nic: (appointmentData.donor as any).nic || 'N/A',
    createdAt: (appointmentData.donor as any).createdAt || new Date().toISOString(),
    donationBadge: (appointmentData.donor as any).donationBadge || 'BRONZE',
    isActive: (appointmentData.donor as any).isActive ?? true,
    profileImageUrl: (appointmentData.donor as any).profileImageUrl || null,
    totalDonations: (appointmentData.donor as any).totalDonations || 0,
    totalPoints: (appointmentData.donor as any).totalPoints || 0,
    updatedAt: (appointmentData.donor as any).updatedAt || new Date().toISOString(),
    nextEligible: (appointmentData.donor as any).nextEligible || null
  };
  
  return (
    <div className="min-h-[100vh] p-4 pt-2 bg-[#f8f8f8]">
      <div className="">
        <div className="mb-6">
          <BackButton 
            fallbackUrl="/blood_bank/donors/appointment"
            className="hover:shadow-md"
          />
        </div>

        <div className="flex gap-6">
          <div className="w-2/3 min-h-[50vh]">
            <DonorProfileCard donorData={donorData} />
          </div>

          <div className="space-y-6 w-1/3 min-h-[50vh]">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-[100%]">
              <h3 className="text-lg font-semibold text-gray-900 mb-8">Mark Donor Attendance</h3>
              
              <button
                onClick={handleQRScan}
                disabled={showQRScanner}
                className="w-full bg-blue-500 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FaQrcode className="w-4 h-4" />
                {showQRScanner ? 'Scanning...' : 'Scan QR Code'}
              </button>

              {showQRScanner && (
                <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                  <p className="text-center text-blue-700 mt-1 text-sm">Scanning QR Code...</p>
                </div>
              )}

              {scanResult && (
                <div className="mt-2 p-2 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-1">
                    <FaCheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-700 font-semibold">Verified</span>
                  </div>
                </div>
              )}
              
              <button
                onClick={handleViewForm}
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm mt-4 transition-colors duration-200 hover:underline"
              >
                View Form
                <FaExternalLinkAlt className="w-3 h-3" />
              </button>

              <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">Appointment Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaCalendarDay className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{formatDate(appointmentData.appointmentDate)}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaClock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">
                    {formatTime(appointmentData.appointmentDate, appointmentData.slot.startTime)} - {appointmentData.slot.endTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className='mt-4'>
          <RecentDonations donationHistory={donationHistory} formatDate={formatDate} />
        </div>
      </div>
    </div>
  );
}