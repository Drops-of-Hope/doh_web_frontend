// Sri Lankan district coordinates for map visualization
// Coordinates are approximate center points of each district

export interface DistrictCoordinates {
  district: string;
  lat: number;
  lng: number;
  displayName: string;
}

export const DISTRICT_COORDINATES: Record<string, DistrictCoordinates> = {
  COLOMBO: { district: 'COLOMBO', lat: 6.9271, lng: 79.8612, displayName: 'Colombo' },
  GAMPAHA: { district: 'GAMPAHA', lat: 7.0840, lng: 80.0098, displayName: 'Gampaha' },
  KALUTARA: { district: 'KALUTARA', lat: 6.5854, lng: 79.9607, displayName: 'Kalutara' },
  KANDY: { district: 'KANDY', lat: 7.2906, lng: 80.6337, displayName: 'Kandy' },
  MATALE: { district: 'MATALE', lat: 7.4675, lng: 80.6234, displayName: 'Matale' },
  NUWARA_ELIYA: { district: 'NUWARA_ELIYA', lat: 6.9497, lng: 80.7891, displayName: 'Nuwara Eliya' },
  GALLE: { district: 'GALLE', lat: 6.0329, lng: 80.2168, displayName: 'Galle' },
  MATARA: { district: 'MATARA', lat: 5.9549, lng: 80.5550, displayName: 'Matara' },
  HAMBANTOTA: { district: 'HAMBANTOTA', lat: 6.1241, lng: 81.1185, displayName: 'Hambantota' },
  JAFFNA: { district: 'JAFFNA', lat: 9.6615, lng: 80.0255, displayName: 'Jaffna' },
  KILINOCHCHI: { district: 'KILINOCHCHI', lat: 9.3803, lng: 80.3753, displayName: 'Kilinochchi' },
  MANNAR: { district: 'MANNAR', lat: 8.9810, lng: 79.9044, displayName: 'Mannar' },
  VAVUNIYA: { district: 'VAVUNIYA', lat: 8.7542, lng: 80.4982, displayName: 'Vavuniya' },
  MULLAITIVU: { district: 'MULLAITIVU', lat: 9.2671, lng: 80.8142, displayName: 'Mullaitivu' },
  BATTICALOA: { district: 'BATTICALOA', lat: 7.7102, lng: 81.7088, displayName: 'Batticaloa' },
  AMPARA: { district: 'AMPARA', lat: 7.2979, lng: 81.6725, displayName: 'Ampara' },
  TRINCOMALEE: { district: 'TRINCOMALEE', lat: 8.5874, lng: 81.2152, displayName: 'Trincomalee' },
  KURUNEGALA: { district: 'KURUNEGALA', lat: 7.4818, lng: 80.3609, displayName: 'Kurunegala' },
  PUTTALAM: { district: 'PUTTALAM', lat: 8.0362, lng: 79.8283, displayName: 'Puttalam' },
  ANURADHAPURA: { district: 'ANURADHAPURA', lat: 8.3114, lng: 80.4037, displayName: 'Anuradhapura' },
  POLONNARUWA: { district: 'POLONNARUWA', lat: 7.9403, lng: 81.0188, displayName: 'Polonnaruwa' },
  BADULLA: { district: 'BADULLA', lat: 6.9934, lng: 81.0550, displayName: 'Badulla' },
  MONERAGALA: { district: 'MONERAGALA', lat: 6.8728, lng: 81.3507, displayName: 'Moneragala' },
  RATNAPURA: { district: 'RATNAPURA', lat: 6.6828, lng: 80.4126, displayName: 'Ratnapura' },
  KEGALLE: { district: 'KEGALLE', lat: 7.2513, lng: 80.3464, displayName: 'Kegalle' },
};

/**
 * Get coordinates for a district by name
 * @param districtName - The district name (case-insensitive)
 * @returns DistrictCoordinates or undefined if not found
 */
export function getDistrictCoordinates(districtName: string): DistrictCoordinates | undefined {
  const normalizedName = districtName.toUpperCase().replace(/\s+/g, '_');
  return DISTRICT_COORDINATES[normalizedName];
}

/**
 * Get all district names
 * @returns Array of district names
 */
export function getAllDistricts(): string[] {
  return Object.keys(DISTRICT_COORDINATES);
}
