# Blood Equipment List Component - Documentation

## Overview

The `BloodEquipmentList` component is a reusable React component that fetches and displays blood equipment data from the backend API endpoint (`http://localhost:5000/api/blood-equipment`). It follows the project's architectural patterns using RTK Query for data fetching and implements consistent UI styling.

## Architecture

### API Service Layer
**Location:** `src/store/api/bloodEquipmentApi.ts`

The API service is already implemented using **RTK Query** (Redux Toolkit Query):

```typescript
import { useGetAllBloodEquipmentQuery } from '@/store/api/bloodEquipmentApi';

// The hook automatically handles:
// - Fetching data from http://localhost:5000/api/blood-equipment
// - Caching and re-fetching
// - Loading states
// - Error handling
// - Response transformation (extracts data from {success, data, message} structure)
```

### Component Location
**Location:** `src/components/organisms/BloodEquipmentList.tsx`

Exported from: `src/components/index.ts`

---

## Component API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `statusFilter` | `'all' \| 'OPERATIONAL' \| 'MAINTENANCE' \| 'DECOMMISSIONED'` | `'all'` | Filter equipment by status |
| `limit` | `number \| undefined` | `undefined` | Limit the number of items displayed |
| `showActions` | `boolean` | `true` | Show/hide the actions column |
| `enableRowClick` | `boolean` | `true` | Enable clicking rows to navigate to detail page |

### Example Usage

#### 1. Basic Usage - Show All Equipment

```tsx
import { BloodEquipmentList } from '@/components';

export default function EquipmentPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blood Equipment</h1>
      <BloodEquipmentList />
    </div>
  );
}
```

#### 2. Filter by Status - Show Only Operational Equipment

```tsx
import { BloodEquipmentList } from '@/components';

export default function OperationalEquipmentPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Operational Equipment</h1>
      <BloodEquipmentList statusFilter="OPERATIONAL" />
    </div>
  );
}
```

#### 3. Limited Display - Show Top 5 Equipment

```tsx
import { BloodEquipmentList } from '@/components';

export default function DashboardWidget() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Equipment</h2>
      <BloodEquipmentList limit={5} showActions={false} />
    </div>
  );
}
```

#### 4. Custom Layout - Maintenance Equipment Only

```tsx
import { BloodEquipmentList } from '@/components';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Equipment Under Maintenance</h1>
        <p className="text-gray-600">Equipment currently being serviced</p>
      </div>
      <BloodEquipmentList 
        statusFilter="MAINTENANCE"
        enableRowClick={true}
      />
    </div>
  );
}
```

#### 5. Read-Only View - No Actions or Navigation

```tsx
import { BloodEquipmentList } from '@/components';

export default function ReportPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Equipment Report</h1>
      <BloodEquipmentList 
        showActions={false}
        enableRowClick={false}
      />
    </div>
  );
}
```

---

## Features

### ✅ Automatic Data Fetching
- Uses RTK Query's `useGetAllBloodEquipmentQuery` hook
- Automatically fetches from `http://localhost:5000/api/blood-equipment`
- Handles caching, re-fetching, and data synchronization

### ✅ Loading State
Displays a spinner with message while data is being fetched:
```
🔄 Loading equipment data...
```

### ✅ Error Handling
Shows user-friendly error message if API call fails:
```
⚠️ Error Loading Equipment
Error 500: Unable to fetch equipment data
```

### ✅ Empty State
Shows message when no equipment matches the filters:
```
No equipment found.
Try adjusting your filter criteria.
```

### ✅ Status Display
Visual status badges with icons:
- 🟢 **Operational** - Green badge
- 🟡 **Maintenance** - Yellow badge
- 🔴 **Decommissioned** - Red badge

### ✅ Interactive Table
- Click any row to navigate to equipment detail page
- Hover effect on rows
- Action buttons for quick access

### ✅ Data Display
Shows key equipment information:
- Serial Number (bold)
- Equipment Type
- Manufacturer
- Model
- Location (Medical Establishment name)
- Status (with colored badge)
- Purchase Date (formatted)

### ✅ Footer with Count
Shows total count and filtered count:
```
Showing 5 equipment of 9 total
```

---

## Data Flow

### 1. API Call
```typescript
const { data, isLoading, isError } = useGetAllBloodEquipmentQuery();
```

### 2. Backend Response Structure
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "REFRIGERATOR",
      "serialNumber": "RF-2024-001",
      "manufacturer": "Panasonic Healthcare",
      "model": "MBR-305D",
      "purchaseDate": "2024-01-15T00:00:00.000Z",
      "warrantyExpiry": "2027-01-15T00:00:00.000Z",
      "locatedMedEstId": "establishment-uuid",
      "status": "OPERATIONAL",
      "medicalEstablishment": {
        "id": "establishment-uuid",
        "name": "Central Blood Bank",
        "address": "123 Main St"
      },
      "calibrationLogs": [...],
      "maintenanceLogs": [...]
    }
  ],
  "message": "Equipment retrieved successfully"
}
```

### 3. Response Transformation
The API service automatically extracts `data` from the response:
```typescript
transformResponse: (response) => response.data
```

### 4. Component Rendering
Component receives clean data array and renders table.

---

## TypeScript Types

The component uses strongly-typed interfaces from the API service:

```typescript
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

interface MedicalEstablishment {
  id: string;
  name: string;
  address: string;
}
```

---

## Styling

The component follows the project's Tailwind CSS styling conventions:

- **Table Container**: White background, rounded corners, border, shadow
- **Header**: Gray background (`bg-gray-50`)
- **Rows**: Hover effect (`hover:bg-gray-50`), dividers
- **Status Badges**: Color-coded with icons
- **Text Colors**: Consistent with project palette
- **Responsive**: Horizontal scroll on smaller screens

---

## Error Handling

### Network Errors
```typescript
if (isError) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
      <div className="flex items-center">
        <FaExclamationTriangle className="w-6 h-6 text-red-600 mr-3" />
        <div>
          <h3 className="text-lg font-semibold text-red-800">Error Loading Equipment</h3>
          <p className="text-sm text-red-600 mt-1">
            Failed to load equipment. Please try again later.
          </p>
        </div>
      </div>
    </div>
  );
}
```

### Backend Errors
If the backend returns an error status (400, 500, etc.), RTK Query will set `isError: true` and provide error details in the `error` object.

---

## Integration with Existing Pages

The component is already used in the main equipment page:
**Location:** `src/app/(dashboard)/blood_bank/equipment/page.tsx`

```tsx
import { useGetAllBloodEquipmentQuery } from '@/store/api/bloodEquipmentApi';

export default function EquipmentPage() {
  const { data: equipmentData = [], isLoading, isError } = useGetAllBloodEquipmentQuery();
  
  // Custom logic for metrics, search, filters
  // ...
}
```

You can use the reusable `BloodEquipmentList` component for simpler cases or create custom implementations for complex requirements.

---

## Testing the Component

### Test in Existing Page
Add to any page within the dashboard:

```tsx
// src/app/(dashboard)/blood_bank/test/page.tsx
"use client";

import { BloodEquipmentList } from '@/components';

export default function TestPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Test Blood Equipment List</h1>
      
      <div className="space-y-8">
        {/* All Equipment */}
        <section>
          <h2 className="text-xl font-semibold mb-4">All Equipment</h2>
          <BloodEquipmentList />
        </section>
        
        {/* Operational Only */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Operational Equipment</h2>
          <BloodEquipmentList statusFilter="OPERATIONAL" />
        </section>
        
        {/* Limited Display */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Top 3 Equipment</h2>
          <BloodEquipmentList limit={3} />
        </section>
      </div>
    </div>
  );
}
```

### Backend Requirements
Ensure your backend is running and accessible:

```bash
# Check backend is running
curl http://localhost:5000/api/blood-equipment

# Expected response:
{
  "success": true,
  "data": [...],
  "message": "Equipment retrieved successfully"
}
```

---

## Verification

### ✅ TypeScript Safety
- No `any` types used
- All props properly typed
- Error handling with type guards
- Interface imports from API service

### ✅ Linting
- No ESLint errors
- Follows project conventions
- Proper imports and exports

### ✅ Code Quality
- Clean, readable code
- Proper comments
- Consistent naming
- Reusable and maintainable

---

## Related Files

### API Service
- `src/store/api/bloodEquipmentApi.ts` - RTK Query API definitions

### Redux Store
- `src/store/store.ts` - Includes `bloodEquipmentApi` reducer

### Components
- `src/components/organisms/BloodEquipmentList.tsx` - Reusable list component
- `src/components/index.ts` - Component exports

### Pages
- `src/app/(dashboard)/blood_bank/equipment/page.tsx` - Main equipment page
- `src/app/(dashboard)/blood_bank/equipment/[id]/page.tsx` - Equipment detail page
- `src/app/(dashboard)/blood_bank/equipment/create/page.tsx` - Create equipment page

---

## Summary

The `BloodEquipmentList` component provides a production-ready, reusable solution for displaying blood equipment data with:

✅ Automatic API integration via RTK Query  
✅ Loading, error, and empty states  
✅ Flexible filtering and limiting options  
✅ Interactive row navigation  
✅ Consistent project styling  
✅ Full TypeScript type safety  
✅ Zero lint errors  

Simply import and use: `<BloodEquipmentList />` 🚀
