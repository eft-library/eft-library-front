import { Suspense } from "react";
import { TraderPage } from "@/features/trader/components/trader-page";
import { getUserLocale } from "@/i18n/locale";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 상인",
  description:
    "타르코프 상인별 구매·교환 아이템, 우호도, 구매 제한과 퀘스트 해금 조건을 확인하세요.",
  path: "/traders",
});

async function ResolvedTraderPage() {
  return <TraderPage locale={await getUserLocale()} />;
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto min-h-96 max-w-7xl animate-pulse p-8">
          <div className="h-12 rounded bg-surface-elevated" />
          <div className="mt-8 h-48 rounded bg-surface-elevated" />
        </div>
      }
    >
      <ResolvedTraderPage />
    </Suspense>
  );
}
