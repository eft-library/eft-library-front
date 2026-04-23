"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { getApiBaseUrl } from "@/lib/config/app-env";
import { getPriceSearchEndpoint } from "@/lib/config/api-endpoints";
import { formatIsoDateTime } from "@/lib/utils/date-time";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { Locale } from "@/i18n/config";
import type {
  PriceSearchItem,
  PriceSearchResponse,
  PriceSummaryRow,
} from "@/types/api/price";

const copyByLocale = {
  ko: {
    title: "아이템 시세",
    description: "V3 가격 API 기준으로 아이템 시세와 최근 가격 변동을 확인합니다.",
    searchPlaceholder: "아이템 이름을 검색하세요",
    searchButton: "검색",
    totalLabel: "검색 결과",
    selectedLabel: "선택된 아이템",
    historyLabel: "최근 기록",
    trendLabel: "가격 흐름",
    marketSnapshotLabel: "시세 요약",
    modeGapLabel: "플리-상인 차이",
    hasFleaLabel: "플리 등록",
    categoryLabel: "분류",
    sizeLabel: "크기",
    noResults: "검색 결과가 없습니다.",
    backendIssue: "시세 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
    fleaLabel: "플리 마켓",
    traderLabel: "최고 상인 판매가",
    traderCountLabel: "상인 수",
    updatedLabel: "업데이트",
    previousLabel: "이전",
    nextLabel: "다음",
    pvp: "PVP",
    pve: "PVE",
  },
  en: {
    title: "Item Prices",
    description: "Review item prices and recent price history from the V3 price API.",
    searchPlaceholder: "Search for an item",
    searchButton: "Search",
    totalLabel: "Results",
    selectedLabel: "Selected item",
    historyLabel: "Recent history",
    trendLabel: "Trend",
    marketSnapshotLabel: "Market snapshot",
    modeGapLabel: "Flea vs trader",
    hasFleaLabel: "Flea listing",
    categoryLabel: "Category",
    sizeLabel: "Size",
    noResults: "No search results found.",
    backendIssue: "Failed to load the price data. Please try again shortly.",
    fleaLabel: "Flea market",
    traderLabel: "Best trader price",
    traderCountLabel: "Trader count",
    updatedLabel: "Updated",
    previousLabel: "Previous",
    nextLabel: "Next",
    pvp: "PVP",
    pve: "PVE",
  },
  ja: {
    title: "アイテム相場",
    description: "V3価格APIを基準に、アイテム相場と最近の価格履歴を確認します。",
    searchPlaceholder: "アイテム名で検索",
    searchButton: "検索",
    totalLabel: "検索結果",
    selectedLabel: "選択中のアイテム",
    historyLabel: "最近の履歴",
    trendLabel: "価格推移",
    marketSnapshotLabel: "相場概要",
    modeGapLabel: "フリマとトレーダー差額",
    hasFleaLabel: "フリマ出品",
    categoryLabel: "分類",
    sizeLabel: "サイズ",
    noResults: "検索結果がありません。",
    backendIssue: "価格データの読み込みに失敗しました。しばらくしてからもう一度お試しください。",
    fleaLabel: "フリーマーケット",
    traderLabel: "最高トレーダー価格",
    traderCountLabel: "トレーダー数",
    updatedLabel: "更新日時",
    previousLabel: "前へ",
    nextLabel: "次へ",
    pvp: "PVP",
    pve: "PVE",
  },
} as const;

function formatPrice(value: number | null, locale: Locale) {
  if (value === null) {
    return "-";
  }

  return new Intl.NumberFormat(locale === "ko" ? "ko-KR" : locale === "ja" ? "ja-JP" : "en-US").format(
    value,
  );
}

function getPriceDelta(summary: PriceSummaryRow | null) {
  if (!summary || summary.flea_market_price === null || summary.highest_trader_price === null) {
    return null;
  }

  return summary.flea_market_price - summary.highest_trader_price;
}

export function PricePage({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];
  const [query, setQuery] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [priceType, setPriceType] = useState<"pvp" | "pve">("pvp");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PriceSearchResponse | null>(null);
  const [selectedItem, setSelectedItem] = useState<PriceSearchItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const response = await fetch(
          `${getApiBaseUrl()}${getPriceSearchEndpoint(page, 20, searchWord)}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          throw new Error(String(response.status));
        }

        const payload = await response.json();
        if (payload.msg !== "OK" || payload.data === null) {
          throw new Error("invalid-payload");
        }

        if (!isMounted) {
          return;
        }

        setData(payload.data as PriceSearchResponse);
        setSelectedItem((current) =>
          current && payload.data.data.some((item: PriceSearchItem) => item.id === current.id)
            ? current
            : (payload.data.data[0] ?? null),
        );
      } catch {
        if (!isMounted) {
          return;
        }

        setData(null);
        setSelectedItem(null);
        setErrorMessage(copy.backendIssue);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [copy.backendIssue, page, searchWord]);

  const selectedPrice = selectedItem?.prices[priceType] ?? null;
  const selectedHistory = selectedItem?.history_by_type[priceType] ?? [];
  const fleaTraderDelta = getPriceDelta(selectedPrice);

  const localizedSelectedName = useMemo(() => {
    if (!selectedItem) {
      return null;
    }

    return String(
      pickLocalizedField(
        selectedItem as unknown as Record<string, unknown>,
        locale,
        "name",
      ) ?? selectedItem.name_en,
    );
  }, [locale, selectedItem]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
                {copy.title}
              </p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{copy.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                {copy.description}
              </p>
            </div>
            <form
              className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                setPage(1);
                setSearchWord(query.trim());
              }}
            >
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.searchPlaceholder}
                className="h-11 flex-1 rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-orange-400 dark:border-gray-700 dark:bg-[#2a2d35] dark:text-white"
              />
              <button
                type="submit"
                className="h-11 rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-400"
              >
                {copy.searchButton}
              </button>
            </form>
          </div>

          <div className="mt-6 inline-flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setPriceType("pvp")}
              className={`px-4 py-2 text-sm font-medium ${
                priceType === "pvp"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 dark:bg-[#2a2d35] dark:text-gray-200"
              }`}
            >
              {copy.pvp}
            </button>
            <button
              type="button"
              onClick={() => setPriceType("pve")}
              className={`px-4 py-2 text-sm font-medium ${
                priceType === "pve"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 dark:bg-[#2a2d35] dark:text-gray-200"
              }`}
            >
              {copy.pve}
            </button>
          </div>
        </section>

        {errorMessage ? (
          <section className="rounded-lg border border-amber-300 bg-amber-50 px-6 py-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
            {errorMessage}
          </section>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4 dark:border-gray-700">
              <h2 className="text-lg font-semibold">{copy.totalLabel}</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {data?.total_count ?? 0}
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              {data?.data.length ? (
                data.data.map((item) => {
                  const localizedName = String(
                    pickLocalizedField(
                      item as unknown as Record<string, unknown>,
                      locale,
                      "name",
                    ) ?? item.name_en,
                  );
                  const summary = item.prices[priceType];

                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`flex items-center gap-4 rounded-lg border p-3 text-left transition ${
                        selectedItem?.id === item.id
                          ? "border-orange-400 bg-orange-50 dark:bg-orange-500/10"
                          : "border-gray-200 hover:border-orange-300 dark:border-gray-700 dark:hover:border-orange-400"
                      }`}
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-[#252830]">
                        <Image src={item.image} alt={localizedName} fill className="object-contain p-1.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-semibold">{localizedName}</h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="truncate text-gray-500 dark:text-gray-400">
                            {item.normalized_name}
                          </span>
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 dark:bg-gray-700/60 dark:text-gray-200">
                            {item.width}x{item.height}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <p className="text-xs text-orange-500">
                            {copy.fleaLabel}: {formatPrice(summary?.flea_market_price ?? null, locale)}
                          </p>
                          <MiniTrend history={item.history_by_type[priceType]} />
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : !isLoading && !errorMessage ? (
                <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  {copy.noResults}
                </p>
              ) : null}
            </div>

            {data && data.max_pages > 1 ? (
              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={data.current_page <= 1}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
                >
                  {copy.previousLabel}
                </button>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {data.current_page} / {data.max_pages}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.min(data.max_pages, current + 1))
                  }
                  disabled={data.current_page >= data.max_pages}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
                >
                  {copy.nextLabel}
                </button>
              </div>
            ) : null}
          </div>

          <div className="space-y-6">
            <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
              <h2 className="text-lg font-semibold">{copy.selectedLabel}</h2>
              {selectedItem && localizedSelectedName ? (
                <div className="mt-5 space-y-5">
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-[#252830]">
                      <Image src={selectedItem.image} alt={localizedSelectedName} fill className="object-contain p-3" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-semibold">{localizedSelectedName}</h3>
                      <p className="mt-2 font-mono text-xs text-gray-500 dark:text-gray-400">
                        {selectedItem.normalized_name}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                          {selectedItem.category ?? "-"}
                        </span>
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600 dark:bg-gray-700/60 dark:text-gray-200">
                          {copy.sizeLabel} {selectedItem.width}x{selectedItem.height}
                        </span>
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          selectedPrice?.has_flea
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-700/60 dark:text-gray-200"
                        }`}>
                          {copy.hasFleaLabel} {selectedPrice?.has_flea ? "Yes" : "No"}
                        </span>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <PriceMetric
                          label={copy.fleaLabel}
                          value={formatPrice(selectedPrice?.flea_market_price ?? null, locale)}
                        />
                        <PriceMetric
                          label={copy.traderLabel}
                          value={formatPrice(selectedPrice?.highest_trader_price ?? null, locale)}
                        />
                        <PriceMetric
                          label={copy.traderCountLabel}
                          value={String(selectedPrice?.trader_count ?? 0)}
                        />
                        <PriceMetric
                          label={copy.updatedLabel}
                          value={
                            selectedPrice
                              ? formatIsoDateTime(selectedPrice.update_time, locale)
                              : "-"
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#252830]">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold">{copy.trendLabel}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedHistory.length} pts
                        </span>
                      </div>
                      <div className="mt-4">
                        <HistoryBars history={selectedHistory} locale={locale} />
                      </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#252830]">
                      <h3 className="text-sm font-semibold">{copy.marketSnapshotLabel}</h3>
                      <div className="mt-4 grid gap-3">
                        <PriceMetric
                          label={copy.modeGapLabel}
                          value={formatPrice(fleaTraderDelta, locale)}
                        />
                        <PriceMetric
                          label={copy.categoryLabel}
                          value={selectedItem.category ?? "-"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">{copy.noResults}</p>
              )}
            </section>

            <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
              <h2 className="text-lg font-semibold">{copy.historyLabel}</h2>
              {selectedHistory.length ? (
                <div className="mt-5 grid gap-3">
                  {selectedHistory.slice(-12).reverse().map((row, index) => (
                    <HistoryRow
                      key={`${row.price_time}-${index}`}
                      row={row}
                      locale={locale}
                      price={selectedPrice}
                    />
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">{copy.noResults}</p>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function PriceMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-[#252830]">
      <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">{label}</div>
      <div className="mt-2 text-sm font-semibold">{value}</div>
    </div>
  );
}

function MiniTrend({
  history,
}: {
  history: Array<{ price: number }>;
}) {
  if (!history.length) {
    return <div className="h-6 w-16 rounded bg-gray-100 dark:bg-gray-700/60" />;
  }

  const points = history.slice(-8);
  const max = Math.max(...points.map((point) => point.price));
  const min = Math.min(...points.map((point) => point.price));
  const range = max - min || 1;

  return (
    <div className="flex h-6 items-end gap-0.5">
      {points.map((point, index) => {
        const height = Math.max(4, Math.round(((point.price - min) / range) * 24));

        return (
          <span
            key={`${point.price}-${index}`}
            className="w-1.5 rounded-sm bg-orange-400/80"
            style={{ height: `${height}px` }}
          />
        );
      })}
    </div>
  );
}

function HistoryBars({
  history,
  locale,
}: {
  history: Array<{ price: number; price_time: string }>;
  locale: Locale;
}) {
  if (!history.length) {
    return <div className="text-sm text-gray-500 dark:text-gray-400">-</div>;
  }

  const points = history.slice(-10);
  const max = Math.max(...points.map((point) => point.price));
  const min = Math.min(...points.map((point) => point.price));
  const range = max - min || 1;

  return (
    <div className="flex items-end gap-2">
      {points.map((point, index) => {
        const height = Math.max(12, Math.round(((point.price - min) / range) * 128));

        return (
          <div key={`${point.price_time}-${index}`} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div className="flex h-36 w-full items-end">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-orange-600 to-orange-300"
                style={{ height: `${height}px` }}
                title={`${formatIsoDateTime(point.price_time, locale)} · ${formatPrice(point.price, locale)}`}
              />
            </div>
            <div className="w-full truncate text-center text-[10px] text-gray-500 dark:text-gray-400">
              {new Date(point.price_time).toLocaleDateString(
                locale === "ko" ? "ko-KR" : locale === "ja" ? "ja-JP" : "en-US",
                { month: "numeric", day: "numeric" },
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HistoryRow({
  row,
  locale,
  price,
}: {
  row: { price: number; price_time: string };
  locale: Locale;
  price: PriceSummaryRow | null;
}) {
  const difference =
    price?.flea_market_price !== null && price?.flea_market_price !== undefined
      ? row.price - price.flea_market_price
      : null;

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700">
      <div className="text-sm">{formatIsoDateTime(row.price_time, locale)}</div>
      <div className="text-right">
        <div className="text-sm font-semibold">{formatPrice(row.price, locale)}</div>
        {difference !== null ? (
          <div className={`text-xs ${difference >= 0 ? "text-emerald-500" : "text-red-500"}`}>
            {difference >= 0 ? "+" : ""}
            {formatPrice(difference, locale)}
          </div>
        ) : null}
      </div>
    </div>
  );
}
