"use client";

import Image from "next/image";
import { FileQuestion, Package } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/i18n/config";
import type {
  BattlePassData,
  BattlePassDocument,
  BattlePassRequirement,
  BattlePassReward,
} from "@/types/api/battle-pass";

const copy = {
  ko: {
    eyebrow: "시즌",
    title: "배틀패스 보상",
    description: "페이지를 선택해 획득 가능한 보상과 필요한 교환 문서를 확인하세요.",
    pages: "페이지",
    documentTypes: "문서 종류",
    catalog: "문서 카탈로그",
    progression: "배틀패스 진행도",
    active: "선택됨",
    rewards: "보상",
    price: "가격",
    requirements: "필요 문서",
    noRewards: "이 페이지에는 등록된 보상이 없습니다.",
    unavailable: "현재 배틀패스 정보를 불러올 수 없습니다.",
    unavailableDescription: "활성 시즌이 없거나 잠시 조회할 수 없는 상태입니다.",
    imageUnavailable: "이미지 준비 중",
  },
  en: {
    eyebrow: "Season",
    title: "Battle Pass Rewards",
    description: "Select a page to view its rewards and required exchange documents.",
    pages: "Pages",
    documentTypes: "Document types",
    catalog: "Document catalog",
    progression: "Battle pass progression",
    active: "Active",
    rewards: "Rewards",
    price: "Price",
    requirements: "Required documents",
    noRewards: "There are no rewards on this page.",
    unavailable: "Battle pass information is unavailable.",
    unavailableDescription: "There is no active season, or it cannot be loaded right now.",
    imageUnavailable: "Image pending",
  },
  ja: {
    eyebrow: "シーズン",
    title: "バトルパス報酬",
    description: "ページを選択して、報酬と交換に必要な文書を確認できます。",
    pages: "ページ",
    documentTypes: "文書タイプ",
    catalog: "文書カタログ",
    progression: "バトルパス進行",
    active: "選択中",
    rewards: "報酬",
    price: "価格",
    requirements: "必要文書",
    noRewards: "このページには報酬が登録されていません。",
    unavailable: "バトルパス情報を読み込めません。",
    unavailableDescription: "有効なシーズンがないか、現在取得できません。",
    imageUnavailable: "画像準備中",
  },
} as const;

type LocalizedName = {
  name_en: string | null;
  name_ko: string | null;
  name_ja: string | null;
};

function localizedName(data: LocalizedName, locale: Locale) {
  if (locale === "ko") return data.name_ko ?? data.name_en ?? "";
  if (locale === "ja") return data.name_ja ?? data.name_en ?? "";
  return data.name_en ?? "";
}

function seasonTitle(data: BattlePassData, locale: Locale) {
  const season = data.season;
  if (locale === "ko") return season.title_ko ?? season.title_en ?? season.code;
  if (locale === "ja") return season.title_ja ?? season.title_en ?? season.code;
  return season.title_en ?? season.code;
}

export function BattlePassPage({
  data,
  locale,
}: {
  data: BattlePassData | null;
  locale: Locale;
}) {
  const labels = copy[locale];
  const [selectedPageNumber, setSelectedPageNumber] = useState(data?.pages[0]?.page_number ?? 1);

  useEffect(() => {
    if (data?.pages.length && !data.pages.some((page) => page.page_number === selectedPageNumber)) {
      setSelectedPageNumber(data.pages[0].page_number);
    }
  }, [data, selectedPageNumber]);

  const selectedPage = useMemo(
    () => data?.pages.find((page) => page.page_number === selectedPageNumber) ?? data?.pages[0],
    [data, selectedPageNumber],
  );

  if (!data) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-[1440px] items-center justify-center px-4 py-12 sm:px-7 lg:px-16">
        <div className="w-full max-w-xl rounded-xl border border-line bg-surface px-6 py-12 text-center shadow-sm">
          <FileQuestion className="mx-auto size-10 text-gray-400 dark:text-gray-500" aria-hidden="true" />
          <h1 className="mt-4 text-xl font-bold">{labels.unavailable}</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {labels.unavailableDescription}
          </p>
        </div>
      </main>
    );
  }

  const totalPages = data.season.page_count || data.pages.length;
  const currentPageNumber = selectedPage?.page_number ?? selectedPageNumber;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] px-4 py-9 sm:px-7 sm:py-10 lg:px-16 lg:py-14">
      <header className="flex flex-col gap-7 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">
            {labels.eyebrow} / {seasonTitle(data, locale)}
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl">{labels.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400">{labels.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end">
          <MetaPill>{totalPages} {labels.pages}</MetaPill>
          <MetaPill>{data.documents.length} {labels.documentTypes}</MetaPill>
        </div>
      </header>

      <section className="mt-7" aria-labelledby="document-catalog-title">
        <h2 id="document-catalog-title" className="sr-only">{labels.catalog}</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {data.documents.map((document) => (
            <DocumentCatalogItem key={document.id} document={document} locale={locale} />
          ))}
        </div>
      </section>

      <nav className="mt-6 border-t border-line pt-3" aria-label={labels.progression}>
        <div className="mb-3 flex items-center justify-between gap-4 px-0.5">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">{labels.progression}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400">
            {String(currentPageNumber).padStart(2, "0")} / {String(totalPages).padStart(2, "0")} {labels.active}
          </span>
        </div>
        <div className="overflow-x-auto pb-1">
          <div className="grid min-w-[720px] grid-cols-6 border-y border-line lg:min-w-0">
            {data.pages.map((page) => {
              const active = page.page_number === currentPageNumber;
              return (
                <button
                  key={page.page_number}
                  type="button"
                  className={`relative flex min-h-16 items-center gap-2.5 border-l border-line px-3 text-left first:border-l-0 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${active ? "bg-orange-50 text-gray-950 shadow-[inset_0_-2px_0_#f97316] dark:bg-orange-400/10 dark:text-white" : "bg-surface text-gray-500 hover:bg-surface-elevated hover:text-foreground dark:text-gray-400"}`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setSelectedPageNumber(page.page_number)}
                >
                  <span className="font-mono text-xl font-black text-orange-600 dark:text-orange-400">{String(page.page_number).padStart(2, "0")}</span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <b className="text-[10px] tracking-[0.08em]">PAGE {String(page.page_number).padStart(2, "0")}</b>
                    <small className="text-[9px] uppercase tracking-[0.04em] text-gray-500 dark:text-gray-400">{page.rewards.length} {labels.rewards}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="flex items-baseline justify-between gap-4 pb-4 pt-9">
        <h2 className="text-xl font-black tracking-[-0.03em] sm:text-2xl">PAGE {String(currentPageNumber).padStart(2, "0")} {labels.rewards.toUpperCase()}</h2>
        <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">{selectedPage?.rewards.length ?? 0} {labels.rewards}</span>
      </div>

      {selectedPage?.rewards.length ? (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label={`Page ${currentPageNumber} ${labels.rewards}`}>
          {selectedPage.rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} locale={locale} labels={labels} />
          ))}
        </section>
      ) : (
        <div className="rounded-xl border border-dashed border-line bg-surface px-6 py-16 text-center text-sm text-gray-500 dark:text-gray-400">{labels.noRewards}</div>
      )}
    </main>
  );
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-line bg-surface px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-400">{children}</span>;
}

function DocumentCatalogItem({ document, locale }: { document: BattlePassDocument; locale: Locale }) {
  const classified = document.document_role === "classified";
  return (
    <article className={`flex min-w-0 items-center gap-3 rounded-lg border p-2.5 ${classified ? "border-amber-400/40 bg-amber-50 dark:border-amber-400/25 dark:bg-amber-400/10" : "border-line bg-surface"}`}>
      <DocumentImage document={document} size="catalog" />
      <div className="min-w-0">
        <strong className={`block truncate text-xs ${classified ? "text-amber-800 dark:text-amber-300" : "text-foreground"}`}>{localizedName(document, locale)}</strong>
        <small className="mt-0.5 block truncate text-[10px] text-gray-500 dark:text-gray-400">{document.name_en}</small>
      </div>
    </article>
  );
}

function RewardCard({ reward, locale, labels }: { reward: BattlePassReward; locale: Locale; labels: (typeof copy)[Locale] }) {
  const classified = reward.requirements.some((requirement) => requirement.document.document_role === "classified");
  return (
    <article className={`overflow-hidden rounded-xl border bg-surface shadow-sm ${classified ? "border-amber-400/40" : "border-line"}`}>
      <RewardVisual reward={reward} label={labels.imageUnavailable} classified={classified} locale={locale} />
      <div className="px-4 pb-4 pt-1">
        <div className="flex items-center justify-between gap-2 text-[11px] text-gray-500 dark:text-gray-400">
          <span className="truncate">{reward.reward_type}</span>
          <b className="shrink-0 font-mono text-[10px] uppercase tracking-[0.06em] text-orange-600 dark:text-orange-400">{labels.price} {reward.document_price}</b>
        </div>
        <h3 className="mt-1.5 min-h-10 text-[15px] font-bold leading-5 tracking-[-0.02em]">{localizedName(reward, locale)}</h3>
        <div className="mt-3 grid gap-1.5">
          <span className="text-[11px] text-gray-500 dark:text-gray-400">{labels.requirements} {reward.requirements.length}</span>
          {reward.requirements.map((requirement) => (
            <RequirementBadge key={`${reward.id}-${requirement.document.id}`} requirement={requirement} locale={locale} />
          ))}
        </div>
      </div>
    </article>
  );
}

function RewardVisual({ reward, label, classified, locale }: { reward: BattlePassReward; label: string; classified: boolean; locale: Locale }) {
  return (
    <div className={`relative m-2.5 flex h-48 items-center justify-center overflow-hidden rounded-lg border ${classified ? "border-amber-400/30 bg-amber-100/70 dark:bg-amber-400/10" : "border-line bg-surface-elevated"}`}>
      {reward.image ? (
        <Image src={reward.image} alt={localizedName(reward, locale)} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-contain p-5" />
      ) : (
        <div className="flex flex-col items-center gap-3 text-gray-400 dark:text-gray-500">
          <Package className="size-10" strokeWidth={1.2} aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-[0.08em]">{label}</span>
        </div>
      )}
      {reward.reward_quantity > 1 ? <span className="absolute bottom-2 right-2 rounded-md bg-gray-950/80 px-2 py-1 font-mono text-xs font-bold text-white">×{reward.reward_quantity}</span> : null}
    </div>
  );
}

function RequirementBadge({ requirement, locale }: { requirement: BattlePassRequirement; locale: Locale }) {
  const classified = requirement.document.document_role === "classified";
  return (
    <div className={`flex min-h-14 items-center gap-2 rounded-lg border p-1.5 ${classified ? "border-amber-400/35 bg-amber-50 dark:bg-amber-400/10" : "border-line bg-background/60"}`}>
      <DocumentImage document={requirement.document} size="requirement" />
      <div className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2 text-xs font-semibold">
          <span className="truncate">{localizedName(requirement.document, locale)}</span>
          <strong className="shrink-0 font-mono">×{requirement.quantity}</strong>
        </span>
        <small className="mt-0.5 block truncate text-[9px] text-gray-500 dark:text-gray-400">{requirement.document.name_en}</small>
      </div>
    </div>
  );
}

function DocumentImage({ document, size }: { document: Pick<BattlePassDocument, "image" | "name_en" | "name_ko" | "name_ja" | "document_role">; size: "catalog" | "requirement" }) {
  const dimensions = size === "catalog" ? "h-12 w-9" : "h-11 w-8";
  return (
    <div className={`relative ${dimensions} shrink-0 overflow-hidden rounded border ${document.document_role === "classified" ? "border-amber-400/40 bg-amber-100 dark:bg-amber-950/30" : "border-line bg-surface-elevated"}`}>
      {document.image ? <Image src={document.image} alt="" fill sizes="36px" className="object-contain p-0.5" /> : <FileQuestion className="absolute inset-0 m-auto size-4 text-gray-400" aria-hidden="true" />}
    </div>
  );
}
