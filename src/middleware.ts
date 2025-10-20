import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// 1. REMOVE the import for getToken
// import { getToken } from 'next-auth/jwt';

// 2. ADD an import for 'auth' from your auth.ts file
import { auth } from './auth';

export async function middleware(request: NextRequest) {
  /**
   * Use the `auth()` function which is connected to your NextAuth configuration.
   * It will securely read the session from the cookie.
   */
  // 3. CHANGE this line from getToken to auth()
  const session = await auth();

  // 4. CHANGE the check from `token` to `session`
  if (!session) {
    const signInUrl = new URL('/api/auth/signin', request.url);

    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // User is authenticated → allow request through
  return NextResponse.next();
}

export const config = {
  // Your matcher remains the same
  matcher: [
    '/donor/:path*',
    '/blood_bank/:path*',
  ],
};