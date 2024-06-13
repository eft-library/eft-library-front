import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    Naver({
      clientId: process.env.NAVER_ID || "",
      clientSecret: process.env.NAVER_SECRET || "",
    }),
  ],
});

export { handler as GET, handler as POST };
