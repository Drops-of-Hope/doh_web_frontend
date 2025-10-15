import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UserInfo {
  bloodGroup: string;
  id: string;
  nic: string;
  email: string;
  name: string;
  createdAt: string;
  donationBadge: string;
  isActive: boolean;
  nextEligible: string;
  profileImageUrl: string | null;
  totalDonations: number;
  totalPoints: number;
  updatedAt: string;
}

export interface BloodDonationInfo {
  id: string;
  bdfId: string;
  userId: string;
  numberOfDonations: number | null;
  pointsEarned: number;
  startTime: string;
  endTime: string;
  user?: UserInfo;
}

export interface Blood {
  id: string;
  donationId: string;
  inventoryId: string;
  status: "PENDING" | "TESTED" | "SAFE" | "DISCARDED";
  volume: number;
  bagType: string;
  expiryDate: string;
  consumed: boolean;
  disposed: boolean;
  bloodDonation?: BloodDonationInfo;
}

// New interface for Blood Test Result
export interface BloodTestResult {
  bloodId: string;
  ABOTest: string;
  hivTest: boolean | null;
  hemoglobin: number | null;
  syphilis: boolean | null;
  hepatitisB: boolean | null;
  hepatitisC: boolean | null;
  malaria: boolean | null;
}

export const bloodTestApi = createApi({
  reducerPath: "bloodTestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/blood-test",
  }),
  tagTypes: ["BloodTests"],
  endpoints: (builder) => ({
    // Get all pending blood units for a specific inventory
    getPendingBloodUnitsByInventory: builder.query<Blood[], string>({
      query: (inventoryId) => `/${inventoryId}`,
      providesTags: (result, error, inventoryId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "BloodTests" as const, id })),
              { type: "BloodTests", id: inventoryId },
            ]
          : [{ type: "BloodTests", id: inventoryId }],
    }),

    // Get a single blood unit by its ID
    getBloodUnitById: builder.query<Blood, string>({
      query: (bloodId) => `/unit/${bloodId}`,
      providesTags: (result, error, bloodId) => [
        { type: "BloodTests", id: bloodId },
      ],
    }),

    // Get blood test results by Blood ID
    getBloodTestByBloodId: builder.query<BloodTestResult, string>({
      query: (bloodId) => `/test/${bloodId}`,
      transformResponse: (response: unknown): BloodTestResult => {
        // Treat the raw response as a partial result and preserve null/undefined
        // so the UI can differentiate between "no result yet" and a false result.
        const res = (response as Partial<BloodTestResult>) || {};

        return {
          bloodId: res.bloodId ?? "",
          ABOTest: res.ABOTest ?? "",
          hivTest: typeof res.hivTest === "boolean" ? res.hivTest : null,
          hemoglobin:
            typeof res.hemoglobin === "number"
              ? res.hemoglobin
              : typeof res.hemoglobin === "string" && res.hemoglobin !== ""
              ? Number(res.hemoglobin)
              : null,
          syphilis: typeof res.syphilis === "boolean" ? res.syphilis : null,
          hepatitisB:
            typeof res.hepatitisB === "boolean" ? res.hepatitisB : null,
          hepatitisC:
            typeof res.hepatitisC === "boolean" ? res.hepatitisC : null,
          malaria: typeof res.malaria === "boolean" ? res.malaria : null,
        };
      },
      providesTags: (result, error, bloodId) => [
        { type: "BloodTests", id: bloodId },
      ],
    }),

    updateBloodTest: builder.mutation<
      BloodTestResult,
      { bloodId: string; data: { aboTest: string } }
    >({
      query: ({ bloodId, data }) => ({
        url: `/type/${bloodId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { bloodId }) => [
        { type: "BloodTests", id: bloodId },
      ],
    }),

    // Update HIV test result for a blood unit
    updateHivTest: builder.mutation<
      BloodTestResult,
      { bloodId: string; data: { hivTest: boolean } }
    >({
      query: ({ bloodId, data }) => ({
        url: `/hiv/${bloodId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { bloodId }) => [
        { type: "BloodTests", id: bloodId },
      ],
    }),

    // Update Syphilis test result for a blood unit
    updateSyphilisTest: builder.mutation<
      BloodTestResult,
      { bloodId: string; data: { syphilis: boolean } }
    >({
      query: ({ bloodId, data }) => ({
        url: `/syphilis/${bloodId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { bloodId }) => [
        { type: "BloodTests", id: bloodId },
      ],
    }),

    // Update Hepatitis B and C test results for a blood unit
    updateHepatitisTest: builder.mutation<
      BloodTestResult,
      { bloodId: string; data: { hepatitisB?: boolean; hepatitisC?: boolean } }
    >({
      query: ({ bloodId, data }) => ({
        url: `/hepatitis/${bloodId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { bloodId }) => [
        { type: "BloodTests", id: bloodId },
      ],
    }),

    // Update Malaria test result for a blood unit
    updateMalariaTest: builder.mutation<
      BloodTestResult,
      { bloodId: string; data: { malaria: boolean } }
    >({
      query: ({ bloodId, data }) => ({
        url: `/malaria/${bloodId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { bloodId }) => [
        { type: "BloodTests", id: bloodId },
      ],
    }),
  }),
});

export const {
  useGetPendingBloodUnitsByInventoryQuery,
  useGetBloodUnitByIdQuery,
  useGetBloodTestByBloodIdQuery,
  useUpdateBloodTestMutation,
  useUpdateHivTestMutation,
  useUpdateSyphilisTestMutation,
  useUpdateHepatitisTestMutation,
  useUpdateMalariaTestMutation,
} = bloodTestApi;
