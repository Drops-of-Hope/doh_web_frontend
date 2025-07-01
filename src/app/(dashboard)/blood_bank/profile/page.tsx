"use client";

import { ProfileHeader, LoginActivity, AuditLogs } from "@/components";

export default function ProfilePage() {
  const handleEdit = () => {
    console.log('Edit profile clicked');
  };

  const handleAddPhoneNumber = () => {
    console.log('Add phone number clicked');
  };

  const handleViewAllActivity = () => {
    console.log('View all login activity clicked');
  };

  const handleViewAllLogs = () => {
    console.log('View all audit logs clicked');
  };

  const handleReportIssue = (id: string) => {
    console.log('Report issue clicked for:', id);
  };

  const loginActivities = [
    {
      id: '1',
      timestamp: '2025-06-30 08:12 AM',
      user: 'Nadhiya Admin',
      ipAddress: '192.168.1.23',
      status: 'SUCCESS' as const,
      description: 'show the login status as a badge'
    },
    {
      id: '2',
      timestamp: '2025-06-30 08:12 AM',
      user: 'Nadhiya Admin',
      ipAddress: '192.168.1.23',
      status: 'SUCCESS' as const,
      description: 'MAKE THE TEXTS BIG AND SMALL ACCORDING TO PREFERENCE'
    },
    {
      id: '3',
      timestamp: '2025-06-30 08:12 AM',
      user: 'Nadhiya Admin',
      ipAddress: '192.168.1.23',
      status: 'SUCCESS' as const
    }
  ];

  const auditLogs = [
    {
      id: '1',
      timestamp: '2025-06-30 08:12 AM',
      user: 'Nadhiya Admin',
      action: 'Action Performed',
      target: 'User back'
    }
  ];

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="text-[#2D3748] mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>

        {/* Profile Header Component */}
        <ProfileHeader
          name="Central Blood Bank Narahenpita"
          email="bloodbank@gmail.com"
          address="No. 55, Blah Blah road, Blah 05"
          region="Narahenpita"
          phoneNumber="011-485-9485"
          establishmentType="Blood bank"
          onEdit={handleEdit}
          onAddPhoneNumber={handleAddPhoneNumber}
        />

        {/* Login Activity and Audit Logs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoginActivity
            activities={loginActivities}
            onViewAll={handleViewAllActivity}
            onReportIssue={handleReportIssue}
          />
          
          <AuditLogs
            logs={auditLogs}
            onViewAll={handleViewAllLogs}
            onReportIssue={handleReportIssue}
          />
        </div>
      </div>
    </div>
  );
}