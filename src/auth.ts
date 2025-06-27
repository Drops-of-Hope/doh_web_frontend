import NextAuth from "next-auth"
import Asgardeo from "next-auth/providers/asgardeo"
import { jwtDecode } from "jwt-decode"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Asgardeo({
    issuer: process.env.AUTH_ASGARDEO_ISSUER,     
    authorization: {
        params: {
          // Specify your desired scopes here
          scope: "openid email profile roles",
        },
      },
  })],
  
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      console.log("Session:", session);
      console.log("Token:", token);
      
      // Cast session to any to bypass TypeScript errors
      const extendedSession = session as any;
      
      // Add decoded JWT data and tokens to session
      if ((token as any).accessToken) {
        extendedSession.accessToken = (token as any).accessToken;
      }
      
      if ((token as any).idToken) {
        extendedSession.idToken = (token as any).idToken;
      }
      
      if ((token as any).refreshToken) {
        extendedSession.refreshToken = (token as any).refreshToken;
      }
      
      if ((token as any).expiresAt) {
        extendedSession.expiresAt = (token as any).expiresAt;
      }
      
      // Add decoded ID token data to session
      if ((token as any).decodedIdToken) {
        extendedSession.decodedIdToken = (token as any).decodedIdToken;
        
        // You can also add specific claims directly to session for easier access
        extendedSession.user = {
          ...session.user,
          roles: (token as any).decodedIdToken.roles || [],
          groups: (token as any).decodedIdToken.groups || [],
          // Add any other claims you need
          sub: (token as any).decodedIdToken.sub,
          aud: (token as any).decodedIdToken.aud,
          iss: (token as any).decodedIdToken.iss,
        };
      }
      
      return extendedSession;
    },
    
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        console.log("account found");
        
        // Cast token to any to bypass TypeScript errors
        const extendedToken = token as any;
        
        extendedToken.accessToken = account.access_token;
        extendedToken.idToken = account.id_token;
        extendedToken.refreshToken = account.refresh_token;
        extendedToken.expiresAt = account.expires_at;
        
        console.log("access token from asgardeo: ", account.access_token);
        console.log("id token from asgardeo", account.id_token);
        
        // Decode the ID token
        if (account.id_token) {
          try {
            const decodedIdToken = jwtDecode(account.id_token);
            extendedToken.decodedIdToken = decodedIdToken;
            console.log("Decoded ID Token:", decodedIdToken);
          } catch (error) {
            console.error("Error decoding ID token:", error);
          }
        }
        
        return extendedToken;
      }
      
      return token;
    }
  }
})