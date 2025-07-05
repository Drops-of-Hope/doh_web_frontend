"use client";

import { ProfileHeader, LoginActivity, AuditLogs } from "@/components";

export default function HospitalProfilePage() {
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
      timestamp: '2025-07-05 09:30 AM',
      user: 'Dr. Rajesh Perera',
      ipAddress: '192.168.2.45',
      status: 'SUCCESS' as const
    },
    {
      id: '2',
      timestamp: '2025-07-05 08:45 AM',
      user: 'Nurse Sarah Fernando',
      ipAddress: '192.168.2.23',
      status: 'SUCCESS' as const
    },
    {
      id: '3',
      timestamp: '2025-07-05 07:15 AM',
      user: 'Admin Kamal Silva',
      ipAddress: '192.168.2.10',
      status: 'FAILED' as const
    }
  ];

  const auditLogs = [
    {
      id: '1',
      timestamp: '2025-07-05 09:15 AM',
      user: 'Dr. Rajesh Perera',
      action: 'Blood Request Submitted',
      target: 'Patient ID: P-2025-001'
    },
    {
      id: '2',
      timestamp: '2025-07-05 08:30 AM',
      user: 'Nurse Sarah Fernando',
      action: 'Blood Inventory Updated',
      target: 'Blood Type: O+ Units'
    }
  ];

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Profile Header Component */}
        <ProfileHeader
          name="Colombo General Hospital"
          email="admin@colombogeneral.lk"
          address="Regent Street, Colombo 08"
          region="Colombo"
          phoneNumber="011-269-1111"
          establishmentType="Government Hospital"
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