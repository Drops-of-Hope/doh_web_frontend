import NextAuth, { Session } from "next-auth";
import Asgardeo from "next-auth/providers/asgardeo";
import { jwtDecode } from "jwt-decode";

// Define types for decoded ID token
interface DecodedIdToken {
  roles?: string[];
  groups?: string[];
  sub?: string;
  aud?: string;
  iss?: string;
  given_name?: string;
  family_name?: string;
  [key: string]: unknown;
}

// Extend the token structure used by NextAuth
interface ExtendedToken {
  accessToken?: string;
  idToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  decodedIdToken?: DecodedIdToken;
  [key: string]: unknown;
}

// Extend the session object returned to client
interface ExtendedSession extends Session {
  accessToken?: string;
  idToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  decodedIdToken?: DecodedIdToken;
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

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Asgardeo({
      issuer: process.env.AUTH_ASGARDEO_ISSUER,
      authorization: {
        params: {
          scope: "openid email profile roles",
        },
      },
    }),
  ],

  callbacks: {
    async session({ session, token }): Promise<ExtendedSession> {
      const extendedToken = token as ExtendedToken;

      const extendedSession: ExtendedSession = {
        ...session,
        accessToken: extendedToken.accessToken,
        idToken: extendedToken.idToken,
        refreshToken: extendedToken.refreshToken,
        expiresAt: extendedToken.expiresAt,
        decodedIdToken: extendedToken.decodedIdToken,
      };

      if (extendedToken.decodedIdToken) {
        extendedSession.user = {
          ...session.user,
          // ✅ FIX: This line constructs the user's name, solving the redirect loop.
          name: `${extendedToken.decodedIdToken.given_name} ${extendedToken.decodedIdToken.family_name}`,
          roles: extendedToken.decodedIdToken.roles || [],
          groups: extendedToken.decodedIdToken.groups || [],
          sub: extendedToken.decodedIdToken.sub,
          aud: extendedToken.decodedIdToken.aud,
          iss: extendedToken.decodedIdToken.iss,
        };
      }

      return extendedSession;
    },

    async jwt({ token, account }): Promise<ExtendedToken> {
      const extendedToken: ExtendedToken = { ...token };

      if (account) {
        extendedToken.accessToken = account.access_token;
        extendedToken.idToken = account.id_token;
        extendedToken.refreshToken = account.refresh_token;
        extendedToken.expiresAt = account.expires_at;

        if (account.id_token) {
          try {
            const decodedIdToken: DecodedIdToken = jwtDecode(account.id_token);
            extendedToken.decodedIdToken = decodedIdToken;
          } catch (error) {
            console.error("Error decoding ID token:", error);
          }
        }
      }

      return extendedToken;
    },
  },
});