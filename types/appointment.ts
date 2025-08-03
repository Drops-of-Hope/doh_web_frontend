export interface AppointmentSlot {
  id: string;                  
  startTime: string;           
  endTime: string;            
  tokenNumber: number;       
  isAvailable: boolean;       
  medicalEstablishmentId: string; 
}
