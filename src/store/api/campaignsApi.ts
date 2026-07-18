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

// Completed campaigns might use a single `date` and include additional statistics
export interface CompletedCampaignDto {
  id: string;
  title: string;
  status?: string;
  date?: string; // completion or event date
  unitsCollected?: number;
  expectedDonors?: number;
  actualDonors?: number;
  location: string;
  organizer?: string | OrganizerInfo; // API may return string or object
  medicalEstablishment?: MedicalEstablishmentInfo;
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

export interface CompletedCampaignsResponse {
  success: boolean;
  campaigns?: CompletedCampaignDto[];
  data?: {
    campaigns: CompletedCampaignDto[];
    pagination: PaginationInfo;
  };
}

export interface CampaignsSummaryData {
  pendingRequests: number;
  upcomingCampaigns: number;
  totalCampaignsHeld: number;
  totalCampaignDonors: number;
}

export interface CampaignsSummaryResponse {
  success: boolean;
  data?: CampaignsSummaryData;
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
    getUpcomingCampaignsByMedicalEstablishment: builder.query<
      PendingCampaignsResponse,
      { medicalEstablishmentId: string; page?: number; limit?: number }
    >({
      query: ({ medicalEstablishmentId, page = 1, limit = 5 }) =>
        `/upcoming/medical-establishment/${medicalEstablishmentId}?page=${page}&limit=${limit}`,
      providesTags: (result, error, arg) => [{ type: "Campaigns", id: `upcoming-${arg.medicalEstablishmentId}` }],
    }),
    getCompletedCampaignsByMedicalEstablishment: builder.query<
      CompletedCampaignsResponse,
      { medicalEstablishmentId: string; page?: number; limit?: number }
    >({
      query: ({ medicalEstablishmentId, page = 1, limit = 5 }) =>
        `/completed/medical-establishment/${medicalEstablishmentId}?page=${page}&limit=${limit}`,
      providesTags: (result, error, arg) => [{ type: "Campaigns", id: `completed-${arg.medicalEstablishmentId}` }],
    }),
    getCampaignById: builder.query<CampaignDto, string>({
      query: (campaignId) => `/${campaignId}`,
      providesTags: (result, error, id) => [{ type: "Campaigns", id }],
    }),
    getCampaignSummaryByMedicalEstablishment: builder.query<
      CampaignsSummaryResponse,
      { medicalEstablishmentId: string }
    >({
      query: ({ medicalEstablishmentId }) => `/medical-establishment/${medicalEstablishmentId}/summary`,
      providesTags: (result, error, arg) => [{ type: "Campaigns", id: `summary-${arg.medicalEstablishmentId}` }],
    }),
    setCampaignApproval: builder.mutation<
      { success?: boolean } | CampaignDto,
      { campaignId: string; approval: 'accepted' | 'rejected'; token?: string }
    >({
      query: ({ campaignId, approval, token }) => ({
        url: `/${campaignId}/approval`,
        method: 'PATCH',
        body: { approval },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      }),
      invalidatesTags: (result, error, { campaignId }) => [
        { type: 'Campaigns', id: campaignId },
      ],
    }),
  }),
});

export const { 
  useGetPendingCampaignsByMedicalEstablishmentQuery,
  useGetUpcomingCampaignsByMedicalEstablishmentQuery,
  useGetCompletedCampaignsByMedicalEstablishmentQuery,
  useGetCampaignByIdQuery,
  useSetCampaignApprovalMutation,
  useGetCampaignSummaryByMedicalEstablishmentQuery
} = campaignsApi;
