import {
  FaHome,
  FaUser,
  FaCog,
  FaFlask,
  FaBox,
  FaTruck,
  FaBullhorn,
  FaSignOutAlt,
  FaClinicMedical,
  FaTools,
  FaHandPaper,
  FaExclamationCircle,
  FaClipboardList,
  FaHeart,
  FaCalendarAlt,
  FaHistory,
  FaAward,
  FaUserMd,
  FaAmbulance,
  FaBed,
  FaHeartbeat,
  FaUsers,
  FaChartBar,
  FaDatabase,
  FaShieldAlt,
  FaTicketAlt,
  FaPhoneAlt,
  FaWrench,
  FaClipboard,
  FaMapMarkerAlt,
  FaTasks,
  FaUserPlus,
  FaBuilding,
  FaFlag
} from "react-icons/fa";

export type DashboardType = 'blood_bank' | 'donor' | 'hospital' | 'it_support' | 'campaign_org';

// Define the menu item interface with optional children
export interface MenuItem {
  name: string;
  href?: string;
  icon: React.ReactElement;
  active: boolean;
  position: 'top' | 'bottom';
  onClick?: () => void;
  children?: Array<{
    name: string;
    href: string;
    icon: React.ReactElement;
    active: boolean;
  }>;
}

// Blood Bank Menu Configuration
export const getBloodBankMenu = (pathname: string, handleSignOut: () => void): MenuItem[] => [
  {
    name: 'Home',
    href: '/blood_bank',
    icon: <FaHome size={20} />,
    active: pathname === '/blood_bank',
    position: 'top',
  },
  {
    name: 'Operations',
    icon: <FaTools size={20} />,
    active: pathname.includes('/inventory') || pathname.includes('/blood-tests') || pathname.includes('/blood-requests') || pathname.includes('/transits'),
    position: 'top',
    children: [
      {
        name: 'Inventory',
        href: '/blood_bank/inventory',
        icon: <FaBox size={18} />,
        active: pathname.includes('/blood_bank/inventory'),
      },
      {
        name: 'Blood Tests',
        href: '/blood_bank/test',
        icon: <FaFlask size={18} />,
        active: pathname.includes('/blood_bank/test'),
      },
      {
        name: 'Blood Requests',
        href: '/blood_bank/blood-requests',
        icon: <FaClipboardList size={18} />,
        active: pathname.includes('/blood_bank/blood-requests'),
      },
      {
        name: 'Transits',
        href: '/blood_bank/transits',
        icon: <FaTruck size={18} />,
        active: pathname.includes('/blood_bank/transits'),
      },
    ],
  },
  {
    name: 'Campaigns',
    href: '/blood_bank/campaigns',
    icon: <FaBullhorn size={20} />,
    active: pathname.includes('/blood_bank/campaigns'),
    position: 'top',
  },
  {
    name: 'Establishments',
    href: '/blood_bank/medical-establishments',
    icon: <FaClinicMedical size={20} />,
    active: pathname.includes('/blood_bank/medical-establishments'),
    position: 'top',
  },
  {
    name: 'Profile',
    href: '/blood_bank/profile',
    icon: <FaUser size={20} />,
    active: pathname.includes('/blood_bank/profile'),
    position: 'top',
  },
  {
    name: 'Settings',
    href: '/blood_bank/settings',
    icon: <FaCog size={20} />,
    active: pathname.includes('/blood_bank/settings'),
    position: 'top',
  },
  {
    name: 'Logout',
    icon: <FaSignOutAlt size={20} />,
    active: pathname.includes('/logout'),
    position: 'bottom',
    onClick: handleSignOut,
  }
];

// Donor Menu Configuration
export const getDonorMenu = (pathname: string, handleSignOut: () => void): MenuItem[] => [
  {
    name: 'Home',
    href: '/donor',
    icon: <FaHome size={20} />,
    active: pathname === '/donor',
    position: 'top',
  },
  {
    name: 'Donate',
    icon: <FaHeart size={20} />,
    active: pathname.includes('/donor/donate') || pathname.includes('/donor/appointments') || pathname.includes('/donor/eligibility'),
    position: 'top',
    children: [
      {
        name: 'Schedule Appointment',
        href: '/donor/appointments',
        icon: <FaCalendarAlt size={18} />,
        active: pathname.includes('/donor/appointments'),
      },
      {
        name: 'Eligibility Check',
        href: '/donor/eligibility',
        icon: <FaClipboardList size={18} />,
        active: pathname.includes('/donor/eligibility'),
      },
      {
        name: 'Find Campaigns',
        href: '/donor/campaigns',
        icon: <FaBullhorn size={18} />,
        active: pathname.includes('/donor/campaigns'),
      },
    ],
  },
  {
    name: 'My Donations',
    href: '/donor/history',
    icon: <FaHistory size={20} />,
    active: pathname.includes('/donor/history'),
    position: 'top',
  },
  {
    name: 'Health Records',
    href: '/donor/health',
    icon: <FaHeartbeat size={20} />,
    active: pathname.includes('/donor/health'),
    position: 'top',
  },
  {
    name: 'Achievements',
    href: '/donor/achievements',
    icon: <FaAward size={20} />,
    active: pathname.includes('/donor/achievements'),
    position: 'top',
  },
  {
    name: 'Profile',
    href: '/donor/profile',
    icon: <FaUser size={20} />,
    active: pathname.includes('/donor/profile'),
    position: 'top',
  },
  {
    name: 'Settings',
    href: '/donor/settings',
    icon: <FaCog size={20} />,
    active: pathname.includes('/donor/settings'),
    position: 'top',
  },
  {
    name: 'Logout',
    icon: <FaSignOutAlt size={20} />,
    active: pathname.includes('/logout'),
    position: 'bottom',
    onClick: handleSignOut,
  }
];

// Hospital Menu Configuration
export const getHospitalMenu = (pathname: string, handleSignOut: () => void): MenuItem[] => [
  {
    name: 'Home',
    href: '/hospital',
    icon: <FaHome size={20} />,
    active: pathname === '/hospital',
    position: 'top',
  },
  {
    name: 'Operations',
    icon: <FaTools size={20} />,
    active: pathname.includes('/hospital/inventory') || pathname.includes('/blood-tests') || pathname.includes('/blood-requests') || pathname.includes('/transits'),
    position: 'top',
    children: [
      {
        name: 'Inventory',
        href: '/hospital/inventory',
        icon: <FaBox size={18} />,
        active: pathname.includes('/hospital/inventory'),
      },
      {
        name: 'Blood Tests',
        href: '/blood_bank/test',
        icon: <FaFlask size={18} />,
        active: pathname.includes('/blood_bank/test'),
      },
      {
        name: 'Blood Requests',
        href: '/blood_bank/blood-requests',
        icon: <FaClipboardList size={18} />,
        active: pathname.includes('/blood_bank/blood-requests'),
      },
      {
        name: 'Transits',
        href: '/blood_bank/transits',
        icon: <FaTruck size={18} />,
        active: pathname.includes('/blood_bank/transits'),
      },
    ],
  },
  {
    name: 'Campaigns',
    href: '/blood_bank/campaigns',
    icon: <FaBullhorn size={20} />,
    active: pathname.includes('/blood_bank/campaigns'),
    position: 'top',
  },
  {
    name: 'Establishments',
    href: '/blood_bank/medical-establishments',
    icon: <FaClinicMedical size={20} />,
    active: pathname.includes('/blood_bank/medical-establishments'),
    position: 'top',
  },
  {
    name: 'Profile',
    href: '/blood_bank/profile',
    icon: <FaUser size={20} />,
    active: pathname.includes('/blood_bank/profile'),
    position: 'top',
  },
  {
    name: 'Settings',
    href: '/blood_bank/settings',
    icon: <FaCog size={20} />,
    active: pathname.includes('/blood_bank/settings'),
    position: 'top',
  },
  {
    name: 'Logout',
    icon: <FaSignOutAlt size={20} />,
    active: pathname.includes('/logout'),
    position: 'bottom',
    onClick: handleSignOut,
  }
];

// IT Support Menu Configuration
export const getItSupportMenu = (pathname: string, handleSignOut: () => void): MenuItem[] => [
  {
    name: 'Home',
    href: '/it_support',
    icon: <FaHome size={20} />,
    active: pathname === '/it_support',
    position: 'top',
  },
  {
    name: 'Ticket Management',
    icon: <FaTicketAlt size={20} />,
    active: pathname.includes('/it_support/tickets') || pathname.includes('/it_support/assignments'),
    position: 'top',
    children: [
      {
        name: 'Active Tickets',
        href: '/it_support/tickets/active',
        icon: <FaExclamationCircle size={18} />,
        active: pathname.includes('/it_support/tickets/active'),
      },
      {
        name: 'All Tickets',
        href: '/it_support/tickets',
        icon: <FaClipboardList size={18} />,
        active: pathname === '/it_support/tickets',
      },
      {
        name: 'Assignments',
        href: '/it_support/assignments',
        icon: <FaTasks size={18} />,
        active: pathname.includes('/it_support/assignments'),
      },
    ],
  },
  {
    name: 'System Management',
    icon: <FaDatabase size={20} />,
    active: pathname.includes('/it_support/system') || pathname.includes('/it_support/monitoring'),
    position: 'top',
    children: [
      {
        name: 'System Status',
        href: '/it_support/system/status',
        icon: <FaShieldAlt size={18} />,
        active: pathname.includes('/it_support/system/status'),
      },
      {
        name: 'Monitoring',
        href: '/it_support/monitoring',
        icon: <FaChartBar size={18} />,
        active: pathname.includes('/it_support/monitoring'),
      },
      {
        name: 'Maintenance',
        href: '/it_support/maintenance',
        icon: <FaWrench size={18} />,
        active: pathname.includes('/it_support/maintenance'),
      },
    ],
  },
  {
    name: 'User Management',
    href: '/it_support/users',
    icon: <FaUsers size={20} />,
    active: pathname.includes('/it_support/users'),
    position: 'top',
  },
  {
    name: 'Knowledge Base',
    href: '/it_support/knowledge-base',
    icon: <FaClipboard size={20} />,
    active: pathname.includes('/it_support/knowledge-base'),
    position: 'top',
  },
  {
    name: 'Profile',
    href: '/it_support/profile',
    icon: <FaUser size={20} />,
    active: pathname.includes('/it_support/profile'),
    position: 'top',
  },
  {
    name: 'Settings',
    href: '/it_support/settings',
    icon: <FaCog size={20} />,
    active: pathname.includes('/it_support/settings'),
    position: 'top',
  },
  {
    name: 'Logout',
    icon: <FaSignOutAlt size={20} />,
    active: pathname.includes('/logout'),
    position: 'bottom',
    onClick: handleSignOut,
  }
];

// Campaign Organization Menu Configuration
export const getCampaignOrgMenu = (pathname: string, handleSignOut: () => void): MenuItem[] => [
  {
    name: 'Home',
    href: '/campaign_org',
    icon: <FaHome size={20} />,
    active: pathname === '/campaign_org',
    position: 'top',
  },
  {
    name: 'Campaigns',
    href: '/campaign_org/campaign',
    icon: <FaBullhorn size={20} />,
    active: pathname === '/campaign_org/campaign',
    position: 'top',
  },
  {
    name: 'Profile',
    href: '/campaign_org/profile',
    icon: <FaBuilding size={20} />,
    active: pathname.includes('/campaign_org/profile'),
    position: 'top',
  },
  {
    name: 'Settings',
    href: '/campaign_org/settings',
    icon: <FaCog size={20} />,
    active: pathname.includes('/campaign_org/settings'),
    position: 'top',
  },
  {
    name: 'Logout',
    icon: <FaSignOutAlt size={20} />,
    active: pathname.includes('/logout'),
    position: 'bottom',
    onClick: handleSignOut,
  }
];