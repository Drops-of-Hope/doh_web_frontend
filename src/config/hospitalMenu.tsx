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