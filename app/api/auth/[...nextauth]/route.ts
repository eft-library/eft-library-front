/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";

async function refreshAccessToken(token: JWT) {
  try {
    // OAuth 토큰 갱신 URL
    const url = "https://oauth2.googleapis.com/token";

    // 요청 본문 파라미터 생성
    const body = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_ID ?? "",
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET ?? "",
      grant_type: "refresh_token", // 반드시 "refresh_token"이어야 함
      refresh_token: token.refreshToken ?? "", // 실제 refresh_token 전달
    });

    // Fetch 요청
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: body.toString(), // URLSearchParams 객체를 문자열로 변환
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      console.error("Error refreshing access token:", refreshedTokens);
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // 갱신된 refresh_token이 없으면 기존 값 유지
    };
  } catch (error) {
    console.error("Failed to refresh access token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || "",
      authorization: process.env.NEXT_PUBLIC_GOOGLE_AUTHORIZATION || "",
    }),
  ],
  session: {
    maxAge: 2 * 60 * 60, // 1일 (단위: 초)
    updateAge: 2 * 60 * 60, // 세션이 업데이트되는 빈도 (단위: 초)
  },
  jwt: {
    maxAge: 2 * 60 * 60, // 1일 (단위: 초)
  },
  callbacks: {
    async signIn({ user }) {
      if (user) {
        try {
          const res = await fetch(USER_API_ENDPOINTS.ADD_USER, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user.id,
              name: user.name,
              email: user.email,
              image: "",
            }),
          });

          if (!res.ok) {
            throw new Error("Failed to add user");
          }

          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token ?? "";
        token.accessTokenExpires = account.expires_at ?? 0 * 1000;
        token.refreshToken = account.refresh_token ?? "";
        return token;
      }

      const nowTime = Date.now();
      const accessTokenExpires = token.accessTokenExpires as number;
      const TEN_MINUTES_AGO_IN_MS = 60 * 10 * 1000; // 10분 전

      // 10분전에 토큰을 갱신해준다.
      const shouldRefreshTime =
        accessTokenExpires - nowTime - TEN_MINUTES_AGO_IN_MS;

      if (shouldRefreshTime > 0) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      const sessionUser = {
        ...token,
      };
      delete (sessionUser as any).refreshToken;

      // FastAPI에서 사용자 정보 불러오기
      try {
        const res = await fetch(USER_API_ENDPOINTS.GET_USER, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.accessToken}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          // 필요에 따라 session에 사용자 정보를 병합
          sessionUser.userInfo = data.data ?? null;
        } else {
          console.error("Failed to fetch user info from API");
          sessionUser.userInfo = null;
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
        sessionUser.userInfo = null;
      }
      console.log(sessionUser);
      return sessionUser as any;
    },
  },
});

export { handler as GET, handler as POST };
