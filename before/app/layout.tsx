// app/layout.tsx

import { type Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/custom/themeProvider/themeProvider";
import Header from "@/components/page/header/header";
import Footer from "@/components/page/footer/footer";
import AuthContext from "@/store/AuthContext";
import { AppStoreProvider } from "@/store/provider";
import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import AdBlockAlert from "@/components/custom/adBlockAlert/adBlockAlert";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/store/queryProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "react-datepicker/dist/react-datepicker.css";
import "@xyflow/react/dist/style.css";
import "photoswipe/dist/photoswipe.css";
import "../assets/editor.css";
import "../assets/quest.css";

export const metadata: Metadata = {
  title: "EFT Library",
  description: "EFT Library",
  metadataBase: new URL("https://eftlibrary.com"),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "naver-site-verification":
        process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  openGraph: {
    siteName: "EFT Library",
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

export default async function RootLayout({
  children,
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  params: any;
  searchParams?: { [key: string]: string };
}>) {
  const locale = await getLocale();
  const hasQuery = searchParams && Object.keys(searchParams).length > 0;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${
            process.env.NEXT_PUBLIC_ADSENSE || ""
          }`}
        />
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""}
        />
        {/* 쿼리 파라미터가 있을 경우 noindex 추가 */}
        {hasQuery && <meta name="robots" content="noindex, nofollow" />}
      </head>
      <body>
        <NextIntlClientProvider locale={locale}>
          <AdBlockAlert />
          <Toaster />
          <AuthContext>
            <ThemeProvider
              attribute={"class"}
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Suspense>
                <AppStoreProvider>
                  <QueryProvider>
                    <Header />
                    {children}
                    <Footer />
                  </QueryProvider>
                </AppStoreProvider>
              </Suspense>
            </ThemeProvider>
          </AuthContext>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
