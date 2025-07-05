"use client";

interface LoginActivityItem {
  id: string;
  timestamp: string;
  user: string;
  ipAddress: string;
  status: 'SUCCESS' | 'FAILED';
  description?: string;
}

interface LoginActivityProps {
  activities?: LoginActivityItem[];
  onViewAll?: () => void;
  onReportIssue?: (activityId: string) => void;
}

export default function LoginActivity({
  activities = [
    {
      id: '1',
      timestamp: '2025-06-30 08:12 AM',
      user: 'Nadhiya Admin',
      ipAddress: '192.168.1.23',
      status: 'SUCCESS',
    },
    {
      id: '2',
      timestamp: '2025-06-30 08:12 AM',
      user: 'Nadhiya Admin',
      ipAddress: '192.168.1.23',
      status: 'SUCCESS',
    },
    {
      id: '3',
      timestamp: '2025-06-30 08:12 AM',
      user: 'Nadhiya Admin',
      ipAddress: '192.168.1.23',
      status: 'SUCCESS'
    }
  ],
  onViewAll,
  onReportIssue
}: LoginActivityProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[#2D3748]">Login Activity</h2>
        <button
          onClick={onViewAll}
          className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
        >
          View All
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-gray-500">
                    Timestamp: {activity.timestamp}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'SUCCESS' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-1">
                  User: <span className="font-medium">{activity.user}</span>
                </div>
                
                <div className="text-sm text-gray-600">
                  IP Address: <span className="font-mono">{activity.ipAddress}</span>
                </div>
              </div>
              
              <button
                onClick={() => onReportIssue?.(activity.id)}
                className="text-[#FB7373] text-sm border border-[#FB7373] px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
              >
                Report an Issue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}