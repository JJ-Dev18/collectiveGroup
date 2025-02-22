import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session :any= await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    if (req.nextUrl.pathname.startsWith("/api/admin")) {
      return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
    }
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    let result:boolean = requestedPage != '/result'
    let purchase:boolean =requestedPage != '/user/my-purchase'
    let subscriptions:boolean =requestedPage != '/user/my-subscription'

    if(result && purchase && subscriptions){
      url.search = `p=${requestedPage}`;
    }
    return NextResponse.redirect(url);
  }

  const validRoles = ["ADMIN"];
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    
  }

  if (req.nextUrl.pathname.startsWith('/api/admin')) {
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
    }
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [ '/result/:path*','/user/:path*','/admin/:path*', '/api/admin/:path*'],
};
