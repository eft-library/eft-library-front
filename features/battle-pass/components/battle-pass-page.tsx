"use client";

import Image from "next/image";
import { FileQuestion, Package } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { HorizontalAdBanner } from "@/components/shared/ad-banner";
import type { Locale } from "@/i18n/config";
import type {
  BattlePassData,
  BattlePassDocument,
  BattlePassRequirement,
  BattlePassReward,
} from "@/types/api/battle-pass";

const copy = {
  ko: {
    season: "시즌",
    title: "배틀패스 보상",
    description: "페이지는 순서대로 해금되며, 다음 페이지는 이전 페이지의 보상을 일정 수만큼 획득하면 열립니다.",
    pageSelection: "페이지 선택",
    rewards: "보상",
    rewardCount: (count: number) => `보상 ${count}개`,
    pageRewards: (page: number) => `${page}페이지 보상`,
    unlockNotice: (count: number) => `이전 페이지에서 보상 ${count}개 획득 시 해금됩니다.`,
    requirements: "필요 문서",
    documentIndex: "DOCUMENT INDEX",
    documentList: "필요 문서 목록",
    documentDescription: "모든 보상 교환에 필요한 문서의 총 수량입니다.",
    totalDocuments: (count: number) => `총 ${count}개`,
    classifiedPurchase: "타르코인으로 구매 가능",
    dailyLimit: "DAILY LIMIT",
    dailyLimitTitle: "문서 일일 획득 제한",
    dailyLimitDescription: "일일 획득 제한은 24시간마다 초기화되며, 모드끼리 공유합니다.",
    seasonalPvp: "시즌제 PVP",
    pvpZone: "PVP 존",
    pveZone: "PVE 존",
    perDay: (count: number) => `하루 ${count}장`,
    exchange: "DOCUMENT EXCHANGE",
    exchangeTitle: "문서 교환",
    exchangeDocument: "문서 5장 → 원하는 종류의 문서 1장",
    exchangeCrate: "문서 10장 → Black Division Gear Crate",
    noRewards: "이 페이지에는 등록된 보상이 없습니다.",
    unavailable: "현재 배틀패스 정보를 불러올 수 없습니다.",
    unavailableDescription: "활성 시즌이 없거나 잠시 조회할 수 없는 상태입니다.",
    imageUnavailable: "이미지 준비 중",
  },
  en: {
    season: "Season",
    title: "Battle Pass Rewards",
    description: "Pages unlock in order after earning a required number of rewards from the previous page.",
    pageSelection: "Select Page",
    rewards: "Rewards",
    rewardCount: (count: number) => `${count} rewards`,
    pageRewards: (page: number) => `Page ${page} Rewards`,
    unlockNotice: (count: number) => `Unlocks after earning ${count} rewards from the previous page.`,
    requirements: "Required documents",
    documentIndex: "DOCUMENT INDEX",
    documentList: "Required Document List",
    documentDescription: "Total documents required to exchange every reward.",
    totalDocuments: (count: number) => `${count} total`,
    classifiedPurchase: "Available with TarCoin",
    dailyLimit: "DAILY LIMIT",
    dailyLimitTitle: "Daily Document Limit",
    dailyLimitDescription: "The daily limit resets every 24 hours and is shared across modes.",
    seasonalPvp: "Seasonal PVP",
    pvpZone: "PVP Zone",
    pveZone: "PVE Zone",
    perDay: (count: number) => `${count} per day`,
    exchange: "DOCUMENT EXCHANGE",
    exchangeTitle: "Document Exchange",
    exchangeDocument: "5 documents → 1 document of your choice",
    exchangeCrate: "10 documents → Black Division Gear Crate",
    noRewards: "There are no rewards on this page.",
    unavailable: "Battle pass information is unavailable.",
    unavailableDescription: "There is no active season, or it cannot be loaded right now.",
    imageUnavailable: "Image pending",
  },
  ja: {
    season: "シーズン",
    title: "バトルパス報酬",
    description: "ページは順番に解放され、前のページで一定数の報酬を獲得すると次のページが開きます。",
    pageSelection: "ページ選択",
    rewards: "報酬",
    rewardCount: (count: number) => `報酬 ${count}個`,
    pageRewards: (page: number) => `${page}ページ報酬`,
    unlockNotice: (count: number) => `前のページで報酬を${count}個獲得すると解放されます。`,
    requirements: "必要文書",
    documentIndex: "DOCUMENT INDEX",
    documentList: "必要文書一覧",
    documentDescription: "すべての報酬交換に必要な文書の合計数です。",
    totalDocuments: (count: number) => `合計 ${count}枚`,
    classifiedPurchase: "TarCoinで購入可能",
    dailyLimit: "DAILY LIMIT",
    dailyLimitTitle: "文書の1日獲得制限",
    dailyLimitDescription: "獲得制限は24時間ごとにリセットされ、モード間で共有されます。",
    seasonalPvp: "シーズン制PVP",
    pvpZone: "PVPゾーン",
    pveZone: "PVEゾーン",
    perDay: (count: number) => `1日 ${count}枚`,
    exchange: "DOCUMENT EXCHANGE",
    exchangeTitle: "文書交換",
    exchangeDocument: "文書5枚 → 好きな種類の文書1枚",
    exchangeCrate: "文書10枚 → Black Division Gear Crate",
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

function getDocumentTotals(data: BattlePassData) {
  const totals = new Map<string, number>();

  data.pages.forEach((page) => {
    page.rewards.forEach((reward) => {
      reward.requirements.forEach((requirement) => {
        totals.set(
          requirement.document.id,
          (totals.get(requirement.document.id) ?? 0) + requirement.quantity,
        );
      });
    });
  });

  return totals;
}

export function BattlePassPage({ data, locale }: { data: BattlePassData | null; locale: Locale }) {
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
  const documentTotals = useMemo(() => (data ? getDocumentTotals(data) : new Map<string, number>()), [data]);

  if (!data) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-[1440px] items-center justify-center px-4 py-12 sm:px-7 lg:px-16">
        <div className="w-full max-w-xl rounded-xl border border-line bg-surface px-6 py-12 text-center shadow-sm">
          <FileQuestion className="mx-auto size-10 text-gray-400 dark:text-gray-500" aria-hidden="true" />
          <h1 className="mt-4 text-xl font-bold">{labels.unavailable}</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{labels.unavailableDescription}</p>
        </div>
      </main>
    );
  }

  const totalPages = data.season.page_count || data.pages.length;
  const currentPageNumber = selectedPage?.page_number ?? selectedPageNumber;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] px-4 py-8 sm:px-7 sm:py-10 lg:px-16 lg:py-14">
      <header className="pb-6">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-600 dark:text-amber-400">
          {labels.season} 01 / {seasonTitle(data, locale)}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.045em] sm:text-4xl">{labels.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-400">{labels.description}</p>
      </header>

      <nav className="mt-1 border-t border-line pt-4" aria-label={labels.pageSelection}>
        <div className="mb-3 flex items-center justify-between gap-4 px-0.5">
          <span className="text-xl font-bold tracking-[-0.03em] text-amber-600 dark:text-amber-400">{labels.pageSelection}</span>
          <span className="font-mono text-sm text-gray-500 dark:text-gray-400">{currentPageNumber} / {totalPages}</span>
        </div>
        <div className="overflow-x-auto pb-1">
          <div className="grid min-w-[720px] grid-cols-6 lg:min-w-0">
            {data.pages.map((page) => {
              const active = page.page_number === currentPageNumber;
              return (
                <button
                  key={page.page_number}
                  type="button"
                  className={`relative flex min-h-14 items-center gap-2.5 border-l border-t border-line px-3 text-left first:border-l-0 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${active ? "bg-amber-50 text-gray-950 shadow-[inset_0_-2px_0_#d97706] dark:bg-amber-400/10 dark:text-white dark:shadow-[inset_0_-2px_0_#f4bd58]" : "bg-transparent text-gray-500 hover:bg-surface-elevated hover:text-foreground dark:text-gray-400"}`}
                  aria-current={active ? "page" : undefined}
                  aria-label={`${page.page_number}, ${labels.rewardCount(page.rewards.length)}`}
                  onClick={() => setSelectedPageNumber(page.page_number)}
                >
                  <span className="font-mono text-xl font-black text-amber-600 dark:text-amber-400">{String(page.page_number).padStart(2, "0")}</span>
                  <b className="text-xs tracking-[0.04em]">{labels.rewardCount(page.rewards.length)}</b>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="flex flex-col gap-2 pb-5 pt-10 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="text-xl font-bold tracking-[-0.03em] sm:text-2xl">{labels.pageRewards(currentPageNumber)}</h2>
        {selectedPage && selectedPage.page_number > 1 ? (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {labels.unlockNotice(selectedPage.required_previous_page_reward_count)}
          </span>
        ) : null}
      </div>

      {selectedPage?.rewards.length ? (
        <section className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" aria-label={labels.pageRewards(currentPageNumber)}>
          {selectedPage.rewards.map((reward, index) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              locale={locale}
              labels={labels}
              eagerImage={index === 0}
            />
          ))}
        </section>
      ) : (
        <div className="rounded-xl border border-dashed border-line bg-surface px-6 py-16 text-center text-sm text-gray-500 dark:text-gray-400">{labels.noRewards}</div>
      )}

      <HorizontalAdBanner className="mb-0 mt-9" />

      <InfoSection
        kicker={labels.documentIndex}
        title={labels.documentList}
        description={labels.documentDescription}
      >
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {data.documents.map((document) => (
            <DocumentCatalogItem
              key={document.id}
              document={document}
              locale={locale}
              total={documentTotals.get(document.id) ?? 0}
              labels={labels}
            />
          ))}
        </div>
      </InfoSection>

      <InfoSection
        kicker={labels.dailyLimit}
        title={labels.dailyLimitTitle}
        description={labels.dailyLimitDescription}
      >
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
          {[
            [labels.seasonalPvp, labels.perDay(30)],
            [labels.pvpZone, labels.perDay(20)],
            [labels.pveZone, labels.perDay(15)],
          ].map(([mode, amount]) => (
            <div key={mode} className="flex items-center justify-between gap-4 bg-surface px-5 py-4">
              <span className="text-sm font-semibold">{mode}</span>
              <strong className="whitespace-nowrap font-mono text-xs text-amber-600 dark:text-amber-400">{amount}</strong>
            </div>
          ))}
        </div>
      </InfoSection>

      <InfoSection kicker={labels.exchange} title={labels.exchangeTitle}>
        <ul className="grid gap-3">
          {[labels.exchangeDocument, labels.exchangeCrate].map((rule) => (
            <li key={rule} className="flex items-center gap-4 rounded-xl border border-line bg-surface px-5 py-4 text-sm font-medium leading-6">
              <span className="size-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
              {rule}
            </li>
          ))}
        </ul>
      </InfoSection>
    </main>
  );
}

function InfoSection({
  kicker,
  title,
  description,
  children,
}: {
  kicker: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-9 border-t border-line pt-5">
      <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div>
          <span className="text-[10px] font-bold tracking-[0.16em] text-amber-600 dark:text-amber-400">{kicker}</span>
          <h2 className="mt-1.5 text-xl font-bold tracking-[-0.035em] sm:text-2xl">{title}</h2>
        </div>
        {description ? <p className="max-w-md text-sm leading-6 text-gray-500 sm:text-right dark:text-gray-400">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function DocumentCatalogItem({
  document,
  locale,
  total,
  labels,
}: {
  document: BattlePassDocument;
  locale: Locale;
  total: number;
  labels: (typeof copy)[Locale];
}) {
  const classified = document.document_role === "classified";
  return (
    <article className={`flex min-w-0 items-center gap-3 bg-surface p-3 ${classified ? "bg-amber-50 dark:bg-amber-400/10" : ""}`}>
      <DocumentImage document={document} size="catalog" />
      <div className="grid min-w-0 gap-0.5">
        <strong className={`truncate text-sm ${classified ? "text-amber-800 dark:text-amber-300" : "text-foreground"}`}>{localizedName(document, locale)}</strong>
        <small className="truncate text-xs text-gray-500 dark:text-gray-400">{document.name_en}</small>
        <b className={`font-mono text-sm ${classified ? "text-gray-500 dark:text-gray-400" : "text-amber-600 dark:text-amber-400"}`}>
          {classified ? labels.classifiedPurchase : labels.totalDocuments(total)}
        </b>
      </div>
    </article>
  );
}

function RewardCard({
  reward,
  locale,
  labels,
  eagerImage,
}: {
  reward: BattlePassReward;
  locale: Locale;
  labels: (typeof copy)[Locale];
  eagerImage: boolean;
}) {
  const classified = reward.requirements.some((requirement) => requirement.document.document_role === "classified");
  return (
    <article className={`overflow-hidden rounded-xl border bg-surface ${classified ? "border-amber-400/40" : "border-line"}`}>
      <RewardVisual
        reward={reward}
        label={labels.imageUnavailable}
        classified={classified}
        locale={locale}
        eager={eagerImage}
      />
      <div className="px-4 pb-5 pt-1">
        <span className="text-xs text-gray-500 dark:text-gray-400">{reward.reward_type}</span>
        <h3 className="mb-4 mt-2 min-h-11 text-[15px] font-semibold leading-[1.45] tracking-[-0.02em]">{localizedName(reward, locale)}</h3>
        <div>
          <span className="block pb-2 text-xs text-gray-500 dark:text-gray-400">{labels.requirements}</span>
          {reward.requirements.map((requirement) => (
            <RequirementBadge key={`${reward.id}-${requirement.document.id}`} requirement={requirement} locale={locale} />
          ))}
        </div>
      </div>
    </article>
  );
}

function RewardVisual({
  reward,
  label,
  classified,
  locale,
  eager,
}: {
  reward: BattlePassReward;
  label: string;
  classified: boolean;
  locale: Locale;
  eager: boolean;
}) {
  return (
    <div className={`relative m-2.5 flex h-52 items-center justify-center overflow-hidden rounded-lg border ${classified ? "border-amber-400/30 bg-amber-100/70 dark:bg-amber-400/10" : "border-line bg-surface-elevated"}`}>
      {reward.image ? (
        <Image
          src={reward.image}
          alt={localizedName(reward, locale)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          className="object-contain p-3"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
        />
      ) : (
        <div className="flex flex-col items-center gap-3 text-gray-400 dark:text-gray-500">
          <Package className="size-10" strokeWidth={1.2} aria-hidden="true" />
          <span className="text-xs uppercase tracking-[0.08em]">{label}</span>
        </div>
      )}
      {reward.reward_quantity > 1 ? <span className="absolute bottom-2 right-2 rounded-md bg-gray-950/80 px-2 py-1 font-mono text-xs font-bold text-white">×{reward.reward_quantity}</span> : null}
    </div>
  );
}

function RequirementBadge({ requirement, locale }: { requirement: BattlePassRequirement; locale: Locale }) {
  const classified = requirement.document.document_role === "classified";
  return (
    <div className="flex min-h-[78px] items-center gap-3 border-t border-line py-3">
      <DocumentImage document={requirement.document} size="requirement" />
      <span className={`min-w-0 flex-1 text-sm font-bold leading-5 ${classified ? "text-amber-700 dark:text-amber-300" : ""}`}>{localizedName(requirement.document, locale)}</span>
      <strong className="min-w-11 shrink-0 rounded bg-amber-500/10 px-2 py-2 text-center font-mono text-sm text-amber-600 dark:text-amber-400">×{requirement.quantity}</strong>
    </div>
  );
}

function DocumentImage({ document, size }: { document: Pick<BattlePassDocument, "image" | "name_en" | "name_ko" | "name_ja" | "document_role">; size: "catalog" | "requirement" }) {
  const dimensions = size === "catalog" ? "h-[50px] w-[38px]" : "h-14 w-[42px]";
  return (
    <div className={`relative ${dimensions} shrink-0 overflow-hidden rounded border ${document.document_role === "classified" ? "border-amber-400/40 bg-amber-100 dark:bg-amber-950/30" : "border-line bg-surface-elevated"}`}>
      {document.image ? <Image src={document.image} alt="" fill sizes="42px" className="object-contain p-0.5" /> : <FileQuestion className="absolute inset-0 m-auto size-4 text-gray-400" aria-hidden="true" />}
    </div>
  );
}
