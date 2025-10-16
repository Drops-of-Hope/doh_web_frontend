import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BloodTestResult } from "./bloodTestApi";

interface BloodUnit {
  id: string;
  donationId: string;
  inventoryId: string;
  status: string;
  volume: number;
  bagType: string;
  expiryDate: string;
  consumed: boolean;
  disposed: boolean;
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
  }),
});

export const {
  useGetInventoryByEstablishmentIdQuery,
  useGetSafeUnitsByInventoryIdQuery,
} = inventoryApi;
