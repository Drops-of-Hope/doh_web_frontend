import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BloodDonationInfo, BloodTestResult } from "./bloodTestApi";

export interface BloodUnit {
  id: string;
  donationId: string;
  inventoryId: string;
  status: string;
  volume: number;
  bagType: string;
  expiryDate: string;
  consumed: boolean;
  disposed: boolean;
  // Newly included: nested donation data with donor user and blood group
  bloodDonation?: BloodDonationInfo;
}

interface MedicalEstablishment {
  id: string;
  name: string;
  address: string;
  region: string;
  email: string;
  bloodCapacity: number;
  isBloodBank: boolean;
}

interface InventoryItem {
  id: string;
  EstablishmentId: string;
  lastChecked: string;
  blood: BloodUnit[];
  bloodTests: BloodTestResult[];
  medicalEstablishment: MedicalEstablishment;
}

// Request/Response types for POST /blood/by-inventory
export interface BloodByInventoryRequest {
  inventory_id: string;
}

export interface BloodByInventoryResponse {
  message: string;
  available_units: number;
  count: number;
  data: BloodUnit[];
}

// Request/Response types for POST /blood/discard-unit
export interface DiscardBloodUnitRequest {
  blood_id: string;
}

export interface DiscardBloodUnitResponse {
  message: string;
}

// Request/Response types for POST /blood/stock-counts
export interface StockCountsRequest {
  inventory_id: string;
}

export interface StockCountsResponse {
  message: string;
  totalStock: number;
  safeUnits: number;
  expiredUnits: number;
  nearingExpiryUnits: number;
}

// Request/Response types for POST /blood/by-blood-group
export interface BloodByBloodGroupRequest {
  inventory_id: string;
}

export interface BloodUnitWithTests extends BloodUnit {
  bloodTests: BloodTestResult[];
}

export interface BloodGroupBucket {
  blood_group: string;
  count: number;
  available_units: number;
  items: BloodUnitWithTests[];
}

export interface BloodByBloodGroupResponse {
  message: string;
  available_units: number;
  count: number;
  data: BloodGroupBucket[];
}

// Request/Response types for POST /blood/check-availability-by-deadline
export interface CheckAvailabilityByDeadlineRequest {
  medical_establishment_id: string;
  blood_group: string; // e.g., "O-"
  number_of_units_requested: number;
  deadline: string; // YYYY-MM-DD
}

export interface CheckAvailabilityByDeadlineResponse {
  message: string;
  available_units: number;
}

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
  }),
  tagTypes: ["Inventory"],

  endpoints: (builder) => ({
    getInventoryByEstablishmentId: builder.query<InventoryItem[], string>({
      query: (establishmentId) =>
        `/medical-establishments/${establishmentId}/inventory`,
      providesTags: (result, error, establishmentId) => [
        { type: "Inventory", id: establishmentId },
      ],
    }),
    getSafeUnitsByInventoryId: builder.query<BloodUnit[], string>({
      query: (inventoryId) => `/inventories/${inventoryId}/safe-units`,
      providesTags: (result, error, inventoryId) => [
        { type: "Inventory", id: inventoryId },
      ],
    }),
    // GET: Fetch safe, not-expired, not-consumed blood units by blood type for an inventory
    getBloodPacketsByType: builder.query<
      BloodUnit[],
      { inventoryId: string; bloodGroup: string }
    >({
      // We leverage the existing safe-units endpoint and filter client-side by blood group
      // in case the backend doesn't support a bloodGroup query param yet.
      query: ({ inventoryId, bloodGroup }) => ({
        url: `/inventories/${inventoryId}/safe-units`,
        // If backend supports these params, they'll further reduce payload server-side
        params: { bloodGroup, notExpired: "true", consumed: "false" },
        method: "GET",
      }),
      // Ensure we only return units that satisfy all constraints even if server ignores params
      transformResponse: (response: BloodUnit[], _meta, args) => {
        const normalize = (bg: string | undefined) => (bg || "").toUpperCase();
        const now = Date.now();
        return (response || []).filter((unit) => {
          const unitBg = normalize(unit.bloodDonation?.user?.bloodGroup as unknown as string);
          const wantedBg = normalize(args.bloodGroup);
          const matchesGroup = unitBg === wantedBg;
          const notExpired = (() => {
            const t = Date.parse(unit.expiryDate);
            return Number.isFinite(t) ? t > now : true;
          })();
          const statusSafe = String(unit.status || "").toUpperCase() === "SAFE";
          const notConsumed = unit.consumed === false;
          return matchesGroup && notExpired && statusSafe && notConsumed;
        });
      },
      providesTags: (result, error, { inventoryId }) => [
        { type: "Inventory", id: inventoryId },
      ],
    }),
    // POST: /blood/by-inventory
    getBloodByInventory: builder.mutation<
      BloodByInventoryResponse,
      BloodByInventoryRequest
    >({
      query: (body) => ({
        url: "/blood/by-inventory",
        method: "POST",
        body,
      }),
    }),
    // POST: /blood/discard-unit
    discardBloodUnit: builder.mutation<
      DiscardBloodUnitResponse,
      DiscardBloodUnitRequest
    >({
      query: (body) => ({
        url: "/blood/discard-unit",
        method: "POST",
        body,
      }),
      // Invalidate all Inventory queries since we don't have the specific inventory id here
      invalidatesTags: ["Inventory"],
    }),
    // POST: /blood/stock-counts
    getStockCountsByInventory: builder.mutation<
      StockCountsResponse,
      StockCountsRequest
    >({
      query: (body) => ({
        url: "/blood/stock-counts",
        method: "POST",
        body,
      }),
    }),
    // POST: /blood/by-blood-group
    getBloodByBloodGroup: builder.mutation<
      BloodByBloodGroupResponse,
      BloodByBloodGroupRequest
    >({
      query: (body) => ({
        url: "/blood/by-blood-group",
        method: "POST",
        body,
      }),
    }),

    // POST: /blood/check-availability-by-deadline
    checkAvailabilityByDeadline: builder.mutation<
      CheckAvailabilityByDeadlineResponse,
      CheckAvailabilityByDeadlineRequest
    >({
      query: (body) => ({
        url: "/blood/check-availability-by-deadline",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetInventoryByEstablishmentIdQuery,
  useGetSafeUnitsByInventoryIdQuery,
  useGetBloodPacketsByTypeQuery,
  useGetBloodByInventoryMutation,
  useDiscardBloodUnitMutation,
  useGetStockCountsByInventoryMutation,
  useGetBloodByBloodGroupMutation,
  useCheckAvailabilityByDeadlineMutation,
} = inventoryApi;
