import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/custom/themeProvider/themeProvider";
import Header from "@/components/custom/header/header";
import Footer from "@/components/custom/footer/footer";
import AuthContext from "@/store/AuthContext";
import { AppStoreProvider } from "@/store/provider";
import { Suspense } from "react";
import AdSense from "@/components/custom/adsense/adSense";
import { GoogleAnalytics } from "@next/third-parties/google";

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
        process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library",
    description: "Tarkov 공략 페이지 입니다.",
    images: "/og.png",
    url: "https://eftlibrary.com",
  },
  twitter: {
    title: "EFT Library",
    description: "Tarkov 공략 페이지 입니다.",
    images: "/og.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AdSense pId={process.env.NEXT_PUBLIC_ADSENSE || ""} />
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""}
        />
        <AuthContext>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense>
              <AppStoreProvider>
                <Header />
                {children}
                <Footer />
              </AppStoreProvider>
            </Suspense>
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
}
