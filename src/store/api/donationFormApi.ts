import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id: string;
  nic: string;
  email: string;
  name: string;
  bloodGroup: string;
  createdAt: string;
  donationBadge: string;
  isActive: boolean;
  profileImageUrl: string | null;
  totalDonations: number;
  totalPoints: number;
  updatedAt: string;
  nextEligible: string | null;
}

export interface BloodDonationForm {
  id: string;
  dateTime: string;
  donorId?: string;
  hasDonatedBefore: boolean;
  anyDifficulty: string;
  medicalAdvice: boolean;
  feelingWell: boolean;
  anyDiseases: Record<string, boolean>;
  takingMedicines: boolean;
  anySurgery: boolean;
  workingLater: boolean;
  pregnant: boolean;
  haveHepatitis: boolean;
  haveTB: boolean;
  hadVaccination: boolean;
  tattoos: boolean;
  haveImprisonment: boolean;
  travelledAbroad: boolean;
  receivedBlood: boolean;
  chemotherapy: boolean;
  hadMalaria: boolean;
  hasDengue: boolean;
  hadLongFever: boolean;
  hadtoothExtraction: boolean;
  bookAspirin: boolean;
  Acknowledgement: boolean;
  highRisk: boolean;
  hadWeightLoss: boolean;
  userId?: string;
  user?: User;
}

export const donationFormApi = createApi({
  reducerPath: 'donationFormApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), // base URL
  tagTypes: ['DonationForms'],
  endpoints: (builder) => ({
    getDonationFormById: builder.query<BloodDonationForm, string>({
      query: (id) => `/donations/form/${id}`,
      transformResponse: (response: { data: BloodDonationForm }) => response.data,
      providesTags: (result, error, id) => [{ type: 'DonationForms', id }],
    }),
    // New endpoint: Get donation form(s) by appointment ID
    getDonationFormByAppointmentId: builder.query<BloodDonationForm[], string>({
      query: (appointmentId) => `/donation-forms/appointment/${appointmentId}`,
      transformResponse: (response: BloodDonationForm[]) => response, // adjust if API wraps in { data }
      providesTags: (result, error, appointmentId) => [{ type: 'DonationForms', id: appointmentId }],
    }),
  }),
});

export const { 
  useGetDonationFormByIdQuery, 
  useGetDonationFormByAppointmentIdQuery 
} = donationFormApi;
