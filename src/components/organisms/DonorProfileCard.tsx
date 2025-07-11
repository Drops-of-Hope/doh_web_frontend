import { FaHeart, FaCheckCircle } from 'react-icons/fa';

interface DonorDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  bloodType: string;
  address: string;
  weight: number;
  height: number;
  lastDonation: string;
  totalDonations: number;
  nicNumber: string;
}

interface DonorProfileCardProps {
  donorData: DonorDetails;
}

export default function DonorProfileCard({ donorData }: DonorProfileCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };

  const getBloodTypeColor = (bloodType: string) => {
    const colors = {
      'O+': 'bg-red-100 text-red-700 border-red-200',
      'O-': 'bg-red-200 text-red-800 border-red-300',
      'A+': 'bg-blue-100 text-blue-700 border-blue-200',
      'A-': 'bg-blue-200 text-blue-800 border-blue-300',
      'B+': 'bg-green-100 text-green-700 border-green-200',
      'B-': 'bg-green-200 text-green-800 border-green-300',
      'AB+': 'bg-purple-100 text-purple-700 border-purple-200',
      'AB-': 'bg-purple-200 text-purple-800 border-purple-300'
    };
    return colors[bloodType as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center border-4 border-gray-200">
            <span className="text-white font-bold text-2xl">
              {getInitials(donorData.name)}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{donorData.name}</h2>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getBloodTypeColor(donorData.bloodType)}`}>
              {donorData.bloodType}
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
              {donorData.totalDonations} Donations
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>

          <div className="text-gray-600">
            <span className="font-medium">Phone:</span> {donorData.phone}
          </div>

          <div className="text-gray-600">
            <span className="font-medium">Age:</span> {donorData.age} years old
          </div>

          <div className="text-gray-600">
            <span className="font-medium">NIC Number:</span> {donorData.nicNumber}
          </div>

          <div className="text-gray-600">
            <span className="font-medium">Address:</span> {donorData.address}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>

          <div className="text-gray-600">
            <span className="font-medium">Weight:</span> {donorData.weight} kg
          </div>

          <div className="text-gray-600">
            <span className="font-medium">Height:</span> {donorData.height} cm
          </div>

          <div className="flex items-center gap-2 text-gray-900">
            <FaHeart className="w-5 h-5 text-red-400" />
            <span><span className="font-medium">Last Donation:</span> {donorData.lastDonation}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-900">
            <FaCheckCircle className="w-5 h-5 text-green-600" />
            <span><span className="font-medium">Eligibility:</span> Eligible for Donation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
