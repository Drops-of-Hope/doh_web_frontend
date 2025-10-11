"use client";

import { useState } from "react";
import type { BloodTestResult } from "@/store/api/bloodTestApi";
import type { TestResult } from "./TestCard";

// RTK Query mutation hook returns a tuple; here we only accept the trigger function
type UpdateSyphilisFn = (args: {
  bloodId: string;
  data: { syphilis: boolean };
}) => {
  unwrap: () => Promise<BloodTestResult>;
};

type UpdateHepatitisFn = (args: {
  bloodId: string;
  data: { hepatitisB?: boolean; hepatitisC?: boolean };
}) => {
  unwrap: () => Promise<BloodTestResult>;
};

interface Props {
  selectedTest: string | null;
  setSelectedTest: (test: string | null) => void;
  bloodIdStr: string | undefined;
  setTests: React.Dispatch<React.SetStateAction<TestResult[]>>;
  updateSyphilisTest: UpdateSyphilisFn;
  updateHepatitisTest: UpdateHepatitisFn;
  isUpdatingSyphilis: boolean;
  isUpdatingHepatitis: boolean;
}

export function TestModals({
  selectedTest,
  setSelectedTest,
  bloodIdStr,
  setTests,
  updateSyphilisTest,
  updateHepatitisTest,
  isUpdatingSyphilis,
  isUpdatingHepatitis,
}: Props) {
  const [syphilisSelection, setSyphilisSelection] = useState("negative");
  const [hepatitisBSelection, setHepatitisBSelection] = useState("negative");
  const [hepatitisCSelection, setHepatitisCSelection] = useState("negative");

  const closeModal = () => setSelectedTest(null);

  const saveSyphilisResult = async (isPositive: boolean) => {
    if (!bloodIdStr) return;
    try {
      await updateSyphilisTest({
        bloodId: bloodIdStr,
        data: { syphilis: isPositive },
      }).unwrap();
      setTests((prev) =>
        prev.map((t) =>
          t.id === "syphilis"
            ? { ...t, status: isPositive ? "fail" : "pass" }
            : t
        )
      );
      closeModal();
    } catch (err) {
      console.error("Failed to save syphilis result", err);
      closeModal();
    }
  };

  const saveHepatitisResults = async (
    isBPositive: boolean,
    isCPositive: boolean
  ) => {
    if (!bloodIdStr) return;
    try {
      await updateHepatitisTest({
        bloodId: bloodIdStr,
        data: { hepatitisB: isBPositive, hepatitisC: isCPositive },
      }).unwrap();
      setTests((prev) =>
        prev.map((t) =>
          t.id === "hepatitis"
            ? { ...t, status: isBPositive || isCPositive ? "fail" : "pass" }
            : t
        )
      );
      closeModal();
    } catch (err) {
      console.error("Failed to save hepatitis results", err);
      closeModal();
    }
  };

  if (selectedTest === "syphilis") {
    return (
      <Modal onClose={closeModal}>
        <h3 className="text-lg font-semibold mb-4">Syphilis Test Result</h3>
        <select
          className="w-full border rounded-lg px-3 py-2 mb-4"
          value={syphilisSelection}
          onChange={(e) => setSyphilisSelection(e.target.value)}
        >
          <option value="negative">Negative</option>
          <option value="positive">Positive</option>
        </select>
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 border rounded-lg text-gray-600 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => saveSyphilisResult(syphilisSelection === "positive")}
            disabled={isUpdatingSyphilis}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            {isUpdatingSyphilis ? "Saving..." : "Save"}
          </button>
        </div>
      </Modal>
    );
  }

  if (selectedTest === "hepatitis") {
    return (
      <Modal onClose={closeModal}>
        <h3 className="text-lg font-semibold mb-4">
          Hepatitis B & C Test Results
        </h3>
        <div className="mb-4">
          <label className="block text-sm mb-1">Hepatitis B</label>
          <select
            className="w-full border rounded-lg px-3 py-2 mb-3"
            value={hepatitisBSelection}
            onChange={(e) => setHepatitisBSelection(e.target.value)}
          >
            <option value="negative">Negative</option>
            <option value="positive">Positive</option>
          </select>

          <label className="block text-sm mb-1">Hepatitis C</label>
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
            onClick={closeModal}
            className="px-4 py-2 border rounded-lg text-gray-600 text-sm"
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
            disabled={isUpdatingHepatitis}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            {isUpdatingHepatitis ? "Saving..." : "Save"}
          </button>
        </div>
      </Modal>
    );
  }

  return null;
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md shadow-lg">
        {children}
      </div>
    </div>
  );
}
