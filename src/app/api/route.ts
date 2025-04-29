import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.next();
  
  // Add security headers
  const headers = response.headers;
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Content-Type', 'application/json; charset=utf-8');
  headers.set('Cache-Control', 'public, max-age=3600, must-revalidate, stale-while-revalidate=86400');
  headers.set('Content-Security-Policy', 
    "default-src 'self'; " +
    "img-src 'self' data: https:; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "frame-ancestors 'self'; " +
    "form-action 'self';"
  );
  
  return response;
} 