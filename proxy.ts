import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

import { apiEndpoints } from "@/lib/config/api-endpoints";
import { getApiBaseUrl } from "@/lib/config/app-env";

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

async function fetchNicknameFromUserInfo(accessToken: unknown) {
  if (typeof accessToken !== "string" || accessToken.length === 0) {
    return null;
  }

  try {
    const response = await fetch(`${getApiBaseUrl()}${apiEndpoints.userInfo}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as {
      data?: { nickname?: unknown } | null;
    };

    return getNicknameFromValue(payload.data?.nickname);
  } catch {
    return null;
  }
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

  const nickname =
    getNicknameFromToken(token) ??
    (token && typeof token !== "string"
      ? await fetchNicknameFromUserInfo(token.accessToken)
      : null);

  if (token && !nickname && pathname !== "/onboarding") {
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
