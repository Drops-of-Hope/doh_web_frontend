import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  /**
   * Retrieve the JWT that NextAuth stores in the cookie
   * (`next-auth.session-token` in development or
   *  `__Secure-next-auth.session-token` on HTTPS).
   */
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  if (!token) {
    const signInUrl = new URL('/api/auth/signin', request.url);

    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // User is authenticated → allow request through
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/donor/:path*',
  ],
};

