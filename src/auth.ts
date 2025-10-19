import NextAuth from "next-auth";
import Asgardeo from "next-auth/providers/asgardeo";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Asgardeo({
      // The client ID and secret are often read automatically from environment variables
      // AUTH_ASGARDEO_CLIENT_ID and AUTH_ASGARDEO_CLIENT_SECRET
      issuer: process.env.AUTH_ASGARDEO_ISSUER,
      authorization: {
        params: {
          scope: "openid email profile roles", // Ensure 'profile' and 'roles' are requested
        },
      },
      // ✅ FIX: Add this profile callback to correctly create the user object.
      // This is the main fix for the missing user.name issue.
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture ?? null,
          // We also get the roles here directly from the Asgardeo profile
          roles: profile.roles ?? [],
        };
      },
    }),
  ],

  callbacks: {
    // This callback adds the roles from the profile to the JWT token
    async jwt({ token, user }) {
      if (user && user.roles) {
        token.roles = user.roles;
      }
      return token;
    },

    // This callback adds the roles from the JWT token to the final session object
    async session({ session, token }) {
      if (token && token.roles) {
        session.user.roles = token.roles as string[];
      }
      return session;
    },
  },
});