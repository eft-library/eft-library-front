import type { Metadata } from "next";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppStoreProvider } from "@/store/provider";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/config/theme";
import AuthContext from "@/context/AuthContext";
import { Suspense } from "react";
import AdSense from "@/components/adsense/adSense";

export const metadata: Metadata = {
  title: "EFT Library",
  description: "EFT Library",
  keywords: [
    "타르코프",
    "타르코프 퀘스트 공략",
    "타르코프 지도",
    "타르코프 정보",
    "타르코프 퀘스트",
    "타르코프 공략",
    "타르코프 하이드아웃",
    "타르코프 한국어",
    "타르코프 도서관",
    "타르코프 보스",
    "타르코프 한글 지도",
    "타르코프 가이드",
    "타르코프 이벤트",
    "타르코프 커뮤니티",
    "타르코프 퀘스트 플래너",
    "escape from tarkov",
    "tarkov",
    "EFT Library",
    "TKL",
    "tarkov library",
    "escape from tarkov library",
  ],
  metadataBase: new URL("https://eftlibrary.com"),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "naver-site-verification":
        process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION,
    },
  },
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library",
    description: "Tarkov 공략 페이지 입니다.",
    images: "/og.png",
    url: "https://eftlibrary.com",
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
      <head>
        <AdSense pId={process.env.NEXT_PUBLIC_ADSENSE} />
      </head>
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
