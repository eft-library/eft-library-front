import { Suspense } from "react";
import { getPrestigeLevels } from "@/features/prestige/api";
import { PrestigePage } from "@/features/prestige/prestige-page";
import { getUserLocale } from "@/i18n/locale";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "프레스티지",
  description: "타르코프 프레스티지 레벨별 달성 조건, 보상과 아이템 이전 칸을 비교하세요.",
  path: "/prestige",
});

async function PrestigeContent() {
  const [levels, locale] = await Promise.all([
    getPrestigeLevels().catch(() => null),
    getUserLocale(),
  ]);
  return <PrestigePage levels={levels} locale={locale} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="mx-auto my-8 h-64 max-w-7xl animate-pulse rounded-xl bg-surface" aria-busy="true" />}>
      <PrestigeContent />
    </Suspense>
  );
}
