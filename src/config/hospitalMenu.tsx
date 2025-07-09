import {
  FaHome,
  FaUser,
  FaCog,
  FaFlask,
  FaBox,
  FaBullhorn,
  FaSignOutAlt,
  FaClinicMedical,
  FaTools,
  FaClipboardList,
} from "react-icons/fa";

import { MenuItem } from '../../types';

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
    active: pathname.includes('/hospital/inventory') || pathname.includes('/hospital/test') || pathname.includes('/hospital/requests'),
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
        href: '/hospital/test',
        icon: <FaFlask size={18} />,
        active: pathname.includes('/hospital/test'),
      },
      {
        name: 'Blood Requests',
        href: '/hospital/requests',
        icon: <FaClipboardList size={18} />,
        active: pathname.includes('/hospital/requests'),
      }
    ],
  },
  {
    name: 'Campaigns',
    href: '/hospital/campaigns',
    icon: <FaBullhorn size={20} />,
    active: pathname.includes('/hospital/campaigns'),
    position: 'top',
  },
  {
    name: 'Establishments',
    href: '/hospital/establishments',
    icon: <FaClinicMedical size={20} />,
    active: pathname.includes('/hospital/establishments'),
    position: 'top',
  },
  {
    name: 'Profile',
    href: '/hospital/profile',
    icon: <FaUser size={20} />,
    active: pathname.includes('/hospital/profile'),
    position: 'top',
  },
  {
    name: 'Settings',
    href: '/hospital/settings',
    icon: <FaCog size={20} />,
    active: pathname.includes('/hospital/settings'),
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