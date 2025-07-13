"use client";

import { useState } from 'react';
import { FaQrcode, FaCalendarDay, FaClock, FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa';
import { RecentDonations, BackButton, DonorProfileCard } from '@/components';
import { useRouter } from 'next/navigation';

interface DonorDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  bloodType: string;
  address: string;
  weight: number;
  height: number;
  lastDonation: string;
  totalDonations: number;
  nicNumber: string;
}

interface AppointmentDetails {
  id: string;
  date: string;
  time: string;
  location: string;
  status: string;
  notes?: string;
}

interface DonationHistory {
  id: number;
  date: string;
  type: string;
  location: string;
}

export default function Appointment() {
  const router = useRouter();
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<string>('');

  // Mock data - in real app, this would come from props or API
  const donorData: DonorDetails = {
    id: "D001",
    name: "Kasun Perera",
    email: "kasun.perera@email.com",
    phone: "+94 77 123 4567",
    age: 28,
    bloodType: "O+",
    address: "123 Main Street, Colombo 07",
    weight: 72,
    height: 175,
    lastDonation: "2024-03-15",
    totalDonations: 8,
    nicNumber: "199512345678"
  };

  const appointmentData: AppointmentDetails = {
    id: "A001",
    date: "2024-07-15",
    time: "10:30 AM",
    location: "National Blood Bank, Colombo",
    status: "Confirmed",
    notes: "Regular donor - no medical concerns"
  };

  const donationHistory: DonationHistory[] = [
    { id: 1, date: "2024-12-15", type: "Whole Blood", location: "Colombo Blood Bank" },
    { id: 2, date: "2024-09-10", type: "Whole Blood", location: "Kandy General Hospital" },
    { id: 3, date: "2024-06-05", type: "Whole Blood", location: "Colombo Blood Bank" }
  ];

  const handleQRScan = () => {
    setShowQRScanner(true);
    // Mock QR scan result
    setTimeout(() => {
      setScanResult("QR_CODE_VERIFIED_D001");
      setShowQRScanner(false);
    }, 2000);
  };

  const handleViewForm = () => {

    // For Next.js with router:
    router.push('/blood_bank/donors/appointment/form');

  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-[100vh] p-4 pt-2 bg-[#f8f8f8]">
      <div className="">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton 
            fallbackUrl="/blood_bank/donors/appointment"
            className="hover:shadow-md"
          />
        </div>

        <div className="flex gap-6">
          {/* Donor Profile Card */}
          <div className="w-2/3 min-h-[50vh]">
            <DonorProfileCard donorData={donorData} />
          </div>

          {/* Appointment Details & QR Scanner */}
          <div className="space-y-6 w-1/3 min-h-[50vh]">
            {/* QR Scanner Card */}
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
                  <button
                    onClick={handleViewForm}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm mt-1 transition-colors duration-200 hover:underline"
                  >
                    View Form
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </button>
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">Appointment Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaCalendarDay className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{appointmentData.date}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaClock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{appointmentData.time}</span>
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