import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    refreshToken: string;
    userInfo: {
      email?: string;
      attendance_count?: number;
      nickname?: string;
      is_admin?: boolean;
      last_update_nickname?: string;
      end_time?: string;
      start_time?: string;
      reason?: string;
      user_blocks?: Array<{
        reason: string;
        create_time: string;
        blocked_email: string;
        blocker_email: string;
      }>;
    } | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    nickname?: string | null;
    userInfo?: {
      email?: string;
      attendance_count?: number;
      nickname?: string;
      is_admin?: boolean;
      last_update_nickname?: string;
      end_time?: string;
      start_time?: string;
      reason?: string;
      user_blocks?: Array<{
        reason: string;
        create_time: string;
        blocked_email: string;
        blocker_email: string;
      }>;
    } | null;
  }
}
