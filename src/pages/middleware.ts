import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('미들웨어: ', request);
  const response = NextResponse.next();

  console.log(response);

  return response;
}

export const config = {
  matcher: '/api/*',
};
