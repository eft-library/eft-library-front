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
});

export { handler as GET, handler as POST };
