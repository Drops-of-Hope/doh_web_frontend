import { usePathname } from "next/navigation";
import { useSession, signOut } from 'next-auth/react';
import {
  DashboardType,
  MenuItem,
  getBloodBankMenu,
  getDonorMenu,
  getHospitalMenu,
  getItSupportMenu,
  getCampaignOrgMenu
} from '@/config';

export const useNavItems = (dashboardType: DashboardType): MenuItem[] => {
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

  // Return the appropriate menu based on dashboard type
  switch (dashboardType) {
    case 'donor':
      return getDonorMenu(pathname, handleSignOut);
    case 'hospital':
      return getHospitalMenu(pathname, handleSignOut);
    case 'it_support':
      return getItSupportMenu(pathname, handleSignOut);
    case 'campaign_org':
      return getCampaignOrgMenu(pathname, handleSignOut);
    case 'blood_bank':
    default:
      return getBloodBankMenu(pathname, handleSignOut);
  }
};