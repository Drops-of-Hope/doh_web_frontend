import { FaHeart, FaCheckCircle } from 'react-icons/fa';

interface DonorDetails {
  id: string;
  nic: string;
  email: string;
  name: string;
  bloodGroup: string;
  createdAt: string;
  donationBadge: string;
  isActive: boolean;
  profileImageUrl?: string | null;
  totalDonations: number;
  totalPoints: number;
  updatedAt: string;
  nextEligible?: string | null;
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

  const formatBloodGroup = (bloodGroup: string) => {
    // Convert from API format (e.g., "B_NEGATIVE") to display format (e.g., "B-")
    const bloodGroupMap: { [key: string]: string } = {
      'A_POSITIVE': 'A+',
      'A_NEGATIVE': 'A-',
      'B_POSITIVE': 'B+',
      'B_NEGATIVE': 'B-',
      'AB_POSITIVE': 'AB+',
      'AB_NEGATIVE': 'AB-',
      'O_POSITIVE': 'O+',
      'O_NEGATIVE': 'O-'
    };
    return bloodGroupMap[bloodGroup] || bloodGroup;
  };

  const getBloodTypeColor = (bloodGroup: string) => {
    const displayType = formatBloodGroup(bloodGroup);
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
    return colors[displayType as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isEligibleToDonate = () => {
    if (!donorData.nextEligible) return true;
    return new Date() >= new Date(donorData.nextEligible);
  };

  const getLastDonationText = () => {
    if (donorData.totalDonations === 0) {
      return 'No previous donations';
    }
    if (donorData.nextEligible) {
      const lastDonationDate = new Date(donorData.nextEligible);
      lastDonationDate.setDate(lastDonationDate.getDate() - 56); // Subtract 56 days to get last donation
      return formatDate(lastDonationDate.toISOString());
    }
    return 'Not available';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
        <div className="flex-shrink-0">
          {donorData.profileImageUrl ? (
            <img
              src={donorData.profileImageUrl}
              alt={donorData.name}
              className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center border-4 border-gray-200">
              <span className="text-white font-bold text-2xl">
                {getInitials(donorData.name)}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{donorData.name}</h2>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getBloodTypeColor(donorData.bloodGroup)}`}>
              {formatBloodGroup(donorData.bloodGroup)}
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
              {donorData.totalDonations} Donations
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              donorData.donationBadge === 'BRONZE' ? 'bg-amber-100 text-amber-700 border-amber-200' :
              donorData.donationBadge === 'SILVER' ? 'bg-gray-100 text-gray-700 border-gray-200' :
              donorData.donationBadge === 'GOLD' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
              'bg-gray-100 text-gray-700 border-gray-200'
            }`}>
              {donorData.donationBadge}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>

          <div className="text-gray-600">
            <span className="font-medium">Email:</span> {donorData.email}
          </div>

          <div className="text-gray-600">
            <span className="font-medium">NIC Number:</span> {donorData.nic}
          </div>

          <div className="text-gray-600">
            <span className="font-medium">Total Points:</span> {donorData.totalPoints}
          </div>

          <div className="text-gray-600">
            <span className="font-medium">Status:</span> {donorData.isActive ? 'Active' : 'Inactive'}
          </div>

          <div className="text-gray-600">
            <span className="font-medium">Member Since:</span> {formatDate(donorData.createdAt)}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Information</h3>

          <div className="flex items-center gap-2 text-gray-900">
            <FaHeart className="w-5 h-5 text-red-400" />
            <span><span className="font-medium">Last Donation:</span> {getLastDonationText()}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-900">
            <FaCheckCircle className={`w-5 h-5 ${isEligibleToDonate() ? 'text-green-600' : 'text-red-400'}`} />
            <span><span className="font-medium">Eligibility:</span> {isEligibleToDonate() ? 'Eligible for Donation' : `Next eligible: ${donorData.nextEligible ? formatDate(donorData.nextEligible) : 'Unknown'}`}</span>
          </div>

          <div className="text-gray-600">
            <span className="font-medium">Total Donations:</span> {donorData.totalDonations}
          </div>

          <div className="text-gray-600">
            <span className="font-medium">Donation Badge:</span> {donorData.donationBadge}
          </div>

          <div className="text-gray-600">
            <span className="font-medium">Last Updated:</span> {formatDate(donorData.updatedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}