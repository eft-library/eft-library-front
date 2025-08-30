import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

// 세션에 토큰 정보 추가
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    provider: string;
    refreshToken: string;
    email: string;
    name: string;
    userInfo: UserInfo;
  }

  interface UserInfo {
    email: string;
    attendance_count: number;
    nickname: string;
    is_admin: boolean;
    last_update_nickname: string;
    end_time: string;
    start_time: string;
    user_blocks: UserBlock[];
  }

  interface UserBlock {
    reason: str;
    create_time: str;
    blocked_email: str;
    blocker_email: str;
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
