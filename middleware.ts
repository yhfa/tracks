import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const signedInPages = ['/', '/playlist', '/library'];

export function middleware(req: NextRequest) {
  if (signedInPages.find(page => page === req.nextUrl.pathname)) {
    const token = req.cookies[process.env.COOKIE_NAME];

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.rewrite(url);
    }
  }
}
