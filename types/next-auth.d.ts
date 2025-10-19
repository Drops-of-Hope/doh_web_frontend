import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// The decoded ID token structure you defined
interface DecodedIdToken {
  sub?: string;
  birthdate?: string;
  amr?: string[];
  roles?: string[];
  groups?: string[];
  given_name?: string;
  family_name?: string;
  exp?: number;
  org_name?: string;
  iat?: number;
  email?: string;
  org_handle?: string;
  username?: string;
  aud?: string;
  iss?: string;
  [key: string]: unknown;
}

declare module "next-auth" {
  /**
   * Extend the built-in Session type
   */
  interface Session {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    decodedIdToken?: DecodedIdToken;
    user?: {
      roles?: string[];
      groups?: string[];
      sub?: string;
      aud?: string;
      iss?: string;
    } & DefaultSession["user"];
  }

  /**
   * Extend the built-in User type
   */
  interface User extends DefaultUser {
    // This can be extended if you add custom properties to the `user`
    // object in the `profile` callback, but is not needed for your current setup.
  }
}

declare module "next-auth/jwt" {
  /**
   * Extend the built-in JWT type
   */
  interface JWT {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    decodedIdToken?: DecodedIdToken;
  }
}