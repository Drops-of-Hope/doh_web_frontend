import { Calendar } from 'lucide-react';

interface DonationHistory {
  id: number;
  date: string;
  type: string;
  location: string;
}

interface RecentDonationsProps {
  donationHistory: DonationHistory[];
  formatDate: (dateString: string) => string;
}

export default function RecentDonations({ donationHistory, formatDate }: RecentDonationsProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#B3D0E9' }}>
          <Calendar className="w-4 h-4 text-gray-800" />
        </div>
        Recent Donations
      </h3>
      <div className="space-y-4">
        {donationHistory.map((donation) => (
          <div key={donation.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="w-3 h-3 rounded-full flex-shrink-0 bg-gradient-to-r from-red-400 to-red-500"></div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">{donation.type}</div>
              <div className="text-sm text-gray-600">{donation.location}</div>
            </div>
            <div className="text-sm text-gray-500 font-medium">{formatDate(donation.date)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}