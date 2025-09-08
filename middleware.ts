// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 보호 경로 (로그인 필요)
  const protectedPaths = [
    "/community/create",
    "/community/update",
    "/onboarding",
    "/mypage",
  ];

  // 로그인 안한 경우 → 커뮤니티 이슈 페이지로 이동
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/community/issue", req.url));
    }
  }

  // 로그인했는데 닉네임이 없는 경우 → 무조건 /onboarding으로 이동
  if (token && !token.nickname && pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // 닉네임이 이미 있는데 /onboarding으로 가려는 경우 → 메인으로 리다이렉트
  if (token && token.nickname && pathname === "/onboarding") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// matcher 확장
export const config = {
  matcher: [
    "/community/create",
    "/community/update",
    "/onboarding",
    "/mypage",
    "/((?!_next|api|static|favicon.ico).*)", // 다른 경로 전역 확인 원하면 추가
  ],
};
