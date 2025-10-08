"use client";

import { useState, useEffect } from 'react';
import { BackButton, BloodUnitInfo, TestResultsToBeCompleted } from '@/components';
import { useRouter } from 'next/navigation';
import { TestResult, BloodUnit } from '../../../../../../../types';
import { useGetBloodUnitByIdQuery } from '@/store/api/bloodTestApi';
import { useParams } from "next/navigation";
import { mapBloodGroupToDisplay, formatDisplayDate } from '@/lib/appointmentUtils';

export default function BloodUnitTestingPage() {
  const router = useRouter();
  const { bloodId } = useParams();
  const bloodIdStr = Array.isArray(bloodId) ? bloodId[0] : bloodId;

  const { data, isLoading, isError } = useGetBloodUnitByIdQuery(bloodIdStr!);


  const [bloodUnit, setBloodUnit] = useState<BloodUnit | null>(null);

  useEffect(() => {
    if (data) {
      // Map API response to BloodUnit type your component expects
      setBloodUnit({
        id: data.id,
        bloodGroup: mapBloodGroupToDisplay(data.bloodDonation?.user?.bloodGroup) || 'Unknown',
        donationLocation: 'Narahenpita', // You can add location if available in your API
        donationDate: formatDisplayDate(data.bloodDonation?.startTime) || '',
        componentType: 'Whole Blood',
        volume: `${data.volume} mL`,
        status: data.status.toLowerCase() as 'pending' | 'pass' | 'fail',
      });
    }
  }, [data]);

  const [tests] = useState<TestResult[]>([
    { id: 'blood-group', name: 'Blood Group Typing', isCompulsory: true, status: 'pass' },
    { id: 'hiv', name: 'HIV Screening', isCompulsory: true, status: 'pending' },
    { id: 'syphilis', name: 'Syphilis Screening', isCompulsory: true, status: 'pending' },
    { id: 'hepatitis', name: 'Hepatitis B & C Screening', isCompulsory: true, status: 'pending' },
    { id: 'malaria', name: 'Malaria Screening', isCompulsory: false, status: 'pending' },
    { id: 'hemoglobin', name: 'Hemoglobin Level Check', isCompulsory: false, status: 'pending' },
  ]);

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

  if (isLoading) return <div>Loading blood unit...</div>;
  if (isError || !bloodUnit) return <div>Failed to load blood unit.</div>;

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <BackButton 
            fallbackUrl="/blood_bank/test/blood_test"
            className="hover:shadow-md"
          />
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
