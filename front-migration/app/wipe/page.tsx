import type { Metadata } from "next";

import { WipePage } from "@/features/wipe/components/wipe-page";
import { getWipeSeasons } from "@/features/wipe/api";
import { getUserLocale } from "@/i18n/locale";
import { getSiteUrl } from "@/lib/config/app-env";
import { getUICopy } from "@/lib/constants/ui-copy";

export const metadata: Metadata = {
  title: "타르코프 초기화",
  description: "Escape from Tarkov 시즌 초기화 정보를 제공합니다.",
  alternates: {
    canonical: `${getSiteUrl()}/wipe`,
  },
};

export default async function Page() {
  const [seasons, locale] = await Promise.all([
    getWipeSeasons(),
    getUserLocale(),
  ]);
  const copy = getUICopy(locale);

  return (
    <WipePage
      seasons={seasons}
      labels={{
        ...copy.wipe,
      }}
    />
  );
}
