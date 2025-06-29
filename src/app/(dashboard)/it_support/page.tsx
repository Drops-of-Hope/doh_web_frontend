"use client";
import { Button, StatCard, DonationBanner } from '@/components';
import { FaUsers, FaHospital, FaTint, FaClock, FaWifi, FaMobile, FaHdd } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface SystemStatus {
  uptime: string;
  lastBackup: string;
  responseTime: string;
  latency: string;
  mobileVersion: string;
  webVersion: string;
  backupSize: string;
}

type ServerStatus = 'online' | 'warning' | 'offline';

export default function HomePage() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    uptime: '99.9%',
    lastBackup: '2 hours ago',
    responseTime: '245ms',
    latency: '12ms',
    mobileVersion: 'v1.0.0',
    webVersion: 'v1.0.0',
    backupSize: '2.3 GB'
  });

  const [serverStatus, setServerStatus] = useState<ServerStatus>('online');

  useEffect(() => {

    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        responseTime: `${Math.floor(Math.random() * 100 + 200)}ms`,
        latency: `${Math.floor(Math.random() * 20 + 5)}ms`
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateUser = () => {
    console.log('Create User');
  };

  const getStatusColor = (status: ServerStatus): string => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'offline': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusDot = (status: ServerStatus): string => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="text-[#2D3748] flex justify-between">
        <div>
          <h1 className="font-semibold">Hello, Nadhiya</h1>
          <p className="text-s text-gray-500">Here's your summary for the day</p>
        </div>
        <div className="">
          <Button
            title="Add User"
            containerStyles="bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-3xl transition-colors duration-200"
            handleClick={handleCreateUser}
          />
        </div>
      </div>
      
      <div className="flex justify-between gap-4 mt-6">
        <StatCard 
          title="Total Donors"
          count="1,250"
          icon={<FaUsers />}
          iconBgColor="#FB7373"
        />
        <StatCard 
          title="Total Hospitals"
          count="45"
          icon={<FaHospital />}
          iconBgColor="#FB7373"
        />
        <StatCard 
          title="Total Blood Banks"
          count="23"
          icon={<FaTint />}
          iconBgColor="#FB7373"
        />
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold text-[#2D3748]">System Status</h2>
          <div className={`w-3 h-3 rounded-full ${getStatusDot(serverStatus)} animate-pulse`}></div>
          <span className={`text-sm font-medium ${getStatusColor(serverStatus)} capitalize`}>
            {serverStatus}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Last Backup</p>
                <p className="text-lg font-semibold text-[#2D3748]">{systemStatus.lastBackup}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FaClock className="text-blue-600" size={18} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Response Time</p>
                <p className="text-lg font-semibold text-[#2D3748]">{systemStatus.responseTime}</p>
                <p className="text-xs text-gray-400">Latency: {systemStatus.latency}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <FaWifi className="text-purple-600" size={18} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">App Versions</p>
                <p className="text-sm font-semibold text-[#2D3748]">Web: {systemStatus.webVersion}</p>
                <p className="text-sm font-semibold text-[#2D3748]">Mobile: {systemStatus.mobileVersion}</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <FaMobile className="text-orange-600" size={18} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Backup Storage</p>
                <p className="text-lg font-semibold text-[#2D3748]">{systemStatus.backupSize}</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <FaHdd className="text-indigo-600" size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex mt-4'>
        <div className='w-1/2'>
          <DonationBanner />
        </div>
      </div>
    </div>
  );
}