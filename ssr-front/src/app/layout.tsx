import type { Metadata } from "next";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppStoreProvider } from "@/store/provider";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/config/theme";
import AuthContext from "@/context/AuthContext";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "EFT Library",
  description: "EFT Library",
  keywords: [
    "tarkov",
    "타르코프 퀘스트 공략",
    "타르코프 지도",
    "타르코프",
    "타르코프 정보",
    "타르코프 퀘스트",
    "타르코프 공략",
    "타르코프 하이드아웃 정보",
  ],
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "naver-site-verification":
        process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthContext>
          <ChakraProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <CSSReset />
            <Suspense>
              <AppStoreProvider>
                <Header />
                {children}
              </AppStoreProvider>
            </Suspense>
            <Footer />
          </ChakraProvider>
        </AuthContext>
      </body>
    </html>
  );
}
