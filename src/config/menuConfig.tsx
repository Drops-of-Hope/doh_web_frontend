import { usePathname } from "next/navigation";
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
} from "react-icons/fa";

export const useNavItems = () => {
  const pathname = usePathname();

  return [
    {
      name: 'Home',
      href: '/blood_bank',
      icon: <FaHome size={20} />,
      active: pathname === '/',
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
          href: '/inventory',
          icon: <FaBox size={18} />,
          active: pathname.includes('/inventory'),
        },
        {
          name: 'Blood Tests',
          href: '/blood-tests',
          icon: <FaFlask size={18} />,
          active: pathname.includes('/blood-tests'),
        },
        {
          name: 'Blood Requests',
          href: '/blood-requests',
          icon: <FaTruck size={18} />,
          active: pathname.includes('/blood-requests'),
        },
        {
          name: 'Transits',
          href: '/transits',
          icon: <FaTruck size={18} />,
          active: pathname.includes('/transits'),
        },
      ],
    },
    {
      name: 'Campaigns',
      href: '/campaigns',
      icon: <FaBullhorn size={20} />,
      active: pathname.includes('/campaigns'),
      position: 'top',
    },
    {
      name: 'Establishments',
      icon: <FaClinicMedical size={20} />,
      active: pathname.includes('/medical-establishments'),
      position: 'top',
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: <FaUser size={20} />,
      active: pathname.includes('/profile'),
      position: 'top',
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: <FaCog size={20} />,
      active: pathname.includes('/settings'),
      position: 'top',
    },
    {
      name: 'Logout',
      href: '/logout',
      icon: <FaSignOutAlt size={20} />,
      active: pathname.includes('/logout'),
      position: 'bottom',
    }
  ];
};