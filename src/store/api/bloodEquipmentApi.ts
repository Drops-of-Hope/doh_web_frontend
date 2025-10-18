import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface MedicalEstablishment {
  id: string;
  name: string;
  address: string;
}

interface CalibrationLog {
  id: string;
  equipmentId?: string;
  calibrationDate: string;
  nextCalibrationDate?: string;
  performedBy?: string;
  result: string;
  notes?: string;
}

interface MaintenanceLog {
  id: string;
  equipmentId?: string;
  maintenanceDate: string;
  maintenanceType?: string;
  type?: string; // Backend sometimes uses 'type' instead of 'maintenanceType'
  performedBy?: string;
  cost?: number;
  notes?: string;
}

export interface BloodEquipment {
  id: string;
  type: string;
  serialNumber: string;
  manufacturer: string;
  model: string;
  purchaseDate: string;
  warrantyExpiry: string;
  locatedMedEstId: string;
  status: string;
  medicalEstablishment?: MedicalEstablishment;
  calibrationLogs?: CalibrationLog[];
  maintenanceLogs?: MaintenanceLog[];
}

export interface CreateBloodEquipmentPayload {
  type: string;
  serialNumber: string;
  manufacturer: string;
  model: string;
  purchaseDate: string;
  warrantyExpiry: string;
  locatedMedEstId: string;
  status: string;
}

export interface UpdateBloodEquipmentPayload {
  type?: string;
  serialNumber?: string;
  manufacturer?: string;
  model?: string;
  purchaseDate?: string;
  warrantyExpiry?: string;
  locatedMedEstId?: string;
  status?: string;
}

export const bloodEquipmentApi = createApi({
  reducerPath: 'bloodEquipmentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/blood-equipment' }),
  tagTypes: ['BloodEquipment'],
  
  endpoints: (builder) => ({
    // GET all equipment
    getAllBloodEquipment: builder.query<BloodEquipment[], void>({
      query: () => '/',
      transformResponse: (response: { success: boolean; data: BloodEquipment[]; message?: string }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'BloodEquipment' as const, id })),
              { type: 'BloodEquipment', id: 'LIST' },
            ]
          : [{ type: 'BloodEquipment', id: 'LIST' }],
    }),

    // GET equipment by ID
    getBloodEquipmentById: builder.query<BloodEquipment, string>({
      query: (id) => `/${id}`,
      transformResponse: (response: { success: boolean; data: BloodEquipment; message?: string }) => response.data,
      providesTags: (result, error, id) => [{ type: 'BloodEquipment', id }],
    }),

    // GET equipment by medical establishment ID
    getBloodEquipmentByEstablishment: builder.query<BloodEquipment[], string>({
      query: (medEstId) => `/establishment/${medEstId}`,
      transformResponse: (response: { success: boolean; data: BloodEquipment[]; message?: string }) => response.data,
      providesTags: (result, error, medEstId) => [
        { type: 'BloodEquipment', id: `establishment-${medEstId}` },
      ],
    }),

    // POST create new equipment
    createBloodEquipment: builder.mutation<BloodEquipment, CreateBloodEquipmentPayload>({
      query: (newEquipment) => ({
        url: '/',
        method: 'POST',
        body: newEquipment,
      }),
      transformResponse: (response: { success: boolean; data: BloodEquipment; message?: string }) => response.data,
      invalidatesTags: [{ type: 'BloodEquipment', id: 'LIST' }],
    }),

    // PUT update equipment
    updateBloodEquipment: builder.mutation<
      BloodEquipment,
      { id: string; data: UpdateBloodEquipmentPayload }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: { success: boolean; data: BloodEquipment; message?: string }) => response.data,
      invalidatesTags: (result, error, { id }) => [
        { type: 'BloodEquipment', id },
        { type: 'BloodEquipment', id: 'LIST' },
      ],
    }),

    // DELETE equipment
    deleteBloodEquipment: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'BloodEquipment', id },
        { type: 'BloodEquipment', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetAllBloodEquipmentQuery,
  useGetBloodEquipmentByIdQuery,
  useGetBloodEquipmentByEstablishmentQuery,
  useCreateBloodEquipmentMutation,
  useUpdateBloodEquipmentMutation,
  useDeleteBloodEquipmentMutation,
} = bloodEquipmentApi;
