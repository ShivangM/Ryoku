import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let session = request.cookies.get('session')?.value;
  const path = request.nextUrl.pathname;

  if (!session && path !== '/login' && path !== '/signup') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
