import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add proper content-type headers with correct charset
  if (request.nextUrl.pathname.endsWith('.js')) {
    response.headers.set('content-type', 'text/javascript; charset=utf-8');
  } else if (request.nextUrl.pathname.endsWith('.css')) {
    response.headers.set('content-type', 'text/css; charset=utf-8');
  } else {
    response.headers.set('content-type', 'text/html; charset=utf-8');
  }
  
  // Add proper cache control with cache busting
  response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate, stale-while-revalidate=86400');
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Add CSP header with all necessary directives
  response.headers.set('Content-Security-Policy', 
    "default-src 'self'; " +
    "img-src 'self' data: https:; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "frame-ancestors 'self'; " +
    "form-action 'self';"
  );

  // Add text-size-adjust for mobile browsers
  response.headers.set('text-size-adjust', '100%');
  
  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 