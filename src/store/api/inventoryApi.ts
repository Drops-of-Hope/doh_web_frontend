import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  bloodTests: any[]; 
  medicalEstablishment: MedicalEstablishment;
}

export const inventoryApi = createApi({
  reducerPath: 'inventoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/medical-establishments' }),
  tagTypes: ['Inventory'],

  endpoints: (builder) => ({
    getInventoryByEstablishmentId: builder.query<InventoryItem[], string>({
      query: (establishmentId) => `/inventory/${establishmentId}`,
      providesTags: (result, error, establishmentId) => [{ type: 'Inventory', id: establishmentId }],
    }),
  }),
});

export const { useGetInventoryByEstablishmentIdQuery } = inventoryApi;