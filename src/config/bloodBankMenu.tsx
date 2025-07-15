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
  FaTint,
} from "react-icons/fa";

import { MenuItem } from '../../types';

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
    active:
      pathname.includes('/inventory') ||
      pathname.includes('/blood_bank/test') ||
      pathname.includes('/blood_bank/requests') ||
      pathname.includes('/transits') ||
      pathname.includes('/appointments'),
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
        href: '/blood_bank/requests',
        icon: <FaClipboardList size={18} />,
        active: pathname.includes('/blood_bank/requests'),
      }
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
    href: '/blood_bank/establishments',
    icon: <FaClinicMedical size={20} />,
    active: pathname.includes('/blood_bank/establishments'),
    position: 'top',
  },
  {
    name: 'Donors',
    href: '/blood_bank/donors',
    icon: <FaTint size={20} />,
    active: pathname.includes('/blood_bank/donors'),
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
