import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Types for the donation reports stats response
export interface BloodTypeStat {
  type: string;
  count: number;
}

export interface DonationReportsStatsData {
  thisMonth: number;
  lastMonth: number;
  diffFromLastMonth: number;
  monthOverMonth: string; // e.g., "increased" | "decreased"
  last30DaysAvgPerDay: number;
  avgComparedToLastMonth: string; // e.g., "increased" | "decreased"
  mostDonatedBloodType: BloodTypeStat;
  leastDonatedBloodType: BloodTypeStat;
}

export interface DonationReportsStatsResponse {
  success: boolean;
  data: DonationReportsStatsData;
}

// Types for the donors stats response
export interface DonorStatsData {
  totalDonors: number;
  activeDonorsThisMonth: number;
  activeDonorsPercent: number;
  inactiveDonorsLastYear: number;
  inactiveDonorsPercent: number;
  avgDonationsPerDonor: number;
}

export interface DonorStatsResponse {
  success: boolean;
  data: DonorStatsData;
}

// Types for inactive donors list response
export interface InactiveDonorUserDetails {
  phoneNumber: string | null;
  city: string | null;
  district: string | null;
  address: string | null;
  type: string | null; // e.g., "DONOR"
}

export interface InactiveDonorItem {
  id: string;
  name: string;
  email: string;
  nic: string;
  bloodGroup: string; // could be an enum elsewhere; using string for flexibility
  totalDonations: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  lastDonationDate: string | null; // ISO date or null
  userDetails: InactiveDonorUserDetails | null;
}

export interface InactiveDonorsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface InactiveDonorsData {
  donors: InactiveDonorItem[];
  pagination: InactiveDonorsPagination;
}

export interface InactiveDonorsResponse {
  success: boolean;
  data: InactiveDonorsData;
}

// Types for campaign reports
export interface CampaignPerformanceData {
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  pendingApproval: number;
  totalDonorsReached: number;
  totalBloodUnitsCollected: number;
  averageDonorsPerCampaign: number;
  campaignSuccessRate: number;
  topPerformingCampaign: {
    id: string;
    title: string;
    donorsReached: number;
    unitsCollected: number;
  };
  monthlyPerformance: {
    month: string;
    campaigns: number;
    donors: number;
    unitsCollected: number;
  }[];
}

export interface CampaignPerformanceResponse {
  success: boolean;
  data: CampaignPerformanceData;
}

export interface DonorEngagementData {
  totalRegistrations: number;
  actualParticipants: number;
  participationRate: number;
  repeatDonors: number;
  newDonors: number;
  retentionRate: number;
  averageParticipationPerCampaign: number;
  topEngagedDonors: {
    id: string;
    name: string;
    totalParticipations: number;
    lastParticipation: string;
  }[];
  engagementTrend: {
    date: string;
    registrations: number;
    participations: number;
  }[];
}

export interface DonorEngagementResponse {
  success: boolean;
  data: DonorEngagementData;
}

export const reportsApi = createApi({
  reducerPath: "reportsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/donation-reports",
  }),
  tagTypes: ["Reports"],
  endpoints: (builder) => ({
    // Using a mutation for a GET so it is manually triggered (no auto-fetch on mount)
    getDonationStats: builder.mutation<DonationReportsStatsResponse, void>({
      query: () => ({ url: "/stats", method: "GET" }),
    }),
    getDonorStats: builder.mutation<DonorStatsResponse, void>({
      query: () => ({ url: "/donors/stats", method: "GET" }),
    }),
    getInactiveDonors: builder.mutation<
      InactiveDonorsResponse,
      { page?: number; limit?: number } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params && typeof params === "object") {
          if (params.page !== undefined)
            queryParams.set("page", String(params.page));
          if (params.limit !== undefined)
            queryParams.set("limit", String(params.limit));
        }
        const qs = queryParams.toString();
        return {
          url: `/donors/inactive${qs ? `?${qs}` : ""}`,
          method: "GET",
        };
      },
    }),
    // Campaign reports endpoints
    getCampaignPerformanceStats: builder.mutation<CampaignPerformanceResponse, void>({
      query: () => ({ url: "/campaigns/performance", method: "GET" }),
    }),
    getDonorEngagementStats: builder.mutation<DonorEngagementResponse, void>({
      query: () => ({ url: "/campaigns/donor-engagement", method: "GET" }),
    }),
  }),
});

export const {
  useGetDonationStatsMutation,
  useGetDonorStatsMutation,
  useGetInactiveDonorsMutation,
  useGetCampaignPerformanceStatsMutation,
  useGetDonorEngagementStatsMutation,
} = reportsApi;
