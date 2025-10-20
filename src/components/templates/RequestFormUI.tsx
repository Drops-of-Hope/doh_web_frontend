"use client";

import React from "react";
import { FaTint } from "react-icons/fa";
import {
  BackButton,
  BloodTypeRequestsSection,
  RequestFormSections,
} from "@/components";
import {
  EnhancedBloodRequestFormData,
  FormErrors,
  urgencyLevels,
  reasonsForRequest,
  nearbyBloodBanks,
} from "../../../types";
import { useRouter } from "next/navigation";

interface RequestFormUIProps {
  formData: EnhancedBloodRequestFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  onInputChange: (
    field: keyof EnhancedBloodRequestFormData,
    value: string | boolean
  ) => void;
  onBloodTypeRequestChange: (
    id: string,
    field: "bloodType" | "unitsRequired",
    value: string
  ) => void;
  onAddBloodTypeRequest: () => void;
  onRemoveBloodTypeRequest: (id: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  router: ReturnType<typeof useRouter>;
}

export default function RequestFormUI({
  formData,
  errors,
  isSubmitting,
  onInputChange,
  onBloodTypeRequestChange,
  onAddBloodTypeRequest,
  onRemoveBloodTypeRequest,
  onSubmit,
  router,
}: RequestFormUIProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _unusedSubmitting = isSubmitting;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _unusedRouter = router;
  return (
    <div className="min-h-[100vh] p-4">
      <div className="">
        <div className="mb-6">
          <BackButton
            fallbackUrl="/blood_bank/requests/request_form"
            className="hover:shadow-md"
          />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FaTint className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  Blood Request Form
                </h1>
                <p className="text-gray-600">Submit a new blood request</p>
              </div>
            </div>
          </div>
        </div>

        <form id="blood-request-form" onSubmit={onSubmit} className="space-y-6">
          <BloodTypeRequestsSection
            bloodTypeRequests={formData.bloodTypeRequests}
            errors={errors}
            onBloodTypeRequestChange={onBloodTypeRequestChange}
            onAddBloodTypeRequest={onAddBloodTypeRequest}
            onRemoveBloodTypeRequest={onRemoveBloodTypeRequest}
          />

          <RequestFormSections
            formData={formData}
            errors={errors}
            onInputChange={onInputChange}
            urgencyLevels={urgencyLevels}
            reasonsForRequest={reasonsForRequest}
            nearbyBloodBanks={nearbyBloodBanks}
          />
        </form>
      </div>
    </div>
  );
}
