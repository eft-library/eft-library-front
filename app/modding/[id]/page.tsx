import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getUserLocale } from "@/i18n/locale";
import { ModdingPage } from "@/features/modding/components/modding-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 무기 모딩",
  description: "총기 슬롯별 파츠를 탐색하고 나만의 장착 구성을 만들어 보세요.",
  path: "/modding",
});
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-96 animate-pulse rounded-2xl bg-surface" />
      }
    >
      <WeaponPage params={params} />
    </Suspense>
  );
}
async function WeaponPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, locale] = await Promise.all([params, getUserLocale()]);
  if (!/^[a-f0-9]{24}$/.test(id)) notFound();
  return <ModdingPage locale={locale} weaponId={id} />;
}
