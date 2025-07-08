import {
  FaHome,
  FaCog,
  FaBullhorn,
  FaSignOutAlt,
  FaBuilding,
} from "react-icons/fa";

import { MenuItem } from '../../types';

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