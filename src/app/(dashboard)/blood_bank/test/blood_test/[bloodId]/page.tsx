"use client";

import { useState, useEffect } from "react";
import {
  BackButton,
  BloodUnitInfo,
  TestResultsToBeCompleted,
} from "@/components";
import { useRouter } from "next/navigation";
import { TestResult, BloodUnit } from "../../../../../../../types";
import {
  useGetBloodUnitByIdQuery,
  useGetBloodTestByBloodIdQuery,
} from "@/store/api/bloodTestApi";
import { useUpdateSyphilisTestMutation } from "@/store/api/bloodTestApi";
import { useParams } from "next/navigation";
import {
  mapBloodGroupToDisplay,
  formatDisplayDate,
} from "@/lib/appointmentUtils";

export default function BloodUnitTestingPage() {
  const router = useRouter();
  const { bloodId } = useParams();
  const bloodIdStr = Array.isArray(bloodId) ? bloodId[0] : bloodId;

  // Fetch blood unit info
  const {
    data: bloodUnitData,
    isLoading: isUnitLoading,
    isError: isUnitError,
  } = useGetBloodUnitByIdQuery(bloodIdStr!);

  // Fetch blood test info (may not exist)
  const { data: bloodTestData, isLoading: isTestLoading } =
    useGetBloodTestByBloodIdQuery(bloodIdStr!);

  const [bloodUnit, setBloodUnit] = useState<BloodUnit | null>(null);
  const [tests, setTests] = useState<TestResult[]>([]);

  // Map blood unit info
  useEffect(() => {
    if (bloodUnitData) {
      setBloodUnit({
        id: bloodUnitData.id,
        bloodGroup:
          mapBloodGroupToDisplay(
            bloodUnitData.bloodDonation?.user?.bloodGroup
          ) || "Unknown",
        donationLocation: "Narahenpita", // Optional: update if your API provides location
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

  // Map blood test info into test cards
  useEffect(() => {
    if (bloodTestData) {
      setTests([
        {
          id: "blood-group",
          name: "Blood Group Typing",
          isCompulsory: true,
          status: "pass", // Assuming ABOTest always passes if data exists
        },
        {
          id: "hiv",
          name: "HIV Screening",
          isCompulsory: true,
          // hivTest: null => pending, false => pass, true => fail
          status:
            bloodTestData.hivTest === null ||
            typeof bloodTestData.hivTest === "undefined"
              ? "pending"
              : bloodTestData.hivTest === true
              ? "fail"
              : "pass",
        },
        {
          id: "syphilis",
          name: "Syphilis Screening",
          isCompulsory: true,
          // syphilis: null/undefined => pending, true => fail, false => pass
          status:
            bloodTestData.syphilis === null ||
            typeof bloodTestData.syphilis === "undefined"
              ? "pending"
              : bloodTestData.syphilis === true
              ? "fail"
              : "pass",
        },
        {
          id: "hepatitis",
          name: "Hepatitis B & C Screening",
          isCompulsory: true,
          status:
            bloodTestData.hepatitisB || bloodTestData.hepatitisC
              ? "fail"
              : "pending",
        },
        {
          id: "malaria",
          name: "Malaria Screening",
          isCompulsory: false,
          status: bloodTestData.malaria ? "fail" : "pending",
        },
        {
          id: "hemoglobin",
          name: "Hemoglobin Level Check",
          isCompulsory: false,
          status: bloodTestData.hemoglobin > 0 ? "pass" : "pending",
        },
      ]);
    } else {
      // No blood tests yet, show all pending
      setTests([
        {
          id: "blood-group",
          name: "Blood Group Typing",
          isCompulsory: true,
          status: "pending",
        },
        {
          id: "hiv",
          name: "HIV Screening",
          isCompulsory: true,
          status: "pending",
        },
        {
          id: "syphilis",
          name: "Syphilis Screening",
          isCompulsory: true,
          status: "pending",
        },
        {
          id: "hepatitis",
          name: "Hepatitis B & C Screening",
          isCompulsory: true,
          status: "pending",
        },
        {
          id: "malaria",
          name: "Malaria Screening",
          isCompulsory: false,
          status: "pending",
        },
        {
          id: "hemoglobin",
          name: "Hemoglobin Level Check",
          isCompulsory: false,
          status: "pending",
        },
      ]);
    }
  }, [bloodTestData]);

  const handleTestCardClick = (testId: string) => {
    if (testId === "blood-group" && bloodIdStr) {
      router.push(`/blood_bank/test/blood_test/${bloodIdStr}/blood_type`);
    } else if (testId === "hiv" && bloodIdStr) {
      // Navigate to HIV result input page
      router.push(`/blood_bank/test/blood_test/${bloodIdStr}/hiv`);
    } else if (testId === "syphilis") {
      // open modal to choose positive/negative
      setSelectedTest(testId);
      setIsSyphilisModalOpen(true);
    } else if (testId === "hepatitis") {
      // open hepatitis modal to set B and C
      setSelectedTest(testId);
      setIsHepatitisModalOpen(true);
    } else {
      console.log("Other tests not implemented yet");
    }
  };

  const handleFinalizeStatus = (finalStatus: "pass" | "fail") => {
    if (bloodUnit) {
      setBloodUnit({ ...bloodUnit, status: finalStatus });
      console.log("Blood unit finalized with status:", finalStatus);
    }
  };

  // Syphilis modal state
  const [isSyphilisModalOpen, setIsSyphilisModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [syphilisSelection, setSyphilisSelection] =
    useState<string>("negative");
  const [updateSyphilisTest, { isLoading: isUpdatingSyphilis }] =
    useUpdateSyphilisTestMutation();

  // Hepatitis modal state
  const [isHepatitisModalOpen, setIsHepatitisModalOpen] = useState(false);
  const [hepatitisBSelection, setHepatitisBSelection] =
    useState<string>("negative");
  const [hepatitisCSelection, setHepatitisCSelection] =
    useState<string>("negative");

  const saveSyphilisResult = async (isPositive: boolean) => {
    if (!bloodIdStr) return;

    try {
      await updateSyphilisTest({
        bloodId: bloodIdStr,
        data: { syphilis: isPositive },
      }).unwrap();
      // update local tests state optimistically
      setTests((prev) =>
        prev.map((t) =>
          t.id === "syphilis"
            ? { ...t, status: isPositive ? "fail" : "pass" }
            : t
        )
      );
      setIsSyphilisModalOpen(false);
      setSelectedTest(null);
    } catch (err) {
      console.error("Failed to save syphilis result", err);
      // keep modal open or show error - for now just close
      setIsSyphilisModalOpen(false);
      setSelectedTest(null);
    }
  };

  // Save hepatitis results locally (optimistic). Replace with API call if available.
  const saveHepatitisResults = async (
    isBPositive: boolean,
    isCPositive: boolean
  ) => {
    if (!bloodIdStr) return;

    try {
      // TODO: call an API mutation when available to persist hepatitis results
      setTests((prev) =>
        prev.map((t) =>
          t.id === "hepatitis"
            ? { ...t, status: isBPositive || isCPositive ? "fail" : "pass" }
            : t
        )
      );
      setIsHepatitisModalOpen(false);
      setSelectedTest(null);
    } catch (err) {
      console.error("Failed to save hepatitis results", err);
      setIsHepatitisModalOpen(false);
      setSelectedTest(null);
    }
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

        {/* Pass fetched blood unit data to BloodUnitInfo */}
        <BloodUnitInfo bloodUnit={bloodUnit} />

        <TestResultsToBeCompleted
          tests={tests}
          onTestCardClick={handleTestCardClick}
          onFinalizeStatus={handleFinalizeStatus}
        />
        {/* Syphilis Result Modal */}
        {isSyphilisModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black opacity-40"
              onClick={() => {
                setIsSyphilisModalOpen(false);
                setSelectedTest(null);
              }}
            />
            <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md shadow-lg">
              <h3 className="text-lg font-semibold mb-4">
                Syphilis Test Result
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Select the test result for the Syphilis screening below, then
                click Save.
              </p>

              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">
                  Result
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={syphilisSelection}
                  onChange={(e) => setSyphilisSelection(e.target.value)}
                >
                  <option value="negative">Negative</option>
                  <option value="positive">Positive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsSyphilisModalOpen(false);
                    setSelectedTest(null);
                  }}
                  className="px-4 py-2 rounded-lg border text-sm text-gray-600"
                >
                  Cancel
                </button>

                <button
                  onClick={() =>
                    saveSyphilisResult(syphilisSelection === "positive")
                  }
                  disabled={isUpdatingSyphilis}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm"
                >
                  {isUpdatingSyphilis ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Hepatitis Result Modal */}
        {isHepatitisModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black opacity-40"
              onClick={() => {
                setIsHepatitisModalOpen(false);
                setSelectedTest(null);
              }}
            />
            <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md shadow-lg">
              <h3 className="text-lg font-semibold mb-4">
                Hepatitis B & C Test Results
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Select the test result for Hepatitis B and Hepatitis C below,
                then click Save.
              </p>

              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">
                  Hepatitis B
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                  value={hepatitisBSelection}
                  onChange={(e) => setHepatitisBSelection(e.target.value)}
                >
                  <option value="negative">Negative</option>
                  <option value="positive">Positive</option>
                </select>

                <label className="block text-sm text-gray-600 mb-2">
                  Hepatitis C
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={hepatitisCSelection}
                  onChange={(e) => setHepatitisCSelection(e.target.value)}
                >
                  <option value="negative">Negative</option>
                  <option value="positive">Positive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsHepatitisModalOpen(false);
                    setSelectedTest(null);
                  }}
                  className="px-4 py-2 rounded-lg border text-sm text-gray-600"
                >
                  Cancel
                </button>

                <button
                  onClick={() =>
                    saveHepatitisResults(
                      hepatitisBSelection === "positive",
                      hepatitisCSelection === "positive"
                    )
                  }
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
