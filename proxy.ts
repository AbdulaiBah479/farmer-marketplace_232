import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes — check for a simple admin cookie/env
  if (pathname.startsWith("/admin")) {
    const adminToken = request.cookies.get("admin_token")?.value;
    const expectedToken = process.env.ADMIN_SECRET_TOKEN;

    if (!expectedToken || adminToken !== expectedToken) {
      const loginUrl = new URL("/admin-login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Rate limit hints for API routes (actual rate limiting handled at Vercel/edge level)
  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
