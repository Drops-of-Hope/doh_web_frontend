import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface OrganizerInfo {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
}

export interface MedicalEstablishmentInfo {
  id: string;
  name: string;
  address: string;
  contactNumber?: string;
}

export interface CampaignDto {
  id: string;
  title: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  startDate?: string;
  endDate?: string;
  location: string;
  expectedDonors?: number;
  goalBloodUnits?: number;
  currentBloodUnits?: number;
  contactPersonName?: string;
  contactPersonPhone?: string;
  requirements?: { notes?: string };
  isApproved: "PENDING" | "APPROVED" | "REJECTED" | string;
  isActive?: boolean;
  status?: string;
  organizer?: OrganizerInfo;
  medicalEstablishment?: MedicalEstablishmentInfo;
  participantsCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PendingCampaignsResponse {
  success: boolean;
  campaigns?: CampaignDto[];
  data?: {
    campaigns: CampaignDto[];
    pagination: PaginationInfo;
  };
}

export const campaignsApi = createApi({
  reducerPath: "campaignsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/campaigns" }),
  tagTypes: ["Campaigns"],
  endpoints: (builder) => ({
    getPendingCampaignsByMedicalEstablishment: builder.query<
      PendingCampaignsResponse,
      { medicalEstablishmentId: string; page?: number; limit?: number }
    >({
      query: ({ medicalEstablishmentId, page = 1, limit = 2 }) =>
        `/pending/medical-establishment/${medicalEstablishmentId}?page=${page}&limit=${limit}`,
      providesTags: (result, error, arg) => [{ type: "Campaigns", id: arg.medicalEstablishmentId }],
    }),
    getCampaignById: builder.query<CampaignDto, string>({
      query: (campaignId) => `/${campaignId}`,
      providesTags: (result, error, id) => [{ type: "Campaigns", id }],
    }),
  }),
});

export const { 
  useGetPendingCampaignsByMedicalEstablishmentQuery,
  useGetCampaignByIdQuery
} = campaignsApi;
