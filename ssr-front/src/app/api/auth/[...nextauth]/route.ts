import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || "",
    }),
    Naver({
      clientId: process.env.NEXT_PUBLIC_NAVER_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_NAVER_SECRET || "",
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
    async signIn({ user, account, profile }) {
      if (user) {
        try {
          const res = await fetch("http://localhost:8000/api/user/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
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
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
