import { MapPin } from 'lucide-react';

interface DonorData {
  name: string;
  email: string;
  phone: string;
  bloodType: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  totalDonations: number;
  lastDonation: string;
  nextEligibleDate: string;
  donationGoal: number;
}

interface PersonalInformationProps {
  donorData: DonorData;
  isEditing: boolean;
}

export default function PersonalInformation({ donorData, isEditing }: PersonalInformationProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#B3D0E9' }}>
          <MapPin className="w-4 h-4 text-gray-800" />
        </div>
        Personal Information
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            value={donorData.dateOfBirth}
            readOnly={!isEditing}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 transition-all ${
              isEditing 
                ? 'bg-white focus:ring-2 focus:ring-blue-200' 
                : 'bg-gray-50'
            }`}
            style={isEditing ? { borderColor: '#B3D0E9' } : {}}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            value={donorData.address}
            readOnly={!isEditing}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 transition-all ${
              isEditing 
                ? 'bg-white focus:ring-2 focus:ring-blue-200' 
                : 'bg-gray-50'
            }`}
            style={isEditing ? { borderColor: '#B3D0E9' } : {}}
            rows={2}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
          <input
            type="text"
            value={donorData.emergencyContact}
            readOnly={!isEditing}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 transition-all ${
              isEditing 
                ? 'bg-white focus:ring-2 focus:ring-blue-200' 
                : 'bg-gray-50'
            }`}
            style={isEditing ? { borderColor: '#B3D0E9' } : {}}
          />
        </div>
      </div>
    </div>
  );
}