"use client";
import React from 'react';
import { Droplets, AlertTriangle, Calendar, Package, TrendingDown, Users } from 'lucide-react';
import { BackButton, CompatibilityInfo } from '@/components';

interface StockStatus {
  status: 'critical' | 'low' | 'normal';
  label: string;
  color: string;
}

interface ExpirationDate {
  date: string;
  units: number;
}

interface RecentDonation {
  date: string;
  units: number;
  donor: string;
}

interface AdditionalInfo {
  totalDonated: number;
  totalIssued: number;
  reservedUnits: number;
  minimumRequired: number;
  expirationDates: ExpirationDate[];
  recentDonations: RecentDonation[];
  compatibleWith: string[];
  canReceiveFrom: string[];
  characteristics: string;
}

interface BloodGroupData {
  id: string;
  bloodGroup: string;
  availableUnits: number;
  expiredUnits: number;
  lastRestocked: string;
  lastUpdated: string;
  stockStatus: StockStatus;
  additionalInfo: AdditionalInfo;
}

export default function BloodGroupDetails(): React.JSX.Element {

  const bloodGroupData: BloodGroupData = {
     id: 'BG-005',
    bloodGroup: 'O-',
    availableUnits: 45,
    expiredUnits: 1,
    lastRestocked: 'May 16, 2025',
    lastUpdated: 'Jan 24, 2019',
    stockStatus: {
      status: 'critical',
      label: 'Critical Low',
      color: 'bg-red-100 text-red-800 border-red-200'
    },
    additionalInfo: {
      totalDonated: 156,
      totalIssued: 110,
      reservedUnits: 8,
      minimumRequired: 80,
      expirationDates: [
        { date: 'May 20, 2025', units: 12 }
      ],
      recentDonations: [
        { date: 'May 16, 2025', units: 8, donor: 'Anonymous' }
      ],
      compatibleWith: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      canReceiveFrom: ['O-'],
      characteristics: 'Universal donor - can donate to all blood types'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
           <div className="mb-6">
            <BackButton 
              fallbackUrl="/blood_bank/inventory/blood_group"
              className="hover:shadow-md"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Droplets className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Blood Group {bloodGroupData.bloodGroup}</h1>
                <p className="text-gray-600 mt-1">{bloodGroupData.additionalInfo.characteristics}</p>
              </div>
            </div>
            <button 
              className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Request Blood
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Units</p>
                <p className="text-2xl font-bold text-gray-900">{bloodGroupData.availableUnits}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Stock Status</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${bloodGroupData.stockStatus.color}`}>
                  {bloodGroupData.stockStatus.label}
                </span>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired Units</p>
                <p className="text-2xl font-bold text-red-600">{bloodGroupData.expiredUnits}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reserved Units</p>
                <p className="text-2xl font-bold text-yellow-600">{bloodGroupData.additionalInfo.reservedUnits}</p>
              </div>
              <Users className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className='flex gap-2'>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-2/3">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Blood Type</p>
                  <p className="text-gray-900 font-semibold">{bloodGroupData.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Restocked</p>
                  <p className="text-gray-900">{bloodGroupData.lastRestocked}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Updated</p>
                  <p className="text-gray-900">{bloodGroupData.lastUpdated}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Minimum Required</p>
                  <p className="text-gray-900">{bloodGroupData.additionalInfo.minimumRequired} units</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Donated</p>
                  <p className="text-gray-900">{bloodGroupData.additionalInfo.totalDonated} units</p>
                </div>
              </div>
            </div>
            <CompatibilityInfo
              compatibleWith={bloodGroupData.additionalInfo.compatibleWith}
              canReceiveFrom={bloodGroupData.additionalInfo.canReceiveFrom}
            />
          </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Expiration Dates</h2>
              <div className="space-y-3">
                {bloodGroupData.additionalInfo.expirationDates.map((exp, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-900">{exp.date}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{exp.units} units</span>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}