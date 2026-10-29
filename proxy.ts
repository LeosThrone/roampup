import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  const isAppRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/trips") ||
    pathname.startsWith("/map") ||
    pathname.startsWith("/profile");

  if (isAppRoute && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/trips/:path*", "/map/:path*", "/profile/:path*"],
};
