import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaSearch
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
    name: 'Explore',
    href: '/donor/explore',
    icon: <FaSearch size={20} />,
    active: pathname.includes('/donor/explore'),
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