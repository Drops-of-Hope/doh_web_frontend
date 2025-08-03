"use client";

import { useSession } from "next-auth/react";
import { ProfileHeader, LoginActivity, AuditLogs } from "@/components";

export default function ProfilePage() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "bloodbank@gmail.com"; 


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
    },
    {
      id: '2',
      timestamp: '2025-06-30 08:12 AM',
      user: 'Nadhiya Admin',
      ipAddress: '192.168.1.23',
      status: 'SUCCESS' as const,
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

        {/* Profile Header Component */}
        <ProfileHeader
          name="Central Blood Bank Narahenpita"
          email={userEmail} 
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
