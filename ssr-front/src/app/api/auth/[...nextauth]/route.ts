import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
// import Naver from "next-auth/providers/naver";
import USER_API_ENDPOINTS from "@/config/userEndPoints";

async function refreshAccessToken(token: JWT) {
  try {
    let url = "";
    if (token.provider === "naver") {
      url =
        process.env.NEXT_PUBLIC_NAVER_REFRESH +
        new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_NAVER_ID,
          client_secret: process.env.NEXT_PUBLIC_NAVER_SECRET,
          grant_type: "refresh_token",
          refresh_token: token.refreshToken,
        });
    } else {
      url =
        process.env.NEXT_PUBLIC_GOOGLE_REFRESH +
        new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_ID,
          client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
          grant_type: "refresh_token",
          refresh_token: token.refreshToken,
        });
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

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
    // Naver({
    //   clientId: process.env.NEXT_PUBLIC_NAVER_ID || "",
    //   clientSecret: process.env.NEXT_PUBLIC_NAVER_SECRET || "",
    // }),
  ],
  session: {
    maxAge: 2 * 60 * 60, // 1일 (단위: 초)
    updateAge: 2 * 60 * 60, // 세션이 업데이트되는 빈도 (단위: 초)
  },
  jwt: {
    maxAge: 2 * 60 * 60, // 1일 (단위: 초)
  },
  callbacks: {
    async signIn({ user, account, profile }) {
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

          const data = await res.json();
          return true;
        } catch (error) {
          return false;
        }
      }

      return true;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = account.expires_at * 1000;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
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
      delete sessionUser.refreshToken;
      session = sessionUser as any;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
