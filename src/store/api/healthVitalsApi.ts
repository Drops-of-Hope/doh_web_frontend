import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface HealthVital {
  id: string;
  userId: string;
  appointmentId?: string | null;
  weight: number;
  bp: number;
  cvsPulse: number;
  dateTime: string;
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
  useCreateHealthVitalMutation,
} = healthVitalsApi;