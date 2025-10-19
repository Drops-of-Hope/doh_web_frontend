import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Donor {
  id: number | string;
  name: string;
  bloodGroup?: string;
  contact?: string;
  city?: string;
  lastDonation?: string;
}

export const donorsApi = createApi({
  reducerPath: 'donorsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Donors'],
  endpoints: (builder) => ({
    getDonors: builder.query<Donor[] | { data: Donor[] }, void>({
      query: () => '/donors',
      providesTags: (result) =>
        result
          ? [...(Array.isArray(result) ? result : result.data).map(({ id }) => ({ type: 'Donors' as const, id })), { type: 'Donors', id: 'LIST' }]
          : [{ type: 'Donors', id: 'LIST' }],
    }),
  }),
});

export const { useGetDonorsQuery } = donorsApi;
