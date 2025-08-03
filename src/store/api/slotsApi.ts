import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppointmentSlot } from '../../../types'; 

export const slotsApi = createApi({
  reducerPath: 'slotsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/slots' }),
  endpoints: (builder) => ({
    getSlotsByMedicalEstablishment: builder.query<AppointmentSlot[], string>({
      query: (medicalEstablishmentId) => `/${medicalEstablishmentId}`,
    }),
  }),
});

export const {
  useGetSlotsByMedicalEstablishmentQuery,
} = slotsApi;
