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
  // Add other properties as needed
}

interface AppointmentData {
  id: string;
  appointmentDate: string;
  donor: ExtendedDonor;
  slot: AppointmentSlot;
  medicalEstablishment: MedicalEstablishment;
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

  // Type guard to ensure we have properly typed appointment data
  const typedAppointmentData = appointmentData as AppointmentData | undefined;

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
    router.push('/blood_bank/donors/form');
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

  const getErrorMessage = (): string => {
    if (error && 'data' in error) {
      const errorData = error.data as { message?: string } | undefined;
      return errorData?.message || 'The requested appointment could not be found.';
    }
    return 'The requested appointment could not be found.';
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
  if (isError || !typedAppointmentData || !typedAppointmentData.donor || !typedAppointmentData.slot || !typedAppointmentData.medicalEstablishment) {
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
              {!typedAppointmentData 
                ? 'Appointment Not Found' 
                : !typedAppointmentData.donor 
                  ? 'Donor Information Missing'
                  : !typedAppointmentData.slot
                    ? 'Appointment Slot Information Missing'
                    : 'Medical Establishment Information Missing'}
            </h2>
            <p className="text-gray-600">
              {isError 
                ? getErrorMessage()
                : !typedAppointmentData 
                  ? 'The requested appointment could not be found.'
                  : !typedAppointmentData.donor 
                    ? 'Donor information is missing for this appointment.'
                    : !typedAppointmentData.slot
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
    id: typedAppointmentData.donor.id,
    name: typedAppointmentData.donor.name,
    email: typedAppointmentData.donor.email,
    bloodGroup: typedAppointmentData.donor.bloodGroup,
    nic: typedAppointmentData.donor.nic ?? 'N/A',
    createdAt: typedAppointmentData.donor.createdAt ?? new Date().toISOString(),
    donationBadge: typedAppointmentData.donor.donationBadge ?? 'BRONZE',
    isActive: typedAppointmentData.donor.isActive ?? true,
    profileImageUrl: typedAppointmentData.donor.profileImageUrl ?? null,
    totalDonations: typedAppointmentData.donor.totalDonations ?? 0,
    totalPoints: typedAppointmentData.donor.totalPoints ?? 0,
    updatedAt: typedAppointmentData.donor.updatedAt ?? new Date().toISOString(),
    nextEligible: typedAppointmentData.donor.nextEligible ?? null
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
                  <span className="text-gray-900">{formatDate(typedAppointmentData.appointmentDate)}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaClock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">
                    {formatTime(typedAppointmentData.appointmentDate, typedAppointmentData.slot.startTime)} - {typedAppointmentData.slot.endTime}
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