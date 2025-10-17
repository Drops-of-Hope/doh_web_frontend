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

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
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
  }),
});

export const {
  useGetInventoryByEstablishmentIdQuery,
  useGetSafeUnitsByInventoryIdQuery,
  useGetBloodByInventoryMutation,
} = inventoryApi;
