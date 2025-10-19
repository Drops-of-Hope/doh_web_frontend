// File: next-auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

/**
 * Extend the built-in types to include the `roles` property.
 */
declare module "next-auth" {
  /**
   * Extend the session to include the user's roles.
   * This is the object returned by `useSession`, `auth`, etc.
   */
  interface Session {
    user: {
      /** The user's custom roles. */
      roles?: string[];
    } & DefaultSession["user"]; // This keeps the original properties like name, email, image
  }

  /**
   * Extend the user object to include roles.
   * This is the object passed to the `jwt` callback on initial sign-in.
   */
  interface User extends DefaultUser {
    roles?: string[];
  }
}

/**
 * Extend the JWT to include roles.
 * This is the token that is encrypted in the cookie and passed to the `session` callback.
 */
declare module "next-auth/jwt" {
  interface JWT {
    /** The user's custom roles. */
    roles?: string[];
  }}