import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaExclamationCircle,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaDatabase,
  FaShieldAlt,
  FaTicketAlt,
  FaWrench,
  FaClipboard,
  FaTasks,
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