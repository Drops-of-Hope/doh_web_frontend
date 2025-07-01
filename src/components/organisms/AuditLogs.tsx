"use client";

interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  target: string;
}

interface AuditLogsProps {
  logs?: AuditLogItem[];
  onViewAll?: () => void;
  onReportIssue?: (logId: string) => void;
}

export default function AuditLogs({
  logs = [
    {
      id: '1',
      timestamp: '2025-06-30 08:12 AM',
      user: 'Nadhiya Admin',
      action: 'Action Performed',
      target: 'User back'
    }
  ],
  onViewAll,
  onReportIssue
}: AuditLogsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[#2D3748]">Audit Logs</h2>
        <button
          onClick={onViewAll}
          className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
        >
          View All
        </button>
      </div>

      {/* Logs List */}
      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="text-sm text-gray-500 mb-2">
                  Timestamp: {log.timestamp}
                </div>
                
                <div className="text-sm text-gray-600 mb-1">
                  User: <span className="font-medium">{log.user}</span>
                </div>
                
                <div className="text-sm text-gray-600 mb-1">
                  Action Performed: <span className="font-medium">{log.action}</span>
                </div>
                
                <div className="text-sm text-gray-600">
                  Target: <span className="font-medium">{log.target}</span>
                </div>
              </div>
              
              <button
                onClick={() => onReportIssue?.(log.id)}
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