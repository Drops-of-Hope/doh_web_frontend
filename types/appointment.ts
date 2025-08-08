export interface AppointmentSlot {
  id: string;                  
  startTime: string;           
  endTime: string;            
  tokenNumber: number;       
  isAvailable: boolean;       
  medicalEstablishmentId: string; 
}

export type AppointmentStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
  id: string;
  donorId: string;
  bdfId?: string;
  slotId: string;
  scheduled: AppointmentStatus;
  appointmentDate: string; 
  medicalEstablishmentId: string;

  donor?: {
    id: string;
    name: string;
    email: string;
    bloodGroup: string;
  };
  slot?: {
    id: string;
    startTime: string; 
    endTime: string;   
  };
  medicalEstablishment?: {
    id: string;
    name: string;
    address: string;
  };
}

