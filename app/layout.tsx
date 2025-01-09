import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/custom/themeProvider/themeProvider";
import Header from "@/components/page/header/header";
import Footer from "@/components/page/footer/footer";
import AuthContext from "@/store/AuthContext";
import { AppStoreProvider } from "@/store/provider";
import { Suspense } from "react";
import AdSense from "@/components/custom/adsense/adSense";
import { GoogleAnalytics } from "@next/third-parties/google";
// import localFont from "next/font/local";

// const pretendard = localFont({
//   src: "../public/fonts/SBAggroM.woff",
//   display: "swap",
//   weight: "45 920",
//   variable: "--font-pretendard",
// });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <AdSense pId={process.env.NEXT_PUBLIC_ADSENSE || ""} />
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""}
        />
      </head>
      {/* <body className={pretendard.className}> */}
      <body>
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
