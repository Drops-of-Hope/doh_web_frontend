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

// Summary types
export interface RequestsSummaryData {
	total: number;
	incoming: number;
	outgoing: number;
	inTransit: number;
}

export interface RequestsSummaryResponse {
	message: string;
	data: RequestsSummaryData;
}

// Request item types for incoming/outgoing lists
export type UrgencyLevel = 'HIGH' | 'MEDIUM' | 'LOW' | string;

export interface MedicalEstablishmentRef {
	id: string;
	name: string;
	address?: string;
}

export interface BloodRequestItem {
	id: string;
	bloodGroup: string; // e.g., O_POSITIVE
	unitsRequired: number;
	urgencyLevel: UrgencyLevel;
	requestReason?: string;
	requestDeliveryDate?: string; // ISO
	requestDeliveryTime?: string; // e.g., 09:00-10:00
	medicalEstablishmentId?: string;
	requestingBloodBankId?: string;
	additionalNotes?: string;
	status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | string;
	createdAt?: string;
	updatedAt?: string;
	medicalEstablishment?: MedicalEstablishmentRef;
	requestingBloodBank?: MedicalEstablishmentRef;
}

export interface RequestsListResponse {
	message: string;
	data: BloodRequestItem[];
}

export interface RequestByIdResponse {
	message: string;
	data: BloodRequestItem;
}

export const requestsApi = createApi({
	reducerPath: "requestsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/api",
	}),
	endpoints: (builder) => ({
		// GET: /requests/summary?medicalEstablishmentId=<MD_ID>
		getRequestsSummary: builder.query<
			RequestsSummaryResponse,
			{ medicalEstablishmentId: string }
		>({
			query: ({ medicalEstablishmentId }) =>
				`/requests/summary?medicalEstablishmentId=${medicalEstablishmentId}`,
		}),

		// GET incoming requests (recipient)
		// /requests/pending/by-recipient?medicalEstablishmentId=<MD_ID>
		getIncomingPendingRequests: builder.query<
			RequestsListResponse,
			{ medicalEstablishmentId: string }
		>({
			query: ({ medicalEstablishmentId }) =>
				`/requests/pending/by-recipient?medicalEstablishmentId=${medicalEstablishmentId}`,
		}),

			// GET outgoing requests (requester)
			// /requests/pending/by-requester?medicalEstablishmentId=<MD_ID>
			getOutgoingPendingRequests: builder.query<
				RequestsListResponse,
				{ medicalEstablishmentId: string }
			>({
				query: ({ medicalEstablishmentId }) =>
					`/requests/pending/by-requester?medicalEstablishmentId=${medicalEstablishmentId}`,
			}),
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
			// GET request by id
			getRequestById: builder.query<
				RequestByIdResponse,
				{ requestId: string }
			>({
				query: ({ requestId }) => `/requests/${requestId}`,
			}),
	}),
});

	export const {
		useGetRequestsSummaryQuery,
		useGetIncomingPendingRequestsQuery,
		useGetOutgoingPendingRequestsQuery,
		useGetRequestByIdQuery,
		useCreateRequestMutation,
	} = requestsApi;

