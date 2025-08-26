import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Appointment } from '../../../types';

export const appointmentsApi = createApi({
  reducerPath: 'appointmentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/appointments' }),
  tagTypes: ['Appointments'],
  endpoints: (builder) => ({
    getAppointmentsByMedicalEstablishment: builder.query<Appointment[], string>({
      query: (medicalEstablishmentId) => `/medicalEstablishment/${medicalEstablishmentId}`,
      providesTags: (result, error, id) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Appointments' as const, id })), { type: 'Appointments', id }]
          : [{ type: 'Appointments', id }],
    }),
    
    getAppointmentById: builder.query<Appointment, string>({
      query: (appointmentId) => `/${appointmentId}`,
      providesTags: (result, error, id) => [{ type: 'Appointments', id }],
    }),
  }),
});

export const {
  useGetAppointmentsByMedicalEstablishmentQuery,
  useGetAppointmentByIdQuery,
} = appointmentsApi;