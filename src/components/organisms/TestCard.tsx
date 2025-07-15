import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

// Types
interface TestResult {
  id: string;
  name: string;
  isCompulsory: boolean;
  status: 'pending' | 'pass' | 'fail';
  result?: string;
}

// Test Badge Component
const TestBadge = ({ status }: { status: 'pending' | 'pass' | 'fail' }) => {
  const badgeConfig = {
    pending: {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      icon: <FaClock className="w-3 h-3" />,
      label: 'Pending'
    },
    pass: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: <FaCheckCircle className="w-3 h-3" />,
      label: 'Pass'
    },
    fail: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      icon: <FaTimesCircle className="w-3 h-3" />,
      label: 'Fail'
    }
  };

  const config = badgeConfig[status];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.icon}
      {config.label}
    </span>
  );
};

// Test Card Component
interface TestCardProps {
  test: TestResult;
  onClick: (testId: string) => void;
}

const TestCard = ({ test, onClick }: TestCardProps) => {
  const isCompleted = test.status === 'pass' || test.status === 'fail';
  
  return (
    <div 
      onClick={() => onClick(test.id)}
      className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all duration-200 w-full"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-medium text-gray-900 text-lg">{test.name}</h3>
            {test.isCompulsory && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                Compulsory
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Status:</span>
            <TestBadge status={test.status} />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Completion Check Icon */}
          {isCompleted && (
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              test.status === 'pass' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {test.status === 'pass' ? (
                <FaCheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <FaTimesCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
          )}
          
          {/* Arrow Icon */}
          <div className="text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
export type { TestResult };