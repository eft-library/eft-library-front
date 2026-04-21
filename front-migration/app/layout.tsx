import type { Metadata } from "next";

import { AuthProvider } from "@/components/providers/auth-provider";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { AppStoreProvider } from "@/components/providers/app-store-provider";
import { getHomeMenu } from "@/features/home/api";
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
  const [navigation, locale] = await Promise.all([
    getHomeMenu(),
    getUserLocale(),
  ]);
  const copy = getUICopy(locale);

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <AppStoreProvider
              initialState={{ activeCommunityCategory: "free", uiLocale: locale }}
            >
              <SiteHeader
                menuGroups={navigation.nav_list}
                autocompleteItems={navigation.autocomplete_items}
                browseSectionsLabel={copy.navigation.browseSections}
                statusLabel={copy.navigation.status}
                localeLabel={copy.navigation.languageLabel}
                brandSubtitle={copy.navigation.brandSubtitle}
                searchPlaceholder={copy.navigation.searchPlaceholder}
                noSearchResultsLabel={copy.navigation.noSearchResults}
                loginLabel={copy.navigation.login}
                logoutLabel={copy.navigation.logout}
                myPageLabel={copy.navigation.myPage}
                guestLabel={copy.navigation.guestLabel}
                locale={locale}
              />
              <div className="flex-1">{children}</div>
              <SiteFooter
                title={copy.footer.title}
                description={copy.footer.description}
              />
            </AppStoreProvider>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
