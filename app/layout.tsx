import { Suspense } from "react";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import { AuthProvider } from "@/components/providers/auth-provider";
import { AdSideRails } from "@/components/shared/ad-side-rails";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteFooterGuard } from "@/components/shared/site-footer-guard";
import { SiteHeader } from "@/components/shared/site-header";
import { AppStoreProvider } from "@/components/providers/app-store-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { WebSocketProvider } from "@/components/providers/websocket-provider";
// import { ChatData } from "@/features/chat/components/chat-data";
import { getHomeMenu } from "@/features/home/api";
import { defaultLocale } from "@/i18n/config";
import { getUserLocale } from "@/i18n/locale";
import { getSiteUrl } from "@/lib/config/app-env";
import { getUICopy } from "@/lib/constants/ui-copy";

import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: {
    default: "타르코프 도서관 - EFT Library",
    template: "%s | EFT Library",
  },
  description:
    "Escape from Tarkov 퀘스트, 지도, 아이템, 은신처, 보스, 시세 정보를 한곳에서 확인할 수 있는 타르코프 도서관입니다.",
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    title: "타르코프 도서관 - EFT Library",
    description:
      "Escape from Tarkov 퀘스트, 지도, 아이템, 은신처, 보스, 시세 정보를 한곳에서 확인할 수 있는 타르코프 도서관입니다.",
    url: "/",
    siteName: "EFT Library",
  },
  twitter: {
    card: "summary",
    title: "타르코프 도서관 - EFT Library",
    description:
      "Escape from Tarkov 퀘스트, 지도, 아이템, 은신처, 보스, 시세 정보를 한곳에서 확인할 수 있는 타르코프 도서관입니다.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={defaultLocale}
      className="h-full antialiased"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-background text-foreground"
        suppressHydrationWarning
      >
        {process.env.NEXT_PUBLIC_ADSENSE ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE}`}
            crossOrigin="anonymous"
          />
        ) : null}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <ThemeProvider>
          <AuthProvider>
            <WebSocketProvider>
              <QueryProvider>
                <Suspense fallback={<LayoutFallback />}>
                  <ResolvedLayout>{children}</ResolvedLayout>
                </Suspense>
              </QueryProvider>
            </WebSocketProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

async function ResolvedLayout({ children }: { children: React.ReactNode }) {
  const [navigation, locale] = await Promise.all([
    getHomeMenu(),
    getUserLocale(),
  ]);
  const copy = getUICopy(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <AppStoreProvider
        initialState={{ activeCommunityCategory: "free", uiLocale: locale }}
      >
        <SiteHeader
          menuGroups={navigation.nav_list}
          autocompleteItems={navigation.autocomplete_items}
          localeLabel={copy.navigation.languageLabel}
          searchPlaceholder={copy.navigation.searchPlaceholder}
          noSearchResultsLabel={copy.navigation.noSearchResults}
          loginLabel={copy.navigation.login}
          logoutLabel={copy.navigation.logout}
          myPageLabel={copy.navigation.myPage}
          guestLabel={copy.navigation.guestLabel}
          themeToggleLabel={copy.navigation.themeToggle}
          locale={locale}
        />
        <AdSideRails />
        {/* <ChatData /> */}
        <div className="flex-1">{children}</div>
        <SiteFooterGuard />
      </AppStoreProvider>
    </div>
  );
}

function LayoutFallback() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-[#2a2d35]">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
      <div className="flex-1" />
      <SiteFooter />
    </div>
  );
}
