import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface DonorLocationCount {
  district: string;
  donorCount: number;
}

export const donorsApi = createApi({
  reducerPath: 'donorsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/donors' }),
  tagTypes: ['DonorLocations'],
  
  endpoints: (builder) => ({
    // GET donor counts by location/district
    getDonorLocationCounts: builder.query<DonorLocationCount[], void>({
      query: () => '/location-count',
      transformResponse: (response: { success: boolean; data: DonorLocationCount[]; message?: string }) => response.data,
      providesTags: ['DonorLocations'],
    }),
  }),
});

export const {
  useGetDonorLocationCountsQuery,
} = donorsApi;
