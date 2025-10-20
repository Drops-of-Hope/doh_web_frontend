# 🚀 Blood Equipment List Component - Quick Reference

## Import
```tsx
import { BloodEquipmentList } from '@/components';
```

## Basic Usage
```tsx
<BloodEquipmentList />
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `statusFilter` | `'all' \| 'OPERATIONAL' \| 'MAINTENANCE' \| 'DECOMMISSIONED'` | `'all'` | Filter by status |
| `limit` | `number` | `undefined` | Max items to show |
| `showActions` | `boolean` | `true` | Show actions column |
| `enableRowClick` | `boolean` | `true` | Enable row navigation |

## Examples

### Show All Equipment
```tsx
<BloodEquipmentList />
```

### Show Operational Only
```tsx
<BloodEquipmentList statusFilter="OPERATIONAL" />
```

### Show Top 5
```tsx
<BloodEquipmentList limit={5} />
```

### Dashboard Widget (Compact)
```tsx
<BloodEquipmentList 
  limit={5} 
  showActions={false} 
/>
```

### Read-Only Report
```tsx
<BloodEquipmentList 
  showActions={false}
  enableRowClick={false}
/>
```

## API Endpoint
```
GET http://localhost:5000/api/blood-equipment
```

## Displays
- ✅ Serial Number
- ✅ Equipment Type  
- ✅ Manufacturer
- ✅ Model
- ✅ Medical Establishment Name
- ✅ Status (color badge)
- ✅ Purchase Date

## States Handled
- 🔄 Loading
- ❌ Error
- 📭 Empty
- ✅ Success

## Demo Page
```
http://localhost:3000/blood_bank/equipment-demo
```

## Files
- **Component:** `src/components/organisms/BloodEquipmentList.tsx`
- **API:** `src/store/api/bloodEquipmentApi.ts`
- **Demo:** `src/app/(dashboard)/blood_bank/equipment-demo/page.tsx`

## Full Documentation
See: `BLOOD_EQUIPMENT_LIST_COMPONENT.md`

---

**That's it!** Import → Use → Done! 🎉
