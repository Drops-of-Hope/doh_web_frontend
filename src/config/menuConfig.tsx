import { usePathname } from "next/navigation";
import { useSession, signOut } from 'next-auth/react';
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
  FaHandPaper,
  FaExclamationCircle,
  FaClipboardList
} from "react-icons/fa";

export const useNavItems = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    const logoutUrl = "https://api.asgardeo.io/t/dropsofhope/oidc/logout";
    const postLogoutRedirectUrl = "http://localhost:3000";
  
    let fullLogoutUrl = `${logoutUrl}?post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUrl)}`;
    const extendedSession = session as { idToken?: string } | null;
    if (extendedSession?.idToken) {
      fullLogoutUrl += `&id_token_hint=${extendedSession.idToken}`;
    }
    window.location.href = fullLogoutUrl;
  };

  return [
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
      active: pathname.includes('/inventory') || pathname.includes('/blood-tests') || pathname.includes('/blood-requests') || pathname.includes('/transits'),
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
          href: '/blood-tests',
          icon: <FaFlask size={18} />,
          active: pathname.includes('/blood-tests'),
        },
        {
          name: 'Blood Requests',
          href: '/blood-requests',
          icon: <FaClipboardList size={18} />,
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
};