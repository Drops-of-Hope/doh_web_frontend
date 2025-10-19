import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Types for creating a new blood request
export interface CreateRequestPayload {
	bloodGroup: string; // e.g., "O_POSITIVE"
	unitsRequired: number;
	urgencyLevel: string; // e.g., "HIGH" | "MEDIUM" | "LOW"
	requestReason: string;
	requestDeliveryDate: string; // e.g., "2025-10-20 00:00:00"
	requestDeliveryTime: string; // e.g., "09:00-10:00"
	medicalEstablishmentId: string;
	requestingBloodBankId: string;
	additionalNotes?: string;
}

export interface CreateRequestResponse<T = unknown> {
	success: boolean;
	data: T;
	message?: string;
}

export const requestsApi = createApi({
	reducerPath: "requestsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/api",
	}),
	endpoints: (builder) => ({
		// POST: /requests/
		createRequest: builder.mutation<
			CreateRequestResponse,
			CreateRequestPayload
		>({
			query: (body) => ({
				url: "/requests/",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useCreateRequestMutation } = requestsApi;

