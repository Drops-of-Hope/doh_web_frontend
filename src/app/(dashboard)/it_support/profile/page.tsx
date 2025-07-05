"use client";

import { ITSupportHeader, LoginActivity, AuditLogs } from "@/components";

export default function ITSupportProfilePage() {
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
      timestamp: '2025-07-05 08:30 AM',
      user: 'Kamal Wijesinghe (Admin)',
      ipAddress: '192.168.1.100',
      status: 'SUCCESS' as const
    },
    {
      id: '2',
      timestamp: '2025-07-05 06:45 AM',
      user: 'Kamal Wijesinghe (Admin)',
      ipAddress: '192.168.1.100',
      status: 'SUCCESS' as const
    },
    {
      id: '3',
      timestamp: '2025-07-04 22:15 PM',
      user: 'Kamal Wijesinghe (Admin)',
      ipAddress: '192.168.1.100',
      status: 'SUCCESS' as const
    },
    {
      id: '4',
      timestamp: '2025-07-04 18:30 PM',
      user: 'System Maintenance',
      ipAddress: '192.168.1.100',
      status: 'FAILED' as const
    }
  ];

  const auditLogs = [
    {
      id: '1',
      timestamp: '2025-07-05 09:00 AM',
      user: 'Kamal Wijesinghe',
      action: 'User Account Created',
      target: 'New Blood Bank: Kandy General'
    },
    {
      id: '2',
      timestamp: '2025-07-05 08:45 AM',
      user: 'Kamal Wijesinghe',
      action: 'System Configuration Updated',
      target: 'Blood Request Notification Settings'
    },
    {
      id: '3',
      timestamp: '2025-07-05 08:30 AM',
      user: 'Kamal Wijesinghe',
      action: 'Database Backup Initiated',
      target: 'Daily Backup Schedule'
    },
    {
      id: '4',
      timestamp: '2025-07-05 07:15 AM',
      user: 'Kamal Wijesinghe',
      action: 'User Permissions Modified',
      target: 'Hospital Admin: Dr. Perera'
    }
  ];

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[
#f8f8f8]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="text-[
#2D3748] mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>

        {/* IT Support Header Component */}
        <ITSupportHeader
          name="Kamal Wijesinghe"
          email="kamal.admin@bloodbank.lk"
          employeeId="EMP-IT-2024-001"
          department="Information Technology"
          role="System Administrator"
          phoneNumber="011-789-4561"
          accessLevel="Super Admin"
          lastLogin="2025-07-05 08:30 AM"
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