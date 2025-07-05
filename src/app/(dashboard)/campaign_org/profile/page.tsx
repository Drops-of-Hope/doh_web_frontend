"use client";

import {CampaignOrganizerHeader,LoginActivity} from '@/components';

export default function CampaignOrganizerProfilePage() {
  const handleEdit = () => {
    console.log('Edit profile clicked');
  };

  const handleAddPhoneNumber = () => {
    console.log('Add phone number clicked');
  };

  const handleViewAllActivity = () => {
    console.log('View all login activity clicked');
  };

  const handleReportIssue = (id: string) => {
    console.log('Report issue clicked for:', id);
  };

  const loginActivities = [
    {
      id: '1',
      timestamp: '2025-07-05 10:15 AM',
      user: 'Campaign Organizer',
      ipAddress: '192.168.3.12',
      status: 'SUCCESS' as const
    },
    {
      id: '2',
      timestamp: '2025-07-05 09:30 AM',
      user: 'Campaign Organizer',
      ipAddress: '192.168.3.12',
      status: 'SUCCESS' as const
    },
    {
      id: '3',
      timestamp: '2025-07-04 18:45 PM',
      user: 'Campaign Organizer',
      ipAddress: '192.168.3.12',
      status: 'SUCCESS' as const
    }
  ];

  return (
    <div className="min-h-[100vh] p-4 pt-0 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="text-[#2D3748] mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>

        {/* Campaign Organizer Header Component */}
        <CampaignOrganizerHeader
          name="Hope Foundation"
          email="campaigns@hopefoundation.lk"
          address="No. 25, Galle Road, Colombo 03"
          region="Colombo"
          phoneNumber="011-234-5678"
          donorName="Nadhiya Nashath"
          onEdit={handleEdit}
          onAddPhoneNumber={handleAddPhoneNumber}
        />

        {/* Login Activity - Full Width */}
        <div className="max-w-4xl">
          <LoginActivity
            activities={loginActivities}
            onViewAll={handleViewAllActivity}
            onReportIssue={handleReportIssue}
          />
        </div>
      </div>
    </div>
  );
}