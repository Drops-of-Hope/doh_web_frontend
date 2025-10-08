"use client";

import { useState, useEffect } from 'react';
import { BackButton, BloodUnitInfo, TestResultsToBeCompleted } from '@/components';
import { useRouter } from 'next/navigation';
import { TestResult, BloodUnit } from '../../../../../../../types';
import { useGetBloodUnitByIdQuery, useGetBloodTestByBloodIdQuery } from '@/store/api/bloodTestApi';
import { useParams } from "next/navigation";
import { mapBloodGroupToDisplay, formatDisplayDate } from '@/lib/appointmentUtils';

export default function BloodUnitTestingPage() {
  const router = useRouter();
  const { bloodId } = useParams();
  const bloodIdStr = Array.isArray(bloodId) ? bloodId[0] : bloodId;

  // Fetch blood unit info
  const { data: bloodUnitData, isLoading: isUnitLoading, isError: isUnitError } = useGetBloodUnitByIdQuery(bloodIdStr!);

  // Fetch blood test info (may not exist)
  const { data: bloodTestData, isLoading: isTestLoading } = useGetBloodTestByBloodIdQuery(bloodIdStr!);

  const [bloodUnit, setBloodUnit] = useState<BloodUnit | null>(null);
  const [tests, setTests] = useState<TestResult[]>([]);

  // Map blood unit info
  useEffect(() => {
    if (bloodUnitData) {
      setBloodUnit({
        id: bloodUnitData.id,
        bloodGroup: mapBloodGroupToDisplay(bloodUnitData.bloodDonation?.user?.bloodGroup) || 'Unknown',
        donationLocation: 'Narahenpita', // Optional: update if your API provides location
        donationDate: formatDisplayDate(bloodUnitData.bloodDonation?.startTime) || '',
        componentType: 'Whole Blood',
        volume: `${bloodUnitData.volume} mL`,
        status: bloodUnitData.status.toLowerCase() as 'pending' | 'pass' | 'fail',
      });
    }
  }, [bloodUnitData]);

  // Map blood test info into test cards
  useEffect(() => {
    if (bloodTestData) {
      setTests([
        {
          id: 'blood-group',
          name: 'Blood Group Typing',
          isCompulsory: true,
          status: 'pass', // Assuming ABOTest always passes if data exists
        },
        {
          id: 'hiv',
          name: 'HIV Screening',
          isCompulsory: true,
          status: bloodTestData.hivTest ? 'fail' : 'pending',
        },
        {
          id: 'syphilis',
          name: 'Syphilis Screening',
          isCompulsory: true,
          status: bloodTestData.syphilis ? 'fail' : 'pending',
        },
        {
          id: 'hepatitis',
          name: 'Hepatitis B & C Screening',
          isCompulsory: true,
          status: bloodTestData.hepatitisB || bloodTestData.hepatitisC ? 'fail' : 'pending',
        },
        {
          id: 'malaria',
          name: 'Malaria Screening',
          isCompulsory: false,
          status: bloodTestData.malaria ? 'fail' : 'pending',
        },
        {
          id: 'hemoglobin',
          name: 'Hemoglobin Level Check',
          isCompulsory: false,
          status: bloodTestData.hemoglobin > 0 ? 'pass' : 'pending',
        },
      ]);
    } else {
      // No blood tests yet, show all pending
      setTests([
        { id: 'blood-group', name: 'Blood Group Typing', isCompulsory: true, status: 'pending' },
        { id: 'hiv', name: 'HIV Screening', isCompulsory: true, status: 'pending' },
        { id: 'syphilis', name: 'Syphilis Screening', isCompulsory: true, status: 'pending' },
        { id: 'hepatitis', name: 'Hepatitis B & C Screening', isCompulsory: true, status: 'pending' },
        { id: 'malaria', name: 'Malaria Screening', isCompulsory: false, status: 'pending' },
        { id: 'hemoglobin', name: 'Hemoglobin Level Check', isCompulsory: false, status: 'pending' },
      ]);
    }
  }, [bloodTestData]);

  const handleTestCardClick = (testId: string) => {
    if (testId === 'blood-group' && bloodIdStr) {
      router.push(`/blood_bank/test/blood_test/${bloodIdStr}/blood_type`);
    } else {
      console.log('Other tests not implemented yet');
    }
  };

  const handleFinalizeStatus = (finalStatus: 'pass' | 'fail') => {
    if (bloodUnit) {
      setBloodUnit({ ...bloodUnit, status: finalStatus });
      console.log('Blood unit finalized with status:', finalStatus);
    }
  };

  if (isUnitLoading || isTestLoading) return <div>Loading blood unit...</div>;
  if (isUnitError || !bloodUnit) return <div>Failed to load blood unit.</div>;

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <BackButton fallbackUrl="/blood_bank/test/blood_test" className="hover:shadow-md" />
        </div>

        {/* Pass fetched blood unit data to BloodUnitInfo */}
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
