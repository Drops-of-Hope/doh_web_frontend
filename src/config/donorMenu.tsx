import {
  FaHome,
  FaUser,
  FaCog,
  FaBullhorn,
  FaSignOutAlt,
  FaClipboardList,
  FaHeart,
  FaCalendarAlt,
  FaHistory,
  FaAward,
  FaHeartbeat,
} from "react-icons/fa";

import { MenuItem } from '../../types';

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