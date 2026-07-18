import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppointmentSlot } from '../../../types';

interface CreateSlotPayload {
  startTime: string;
  endTime: string;
  donorsPerSlot: number;
  appointmentDuration: number;
  restTime: number;
  medicalEstablishmentId: string;
}

export const slotsApi = createApi({
  reducerPath: 'slotsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/slots' }),
  tagTypes: ['Slots'], 
  endpoints: (builder) => ({
    getSlotsByMedicalEstablishment: builder.query<AppointmentSlot[], string>({
      query: (medicalEstablishmentId) => `/${medicalEstablishmentId}`,
      providesTags: (result, error, id) =>
        result
          ? [{ type: 'Slots', id }]
          : [{ type: 'Slots', id }], 
    }),

    createSlots: builder.mutation<void, CreateSlotPayload>({
      query: (newSlot) => ({
        url: '/',
        method: 'POST',
        body: newSlot,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Slots', id: arg.medicalEstablishmentId }],
    }),
  }),
});

export const {
  useGetSlotsByMedicalEstablishmentQuery,
  useCreateSlotsMutation,
} = slotsApi;