import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

// 세션에 토큰 정보 추가
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    provider: string;
    refreshToken: string;
    email?: string;
  }
}

// jwt에 토큰 정보 추가
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string;
    provider: string;
    refreshToken: string;
  }
}
