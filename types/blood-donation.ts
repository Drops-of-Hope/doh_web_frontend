export interface FormData {
  experiencedAilment: string;
  ailmentDescription?: string;
  medicallyAdvised: string;
  readInformationLeaflet: string;
  feelingWellToday: string;
  hasDiseasesConditions: string;
  selectedDiseases: string[];
  takingMedication: string;
  undergoneSurgery: string;
  surgeryDescription?: string;
  heavyWorkAfterDonation: string;
  isPregnantOrBreastfeeding: string;
  childbirthOrAbortion: string;
  hadJaundiceHepatitis: string;
  jaundiceHepatitisDetails?: string;
  hadTuberculosisTyphoid: string;
  tuberculosisTyphoidDetails?: string;
  receivedVaccinations: string;
  vaccinationDetails?: string;
  hadTattooOrPiercing: string;
  tattooOrPiercingDetails?: string;
  beenImprisoned: string;
  imprisonmentDetails?: string;
  travelledAbroad: string;
  travelDetails?: string;
  receivedBloodProducts: string;
  bloodProductsDetails?: string;
  hadMalaria: string;
  malariaDetails?: string;
}

export interface PreScreeningFormDisplayProps {
  formData: FormData;
}

export interface EvaluationData {
  donorFitness: 'fit' | 'unfit' | '';
  fitnessReason: string;
  
  weight: string;
  
  systolicBP: string;
  diastolicBP: string;
  pulseRate: string;
  temperature: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface TestResult {
  id: string;
  name: string;
  isCompulsory: boolean;
  status: 'pending' | 'pass' | 'fail';
  result?: string;
}

export interface BloodUnit {
  id: string;
  bloodGroup: string;
  donationLocation: string;
  donationDate: string;
  componentType: string;
  volume: string;
  status: 'pending' | 'pass' | 'fail';
}

export interface BloodRequestFormData {
  bloodType: string;
  unitsRequired: string;
  urgencyLevel: string;
  reasonForRequest: string;
  specificPatientNeed: string;
  requestedDeliveryTime: string;
  requestFrom: string;
  contactNumber: string;
  additionalNotes: string;
}

// Blood Type Request Interface
export interface BloodTypeRequest {
  id: string;
  bloodType: string;
  unitsRequired: string;
}

// Enhanced Blood Request Form Data
export interface EnhancedBloodRequestFormData extends Omit<BloodRequestFormData, 'bloodType' | 'unitsRequired'> {
  bloodTypeRequests: BloodTypeRequest[];
  notifyDonors: boolean;
}

// Form Validation Errors
export interface FormErrors {
  urgencyLevel?: string;
  reasonForRequest?: string;
  requestedDeliveryTime?: string;
  requestFrom?: string;
  contactNumber?: string;
  specificPatientNeed?: string;
  additionalNotes?: string;
  bloodTypeRequests?: { [key: string]: { bloodType?: string; unitsRequired?: string } };
}

// Urgency Level Option
export interface UrgencyLevel {
  value: string;
  label: string;
  color: string;
}

// Reason for Request Option
export interface ReasonForRequest {
  value: string;
  label: string;
}

// Blood Bank Option
export interface BloodBank {
  value: string;
  label: string;
  location: string;
}

// Constants
export const urgencyLevels: UrgencyLevel[] = [
  { value: 'routine', label: 'Routine', color: 'text-green-600 bg-green-50' },
  { value: 'emergency', label: 'Emergency', color: 'text-red-600 bg-red-50' }
];

export const reasonsForRequest: ReasonForRequest[] = [
  { value: 'low_inventory', label: 'Low Inventory' },
  { value: 'emergency', label: 'Emergency' },
  { value: 'specific_patient', label: 'Specific Patient Need' }
];

export const nearbyBloodBanks: BloodBank[] = [
  { value: 'city_general', label: 'City General Hospital Blood Bank', location: 'Downtown District' },
  { value: 'national_hospital', label: 'National Hospital Blood Bank', location: 'Borella' },
  { value: 'private_hospital', label: 'Private Hospital Blood Bank', location: 'Nugegoda' },
  { value: 'teaching_hospital', label: 'Teaching Hospital Blood Bank', location: 'Colombo 08' }
];

// Component Props Interfaces
export interface RequestFormSectionsProps {
  formData: EnhancedBloodRequestFormData;
  errors: FormErrors;
  onInputChange: (field: keyof EnhancedBloodRequestFormData, value: string | boolean) => void;
  urgencyLevels: UrgencyLevel[];
  reasonsForRequest: ReasonForRequest[];
  nearbyBloodBanks: BloodBank[];
}

export interface BloodTypeRequestsSectionProps {
  bloodTypeRequests: BloodTypeRequest[];
  errors: FormErrors;
  onBloodTypeRequestChange: (id: string, field: 'bloodType' | 'unitsRequired', value: string) => void;
  onAddBloodTypeRequest: () => void;
  onRemoveBloodTypeRequest: (id: string) => void;
}

export interface ContactDetails {
  phone: string;
  email: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: string;
  quantity: number;
  requestedDate: string;
  deadline: string;
  hospital: string;
  contactDetails: ContactDetails;
  priority: 'High' | 'Medium' | 'Low';
  requestTime: string;
  reason: string;
}

export interface AvailabilityData {
  available: boolean;
  currentStock: number;
  requestedQuantity: number;
  bloodType: string;
  estimatedDeliveryTime: string;
}

export type RequestStatus = 'pending' | 'accepted' | 'rejected';

export interface TransitInfo {
  from: string;
  to: string;
  estimatedDelivery: string;
  bloodGroup: string;
  units: number;
}