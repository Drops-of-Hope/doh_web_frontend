import { MouseEventHandler } from "react";
import { ReactElement } from 'react';

export interface ButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconSpacing?: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface LogoProps {
  width?: number;
  height?: number;
  textSize?: string;
}

export interface SearchBarProps {
  title: string;         
}

export interface StatisticCardProps {
  title: string;
  count: number | string;
  icon: React.ReactNode;
  iconBgColor?: string;
}

export interface MetricCardProps {
  icon: React.ReactNode;
  iconBgColor?: string;
  heading: string;
  body: string;
  count: number;
}

export type DashboardType = 'blood_bank' | 'donor' | 'hospital' | 'it_support' | 'campaign_org';

export interface MenuItem {
  name: string;
  href?: string;
  icon: ReactElement;
  active: boolean;
  position: 'top' | 'bottom';
  onClick?: () => void;
  children?: Array<{
    name: string;
    href: string;
    icon: ReactElement;
    active: boolean;
  }>;
}

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

export interface TestimonialsProps {
  name: string;
  role: string;
  message: string;
  image: string;
  rating: number;
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