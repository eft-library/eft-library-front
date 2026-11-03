import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { verifyUserSession } from "@/lib/auth/session-recovery";
import { loadUserInfo } from "@/lib/auth/user-info";
import { refreshGoogleAccessToken } from "@/lib/auth/token-refresh";

import { apiEndpoints } from "@/lib/config/api-endpoints";
import { getApiBaseUrl } from "@/lib/config/app-env";

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
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
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

        return verifyUserSession({
          ...token,
          accessToken: account.access_token ?? "",
          refreshToken: account.refresh_token ?? "",
          accessTokenExpires,
          error: undefined,
          refreshRetryAt: undefined,
          userInfo: undefined,
          userInfoCheckedAt: undefined,
          userInfoRetryAt: undefined,
          nickname: null,
        }, loadUserInfo, refreshGoogleAccessToken);
      }

      if (trigger === "update" && session?.rejectAccessToken && session.rejectAccessToken === token.accessToken) {
        return { ...token, accessToken: "", accessTokenExpires: 0, error: "ReauthenticationRequired" };
      }
      if (token.error === "ReauthenticationRequired" || token.error === "UserNotRegistered") return token;
      if (trigger === "update" && session?.refreshAccessToken === true &&
          (!session.failedAccessToken || session.failedAccessToken === token.accessToken) &&
          (!token.refreshRetryAt || Date.now() >= token.refreshRetryAt)) {
        return verifyUserSession(await refreshGoogleAccessToken(token), accessToken => loadUserInfo(accessToken, true), refreshGoogleAccessToken, Date.now(), true);
      }

      // Profile updates are reloaded from the backend, not trusted from the client.
      if (
        token.error !== "AccessTokenRefreshUnavailable" &&
        token.accessTokenExpires &&
        Date.now() + 60_000 < token.accessTokenExpires
      ) {
        const force = trigger === "update" && Boolean(session && (session.userInfo || session.refreshUserInfo === true));
        return verifyUserSession(token, (accessToken) => loadUserInfo(accessToken, force), refreshGoogleAccessToken, Date.now(), false, force);
      }

      if (token.refreshRetryAt && Date.now() < token.refreshRetryAt) return token;
      return verifyUserSession(await refreshGoogleAccessToken(token), loadUserInfo, refreshGoogleAccessToken, Date.now(), true);
    },

    async session({ token, session }) {
      const nextSession = session;
      const usable = token.error !== "ReauthenticationRequired" && token.error !== "UserNotRegistered" &&
        Boolean(token.accessToken && token.accessTokenExpires && token.accessTokenExpires > Date.now());
      const accessToken = usable ? token.accessToken ?? "" : "";

      nextSession.accessToken = accessToken;
      nextSession.accessTokenExpires = token.accessTokenExpires;
      nextSession.error = token.error;
      nextSession.refreshToken = token.refreshToken ?? "";
      nextSession.userInfo = token.userInfo ?? null;

      return nextSession;
    },
  },
});

export { handler as GET, handler as POST };
