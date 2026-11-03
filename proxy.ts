import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";


const protectedPathPrefixes = [
  "/community/create",
  "/community/update",
  "/onboarding",
  "/mypage",
];

type TokenUserInfo = {
  nickname?: unknown;
} | null;

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function getNicknameFromValue(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
}

function getNicknameFromToken(token: Awaited<ReturnType<typeof getToken>>) {
  if (!token || typeof token === "string") {
    return null;
  }

  const directNickname = getNicknameFromValue(token.nickname);
  if (directNickname) {
    return directNickname;
  }

  const userInfo = token.userInfo as TokenUserInfo;
  return getNicknameFromValue(userInfo?.nickname);
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

  // The signed token is populated by the session callback. Never fetch a
  // profile for page/prefetch requests, and do not treat an unverified legacy
  // token as a confirmed account without a nickname.
  const nickname = getNicknameFromToken(token);
  const profileKnown = token && typeof token !== "string" && Boolean(token.userInfo);

  if (token && profileKnown && !nickname && pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  if (token && nickname && pathname === "/onboarding") {
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
