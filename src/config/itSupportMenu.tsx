import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaDatabase
} from "react-icons/fa";

import { MenuItem } from '../../types';

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
    name: 'System Management',
    icon: <FaDatabase size={20} />,
    active: pathname.includes('/it_support/system') || pathname.includes('/it_support/monitoring'),
    position: 'top',
  },
  {
    name: 'User Management',
    href: '/it_support/user_management',
    icon: <FaUsers size={20} />,
    active: pathname.includes('/it_support/user_management'),
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