import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";

import { apiEndpoints } from "@/lib/config/api-endpoints";
import { getApiBaseUrl } from "@/lib/config/app-env";

async function refreshAccessToken(token: JWT) {
  try {
    const body = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_ID ?? "",
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET ?? "",
      grant_type: "refresh_token",
      refresh_token: token.refreshToken ?? "",
    });

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
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
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
    updateAge: 2 * 60 * 60,
  },
  jwt: {
    maxAge: 2 * 60 * 60,
  },
  callbacks: {
    async signIn({ user }) {
      if (!user) {
        return false;
      }

      try {
        const response = await fetch(
          `${getApiBaseUrl()}${apiEndpoints.userAdd}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              image: user.image ?? "",
            }),
          },
        );

        return response.ok;
      } catch (error) {
        console.error("Failed to add user on sign-in:", error);
        return false;
      }
    },

    async jwt({ token, account, user, trigger, session }) {
      if (account && user) {
        const accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : Date.now() + 3600 * 1000;

        let userInfo = null;

        try {
          const response = await fetch(
            `${getApiBaseUrl()}${apiEndpoints.userInfo}`,
            {
              headers: { Authorization: `Bearer ${account.access_token}` },
            },
          );

          if (response.ok) {
            const data = await response.json();
            userInfo = data.data ?? null;
          }
        } catch {
          userInfo = null;
        }

        return {
          ...token,
          accessToken: account.access_token ?? "",
          refreshToken: account.refresh_token ?? "",
          accessTokenExpires,
          userInfo,
          nickname: userInfo?.nickname ?? null,
        };
      }

      if (trigger === "update" && session?.userInfo) {
        token.userInfo = session.userInfo;
        token.nickname = session.userInfo.nickname ?? token.nickname;
      }

      if (
        token.accessTokenExpires &&
        Date.now() < (token.accessTokenExpires as number)
      ) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({ token, session }) {
      const nextSession = session;

      nextSession.accessToken = (token.accessToken as string) ?? "";
      nextSession.refreshToken = (token.refreshToken as string) ?? "";
      nextSession.userInfo = (token.userInfo as typeof session.userInfo) ?? null;

      return nextSession;
    },
  },
});

export { handler as GET, handler as POST };
