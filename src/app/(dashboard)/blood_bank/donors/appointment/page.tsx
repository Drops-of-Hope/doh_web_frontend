"use client";

import { useState } from 'react';
import { FaQrcode, FaCalendarDay, FaClock, FaCheckCircle } from 'react-icons/fa';
import { RecentDonations, BackButton, DonorProfileCard } from '@/components';

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

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'Confirmed' 
      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
      : 'bg-amber-100 text-amber-700 border border-amber-200';
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Donor Profile Card */}
          <div className="lg:col-span-2">
            <DonorProfileCard donorData={donorData} />
          </div>

          {/* Appointment Details & QR Scanner */}
          <div className="space-y-6">
            {/* QR Scanner Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mark Donor Attendance</h3>
              
              <button
                onClick={handleQRScan}
                disabled={showQRScanner}
                className="w-full bg-blue-500 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3"
              >
                <FaQrcode className="w-6 h-6" />
                {showQRScanner ? 'Scanning...' : 'Scan QR Code'}
              </button>

              {showQRScanner && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                  <p className="text-center text-blue-700 mt-2 text-sm">Scanning QR Code...</p>
                </div>
              )}

              {scanResult && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-semibold">Verified</span>
                  </div>
                  <p className="text-green-600 text-sm mt-1">Donor identity confirmed</p>
                </div>
              )}
            </div>

            {/* Appointment Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaCalendarDay className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{appointmentData.date}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaClock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{appointmentData.time}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(appointmentData.status)}`}>
                    {appointmentData.status}
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