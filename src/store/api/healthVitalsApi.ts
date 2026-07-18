import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Appointment {
  id: string;
  appointmentDate: string;
  scheduled: string;
}

interface HealthVital {
  id: string;
  userId: string;
  appointmentId?: string | null;
  weight: number;
  bp: number;
  cvsPulse: number;
  dateTime: string;
  user?: User;
  appointment?: Appointment;
}

interface CreateHealthVitalPayload {
  userId: string;
  appointmentId?: string;
  weight: number;
  bp: number;
  cvsPulse: number;
}

export const healthVitalsApi = createApi({
  reducerPath: 'healthVitalsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/health-vitals' }),
  tagTypes: ['HealthVitals'],
  
  endpoints: (builder) => ({
    getHealthVitalsByAppointmentId: builder.query<HealthVital[], string>({
      query: (appointmentId) => `/${appointmentId}`,
      providesTags: (result, error, appointmentId) => [
        { type: 'HealthVitals', id: appointmentId },
      ],
    }),
    
    createHealthVital: builder.mutation<HealthVital, CreateHealthVitalPayload>({
      query: (newHealthVital) => ({
        url: '/',
        method: 'POST',
        body: newHealthVital,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'HealthVitals', id: arg.userId },
        ...(arg.appointmentId ? [{ type: 'HealthVitals' as const, id: arg.appointmentId }] : []),
      ],
    }),
  }),
});

export const {
  useGetHealthVitalsByAppointmentIdQuery,
  useCreateHealthVitalMutation,
} = healthVitalsApi;