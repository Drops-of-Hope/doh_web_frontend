"use client";

import { useState, useEffect } from "react";
import {
  BackButton,
  BloodUnitInfo,
  TestResultsToBeCompleted,
  TestModals,
} from "@/components";
import { useRouter, useParams } from "next/navigation";
import {
  useGetBloodUnitByIdQuery,
  useGetBloodTestByBloodIdQuery,
  useUpdateSyphilisTestMutation,
  useUpdateHepatitisTestMutation,
} from "@/store/api/bloodTestApi";
import {
  mapBloodGroupToDisplay,
  formatDisplayDate,
} from "@/lib/appointmentUtils";
import { TestResult, BloodUnit } from "../../../../../../../types";

export default function BloodUnitTestingPage() {
  const router = useRouter();
  const { bloodId } = useParams();
  const bloodIdStr = Array.isArray(bloodId) ? bloodId[0] : bloodId;

  const {
    data: bloodUnitData,
    isLoading: isUnitLoading,
    isError: isUnitError,
  } = useGetBloodUnitByIdQuery(bloodIdStr!);

  const { data: bloodTestData, isLoading: isTestLoading } =
    useGetBloodTestByBloodIdQuery(bloodIdStr!);

  const [bloodUnit, setBloodUnit] = useState<BloodUnit | null>(null);
  const [tests, setTests] = useState<TestResult[]>([]);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  // Mutations
  const [updateSyphilisTest, { isLoading: isUpdatingSyphilis }] =
    useUpdateSyphilisTestMutation();
  const [updateHepatitisTest, { isLoading: isUpdatingHepatitis }] =
    useUpdateHepatitisTestMutation();

  useEffect(() => {
    if (bloodUnitData) {
      setBloodUnit({
        id: bloodUnitData.id,
        bloodGroup:
          mapBloodGroupToDisplay(
            bloodUnitData.bloodDonation?.user?.bloodGroup
          ) || "Unknown",
        donationLocation: "Narahenpita",
        donationDate:
          formatDisplayDate(bloodUnitData.bloodDonation?.startTime) || "",
        componentType: "Whole Blood",
        volume: `${bloodUnitData.volume} mL`,
        status: bloodUnitData.status.toLowerCase() as
          | "pending"
          | "pass"
          | "fail",
      });
    }
  }, [bloodUnitData]);

  useEffect(() => {
    if (bloodTestData) {
      setTests([
        {
          id: "blood-group",
          name: "Blood Group Typing",
          isCompulsory: true,
          status: "pass",
        },
        {
          id: "hiv",
          name: "HIV Screening",
          isCompulsory: true,
          status:
            bloodTestData.hivTest === null ||
            typeof bloodTestData.hivTest === "undefined"
              ? "pending"
              : bloodTestData.hivTest
              ? "fail"
              : "pass",
        },
        {
          id: "syphilis",
          name: "Syphilis Screening",
          isCompulsory: true,
          status:
            bloodTestData.syphilis === null ||
            typeof bloodTestData.syphilis === "undefined"
              ? "pending"
              : bloodTestData.syphilis
              ? "fail"
              : "pass",
        },
        {
          id: "hepatitis",
          name: "Hepatitis B & C Screening",
          isCompulsory: true,
          status:
            bloodTestData.hepatitisB === null ||
            typeof bloodTestData.hepatitisB === "undefined" ||
            bloodTestData.hepatitisC === null ||
            typeof bloodTestData.hepatitisC === "undefined"
              ? "pending"
              : bloodTestData.hepatitisB || bloodTestData.hepatitisC
              ? "fail"
              : "pass",
        },
        {
          id: "malaria",
          name: "Malaria Screening",
          isCompulsory: true,
          status: bloodTestData.malaria ? "fail" : "pending",
        },
        {
          id: "hemoglobin",
          name: "Hemoglobin Level Check",
          isCompulsory: true,
          status: bloodTestData.hemoglobin > 0 ? "pass" : "pending",
        },
      ]);
    }
  }, [bloodTestData]);

  const handleTestCardClick = (testId: string) => {
    if (testId === "blood-group") {
      router.push(`/blood_bank/test/blood_test/${bloodIdStr}/blood_type`);
    } else if (testId === "hiv") {
      router.push(`/blood_bank/test/blood_test/${bloodIdStr}/hiv`);
    } else if (testId === "syphilis" || testId === "hepatitis") {
      setSelectedTest(testId);
    }
  };

  const handleFinalizeStatus = (finalStatus: "pass" | "fail") => {
    if (bloodUnit) setBloodUnit({ ...bloodUnit, status: finalStatus });
  };

  if (isUnitLoading || isTestLoading) return <div>Loading blood unit...</div>;
  if (isUnitError || !bloodUnit) return <div>Failed to load blood unit.</div>;

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

        {/* Modal Component */}
        <TestModals
          selectedTest={selectedTest}
          setSelectedTest={setSelectedTest}
          bloodIdStr={bloodIdStr}
          setTests={setTests}
          updateSyphilisTest={updateSyphilisTest}
          updateHepatitisTest={updateHepatitisTest}
          isUpdatingSyphilis={isUpdatingSyphilis}
          isUpdatingHepatitis={isUpdatingHepatitis}
        />
      </div>
    </div>
  );
}
