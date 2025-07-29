import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthContext from "@/store/AuthContext";
import { AppStoreProvider } from "@/store/provider";
import { Suspense } from "react";
import NavData from "@/components/custom/NavBar/nav-data";
import { ThemeProvider } from "@/lib/config/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import QueryProvider from "@/store/queryProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import Footer from "@/components/custom/Footer/footer";
import "./globals.css";
import "../assets/editor.css";
import "../assets/xyflow.css";
import "@xyflow/react/dist/style.css";
import "photoswipe/dist/photoswipe.css";
import "leaflet/dist/leaflet.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "타르코프 도서관 - EFT LIBRARY",
  description:
    "타르코프 도서관 EFT LIBRARY는 Escape from Tarkov 한국어 공략 정보의 허브입니다. 한글 지도, 2D & 3D 지도, 퀘스트 가이드, 퀘스트 플래너 & 로드맵, 아이템, 보스, 이벤트, 모딩, 시세 등 게임 플레이에 필요한 모든 정보를 제공합니다.",
  metadataBase: new URL("https://eftlibrary.com/"),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "naver-site-verification":
        process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  openGraph: {
    siteName: "EFT LIBRARY",
    title: "타르코프 도서관 - EFT LIBRARY",
    description:
      "타르코프 도서관 EFT LIBRARY는 Escape from Tarkov 한국어 공략 정보의 허브입니다. 한글 지도, 2D & 3D 지도, 퀘스트 가이드, 퀘스트 플래너 & 로드맵, 아이템, 보스, 이벤트, 모딩, 시세 등 게임 플레이에 필요한 모든 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/",
  },
  twitter: {
    title: "타르코프 도서관 - EFT LIBRARY",
    description:
      "타르코프 도서관 EFT LIBRARY는 Escape from Tarkov 한국어 공략 정보의 허브입니다.",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${
            process.env.NEXT_PUBLIC_ADSENSE || ""
          }`}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          <AuthContext>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Suspense>
                <AppStoreProvider>
                  <QueryProvider>
                    <NavData />
                    {children}
                    <Footer />
                  </QueryProvider>
                </AppStoreProvider>
              </Suspense>
            </ThemeProvider>
          </AuthContext>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""} />
    </html>
  );
}
