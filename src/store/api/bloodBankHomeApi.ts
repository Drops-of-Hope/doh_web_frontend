import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Response shape for GET /api/blood-bank-home/counts
export interface BloodBankHomeCountsResponse {
  message: string;
  totalBloodUnits: number;
  expiringSoonUnits: number;
  transitRecords: number;
}

// Response shape for GET /api/blood-bank-home/blood-type-distribution
export interface BloodTypeDistributionItem {
  blood_group: string;
  count: number;
}

export interface BloodTypeDistributionResponse {
  message: string;
  data: BloodTypeDistributionItem[];
  total: number;
}

// Response shape for GET /api/blood-bank-home/donations-two-weeks
export interface DonationsTwoWeeksRanges {
  thisWeekStart: string; // ISO string
  lastWeekStart: string; // ISO string
  now: string; // ISO string
}

export interface DonationsTwoWeeksResponse {
  message: string;
  thisWeekCount: number;
  lastWeekCount: number;
  difference: number;
  percentChange: number;
  byBloodGroup: BloodTypeDistributionItem[];
  mostDonatedThisWeek: BloodTypeDistributionItem;
  leastDonatedThisWeek: BloodTypeDistributionItem;
  ranges: DonationsTwoWeeksRanges;
}

export const bloodBankHomeApi = createApi({
  reducerPath: "bloodBankHomeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/blood-bank-home",
  }),
  tagTypes: ["BloodBankHome"],
  endpoints: (builder) => ({
    // Using a mutation for a GET to allow manual triggering from components
    getCounts: builder.mutation<BloodBankHomeCountsResponse, void>({
      query: () => ({ url: "/counts", method: "GET" }),
    }),
    getBloodTypeDistribution: builder.mutation<
      BloodTypeDistributionResponse,
      void
    >({
      query: () => ({ url: "/blood-type-distribution", method: "GET" }),
    }),
    getDonationsTwoWeeks: builder.mutation<DonationsTwoWeeksResponse, void>({
      query: () => ({ url: "/donations-two-weeks", method: "GET" }),
    }),
  }),
});

export const {
  useGetCountsMutation,
  useGetBloodTypeDistributionMutation,
  useGetDonationsTwoWeeksMutation,
} = bloodBankHomeApi;
