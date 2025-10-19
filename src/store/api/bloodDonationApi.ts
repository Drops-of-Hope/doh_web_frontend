import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

// Nested user details returned from GET /api/blood-donation
interface UserDetails {
  id: string;
  address: string | null;
  city: string | null;
  userId: string;
  allergies: string | null;
  emergencyContact: string | null;
  medicalConditions: string | null;
  phoneNumber: string | null;
  district: string | null;
  type: string | null;
}

interface User {
  id: string;
  nic: string;
  email: string;
  name: string;
  bloodGroup: string;
  createdAt: string;
  donationBadge: string;
  isActive: boolean;
  nextEligible: string | null;
  profileImageUrl: string | null;
  totalDonations: number;
  totalPoints: number;
  updatedAt: string;
  userDetails: UserDetails | null;
}

// Donation object returned by GET includes nested user
type BloodDonationWithUser = BloodDonation & { user: User };

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

// Response from GET /api/blood-donation
interface GetBloodDonationsResponse {
  success: boolean;
  data: BloodDonationWithUser[];
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
  reducerPath: "bloodDonationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/blood-donation",
  }),
  tagTypes: ["BloodDonations"],

  endpoints: (builder) => ({
    // GET all blood donations
    getBloodDonations: builder.query<GetBloodDonationsResponse, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: (result) => {
        if (!result?.data)
          return [{ type: "BloodDonations" as const, id: "LIST" }];
        return [
          ...result.data
            .filter((d) => d.userId)
            .map((d) => ({
              type: "BloodDonations" as const,
              id: d.userId as string,
            })),
          { type: "BloodDonations" as const, id: "LIST" },
        ];
      },
    }),
    createBloodDonation: builder.mutation<
      BloodDonationResponse,
      CreateBloodDonationPayload
    >({
      query: (newBloodDonation) => ({
        url: "/",
        method: "POST",
        body: newBloodDonation,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "BloodDonations", id: arg.userId },
        { type: "BloodDonations", id: arg.bdfId },
        { type: "BloodDonations", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetBloodDonationsQuery, useCreateBloodDonationMutation } =
  bloodDonationApi;
