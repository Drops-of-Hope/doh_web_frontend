"use client";

import { useState } from 'react';
import { BackButton, BloodUnitInfo, TestResultsToBeCompleted } from '@/components';
import { useRouter } from 'next/navigation';
import { TestResult, BloodUnit } from '../../../../../../types';

export default function BloodUnitTestingPage() {

  const router = useRouter();
  
  const [bloodUnit, setBloodUnit] = useState<BloodUnit>({
    id: 'BU-2024-001234',
    bloodGroup: 'O+',
    donationLocation: 'City General Hospital',
    donationDate: '2024-01-15',
    componentType: 'Whole Blood',
    volume: '450 mL',
    status: 'pending'
  });

  const [tests] = useState<TestResult[]>([
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
    }
  ]);

  const handleTestCardClick = (testId: string) => {

    if (testId === 'blood-group') {
      router.push('/blood_bank/test/blood_test/blood_type');
    } else {
      // Handle other test types
      console.log('error');
    }
  };

  const handleFinalizeStatus = (finalStatus: 'pass' | 'fail') => {
    setBloodUnit(prev => ({ ...prev, status: finalStatus }));
    console.log('Blood unit finalized with status:', finalStatus);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <BackButton 
            fallbackUrl="/blood_bank/test/blood_test"
            className="hover:shadow-md"
          />
        </div>

        <BloodUnitInfo bloodUnit={bloodUnit} />

        <TestResultsToBeCompleted
          tests={tests}
          onTestCardClick={handleTestCardClick}
          onFinalizeStatus={handleFinalizeStatus}
        />
      </div>
    </div>
  );
}