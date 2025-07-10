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
    name: 'Profile',
    href: '/donor/profile',
    icon: <FaUser size={20} />,
    active: pathname.includes('/donor/profile'),
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