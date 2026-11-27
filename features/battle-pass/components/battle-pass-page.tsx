"use client";

import Image from "next/image";
import { FileQuestion, Package } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { HorizontalAdBanner } from "@/components/shared/ad-banner";
import { documentMapName, kordBreachGuide, rewardTypeName } from "../season-guide";
import type { Locale } from "@/i18n/config";
import type {
  BattlePassData,
  BattlePassDocument,
  BattlePassRequirement,
  BattlePassReward,
} from "@/types/api/battle-pass";

const copy = {
  ko: {
    allRewards: "전체 보상 한눈에",
    summary: ["총 보상", "페이지", "전체 필요 문서", "하루 최대 획득"],
    pageLabel: (page: number) => `${page}페이지`,
    price: (count: number) => `문서 ${count}장`,
    pageTotal: "페이지",
    first: "처음부터 열림",
    unlock: (page: number, count: number, total: number) => `${page}페이지 보상 ${total}개 중 ${count}개 받으면 열림`,
    vary: "보상에 필요한 문서 종류는 플레이어마다 다를 수 있어요. 필요한 개수는 같습니다.",
    shared: "모든 모드를 합쳐 하루 최대 40장이에요. 작전 과제로 받은 문서는 한도에 포함되지 않아요.",
    classified: "확장 허브에서 구매할 수 있고, 모든 문서를 대신하며 다음 배틀패스에서도 사용할 수 있어요.",
    steps: ["문서 줍기 · 모든 맵과 모드에서 PMC와 스캐브가 각자의 문서를 주울 수 있어요.", "문서로 보상 해금 · 보상에 필요한 수만큼 문서를 내세요.", "다음 페이지 열기 · 앞 페이지의 보상을 필요한 수만큼 받으세요."],
    season: "시즌",
    title: "배틀패스",
    description: "레이드에서 TerraGroup 문서를 모아 보상을 해금하세요. 진행도와 보상은 모든 게임 모드가 공유합니다.",
    pageSelection: "페이지 선택",
    rewards: "보상",
    rewardCount: (count: number) => `보상 ${count}개`,
    pageRewards: (page: number) => `${page}페이지 보상`,
    requirements: "필요 문서",
    documentIndex: "DOCUMENT INDEX",
    documentList: "문서 종류와 나오는 맵",
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
    allRewards: "All rewards",
    summary: ["Total rewards", "Pages", "Total required documents", "Daily maximum"],
    pageLabel: (page: number) => `Page ${page}`,
    price: (count: number) => `${count} documents`,
    pageTotal: "Pages",
    first: "Unlocked from the start",
    unlock: (page: number, count: number, total: number) => `Claim ${count} of ${total} rewards on page ${page} to unlock`,
    vary: "Required document types can differ between players. The number required stays the same.",
    shared: "Collect up to 40 across all modes per day. Documents from Operational Tasks do not count toward the limit.",
    classified: "Available in the Expansion Hub. Replaces any document type and carries over to future battle passes.",
    steps: ["Find documents · PMC and Scav players can pick up their own copy on every map and mode.", "Unlock rewards · Turn in the required number of documents.", "Open the next page · Claim the required number of rewards from the previous page."],
    season: "Season",
    title: "Battle Pass",
    description: "Collect TerraGroup documents in raids to unlock rewards. Progress and rewards are shared across game modes.",
    pageSelection: "Select Page",
    rewards: "Rewards",
    rewardCount: (count: number) => `${count} rewards`,
    pageRewards: (page: number) => `Page ${page} Rewards`,
    requirements: "Required documents",
    documentIndex: "DOCUMENT INDEX",
    documentList: "Document Types and Maps",
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
    allRewards: "全報酬一覧",
    summary: ["総報酬", "ページ", "必要文書の合計", "1日の上限"],
    pageLabel: (page: number) => `${page}ページ`,
    price: (count: number) => `文書 ${count}枚`,
    pageTotal: "ページ",
    first: "最初から解放",
    unlock: (page: number, count: number, total: number) => `${page}ページの報酬${total}個中${count}個を受け取ると解放`,
    vary: "必要な文書の種類はプレイヤーによって異なります。必要数は同じです。",
    shared: "全モード合計で1日最大40枚です。作戦タスクの文書は上限に含まれません。",
    classified: "拡張ハブで購入でき、すべての文書の代わりに使用できます。次のバトルパスにも持ち越せます。",
    steps: ["文書を拾う · 全マップ・全モードでPMCもScavも自分の文書を拾えます。", "文書で報酬を解放 · 必要数の文書を納品します。", "次のページを開く · 前のページで必要数の報酬を受け取ります。"],
    season: "シーズン",
    title: "バトルパス",
    description: "レイドでTerraGroupの文書を集めて報酬を解放しましょう。進行度と報酬は全モード共通です。",
    pageSelection: "ページ選択",
    rewards: "報酬",
    rewardCount: (count: number) => `報酬 ${count}個`,
    pageRewards: (page: number) => `${page}ページ報酬`,
    requirements: "必要文書",
    documentIndex: "DOCUMENT INDEX",
    documentList: "文書の種類と出現マップ",
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
      <main className="mx-auto flex min-h-[70vh] w-full max-w-[1280px] items-center justify-center px-4 py-12 sm:px-7 lg:px-10">
        <div className="w-full max-w-xl rounded-xl border border-line bg-surface px-6 py-12 text-center shadow-sm">
          <FileQuestion className="mx-auto size-10 text-gray-400 dark:text-gray-500" aria-hidden="true" />
          <h1 className="mt-4 text-xl font-bold">{labels.unavailable}</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{labels.unavailableDescription}</p>
        </div>
      </main>
    );
  }

  const totalPages = data.season.page_count || data.pages.length;
  const pages = [...data.pages].sort((a, b) => a.page_number - b.page_number);
  const previous = selectedPage ? pages[pages.indexOf(selectedPage) - 1] : undefined;
  const allRewards = pages.flatMap((page) => [...page.rewards]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((reward) => ({ page: page.page_number, reward })));
  const totalPrice = allRewards.reduce((total, { reward }) => total + reward.document_price, 0);
  const guide = data.season.code === "kord-breach" ? kordBreachGuide : null;
  const currentPageNumber = selectedPage?.page_number ?? selectedPageNumber;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1280px] px-4 py-8 sm:px-7 sm:py-10 lg:px-10 lg:py-14">
      <header className="rounded-2xl border border-line bg-surface p-5 sm:p-8">
        <span className="block text-xs font-bold tracking-wider text-amber-800 dark:text-amber-300">
          {labels.season} · {seasonTitle(data, locale)}
        </span>
        <h1 className="mt-3 text-center text-3xl font-black tracking-tight sm:text-4xl">{labels.title}</h1>
        <p className="mt-4 text-sm leading-6 text-gray-700 dark:text-gray-300">{labels.description}</p>
        <SeasonProgress season={data.season} locale={locale} />
        <dl className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[allRewards.length, totalPages, totalPrice, ...(guide ? [guide.dailyLimits[0]] : [])].map((value, index) => (
            <div key={labels.summary[index]} className="grid gap-1 rounded-lg border border-line bg-surface-elevated p-3">
              <dt className="col-start-1 row-start-2 text-xs text-gray-600 dark:text-gray-400">{labels.summary[index]}</dt>
              <dd className="col-start-1 row-start-1 text-xl font-black tabular-nums">{new Intl.NumberFormat(locale).format(value)}</dd>
            </div>
          ))}
        </dl>
      </header>
      {guide && <ol className="mt-4 grid list-inside list-decimal gap-3 sm:grid-cols-3">
        {labels.steps.map((step) => <li key={step} className="rounded-xl border border-line bg-surface p-4 text-sm leading-6 marker:font-bold marker:text-amber-800 dark:marker:text-amber-300">{step}</li>)}
      </ol>}

      <nav className="mt-8" aria-label={labels.pageSelection}>
        <div className="mb-3 flex items-center justify-between gap-4 px-0.5">
          <span className="text-xl font-bold tracking-[-0.03em] text-amber-600 dark:text-amber-400">{labels.pageSelection}</span>
          <span className="font-mono text-sm text-gray-500 dark:text-gray-400">{currentPageNumber} / {totalPages}</span>
        </div>
        <div className="pb-1">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {pages.map((page) => {
              const active = page.page_number === currentPageNumber;
              return (
                <button
                  key={page.page_number}
                  type="button"
                  className={`relative grid min-h-20 gap-1 rounded-lg border border-line px-2 py-2 text-left sm:px-3 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${active ? "bg-amber-50 text-gray-950 shadow-[inset_0_-2px_0_#d97706] dark:bg-amber-400/10 dark:text-white dark:shadow-[inset_0_-2px_0_#f4bd58]" : "bg-surface text-foreground hover:bg-surface-elevated"}`}
                  aria-current={active ? "page" : undefined}
                  aria-label={`${page.page_number}, ${labels.rewardCount(page.rewards.length)}`}
                  onClick={() => setSelectedPageNumber(page.page_number)}
                >
                  <span className="text-sm font-black text-amber-800 dark:text-amber-300">{labels.pageLabel(page.page_number)}</span>
                  <b className="text-xs tracking-[0.04em]">{labels.rewardCount(page.rewards.length)}</b>
                  <span className="text-xs">{labels.price(page.rewards.reduce((sum, reward) => sum + reward.document_price, 0))}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="flex flex-col gap-2 pb-5 pt-10 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="text-xl font-bold tracking-[-0.03em] sm:text-2xl">{labels.pageRewards(currentPageNumber)}</h2>
        {selectedPage && <div className="flex flex-wrap gap-2 text-xs">
          {[labels.rewardCount(selectedPage.rewards.length), labels.price(selectedPage.rewards.reduce((sum, reward) => sum + reward.document_price, 0)), previous ? labels.unlock(previous.page_number, selectedPage.required_previous_page_reward_count, previous.rewards.length) : labels.first].map((value) => (
            <span key={value} className="rounded-full border border-line bg-surface-elevated px-3 py-1">{value}</span>
          ))}
        </div>}
      </div>
      <p className="mb-4 rounded-lg border border-dashed border-line bg-surface p-3 text-xs text-gray-700 dark:text-gray-300">{labels.vary}</p>

      {selectedPage?.rewards.length ? (
        <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5" aria-label={labels.pageRewards(currentPageNumber)}>
          {[...selectedPage.rewards].sort((a, b) => a.sort_order - b.sort_order).map((reward, index) => (
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

      <HorizontalAdBanner placement="content" />

      <InfoSection
        kicker={labels.documentIndex}
        title={labels.documentList}
        description={labels.documentDescription}
      >
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {data.documents.map((document) => (
            <DocumentCatalogItem
              key={document.id}
              document={document}
              locale={locale}
              total={documentTotals.get(document.id) ?? 0}
              maps={guide?.maps[document.name_en]}
              showGuide={!!guide}
              labels={labels}
            />
          ))}
        </div>
      </InfoSection>

      {guide && <><InfoSection
        kicker={labels.dailyLimit}
        title={labels.dailyLimitTitle}
        description={labels.dailyLimitDescription}
      >
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
          {[labels.seasonalPvp, labels.pvpZone, labels.pveZone].map((mode, index) => (
            <div key={mode} className="flex items-center justify-between gap-4 bg-surface px-5 py-4">
              <span className="text-sm font-semibold">{mode}</span>
              <strong className="whitespace-nowrap font-mono text-xs text-amber-600 dark:text-amber-400">{labels.perDay(guide.dailyLimits[index])}</strong>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{labels.shared}</p>
      </InfoSection>

      <InfoSection kicker={labels.exchange} title={labels.exchangeTitle}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[labels.exchangeDocument, labels.exchangeCrate].map((rule) => (
            <li key={rule} className="flex items-center gap-4 rounded-xl border border-line bg-surface px-5 py-4 text-sm font-medium leading-6">
              <span className="size-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
              {rule}
            </li>
          ))}
        </ul>
      </InfoSection></>}
      <details className="mt-8 rounded-xl border border-line bg-surface p-4">
        <summary className="cursor-pointer font-bold focus-visible:outline-2 focus-visible:outline-accent">{labels.allRewards}</summary>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr><th className="p-2" scope="col">{labels.pageTotal}</th><th className="p-2" scope="col">{labels.rewards}</th><th className="p-2 text-right" scope="col">{labels.requirements}</th></tr></thead>
            <tbody>{allRewards.map(({ page, reward }) => <tr key={reward.id} className="border-t border-line">
              <td className="whitespace-nowrap p-2">{labels.pageLabel(page)}</td>
              <td className="p-2">{reward.name_en}</td>
              <td className="whitespace-nowrap p-2 text-right tabular-nums">{labels.price(reward.document_price)}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </details>
    </main>
  );
}

function SeasonProgress({ season, locale }: { season: BattlePassData["season"]; locale: Locale }) {
  const [now, setNow] = useState<number>();
  useEffect(() => { setNow(Date.now()); }, []);
  const start = Date.parse(season.start_time ?? "");
  const end = Date.parse(season.end_time ?? "");
  if (now === undefined || !Number.isFinite(start) || !Number.isFinite(end) || end <= start) return null;
  const progress = Math.round(Math.max(0, Math.min(1, (now - start) / (end - start))) * 100);
  const days = Math.ceil((end - now) / 86_400_000);
  const dates = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "Asia/Seoul" });
  return <div className="mt-4">
    <progress aria-label={`${copy[locale].season} · ${progress}%`} value={progress} max={100} className="h-2 w-full accent-amber-600" />
    <p className="flex flex-wrap justify-between gap-2 text-xs text-gray-600 dark:text-gray-400">
      <span>{dates.format(start)}</span><span>{progress}%</span><span>{dates.format(end)}{days > 0 && ` · D-${days}`}</span>
    </p>
  </div>;
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
  maps,
  showGuide,
  labels,
}: {
  document: BattlePassDocument;
  locale: Locale;
  total: number;
  maps?: readonly string[];
  showGuide: boolean;
  labels: (typeof copy)[Locale];
}) {
  const classified = document.document_role === "classified";
  return (
    <article className={`flex min-w-0 items-start gap-3 rounded-lg border border-line bg-surface p-3 ${classified ? "bg-amber-50 dark:bg-amber-400/10" : ""}`}>
      <DocumentImage document={document} size="catalog" />
      <div className="grid min-w-0 gap-0.5">
        <strong className={`break-words text-sm ${classified ? "text-amber-800 dark:text-amber-300" : "text-foreground"}`}>{localizedName(document, locale)}</strong>
        {maps?.length ? <small className="text-xs text-gray-600 dark:text-gray-400">{maps.map((map) => documentMapName(map, locale)).join(" · ")}</small> : null}
        <b className={`font-mono text-sm ${classified ? "text-gray-500 dark:text-gray-400" : "text-amber-600 dark:text-amber-400"}`}>
          {classified ? labels.classifiedPurchase : labels.totalDocuments(total)}
        </b>
        {classified && showGuide && <p className="text-xs leading-5">{labels.classified}</p>}
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
        eager={eagerImage}
      />
      <div className="px-2 pb-3 pt-1 sm:px-3">
        <div className="flex flex-wrap justify-between gap-1 text-xs"><span className="text-gray-600 dark:text-gray-400">{rewardTypeName(reward.reward_type, locale)}</span><span className="rounded bg-amber-500/10 px-1.5 text-amber-800 dark:text-amber-300">{labels.price(reward.document_price)}</span></div>
        <h3 className="mb-4 mt-2 min-h-11 text-[15px] font-semibold leading-[1.45] tracking-[-0.02em]">{reward.name_en}</h3>
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
  eager,
}: {
  reward: BattlePassReward;
  label: string;
  classified: boolean;
  eager: boolean;
}) {
  return (
    <div className={`relative m-2.5 flex aspect-square items-center justify-center overflow-hidden rounded-lg border ${classified ? "border-amber-400/30 bg-amber-100/70 dark:bg-amber-400/10" : "border-line bg-surface-elevated"}`}>
      {reward.image ? (
        <Image
          src={reward.image}
          alt={reward.name_en}
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
    <div className="flex min-w-0 items-center gap-1.5 border-t border-line py-2 sm:gap-2">
      <DocumentImage document={requirement.document} size="requirement" />
      <span className={`min-w-0 flex-1 break-words text-xs font-semibold leading-4 ${classified ? "text-amber-700 dark:text-amber-300" : ""}`}>{localizedName(requirement.document, locale)}</span>
      <strong className="shrink-0 rounded bg-amber-500/10 px-1.5 py-1 text-center text-xs font-bold tabular-nums text-amber-800 dark:text-amber-300">×{requirement.quantity}</strong>
    </div>
  );
}

function DocumentImage({ document, size }: { document: Pick<BattlePassDocument, "image" | "name_en" | "name_ko" | "name_ja" | "document_role">; size: "catalog" | "requirement" }) {
  const dimensions = size === "catalog" ? "h-[50px] w-[38px]" : "h-8 w-6 sm:h-10 sm:w-8";
  return (
    <div className={`relative ${dimensions} shrink-0 overflow-hidden rounded border ${document.document_role === "classified" ? "border-amber-400/40 bg-amber-100 dark:bg-amber-950/30" : "border-line bg-surface-elevated"}`}>
      {document.image ? <Image src={document.image} alt="" fill sizes="42px" className="object-contain p-0.5" /> : <FileQuestion className="absolute inset-0 m-auto size-4 text-gray-400" aria-hidden="true" />}
    </div>
  );
}
