import { WipePage } from "@/features/wipe/components/wipe-page";
import { getWipeSeasons } from "@/features/wipe/api";
import { getUserLocale } from "@/i18n/locale";
import { getUICopy } from "@/lib/constants/ui-copy";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 초기화",
  description: "Escape from Tarkov 시즌 초기화 정보를 제공합니다.",
  path: "/wipe",
});

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
