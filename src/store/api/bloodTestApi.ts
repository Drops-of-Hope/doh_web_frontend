import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  user?: UserInfo; // Include user details
}

export interface Blood {
  id: string;
  donationId: string;
  inventoryId: string;
  status: 'PENDING' | 'TESTED' | 'SAFE' | 'DISCARDED';
  volume: number;
  bagType: string;
  expiryDate: string;
  consumed: boolean;
  disposed: boolean;
  bloodDonation?: BloodDonationInfo; // Include donation details
}

export const bloodTestApi = createApi({
  reducerPath: 'bloodTestApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/blood-test' }),
  tagTypes: ['BloodTests'],
  endpoints: (builder) => ({
    // Get all pending blood units for a specific inventory
    getPendingBloodUnitsByInventory: builder.query<Blood[], string>({
      query: (inventoryId) => `/${inventoryId}`,
      providesTags: (result, error, inventoryId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'BloodTests' as const, id })),
              { type: 'BloodTests', id: inventoryId },
            ]
          : [{ type: 'BloodTests', id: inventoryId }],
    }),

    // Get a single blood unit by its ID
    getBloodUnitById: builder.query<Blood, string>({
      query: (bloodId) => `/unit/${bloodId}`,
      providesTags: (result, error, bloodId) => [{ type: 'BloodTests', id: bloodId }],
    }),
  }),
});

export const {
  useGetPendingBloodUnitsByInventoryQuery,
  useGetBloodUnitByIdQuery,
} = bloodTestApi;
