"use client";

import { useState } from 'react';
import { Edit, Heart, Droplets, Clock, Award } from 'lucide-react';
import { PersonalInformation, RecentDonations, SummarySection } from '@/components';

interface DonorData {
  name: string;
  email: string;
  phone: string;
  bloodType: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  totalDonations: number;
  lastDonation: string;
  nextEligibleDate: string;
  donationGoal: number;
}

interface Achievement {
  id: number;
  title: string;
  icon: string;
  earned: boolean;
}

interface DonationHistory {
  id: number;
  date: string;
  type: string;
  location: string;
}

export default function DonorProfilePage() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  const donorData: DonorData = {
    name: "Nadhiya Nashath ",
    email: "nadhiya@gmail.com",
    phone: "077-123-4567",
    bloodType: "O+",
    dateOfBirth: "1995-03-15",
    address: "123 Galle Road, Colombo 03",
    emergencyContact: "Nimal Perera (Father) - 077-987-6543",
    totalDonations: 12,
    lastDonation: "2024-12-15",
    nextEligibleDate: "2025-03-15",
    donationGoal: 15
  };

  const achievements: Achievement[] = [
    { id: 1, title: "First Time Donor", icon: "blood", earned: true },
    { id: 2, title: "Life Saver", icon: "heart", earned: true },
    { id: 3, title: "Regular Donor", icon: "star", earned: true },
    { id: 4, title: "Hero Badge", icon: "trophy", earned: false }
  ];

  const donationHistory: DonationHistory[] = [
    { id: 1, date: "2024-12-15", type: "Whole Blood", location: "Colombo Blood Bank" },
    { id: 2, date: "2024-09-10", type: "Whole Blood", location: "Kandy General Hospital" },
    { id: 3, date: "2024-06-05", type: "Whole Blood", location: "Colombo Blood Bank" }
  ];

  const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-32" style={{ background: '#B3D0E9' }}></div>
          <div className="relative px-8 pb-8">
            <div className="absolute -top-16 left-8">
              <div className="w-32 h-32 rounded-full flex items-center justify-center shadow-xl border-4 border-white" style={{ background: '#B3D0E9' }}>
                <span className="text-gray-800 text-4xl font-bold">
                  {getInitials(donorData.name)}
                </span>
              </div>
            </div>
            
            <div className="pt-20 flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{donorData.name}</h2>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <span>{donorData.email}</span>
                  <span>{donorData.phone}</span>
                </div>
                <div className="bg-red-50 text-red-700 px-4 py-2 rounded-full font-bold text-lg inline-block border-2 border-red-200">
                  Blood Type: {donorData.bloodType}
                </div>
              </div>
              
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-red-50 text-red-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg hover:bg-red-100 border-2 border-red-200"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#B3D0E9' }}>
              <Droplets className="w-6 h-6 text-gray-800" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{donorData.totalDonations}</h3>
            <p className="text-gray-600">Total Donations</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{donorData.totalDonations * 3}</h3>
            <p className="text-gray-600">Lives Saved</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">{formatDate(donorData.nextEligibleDate)}</h3>
            <p className="text-gray-600">Next Eligible</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{achievements.filter(a => a.earned).length}</h3>
            <p className="text-gray-600">Achievements</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PersonalInformation donorData={donorData} isEditing={isEditing} />
          <RecentDonations donationHistory={donationHistory} formatDate={formatDate} />
        </div>

        <SummarySection donorData={donorData} achievements={achievements} />
      </div>
    </div>
  );
}