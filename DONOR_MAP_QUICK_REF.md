# 🗺️ Donor Map - Quick Reference

## API Endpoint
```
GET http://localhost:5000/api/donors/location-count
```

## Response Format
```json
{
  "success": true,
  "data": [
    { "district": "GAMPAHA", "donorCount": 1 },
    { "district": "COLOMBO", "donorCount": 1 }
  ],
  "message": "Donor counts by district retrieved successfully"
}
```

## Files Modified/Created

### Created
- ✅ `src/store/api/donorsApi.ts` - RTK Query API service
- ✅ `src/constants/districtCoordinates.ts` - District coordinates
- ✅ `DONOR_MAP_IMPLEMENTATION.md` - Full documentation

### Modified
- ✅ `src/store/store.ts` - Added donorsApi to Redux
- ✅ `src/components/organisms/MapComponent.tsx` - Updated to use API

## Usage

### Import Hook
```typescript
import { useGetDonorLocationCountsQuery } from '@/store/api/donorsApi';
```

### Fetch Data
```typescript
const { data, isLoading, isError } = useGetDonorLocationCountsQuery();
```

### Data Structure
```typescript
interface DonorLocationCount {
  district: string;
  donorCount: number;
}
```

## Map Component States

### 1. Loading Map
```
🔄 Loading map...
```

### 2. Loading Data
```
🔄 Loading donor data...
```

### 3. Error
```
❌ Failed to load donor location data
Error 500: Unable to fetch data from server
```

### 4. Empty
```
📭 No donor location data available
```

### 5. Success
```
🗺️ Map with markers showing donor counts per district
```

## Features

- ✅ Real-time data from API
- ✅ Automatic caching
- ✅ Loading states
- ✅ Error handling
- ✅ Empty state
- ✅ Dynamic marker sizing
- ✅ Clickable popups
- ✅ All 25 Sri Lankan districts supported

## Supported Districts

### Western Province
- Colombo, Gampaha, Kalutara

### Central Province
- Kandy, Matale, Nuwara Eliya

### Southern Province
- Galle, Matara, Hambantota

### Northern Province
- Jaffna, Kilinochchi, Mannar, Vavuniya, Mullaitivu

### Eastern Province
- Batticaloa, Ampara, Trincomalee

### North Western Province
- Kurunegala, Puttalam

### North Central Province
- Anuradhapura, Polonnaruwa

### Uva Province
- Badulla, Moneragala

### Sabaragamuwa Province
- Ratnapura, Kegalle

## Marker Sizing

```typescript
radius = Math.max(donorCount * 3, 8)
```

- 1 donor → 8px
- 5 donors → 15px
- 10 donors → 30px
- 20 donors → 60px

## Test

### Backend
```bash
curl http://localhost:5000/api/donors/location-count
```

### Frontend
```
http://localhost:3000/blood_bank/donors
```

## TypeScript

✅ No type errors
✅ No implicit any
✅ Fully typed interfaces
✅ Type-safe hooks

## Documentation

See `DONOR_MAP_IMPLEMENTATION.md` for complete details.
