/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";

// Google Access Token 갱신 함수
async function refreshAccessToken(token: JWT) {
  try {
    const url = "https://oauth2.googleapis.com/token";
    const body = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_ID ?? "",
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET ?? "",
      grant_type: "refresh_token",
      refresh_token: token.refreshToken ?? "",
    });

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
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
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
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
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2시간
    updateAge: 2 * 60 * 60,
  },
  jwt: {
    maxAge: 2 * 60 * 60, // 2시간
  },
  callbacks: {
    // 로그인 시 사용자 추가
    async signIn({ user }) {
      if (!user) return false;

      try {
        const res = await fetch(USER_API_ENDPOINTS.ADD_USER, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image ?? "",
          }),
        });
        if (!res.ok) throw new Error("Failed to add user");
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },

    // JWT 콜백
    async jwt({ token, account, user, trigger, session }) {
      // 1️⃣ 최초 로그인 시 항상 새 토큰 세팅
      if (account && user) {
        const accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : Date.now() + 3600 * 1000;

        let nickname: string | null = null;
        try {
          const res = await fetch(USER_API_ENDPOINTS.GET_USER, {
            headers: { Authorization: `Bearer ${account.access_token}` },
          });
          if (res.ok) {
            const data = await res.json();
            nickname = data.data?.nickname ?? null;
          }
        } catch {
          nickname = null;
        }

        return {
          ...token,
          accessToken: account.access_token ?? "",
          refreshToken: account.refresh_token ?? "",
          accessTokenExpires,
          nickname,
        };
      }

      // 2️⃣ 세션 업데이트 시 nickname 반영
      if (trigger === "update" && session?.userInfo?.nickname) {
        token.nickname = session.userInfo.nickname;
      }

      // 3️⃣ 토큰 만료 체크
      if (
        token.accessTokenExpires &&
        Date.now() < (token.accessTokenExpires as number)
      ) {
        return token;
      }

      // 4️⃣ 만료 시 refresh
      return refreshAccessToken(token);
    },

    // Session 콜백
    async session({ token }) {
      const safeToken = token ?? {};
      const sessionUser = { ...safeToken } as any;

      delete sessionUser.refreshToken;

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
          sessionUser.userInfo = data.data ?? null;
        } else {
          sessionUser.userInfo = null;
        }
      } catch {
        sessionUser.userInfo = null;
      }

      return sessionUser;
    },
  },
});

export { handler as GET, handler as POST };
