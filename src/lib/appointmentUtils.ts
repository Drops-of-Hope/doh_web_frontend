// Define the Appointment interface
export interface Appointment {
  id: number;
  name: string;
  bloodGroup: string;
  date: string;
  time: string;
  contact: string;
  location: string;
  status: string;
}

export const getStatusColor = (status: string) => {
  return status === 'Confirmed'
    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
    : 'bg-amber-100 text-amber-700 border border-amber-200';
};

export const getBloodGroupColor = (bloodGroup: string) => {
  switch (bloodGroup) {
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

export const formatDisplayDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const sortAppointments = (data: Appointment[], sortBy: string): Appointment[] => {
  return [...data].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'bloodGroup':
        return a.bloodGroup.localeCompare(b.bloodGroup);
      case 'date':
      default:
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });
};