import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Response shape for GET /donors/counts
export interface DonorCountsData {
  totalDonors: number;
  appointmentsToday: number;
  donationsThisMonth: number;
}

export interface DonorCountsResponse {
  success: boolean;
  data: DonorCountsData;
  message: string;
}

export const donorsApi = createApi({
  reducerPath: "donorsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  endpoints: (builder) => ({
    // Although this is a GET endpoint, expose it as a mutation for explicit triggering
    getDonorCounts: builder.mutation<DonorCountsResponse, void>({
      query: () => ({
        url: "/donors/counts",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDonorCountsMutation } = donorsApi;
