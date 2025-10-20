import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface MedicalEstablishmentDto {
  id: string;
  name: string;
  address: string;
  region: string;
  email: string;
  bloodCapacity: number;
  isBloodBank: boolean;
}

export interface MedicalEstablishmentsResponse {
  // Some endpoints in this codebase include success/message, but sample shows only data
  // Keep them optional for flexibility
  success?: boolean;
  message?: string;
  data: MedicalEstablishmentDto[];
}

export const medicalEstablishmentsApi = createApi({
  reducerPath: "medicalEstablishmentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    // Expose GET as a mutation so consumers can trigger on demand
    getAllMedicalEstablishments: builder.mutation<
      MedicalEstablishmentsResponse,
      void
    >({
      query: () => ({
        url: "/medical-establishments/all",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllMedicalEstablishmentsMutation } =
  medicalEstablishmentsApi;
