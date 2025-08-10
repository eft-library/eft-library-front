// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // NextAuth JWT 가져오기
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 보호하려는 경로
  const protectedPath = "/community/create";

  if (req.nextUrl.pathname.startsWith(protectedPath)) {
    if (!token) {
      // 로그인 안 한 경우 → /login으로 리다이렉트
      return NextResponse.redirect(new URL("/community/issue", req.url));
    }
  }

  // 통과
  return NextResponse.next();
}

// 적용할 경로 지정
export const config = {
  matcher: ["/community/create"],
};
