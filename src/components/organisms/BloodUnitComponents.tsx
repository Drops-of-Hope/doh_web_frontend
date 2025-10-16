"use client";

import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import { TestCard } from "@/components";
import { TestResult, BloodUnit } from "../../../types";
import { usePassBloodUnitMutation } from "@/store/api/bloodTestApi";

// Button that triggers the pass mutation
const PassButton = ({
  onFinalizeStatus,
  disabled,
  bloodId,
}: {
  onFinalizeStatus: (finalStatus: "pass" | "fail") => void;
  disabled: boolean;
  bloodId: string | null | undefined;
}) => {
  const [passBloodUnit, { isLoading }] = usePassBloodUnitMutation();

  const handleClick = async () => {
    if (!bloodId) return;

    try {
      await passBloodUnit(bloodId).unwrap();
      onFinalizeStatus("pass");
    } catch (err) {
      // Optionally handle error (toast/log)
      console.error("Failed to pass blood unit:", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
        disabled || isLoading
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-green-600 text-white hover:bg-green-700"
      }`}
    >
      <FaCheckCircle className="w-4 h-4" />
      {isLoading ? "Passing..." : "Pass Blood Unit"}
    </button>
  );
};

export const TestBadge = ({
  status,
}: {
  status: "pending" | "pass" | "fail";
}) => {
  const badgeConfig = {
    pending: {
      bg: "bg-gray-100",
      text: "text-gray-600",
      icon: <FaClock className="w-3 h-3" />,
      label: "Pending",
    },
    pass: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: <FaCheckCircle className="w-3 h-3" />,
      label: "Pass",
    },
    fail: {
      bg: "bg-red-100",
      text: "text-red-700",
      icon: <FaTimesCircle className="w-3 h-3" />,
      label: "Fail",
    },
  };

  const config = badgeConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
};

export const BloodUnitInfo = ({ bloodUnit }: { bloodUnit: BloodUnit }) => {
  // Blood type badge component
  const BloodTypeBadge = ({ bloodGroup }: { bloodGroup: string }) => {
    return (
      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold bg-red-100 text-red-500 shadow-sm border-1 border-red-500">
        {bloodGroup}
      </span>
    );
  };

  const StatusBadge = ({ status }: { status: "pending" | "pass" | "fail" }) => {
    const statusConfig = {
      pending: {
        bg: "bg-amber-50",
        text: "text-amber-400",
        icon: <FaClock className="w-3 h-3" />,
        label: "Pending Testing",
        border: "border-amber-400",
      },
      pass: {
        bg: "bg-gradient-to-r from-green-500 to-green-600",
        text: "text-white",
        icon: <FaCheckCircle className="w-3 h-3" />,
        label: "Approved",
        border: "border-green-200",
      },
      fail: {
        bg: "bg-gradient-to-r from-red-500 to-red-600",
        text: "text-white",
        icon: <FaTimesCircle className="w-3 h-3" />,
        label: "Rejected",
        border: "border-red-200",
      },
    };

    const config =
      (statusConfig as Record<string, any>)[status] ?? statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${config.bg} ${config.text} border-1 ${config.border}`}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          Blood Unit Information
        </h2>
        <StatusBadge status={bloodUnit.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <label className="text-sm font-medium text-gray-500 mb-2 block">
            Blood Unit ID
          </label>
          <span className="text-lg font-bold text-gray-900 font-mono">
            {bloodUnit.id}
          </span>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <label className="text-sm font-medium text-gray-500 mb-2 block">
            Blood Group
          </label>
          <BloodTypeBadge bloodGroup={bloodUnit.bloodGroup} />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <label className="text-sm font-medium text-gray-500 mb-2 block">
            Component Type
          </label>
          <span className="text-base font-semibold text-blue-800">
            {bloodUnit.componentType}
          </span>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <label className="text-sm font-medium text-gray-500 mb-2 block">
            Donation Location
          </label>
          <span className="text-base font-medium text-gray-900">
            {bloodUnit.donationLocation}
          </span>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <label className="text-sm font-medium text-gray-500 mb-2 block">
            Donation Date
          </label>
          <span className="text-base font-medium text-gray-900">
            {bloodUnit.donationDate}
          </span>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <label className="text-sm font-medium text-gray-500 mb-2 block">
            Volume
          </label>
          <span className="text-base font-semibold text-purple-800">
            {bloodUnit.volume}
          </span>
        </div>
      </div>
    </div>
  );
};

export const TestResultsToBeCompleted = ({
  tests,
  onTestCardClick,
  onFinalizeStatus,
  bloodId,
}: {
  tests: TestResult[];
  onTestCardClick: (testId: string) => void;
  onFinalizeStatus: (finalStatus: "pass" | "fail") => void;
  bloodId: string | null | undefined;
}) => {
  // Check if all compulsory tests are completed
  const compulsoryTests = tests.filter((test) => test.isCompulsory);
  const allCompulsoryCompleted = compulsoryTests.every(
    (test) => test.status !== "pending"
  );

  const hasFailedTests = tests.some((test) => test.status === "fail");
  // When all compulsory tests are completed and none have failed,
  // treat the unit as "all passed" for UI cues (de-emphasize Fail action)
  const allCompulsoryPassed = allCompulsoryCompleted && !hasFailedTests;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Test Results To Be Completed
      </h2>

      <div className="space-y-4 mb-6">
        {tests.map((test) => (
          <TestCard key={test.id} test={test} onClick={onTestCardClick} />
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Finalize Blood Unit Status
        </h3>

        {allCompulsoryPassed && (
          <div className="p-4 mb-4 bg-green-50 rounded text-green-800">
            This blood unit is safe for transfusion, enter final decision
          </div>
        )}

        {!allCompulsoryCompleted && (
          <div className="p-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-blue-500">
                Complete all compulsory tests before finalizing the blood unit
                status.
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <PassButton
            onFinalizeStatus={onFinalizeStatus}
            disabled={!allCompulsoryCompleted || hasFailedTests}
            bloodId={bloodId}
          />

          <button
            onClick={() => onFinalizeStatus("fail")}
            disabled={!allCompulsoryCompleted}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              !allCompulsoryCompleted
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            } ${allCompulsoryPassed ? "opacity-30" : ""}`}
          >
            <FaTimesCircle className="w-4 h-4" />
            Fail Blood Unit
          </button>
        </div>
      </div>
    </div>
  );
};
