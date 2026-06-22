"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Search, Store } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { HorizontalAdBanner } from "@/components/shared/ad-banner";
import { staticJsonGet } from "@/lib/api/static-json-client";
import { formatIsoDateTime } from "@/lib/utils/date-time";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { Locale } from "@/i18n/config";
import type {
  PriceSearchItem,
  PriceSummaryRow,
  PriceTraderRow,
} from "@/types/api/price";

type PriceSearchIndexItem = Omit<PriceSearchItem, "history_by_type" | "trader_prices">;

interface StaticPriceSearchResponse {
  data: PriceSearchIndexItem[];
  total_count: number;
  max_pages: number;
  current_page: number;
}

const copyByLocale = {
  ko: {
    title: "아이템 시세",
    description: "V3 가격 API 기준으로 아이템 시세와 최근 가격 변동을 확인합니다.",
    searchPlaceholder: "아이템 이름을 검색하세요",
    searchButton: "검색",
    totalLabel: "검색 결과",
    selectedLabel: "선택된 아이템",
    trendLabel: "가격 흐름",
    sizeLabel: "크기",
    noResults: "검색 결과가 없습니다.",
    backendIssue: "시세 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
    fleaLabel: "플리 마켓",
    traderLabel: "최고 상인 판매가",
    traderPricesLabel: "상인 시세",
    noTraderPrices: "상인별 시세 데이터가 없습니다.",
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
    trendLabel: "Trend",
    sizeLabel: "Size",
    noResults: "No search results found.",
    backendIssue: "Failed to load the price data. Please try again shortly.",
    fleaLabel: "Flea market",
    traderLabel: "Best trader price",
    traderPricesLabel: "Trader prices",
    noTraderPrices: "No trader price data.",
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
    trendLabel: "価格推移",
    sizeLabel: "サイズ",
    noResults: "検索結果がありません。",
    backendIssue: "価格データの読み込みに失敗しました。しばらくしてからもう一度お試しください。",
    fleaLabel: "フリーマーケット",
    traderLabel: "最高トレーダー価格",
    traderPricesLabel: "トレーダー価格",
    noTraderPrices: "トレーダー別価格データがありません。",
    updatedLabel: "更新日時",
    previousLabel: "前へ",
    nextLabel: "次へ",
    pvp: "PVP",
    pve: "PVE",
  },
} as const;

type PriceMode = "pvp" | "pve";

const priceModeTheme = {
  pvp: {
    activeButton: "bg-orange-500 text-white",
    inactiveButton: "text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-300",
    searchButton: "bg-orange-500 text-white hover:bg-orange-400",
    inputFocus: "focus:border-orange-300 dark:focus:border-orange-500",
    selectedCard:
      "border-orange-300 bg-orange-50 text-orange-600 dark:border-orange-400/50 dark:bg-orange-400/10 dark:text-orange-300",
    hoverCard:
      "hover:border-orange-300 hover:text-orange-500 dark:hover:border-orange-500 dark:hover:text-orange-300",
    softButton:
      "hover:border-orange-300 hover:text-orange-500 dark:hover:border-orange-500 dark:hover:text-orange-300",
    priceText: "text-orange-500 dark:text-orange-300",
    subtlePill: "bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
    miniBar: "bg-orange-400/80 dark:bg-orange-300/80",
    highestTrader:
      "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-400/50 dark:bg-orange-400/10 dark:text-orange-300",
    chartStroke: "#f97316",
    chartActive: "#fb923c",
  },
  pve: {
    activeButton: "bg-emerald-600 text-white",
    inactiveButton: "text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-300",
    searchButton: "bg-emerald-600 text-white hover:bg-emerald-500",
    inputFocus: "focus:border-emerald-300 dark:focus:border-emerald-500",
    selectedCard:
      "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-400/50 dark:bg-emerald-400/10 dark:text-emerald-300",
    hoverCard:
      "hover:border-emerald-300 hover:text-emerald-600 dark:hover:border-emerald-500 dark:hover:text-emerald-300",
    softButton:
      "hover:border-emerald-300 hover:text-emerald-600 dark:hover:border-emerald-500 dark:hover:text-emerald-300",
    priceText: "text-emerald-600 dark:text-emerald-300",
    subtlePill: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    miniBar: "bg-emerald-500/80 dark:bg-emerald-300/80",
    highestTrader:
      "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-400/50 dark:bg-emerald-400/10 dark:text-emerald-300",
    chartStroke: "#059669",
    chartActive: "#10b981",
  },
} as const;

function formatPrice(value: number | null, locale: Locale) {
  if (value === null) {
    return "-";
  }

  const formattedValue = new Intl.NumberFormat(locale === "ko" ? "ko-KR" : locale === "ja" ? "ja-JP" : "en-US").format(
    value,
  );

  return `${formattedValue} ₽`;
}

function hasFleaPrice(
  summary: PriceSummaryRow | null,
): summary is PriceSummaryRow & { flea_market_price: number } {
  return summary?.flea_market_price !== null &&
    summary?.flea_market_price !== undefined;
}

function matchesPriceSearch(item: PriceSearchIndexItem, searchWord: string, locale: Locale) {
  const keyword = searchWord.trim().toLowerCase();

  if (!keyword) {
    return true;
  }

  return [
    item.name_en,
    item.name_ko,
    item.name_ja,
    item.normalized_name,
    item.category,
    item.parent_category,
    String(pickLocalizedField(item as unknown as Record<string, unknown>, locale, "name") ?? ""),
  ].some((value) => value?.toLowerCase().includes(keyword));
}

function paginatePriceItems(
  items: PriceSearchIndexItem[],
  page: number,
  searchWord: string,
  locale: Locale,
): StaticPriceSearchResponse {
  const pageSize = 20;
  const filteredItems = items.filter((item) => matchesPriceSearch(item, searchWord, locale));
  const maxPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), maxPages);

  return {
    current_page: currentPage,
    data: filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    max_pages: maxPages,
    total_count: filteredItems.length,
  };
}

function fetchPriceSearchIndex() {
  return staticJsonGet<PriceSearchIndexItem[]>("price", "/static/price/v3/search-index.json", {
    revalidate: 60 * 60,
  });
}

function fetchPriceDetail(normalizedName: string) {
  return staticJsonGet<PriceSearchItem>("price", `/static/price/v3/details/${normalizedName}.json`, {
    revalidate: 60 * 60,
  });
}

export function PricePage({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];
  const [query, setQuery] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [priceType, setPriceType] = useState<PriceMode>("pvp");
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<PriceSearchIndexItem | null>(null);
  const theme = priceModeTheme[priceType];

  const {
    data: searchIndex,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["price-search-index"],
    queryFn: fetchPriceSearchIndex,
    staleTime: 60 * 60 * 1000,
  });

  const data = useMemo(
    () => searchIndex ? paginatePriceItems(searchIndex, page, searchWord, locale) : null,
    [locale, page, searchIndex, searchWord],
  );

  const { data: selectedDetail } = useQuery({
    enabled: Boolean(selectedItem?.normalized_name),
    queryKey: ["price-detail", selectedItem?.normalized_name],
    queryFn: () => fetchPriceDetail(selectedItem?.normalized_name ?? ""),
    staleTime: 60 * 60 * 1000,
  });

  const detailItem = selectedDetail ?? selectedItem;

  useEffect(() => {
    if (!data) {
      setSelectedItem(null);
      return;
    }

    const nextSelectedItem =
      data.data.find((item) => hasFleaPrice(item.prices[priceType])) ??
      data.data[0] ??
      null;

    setSelectedItem((current) =>
      current && data.data.some((item) => item.id === current.id)
        ? current
        : nextSelectedItem,
    );
  }, [data, priceType]);

  const selectedPrice = detailItem?.prices[priceType] ?? null;
  const selectedHistory = selectedDetail?.history_by_type[priceType] ?? [];
  const selectedTraderPrices = selectedDetail?.trader_prices[priceType] ?? [];

  const localizedSelectedName = useMemo(() => {
    if (!detailItem) {
      return null;
    }

    return String(
      pickLocalizedField(
        detailItem as unknown as Record<string, unknown>,
        locale,
        "name",
      ) ?? detailItem.name_en,
    );
  }, [detailItem, locale]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#111418] dark:text-white">
      <div className="mx-auto flex min-w-0 w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="flex flex-col items-center gap-6 pt-4 text-center">
          <div className="w-full">
            <h1 className="text-3xl font-black sm:text-4xl">{copy.title}</h1>
            <HorizontalAdBanner minHeight={280} />
          </div>
          <div className="flex w-full max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <div className="inline-flex self-center overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
              <button
                type="button"
                onClick={() => setPriceType("pvp")}
                className={`px-5 py-2.5 text-sm font-bold transition ${
                  priceType === "pvp"
                    ? priceModeTheme.pvp.activeButton
                    : priceModeTheme.pvp.inactiveButton
                }`}
              >
                {copy.pvp}
              </button>
              <button
                type="button"
                onClick={() => setPriceType("pve")}
                className={`px-5 py-2.5 text-sm font-bold transition ${
                  priceType === "pve"
                    ? priceModeTheme.pve.activeButton
                    : priceModeTheme.pve.inactiveButton
                }`}
              >
                {copy.pve}
              </button>
            </div>
            <form
              className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                setPage(1);
                setSearchWord(query.trim());
              }}
            >
              <label className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={copy.searchPlaceholder}
                  className={`h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 dark:border-[#2f3742] dark:bg-[#181c21] dark:text-gray-100 dark:placeholder:text-gray-500 ${theme.inputFocus}`}
                />
              </label>
              <button
                type="submit"
                className={`h-11 rounded-lg px-5 text-sm font-bold transition ${theme.searchButton}`}
              >
                {copy.searchButton}
              </button>
            </form>
          </div>
        </section>
        {isError ? (
          <section className="rounded-lg border border-amber-300 bg-amber-50 px-6 py-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
            {copy.backendIssue}
          </section>
        ) : null}

        <section className="grid min-w-0 gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21] lg:max-h-[calc(100vh-7rem)]">
            <div className="shrink-0 flex items-center justify-between gap-3 border-b border-gray-100 pb-4 dark:border-[#2a3038]">
              <h2 className="text-lg font-black">{copy.totalLabel}</h2>
              <span className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
                {data?.total_count ?? 0}
              </span>
            </div>

            <div className="mt-4 grid min-h-0 auto-rows-max gap-3 pr-1 lg:overflow-y-auto">
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
                      className={`flex min-w-0 w-full shrink-0 items-center gap-4 overflow-hidden rounded-lg border p-3 text-left transition ${
                        selectedItem?.id === item.id
                          ? theme.selectedCard
                          : `border-gray-200 bg-white text-gray-800 dark:border-[#2a3038] dark:bg-[#181c21] dark:text-gray-300 ${theme.hoverCard}`
                      }`}
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-[#2a3038] dark:bg-[#20242b]">
                        <Image
                          src={item.image}
                          alt={localizedName}
                          fill
                          sizes="64px"
                          className="object-contain p-1.5"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 break-words text-sm font-semibold">
                          {localizedName}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="truncate text-gray-500 dark:text-gray-400">
                            {item.normalized_name}
                          </span>
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 dark:bg-gray-700/60 dark:text-gray-200">
                            {item.width}x{item.height}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          {hasFleaPrice(summary) ? (
                            <p className={`flex min-w-0 items-center gap-1.5 truncate text-xs ${theme.priceText}`}>
                              <Store className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                              <span className="min-w-0 truncate">
                                {copy.fleaLabel}: {formatPrice(summary.flea_market_price, locale)}
                              </span>
                            </p>
                          ) : (
                            <span />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : !isLoading && !isError ? (
                <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  {copy.noResults}
                </p>
              ) : null}
            </div>

            {data && data.max_pages > 1 ? (
              <div className="mt-6 shrink-0 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-[#2a3038]">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={data.current_page <= 1}
                  className={`rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2a3038] ${theme.softButton}`}
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
                  className={`rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2a3038] ${theme.softButton}`}
                >
                  {copy.nextLabel}
                </button>
              </div>
            ) : null}
          </div>

          <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
              <h2 className="text-lg font-black">{copy.selectedLabel}</h2>
              {detailItem && localizedSelectedName ? (
                <div className="mt-5 space-y-5">
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-[#2a3038] dark:bg-[#20242b]">
                      <Image
                        src={detailItem.image}
                        alt={localizedSelectedName}
                        fill
                        sizes="128px"
                        className="object-contain p-3"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-semibold">{localizedSelectedName}</h3>
                      <p className="mt-2 font-mono text-xs text-gray-500 dark:text-gray-400">
                        {detailItem.normalized_name}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${theme.subtlePill}`}>
                          {detailItem.category ?? "-"}
                        </span>
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600 dark:bg-gray-700/60 dark:text-gray-200">
                          {copy.sizeLabel} {detailItem.width}x{detailItem.height}
                        </span>
                        {selectedPrice?.has_flea ? (
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${theme.subtlePill}`}>
                            <Store className="h-3 w-3" aria-hidden="true" />
                            {copy.fleaLabel}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr]">
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                      {hasFleaPrice(selectedPrice) ? (
                        <PriceMetric
                          label={copy.fleaLabel}
                          value={formatPrice(selectedPrice.flea_market_price, locale)}
                          icon={<Store className="h-4 w-4" aria-hidden="true" />}
                          iconClassName={theme.priceText}
                        />
                      ) : null}
                      <PriceMetric
                        label={copy.traderLabel}
                        value={formatPrice(selectedPrice?.highest_trader_price ?? null, locale)}
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
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-[#2a3038] dark:bg-[#20242b]">
                      <h3 className="text-sm font-semibold">{copy.traderPricesLabel}</h3>
                      <div className="mt-4">
                        <TraderPriceList
                          traders={selectedTraderPrices}
                          highestTraderPrice={selectedPrice?.highest_trader_price ?? null}
                          locale={locale}
                          emptyLabel={copy.noTraderPrices}
                          mode={priceType}
                        />
                      </div>
                    </div>
                  </div>

                  {selectedHistory.length ? (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-[#2a3038] dark:bg-[#20242b]">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold">{copy.trendLabel}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedHistory.length} pts
                        </span>
                      </div>
                      <div className="mt-4 min-h-64 min-w-0">
                        <PriceLineChart history={selectedHistory} locale={locale} mode={priceType} />
                      </div>
                    </div>
                  ) : null}
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

function PriceMetric({
  label,
  value,
  icon,
  iconClassName = "text-orange-500 dark:text-orange-300",
}: {
  label: string;
  value: string;
  icon?: ReactNode;
  iconClassName?: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-[#2a3038] dark:bg-[#20242b]">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
        {icon ? <span className={iconClassName}>{icon}</span> : null}
        <span>{label}</span>
      </div>
      <div className="mt-2 text-sm font-semibold">{value}</div>
    </div>
  );
}

function MiniTrend({
  history,
  barClassName,
}: {
  history: Array<{ price: number }>;
  barClassName: string;
}) {
  if (!history.length) {
    return <div className="h-6 w-16 rounded bg-gray-100 dark:bg-[#20242b]" />;
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
            className={`w-1.5 rounded-sm ${barClassName}`}
            style={{ height: `${height}px` }}
          />
        );
      })}
    </div>
  );
}

function PriceLineChart({
  history,
  locale,
  mode,
}: {
  history: Array<{ price: number; price_time: string }>;
  locale: Locale;
  mode: PriceMode;
}) {
  if (!history.length) {
    return <div className="text-sm text-gray-500 dark:text-gray-400">-</div>;
  }

  const dateLocale = locale === "ko" ? "ko-KR" : locale === "ja" ? "ja-JP" : "en-US";
  const theme = priceModeTheme[mode];
  const points = history
    .map((point) => {
      const timestamp = new Date(point.price_time).getTime();

      if (!Number.isFinite(timestamp) || !Number.isFinite(point.price)) {
        return null;
      }

      return {
        ...point,
        timestamp,
        formattedTime: formatIsoDateTime(point.price_time, locale),
      };
    })
    .filter((point): point is {
      price: number;
      price_time: string;
      timestamp: number;
      formattedTime: string;
    } => point !== null)
    .sort((left, right) => left.timestamp - right.timestamp);

  if (!points.length) {
    return <div className="text-sm text-gray-500 dark:text-gray-400">-</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={256} minWidth={0}>
      <LineChart data={points} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.22)" />
        <XAxis
          dataKey="timestamp"
          type="number"
          domain={["dataMin", "dataMax"]}
          scale="time"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          tickFormatter={(value) =>
            new Date(Number(value)).toLocaleDateString(dateLocale, {
              month: "numeric",
              day: "numeric",
            })
          }
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          width={58}
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          tickFormatter={(value) => formatPrice(Number(value), locale)}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ stroke: theme.chartActive, strokeWidth: 1 }}
          content={({ active, payload }) => {
            const first = payload?.[0];
            const row = first?.payload as
              | { formattedTime?: string; price?: number }
              | undefined;

            if (!active || !row) {
              return null;
            }

            return (
              <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-[#2a3038] dark:bg-[#181c21]">
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  {row.formattedTime ?? "-"}
                </div>
                <div className={`mt-1 ${theme.priceText}`}>
                  {formatPrice(row.price ?? null, locale)}
                </div>
              </div>
            );
          }}
        />
        <Line
          type="linear"
          dataKey="price"
          connectNulls
          isAnimationActive={false}
          stroke={theme.chartStroke}
          strokeWidth={2}
          dot={{ r: 3, fill: theme.chartStroke, strokeWidth: 0 }}
          activeDot={{ r: 5, fill: theme.chartActive, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function TraderPriceList({
  traders,
  highestTraderPrice,
  locale,
  emptyLabel,
  mode,
}: {
  traders: PriceTraderRow[];
  highestTraderPrice: number | null;
  locale: Locale;
  emptyLabel: string;
  mode: PriceMode;
}) {
  if (!traders.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-200 bg-white px-4 py-3 text-sm text-gray-500 dark:border-[#2a3038] dark:bg-[#181c21] dark:text-gray-400">
        {emptyLabel}
      </div>
    );
  }

  const theme = priceModeTheme[mode];

  return (
    <div className="grid gap-2">
      {traders.map((trader) => {
        const traderName = getLocalizedTraderName(trader, locale);
        const isHighest =
          trader.price !== null &&
          highestTraderPrice !== null &&
          trader.price === highestTraderPrice;

        return (
          <div
            key={trader.id}
            className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${
              isHighest
                ? theme.highestTrader
                : "border-gray-200 bg-white text-gray-700 dark:border-[#2a3038] dark:bg-[#181c21] dark:text-gray-300"
            }`}
          >
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-[#20242b]">
              <Image
                src={trader.trader.image}
                alt={traderName}
                fill
                sizes="36px"
                className="object-cover"
              />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-semibold">
              {traderName}
            </span>
            <span className="shrink-0 text-sm font-black">
              {formatPrice(trader.price, locale)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function getLocalizedTraderName(trader: PriceTraderRow, locale: Locale) {
  switch (locale) {
    case "en":
      return trader.trader.name_en;
    case "ja":
      return trader.trader.name_ja;
    case "ko":
    default:
      return trader.trader.name_ko;
  }
}
