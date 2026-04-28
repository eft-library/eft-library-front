import { Suspense } from "react";
import type { Metadata } from "next";

import { AuthProvider } from "@/components/providers/auth-provider";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { AppStoreProvider } from "@/components/providers/app-store-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { getHomeMenu } from "@/features/home/api";
import { defaultLocale } from "@/i18n/config";
import { getUserLocale } from "@/i18n/locale";
import { getSiteUrl } from "@/lib/config/app-env";
import { getUICopy } from "@/lib/constants/ui-copy";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "EFT Library Front Migration",
    template: "%s | EFT Library",
  },
  description:
    "FastAPI V3를 기준으로 EFT Library 프론트를 단계적으로 이전하기 위한 Next.js 마이그레이션 워크스페이스입니다.",
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    title: "EFT Library Front Migration",
    description:
      "공통 레이아웃, 내비게이션, API 계층부터 정리하는 EFT Library V3 프론트 마이그레이션 베이스",
    url: "/",
    siteName: "EFT Library",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale} className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <AuthProvider>
            <Suspense fallback={<LayoutFallback />}>
              <ResolvedLayout>{children}</ResolvedLayout>
            </Suspense>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

async function ResolvedLayout({ children }: { children: React.ReactNode }) {
  const [navigation, locale] = await Promise.all([getHomeMenu(), getUserLocale()]);
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
        <div className="flex-1">{children}</div>
        <SiteFooter
          title={copy.footer.title}
          description={copy.footer.description}
        />
      </AppStoreProvider>
    </div>
  );
}

function LayoutFallback() {
  const copy = getUICopy(defaultLocale);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-[#2a2d35]">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
      <div className="flex-1" />
      <SiteFooter
        title={copy.footer.title}
        description={copy.footer.description}
      />
    </div>
  );
}
