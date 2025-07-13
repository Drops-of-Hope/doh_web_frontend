"use client";

import { useState } from 'react';
import { FaArrowLeft, FaFlask, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { TestCard } from '@/components';
import { useRouter } from 'next/navigation';

// Types
interface TestResult {
  id: string;
  name: string;
  isCompulsory: boolean;
  status: 'pending' | 'pass' | 'fail';
  result?: string;
}

interface BloodUnit {
  id: string;
  bloodGroup: string;
  donationLocation: string;
  donationDate: string;
  componentType: string;
  volume: string;
  status: 'pending' | 'pass' | 'fail';
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

// Blood Unit Info Component
const BloodUnitInfo = ({ bloodUnit }: { bloodUnit: BloodUnit }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Blood Unit Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500 mb-1">Blood Unit ID</label>
          <span className="text-base font-semibold text-gray-900">{bloodUnit.id}</span>
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500 mb-1">Blood Group</label>
          <span className="text-base font-semibold text-red-600">{bloodUnit.bloodGroup}</span>
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500 mb-1">Status</label>
          <TestBadge status={bloodUnit.status} />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500 mb-1">Donation Location</label>
          <span className="text-base text-gray-900">{bloodUnit.donationLocation}</span>
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500 mb-1">Donation Date</label>
          <span className="text-base text-gray-900">{bloodUnit.donationDate}</span>
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500 mb-1">Component Type</label>
          <span className="text-base text-gray-900">{bloodUnit.componentType}</span>
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500 mb-1">Volume</label>
          <span className="text-base text-gray-900">{bloodUnit.volume}</span>
        </div>
      </div>
    </div>
  );
};

// Test Results Component
const TestResultsToBeCompleted = ({ 
  tests, 
  onTestCardClick,
  onFinalizeStatus 
}: { 
  tests: TestResult[], 
  onTestCardClick: (testId: string) => void,
  onFinalizeStatus: (finalStatus: 'pass' | 'fail') => void 
}) => {
  // Check if all compulsory tests are completed
  const compulsoryTests = tests.filter(test => test.isCompulsory);
  const allCompulsoryCompleted = compulsoryTests.every(test => test.status !== 'pending');
  
  // Check if any test failed
  const hasFailedTests = tests.some(test => test.status === 'fail');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Results To Be Completed</h2>
      
      <div className="space-y-4 mb-6">
        {tests.map((test) => (
          <TestCard 
            key={test.id} 
            test={test} 
            onClick={onTestCardClick}
          />
        ))}
      </div>

      {/* Finalize Status Section */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Finalize Blood Unit Status</h3>
        
        {!allCompulsoryCompleted && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2">
              <FaClock className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">
                Complete all compulsory tests before finalizing the blood unit status.
              </span>
            </div>
          </div>
        )}
        
        <div className="flex gap-4">
          <button
            onClick={() => onFinalizeStatus('pass')}
            disabled={!allCompulsoryCompleted || hasFailedTests}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              !allCompulsoryCompleted || hasFailedTests
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <FaCheckCircle className="w-4 h-4" />
            Pass Blood Unit
          </button>
          
          <button
            onClick={() => onFinalizeStatus('fail')}
            disabled={!allCompulsoryCompleted}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              !allCompulsoryCompleted
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            <FaTimesCircle className="w-4 h-4" />
            Fail Blood Unit
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
export default function BloodUnitTestingPage() {
  const router = useRouter();
  // Sample blood unit data
  const [bloodUnit, setBloodUnit] = useState<BloodUnit>({
    id: 'BU-2024-001234',
    bloodGroup: 'O+',
    donationLocation: 'City General Hospital',
    donationDate: '2024-01-15',
    componentType: 'Whole Blood',
    volume: '450 mL',
    status: 'pending'
  });

  // Sample test data
  const [tests, setTests] = useState<TestResult[]>([
    {
      id: 'blood-group',
      name: 'Blood Group Typing (ABO, Rh)',
      isCompulsory: true,
      status: 'pass'
    },
    {
      id: 'hiv',
      name: 'HIV Screening',
      isCompulsory: true,
      status: 'pending'
    },
    {
      id: 'syphilis',
      name: 'Syphilis Screening',
      isCompulsory: true,
      status: 'pending'
    },
    {
      id: 'hepatitis',
      name: 'Hepatitis B & C Screening',
      isCompulsory: true,
      status: 'pending'
    },
    {
      id: 'malaria',
      name: 'Malaria Screening',
      isCompulsory: false,
      status: 'pending'
    },
    {
      id: 'hemoglobin',
      name: 'Hemoglobin Level Check',
      isCompulsory: false,
      status: 'pending'
    },
    {
      id: 'visual-quality',
      name: 'Visual Blood Quality Check',
      isCompulsory: false,
      status: 'pending'
    }
  ]);


  // Handle test card click to navigate to test detail page
  const handleTestCardClick = (testId: string) => {
    // Navigate to test detail page
    // router.push(`/test/${testId}`);
    console.log(`Navigating to test detail page for test: ${testId}`);
  };

  // Handle finalize status
  const handleFinalizeStatus = (finalStatus: 'pass' | 'fail') => {
    setBloodUnit(prev => ({ ...prev, status: finalStatus }));
    // Here you would typically send the data to your backend
    console.log('Blood unit finalized with status:', finalStatus);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
            <FaArrowLeft className="w-4 h-4" />
            Back to Test Management
          </button>
          <div className="flex items-center gap-2">
            <FaFlask className="w-5 h-5 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Blood Unit Testing</h1>
          </div>
        </div>

        {/* Blood Unit Information Section */}
        <BloodUnitInfo bloodUnit={bloodUnit} />

        {/* Test Results To Be Completed Section */}
        <TestResultsToBeCompleted
          tests={tests}
          onTestCardClick={handleTestCardClick}
          onFinalizeStatus={handleFinalizeStatus}
        />
      </div>
    </div>
  );
}