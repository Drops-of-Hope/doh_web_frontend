import { Trophy, Star, Heart, Droplets } from 'lucide-react';

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

interface Achievement {
  id: number;
  title: string;
  icon: string;
  earned: boolean;
}

interface SummarySectionProps {
  donorData: DonorData;
  achievements: Achievement[];
}

export default function SummarySection({ donorData, achievements }: SummarySectionProps) {
  const progressPercentage = (donorData.totalDonations / donorData.donationGoal) * 100;

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'blood':
        return <Droplets className="w-6 h-6" />;
      case 'heart':
        return <Heart className="w-6 h-6" />;
      case 'star':
        return <Star className="w-6 h-6" />;
      case 'trophy':
        return <Trophy className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Donation Progress & Achievements</h3>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Donation Goal Progress
          </span>
          <span className="text-sm font-medium text-gray-700">
            {donorData.totalDonations}/{donorData.donationGoal}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-red-400 to-red-500 h-3 rounded-full transition-all duration-500 border border-red-200"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
      </div>


      {/* Achievements */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg text-center transition-all duration-200 ${
              achievement.earned
                ? 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200'
                : 'bg-gray-50 border-2 border-gray-200'
            }`}
          >
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                achievement.earned
                  ? 'bg-gradient-to-r from-red-50 to-pink-50 text-red-600 border-2 border-red-200'
                  : 'bg-gray-300 text-gray-500'
              }`}
            >
              {getAchievementIcon(achievement.icon)}
            </div>
            <h4 className={`text-sm font-medium ${
              achievement.earned ? 'text-red-700' : 'text-gray-500'
            }`}>
              {achievement.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}