import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface BloodUnit {
  id: string;
  donationId: string;
  inventoryId?: string | null;
  status: string;
  volume: number;
  bagType: string;
  expiryDate: string;
  consumed: boolean;
  disposed: boolean;
}

interface BloodDonation {
  id: string;
  bdfId: string;
  userId?: string | null;
  numberOfDonations?: number | null;
  pointsEarned: number;
  startTime: string;
  endTime: string;
}

interface SystemLog {
  id: string;
  dateTime: string;
  level: string;
  message: string;
  bloodDonationId: string;
}

interface BloodDonationResponse {
  bloodDonation: BloodDonation;
  bloodUnits: BloodUnit[];
  systemLog: SystemLog;
}

interface CreateBloodDonationPayload {
  bdfId: string;
  userId: string;
  startTime: string;
  endTime: string;
  bloodUnits: Array<{
    id: string;
    inventoryId?: string;
    volume: number;
  }>;
}

export const bloodDonationApi = createApi({
  reducerPath: 'bloodDonationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/blood-donation' }),
  tagTypes: ['BloodDonations'],
  
  endpoints: (builder) => ({
    createBloodDonation: builder.mutation<BloodDonationResponse, CreateBloodDonationPayload>({
      query: (newBloodDonation) => ({
        url: '/',
        method: 'POST',
        body: newBloodDonation,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'BloodDonations', id: arg.userId },
        { type: 'BloodDonations', id: arg.bdfId },
      ],
    }),
  }),
});

export const {
  useCreateBloodDonationMutation,
} = bloodDonationApi;