import { Suspense } from "react";
import { notFound } from "next/navigation";
import { TraderPage } from "@/features/trader/components/trader-page";
import { traderOrder } from "@/features/trader/config";
import { getUserLocale } from "@/i18n/locale";
import { createPageMetadata } from "@/lib/seo/metadata";
import type { TraderMode } from "@/types/api/trader";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function validTrader(id: string) {
  return traderOrder.some((name) => name === id);
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  if (!validTrader(id)) notFound();
  return createPageMetadata({
    title: `타르코프 상인 ${id}`,
    description:
      "상인의 구매·교환 상품, 우호도, 구매 제한과 퀘스트 해금 조건을 확인하세요.",
    path: `/traders/${id}`,
  });
}

async function ResolvedTraderPage({ params, searchParams }: PageProps) {
  const [{ id }, query, locale] = await Promise.all([
    params,
    searchParams,
    getUserLocale(),
  ]);
  if (!validTrader(id)) notFound();
  const mode: TraderMode =
    query.mode === "pve" || query.mode === "pvp-season" ? query.mode : "pvp";
  const level =
    query.level === "all"
      ? "all"
      : typeof query.level === "string" && /^[1-4]$/.test(query.level)
        ? Number(query.level)
        : 4;
  return (
    <TraderPage
      key={id}
      locale={locale}
      traderName={id}
      initialMode={mode}
      initialLevel={level}
      initialWord={typeof query.word === "string" ? query.word : ""}
      initialOfferType={
        query.offer_type === "purchase" || query.offer_type === "barter"
          ? query.offer_type
          : "all"
      }
    />
  );
}

export default function Page(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto min-h-96 max-w-7xl animate-pulse p-8">
          <div className="h-12 rounded bg-surface-elevated" />
          <div className="mt-8 h-48 rounded bg-surface-elevated" />
        </div>
      }
    >
      <ResolvedTraderPage {...props} />
    </Suspense>
  );
}
