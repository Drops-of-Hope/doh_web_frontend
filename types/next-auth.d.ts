import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    decodedIdToken?: {
      sub?: string;
      birthdate?: string;
      amr?: string[];
      roles?: string[];
      given_name?: string;
      family_name?: string;
      exp?: number;
      org_name?: string;
      iat?: number;
      email?: string;
      org_handle?: string;
      username?: string;
      [key: string]: unknown;
    };
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      roles?: string[];
      groups?: string[];
      sub?: string;
      aud?: string;
      iss?: string;
    };
  }
}
