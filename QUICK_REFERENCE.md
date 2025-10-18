# Quick Reference: Health Vitals API Integration

## 🚀 Quick Start

### 1. Import the Component
```typescript
import { HealthVitalsDisplay } from "@/components";
```

### 2. Use in Your Page/Component
```typescript
<HealthVitalsDisplay appointmentId="8b65ddh3-0w95-4bda-bbce-2a5096bd5dh4" />
```

### 3. Test It
Navigate to: `/blood_bank/health-vitals-example`

---

## 📦 What Was Added

### Service Layer
**File:** `src/store/api/healthVitalsApi.ts`

**New Hook:** `useGetHealthVitalsByAppointmentIdQuery`

```typescript
const { data, isLoading, isError } = useGetHealthVitalsByAppointmentIdQuery(appointmentId);
```

### React Component
**File:** `src/components/organisms/HealthVitalsDisplay.tsx`

**Props:**
- `appointmentId: string` (required)

**Features:**
- ✅ Auto-fetches data on mount
- ✅ Loading spinner
- ✅ Error handling
- ✅ Empty state
- ✅ Responsive grid layout

---

## 🎯 API Endpoint

```
GET http://localhost:5000/api/health-vitals/{appointmentId}
```

**Response Type:**
```typescript
interface HealthVital[] {
  id: string;
  userId: string;
  appointmentId: string;
  weight: number;          // in kg
  bp: number;              // in mmHg
  cvsPulse: number;        // in bpm
  dateTime: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  appointment: {
    id: string;
    appointmentDate: string;
    scheduled: string;
  };
}
```

---

## 📋 Display Fields

The component displays:
- **Donor Name** (from `user.name`)
- **Appointment Date** (from `appointment.appointmentDate`)
- **Weight** (in kg)
- **Blood Pressure** (in mmHg)
- **CVS Pulse** (in bpm)

---

## 💡 Usage Examples

### Basic
```typescript
function MyComponent() {
  return <HealthVitalsDisplay appointmentId="abc-123" />;
}
```

### With Route Params
```typescript
"use client";
import { useParams } from "next/navigation";
import { HealthVitalsDisplay } from "@/components";

export default function Page() {
  const { appointmentId } = useParams();
  return <HealthVitalsDisplay appointmentId={appointmentId as string} />;
}
```

### Conditional Rendering
```typescript
{showVitals && <HealthVitalsDisplay appointmentId={id} />}
```

---

## 🧪 Example Pages

1. **Simple Example**
   - Path: `/blood_bank/health-vitals-example`
   - File: `src/app/(dashboard)/blood_bank/health-vitals-example/page.tsx`

2. **Advanced Example** (with appointment data)
   - Path: `/blood_bank/appointments/[appointmentId]/vitals`
   - File: `src/app/(dashboard)/blood_bank/appointments/[appointmentId]/vitals/page.tsx`

---

## ✅ Quality Checks

- ✅ No TypeScript errors
- ✅ No ESLint errors
- ✅ Follows project patterns
- ✅ Matches existing styling
- ✅ TypeScript-safe
- ✅ Production-ready

---

## 📁 Files Modified/Created

1. `src/store/api/healthVitalsApi.ts` (modified)
2. `src/components/organisms/HealthVitalsDisplay.tsx` (created)
3. `src/components/index.ts` (modified)
4. Example pages (created)

---

## 🔗 Related Files

- Service Layer: `src/store/api/*.ts`
- Similar Components: `src/components/organisms/MedicalEvaluation.tsx`
- Type Definitions: `types/*.ts`

---

**Ready to use! No additional configuration needed.** 🎉
