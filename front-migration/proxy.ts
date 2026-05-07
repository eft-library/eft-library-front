import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const protectedPathPrefixes = [
  "/community/create",
  "/community/update",
  "/onboarding",
  "/mypage",
];

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;
  const headers = new Headers(request.headers);

  headers.set("x-client-real-ip", getClientIp(request));

  const isProtectedPath = protectedPathPrefixes.some((path) =>
    pathname === path || pathname.startsWith(`${path}/`),
  );

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && !token.nickname && pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  if (token && token.nickname && pathname === "/onboarding") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: [
    "/community/create/:path*",
    "/community/update/:path*",
    "/onboarding",
    "/mypage/:path*",
    "/((?!_next|api|static|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
