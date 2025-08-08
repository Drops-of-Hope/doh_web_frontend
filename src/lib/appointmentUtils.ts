import { Appointment } from "../../types";

// Map backend blood group format to display format
export const mapBloodGroupToDisplay = (backendBloodGroup: string | undefined): string => {
  if (!backendBloodGroup) return '';
  
  const mapping: { [key: string]: string } = {
    'A_POSITIVE': 'A+',
    'A_NEGATIVE': 'A-',
    'B_POSITIVE': 'B+',
    'B_NEGATIVE': 'B-',
    'AB_POSITIVE': 'AB+',
    'AB_NEGATIVE': 'AB-',
    'O_POSITIVE': 'O+',
    'O_NEGATIVE': 'O-'
  };
  
  return mapping[backendBloodGroup] || backendBloodGroup;
};

export const getStatusColor = (status: string) => {
  return status === 'Confirmed'
    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
    : 'bg-amber-100 text-amber-700 border border-amber-200';
};

export const getBloodGroupColor = (bloodGroup: string) => {
  // Convert to display format first
  const displayBloodGroup = mapBloodGroupToDisplay(bloodGroup);
  
  switch (displayBloodGroup) {
    case 'O+':
    case 'O-':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'A+':
    case 'A-':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'B+':
    case 'B-':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'AB+':
    case 'AB-':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const formatDisplayDate = (dateString: string | undefined): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const sortAppointments = (data: Appointment[], sortBy: string): Appointment[] => {
  return [...data].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        // If donor missing, treat as empty string for comparison
        const nameA = a.donor?.name ?? '';
        const nameB = b.donor?.name ?? '';
        return nameA.localeCompare(nameB);
       
      case 'bloodGroup':
        const bloodA = mapBloodGroupToDisplay(a.donor?.bloodGroup) ?? '';
        const bloodB = mapBloodGroupToDisplay(b.donor?.bloodGroup) ?? '';
        return bloodA.localeCompare(bloodB);
       
      case 'date':
      default:
        const dateA = a.appointmentDate ? new Date(a.appointmentDate).getTime() : 0;
        const dateB = b.appointmentDate ? new Date(b.appointmentDate).getTime() : 0;
        return dateA - dateB;
    }
  });
};