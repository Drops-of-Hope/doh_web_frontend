// types/request.ts

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
  hospital: string;
  contactDetails: ContactDetails;
  priority: 'High' | 'Medium' | 'Low';
  requestTime: string;
  reason: string;
  status?: 'pending' | 'accepted' | 'rejected';
  rejectionReason?: string;
}

export interface AvailabilityData {
  available: boolean;
  currentStock: number;
  requestedQuantity: number;
  bloodType: string;
  estimatedDeliveryTime: string;
}

export type RequestStatus = 'pending' | 'accepted' | 'rejected';

export interface RequestDetailsProps {
  requestId?: string;
}

export interface ActionButtonsProps {
  requestStatus: RequestStatus;
  onCheckAvailability: () => void;
  onAccept: () => void;
  onReject: () => void;
  hasCheckedAvailability: boolean;
}

export interface AvailabilityCheckerProps {
  availabilityData: AvailabilityData | null;
  onClose: () => void;
}

export interface RejectionSectionProps {
  onReject: (reason: string) => void;
}

export interface ButtonProps {
  title: string;
  containerStyles: string;
  handleClick: () => void;
  leftIcon?: React.ReactNode;
  iconSpacing?: string;
  disabled?: boolean;
}