import { Suspense } from "react";
import { getUserLocale } from "@/i18n/locale";
import { ModdingPage } from "@/features/modding/components/modding-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 무기 모딩",
  description: "총기 슬롯별 파츠를 탐색하고 나만의 장착 구성을 만들어 보세요.",
  path: "/modding",
});

export default function Page() {
  return (
    <Suspense
      fallback={
        <div
          className="mx-auto min-h-96 w-full max-w-[1600px] animate-pulse px-6 py-12"
          role="status"
          aria-label="Loading"
        >
          <div className="mb-6 h-10 w-64 rounded-lg bg-surface-elevated" />
          <div className="h-64 rounded-2xl border border-line bg-surface" />
        </div>
      }
    >
      <LocalizedModdingPage />
    </Suspense>
  );
}

async function LocalizedModdingPage() {
  const locale = await getUserLocale();
  return <ModdingPage locale={locale} />;
}
