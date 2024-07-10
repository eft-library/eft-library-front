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
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account) {
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
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
