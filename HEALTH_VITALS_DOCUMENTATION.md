# Health Vitals API Integration Documentation

## Overview
This documentation covers the implementation of the health vitals retrieval feature, following the project's standard architecture and coding patterns.

## Files Modified/Created

### 1. Service Layer: `src/store/api/healthVitalsApi.ts`

#### Added Query Endpoint
```typescript
getHealthVitalsByAppointmentId: builder.query<HealthVital[], string>({
  query: (appointmentId) => `/${appointmentId}`,
  providesTags: (result, error, appointmentId) => [
    { type: 'HealthVitals', id: appointmentId },
  ],
})
```

#### Updated Interfaces
Added `User` and `AppointmentInfo` interfaces to properly type the API response:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

interface AppointmentInfo {
  id: string;
  appointmentDate: string;
  scheduled: string;
}

interface HealthVital {
  id: string;
  userId: string;
  appointmentId?: string | null;
  weight: number;
  bp: number;
  cvsPulse: number;
  dateTime: string;
  user?: User;
  appointment?: AppointmentInfo;
}
```

#### Exported Hook
```typescript
export const {
  useCreateHealthVitalMutation,
  useGetHealthVitalsByAppointmentIdQuery, // New hook
} = healthVitalsApi;
```

### 2. React Component: `src/components/organisms/HealthVitalsDisplay.tsx`

#### Component Features
- **Fetches data on mount** using `useGetHealthVitalsByAppointmentIdQuery`
- **Loading state** with animated spinner
- **Error handling** with user-friendly error messages
- **Empty state** when no data is available
- **Responsive grid layout** for displaying health vitals
- **TypeScript-safe** with proper typing
- **Follows project styling** using Tailwind CSS classes

#### Usage Example
```typescript
import { HealthVitalsDisplay } from "@/components";

function MyPage() {
  const appointmentId = "8b65ddh3-0w95-4bda-bbce-2a5096bd5dh4";
  
  return <HealthVitalsDisplay appointmentId={appointmentId} />;
}
```

#### Props Interface
```typescript
interface HealthVitalsDisplayProps {
  appointmentId: string;
}
```

### 3. Component Export: `src/components/index.ts`

Added the new component to the exports:
```typescript
import HealthVitalsDisplay from "./organisms/HealthVitalsDisplay";

export {
  // ... other exports
  HealthVitalsDisplay
}
```

### 4. Example Page: `src/app/(dashboard)/blood_bank/health-vitals-example/page.tsx`

Created a demonstration page showing how to use the component in a real application.

## API Details

### Endpoint
```
GET http://localhost:5000/api/health-vitals/{appointmentId}
```

### Sample Request
```
GET http://localhost:5000/api/health-vitals/8b65ddh3-0w95-4bda-bbce-2a5096bd5dh4
```

### Sample Response
```json
[
  {
    "id": "045dbb4d-2f0f-4a2c-a710-a1f0f620f5ec",
    "userId": "8b65ddh3-0w95-4bda-bbce-2a5096bd5f26",
    "appointmentId": "8b65ddh3-0w95-4bda-bbce-2a5096bd5dh4",
    "weight": 70,
    "bp": 120,
    "cvsPulse": 70,
    "dateTime": "2025-10-07T05:33:34.705Z",
    "user": {
      "id": "8b65ddh3-0w95-4bda-bbce-2a5096bd5f26",
      "name": "Naveen Harinda",
      "email": "naveen@gmail.com"
    },
    "appointment": {
      "id": "8b65ddh3-0w95-4bda-bbce-2a5096bd5dh4",
      "appointmentDate": "2025-10-07T10:59:28.000Z",
      "scheduled": "PENDING"
    }
  }
]
```

## Architecture Pattern

This implementation follows the established RTK Query pattern used throughout the project:

### 1. **Service Layer (RTK Query)**
- Uses `createApi` and `fetchBaseQuery` from `@reduxjs/toolkit/query/react`
- Defines endpoints using the builder pattern
- Implements cache invalidation with `tagTypes` and `providesTags`
- Auto-generates React hooks for data fetching

### 2. **React Component**
- Uses the generated hook (`useGetHealthVitalsByAppointmentIdQuery`)
- Handles loading, error, and success states
- Transforms data in `useEffect` for display purposes
- Follows TypeScript best practices with proper typing

### 3. **Error Handling**
- Consistent with other API functions in the project
- Displays user-friendly error messages
- Handles network errors gracefully

### 4. **Styling**
- Uses Tailwind CSS classes matching the project's design system
- Responsive grid layout
- Color-coded sections (blue for user info, green for vitals)
- Loading spinner with animation

## Integration with Existing Code

The new functionality integrates seamlessly with:
- **Store configuration**: The `healthVitalsApi` is already registered in the Redux store
- **Existing components**: Can be imported from `@/components` like other organisms
- **Type system**: Uses TypeScript interfaces consistent with the project
- **Styling system**: Follows the established Tailwind CSS patterns

## Usage in Other Components

### In a Page Component
```typescript
"use client";
import { HealthVitalsDisplay } from "@/components";

export default function AppointmentDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Appointment Details</h1>
      <HealthVitalsDisplay appointmentId={params.id} />
    </div>
  );
}
```

### With useParams Hook
```typescript
"use client";
import { useParams } from "next/navigation";
import { HealthVitalsDisplay } from "@/components";

export default function DynamicPage() {
  const { appointmentId } = useParams();
  
  return <HealthVitalsDisplay appointmentId={appointmentId as string} />;
}
```

### Conditional Rendering
```typescript
"use client";
import { useState } from "react";
import { HealthVitalsDisplay } from "@/components";

export default function ConditionalPage() {
  const [showVitals, setShowVitals] = useState(false);
  const appointmentId = "8b65ddh3-0w95-4bda-bbce-2a5096bd5dh4";
  
  return (
    <div>
      <button onClick={() => setShowVitals(!showVitals)}>
        Toggle Health Vitals
      </button>
      {showVitals && <HealthVitalsDisplay appointmentId={appointmentId} />}
    </div>
  );
}
```

## Testing the Implementation

1. **Start the backend server** (ensure it's running on `http://localhost:5000`)
2. **Navigate to the example page**: `/blood_bank/health-vitals-example`
3. **Verify the data loads** correctly with the sample appointment ID
4. **Test error handling** by stopping the backend server
5. **Test empty state** by using a non-existent appointment ID

## Code Quality

✅ **TypeScript-safe**: All types properly defined  
✅ **Follows lint rules**: No ESLint errors  
✅ **Consistent formatting**: Matches existing code style  
✅ **Error handling**: Comprehensive error states  
✅ **Loading states**: User-friendly loading indicators  
✅ **Responsive design**: Works on all screen sizes  
✅ **Reusable**: Component can be used anywhere in the app

## Future Enhancements

Potential improvements for future iterations:
- Add refresh/refetch functionality
- Implement real-time updates with polling or WebSockets
- Add ability to edit health vitals inline
- Export data to PDF/CSV
- Add data visualization (charts/graphs)
- Implement comparison with previous readings
