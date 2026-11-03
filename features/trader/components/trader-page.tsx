"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { TraderMode } from "@/types/api/trader";
import {
  getTraderManifest,
  getTraderList,
  getTraderOffers,
  TRADER_REFRESH_MS,
} from "../api";
import { traderOrder } from "../config";
import { getTraderCopy, getTraderName } from "../copy";
import { OfferCard } from "./offer-card";
import { OfferDialog } from "./offer-detail";

const control =
  "rounded-md border border-line px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-orange-500";
const inactive =
  "bg-surface text-gray-700 hover:bg-surface-elevated dark:text-gray-200";
const active =
  "border-orange-600 bg-orange-600 text-white dark:border-orange-400 dark:bg-orange-400 dark:text-gray-950";

function RestockTimer({
  at,
  waiting,
  unknown,
  collectedAt,
  locale,
  lastChecked,
  noCheckedTime,
}: {
  at: string | null;
  waiting: string;
  unknown: string;
  collectedAt: string | null;
  locale: Locale;
  lastChecked: string;
  noCheckedTime: string;
}) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);
  const target = at ? Date.parse(at) : NaN;
  const seconds =
    now === null ? null : Math.max(0, Math.ceil((target - now) / 1000));
  const text = !Number.isFinite(target)
    ? unknown
    : seconds === null
      ? "--:--:--"
      : seconds <= 0
        ? waiting
        : [
            Math.floor(seconds / 3600),
            Math.floor(seconds / 60) % 60,
            seconds % 60,
          ]
            .map((part) => String(part).padStart(2, "0"))
            .join(":");
  const collectedTime = collectedAt ? Date.parse(collectedAt) : NaN;
  const checkedText = !Number.isFinite(collectedTime)
    ? noCheckedTime
    : `${lastChecked}: ${
        now === null
          ? "--:--"
          : new Intl.DateTimeFormat(locale, {
              hour: "2-digit",
              minute: "2-digit",
              hourCycle: "h23",
            }).format(collectedTime)
      }`;
  return (
    <>
      <span className="block font-mono text-[11px] tabular-nums text-gray-600 dark:text-gray-300">
        {text}
      </span>
      <span className="mt-1 block text-[10px] tabular-nums text-gray-600 dark:text-gray-300">
        {checkedText}
      </span>
    </>
  );
}

export function TraderPage({
  locale,
  traderName,
  initialMode,
  initialLevel,
  initialWord,
  initialOfferType,
}: {
  locale: Locale;
  traderName: string;
  initialMode: TraderMode;
  initialLevel: number | "all";
  initialWord: string;
  initialOfferType: "all" | "purchase" | "barter";
}) {
  const labels = getTraderCopy(locale);
  const [mode, setMode] = useState<TraderMode>(initialMode);
  const [level, setLevel] = useState<number | "all">(initialLevel);
  const [word, setWord] = useState(initialWord);
  const [offerType, setOfferType] = useState(initialOfferType);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const index = useQuery({
    queryKey: ["trader", "manifest"],
    queryFn: ({ signal }) => getTraderManifest(signal),
    staleTime: TRADER_REFRESH_MS,
    refetchInterval: TRADER_REFRESH_MS,
    refetchOnWindowFocus: false,
  });
  const entry = index.data?.modes[mode];
  const list = useQuery({
    queryKey: ["trader", "list", mode, entry?.list ?? "api"],
    queryFn: ({ signal }) =>
      getTraderList(mode, entry?.list, entry?.season_id ?? null, signal),
    enabled: !index.isPending,
    staleTime: TRADER_REFRESH_MS,
    refetchInterval: (query) =>
      query.state.data?.source === "api" ? TRADER_REFRESH_MS : false,
  });
  const traders = useMemo(
    () =>
      traderOrder.flatMap(
        (name) =>
          list.data?.data.traders.filter(
            (trader) => trader.normalized_name === name,
          ) ?? [],
      ),
    [list.data],
  );
  const trader = traders.find((value) => value.normalized_name === traderName);
  const offersPath = trader && entry?.offers[trader.id];
  const offers = useQuery({
    queryKey: [
      "trader",
      "offers",
      mode,
      trader?.id,
      list.data?.data.season_id,
      offersPath ?? "api",
    ],
    queryFn: ({ signal }) =>
      getTraderOffers(
        mode,
        trader!.id,
        list.data!.data.season_id,
        offersPath,
        signal,
      ),
    enabled: Boolean(trader),
    staleTime: TRADER_REFRESH_MS,
    refetchInterval: (query) =>
      query.state.data?.source === "api" ? TRADER_REFRESH_MS : false,
  });
  const visible = useMemo(() => {
    const search = word.trim().toLocaleLowerCase();
    return (offers.data?.data.offers ?? [])
      .filter(
        (offer) =>
          (level === "all" || offer.trader_level <= level) &&
          (offerType === "all" || offer.offer_type === offerType) &&
          (!search ||
            offer.rewards.some(({ item }) =>
              [item.name_ko, item.name_en, item.name_ja].some((name) =>
                name.toLocaleLowerCase().includes(search),
              ),
            )),
      )
      .sort((a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id));
  }, [offers.data, level, word, offerType]);
  const selected =
    offers.data?.data.offers.find((offer) => offer.id === selectedId) ?? null;
  const failed = index.isError || list.isError || offers.isError;
  const loading =
    index.isPending || list.isPending || (Boolean(trader) && offers.isPending);

  function retry() {
    void index.refetch();
    if (!index.isPending) void list.refetch();
    if (trader) void offers.refetch();
  }

  function traderHref(name: string) {
    const query = new URLSearchParams();
    if (mode !== "pvp") query.set("mode", mode);
    if (level !== 4) query.set("level", String(level));
    if (word) query.set("word", word);
    if (offerType !== "all") query.set("offer_type", offerType);
    return `/traders/${name}${query.size ? `?${query}` : ""}`;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="mb-7 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">{labels.title}</h1>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            {labels.subtitle}
          </p>
        </header>
        <div
          role="group"
          aria-label={labels.mode}
          className="mb-5 flex justify-center gap-2"
        >
          {(["pvp", "pve", "pvp-season"] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => {
                setMode(value);
                setSelectedId(null);
              }}
              className={`${control} ${mode === value ? active : inactive}`}
            >
              {value === "pvp-season" ? labels.season : value.toUpperCase()}
            </button>
          ))}
        </div>
        {failed && (
          <div
            role="alert"
            className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100"
          >
            <span>{offers.data ? labels.stale : labels.error}</span>
            <button
              type="button"
              onClick={retry}
              className={`${control} ${inactive}`}
            >
              <RefreshCw className="mr-2 inline h-4 w-4" />
              {labels.retry}
            </button>
          </div>
        )}
        <>
          <div
            role="group"
            aria-label={labels.title}
            className="grid grid-cols-3 gap-2 md:grid-cols-9 md:gap-2.5"
          >
            {traders.map((value) => (
              <Link
                href={traderHref(value.normalized_name)}
                scroll={false}
                prefetch={false}
                key={value.id}
                aria-current={trader?.id === value.id ? "page" : undefined}
                className={`overflow-hidden rounded-lg border bg-surface text-center shadow-sm focus-visible:outline-2 focus-visible:outline-orange-500 ${trader?.id === value.id ? "border-orange-500 ring-1 ring-orange-500" : "border-line hover:border-orange-400"}`}
              >
                <div className="relative aspect-[1.15] overflow-hidden bg-surface-elevated">
                  <Image
                    src={value.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 30vw, 135px"
                    className="object-cover"
                  />
                </div>
                <span
                  className={`mt-2 block truncate px-1 text-xs font-bold ${trader?.id === value.id ? "text-orange-700 dark:text-orange-300" : ""}`}
                >
                  {getTraderName(value, locale)}
                </span>
                <div className="px-1 pb-2 pt-1" aria-label={labels.restock}>
                  <RestockTimer
                    at={value.next_restock_at}
                    waiting={labels.waiting}
                    unknown={labels.unknown}
                    collectedAt={value.restock_collected_at}
                    locale={locale}
                    lastChecked={labels.lastChecked}
                    noCheckedTime={labels.noCheckedTime}
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className="mb-2 mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold">{labels.level}</span>
            <div role="group" aria-label={labels.level} className="flex gap-1">
              {(["all", 1, 2, 3, 4] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={level === value}
                  onClick={() => setLevel(value)}
                  className={`${control} ${level === value ? active : inactive}`}
                >
                  {value === "all" ? labels.all : value}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold">{labels.offerType}</span>
              <div
                role="group"
                aria-label={labels.offerType}
                className="flex gap-1"
              >
                {(["all", "purchase", "barter"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={offerType === value}
                    onClick={() => setOfferType(value)}
                    className={`${control} ${offerType === value ? active : inactive}`}
                  >
                    {value === "all" ? labels.all : labels[value]}
                  </button>
                ))}
              </div>
            </div>
            <label className="relative ml-auto w-full sm:w-72">
              <Search
                aria-hidden="true"
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"
              />
              <input
                type="search"
                value={word}
                onChange={(event) => setWord(event.target.value)}
                aria-label={labels.search}
                placeholder={labels.search}
                className="w-full rounded-md border border-line bg-surface py-2 pl-9 pr-3 text-sm placeholder:text-gray-500 focus-visible:outline-2 focus-visible:outline-orange-500 dark:placeholder:text-gray-400"
              />
            </label>
          </div>
          <div className="mb-4 flex flex-wrap justify-between gap-2 text-xs text-gray-600 dark:text-gray-300">
            <p>{labels.cumulative}</p>
            <p role="status">
              {loading
                ? labels.loading
                : `${new Intl.NumberFormat(locale).format(visible.length)}${labels.count}`}
            </p>
          </div>
          <section
            aria-label={labels.title}
            aria-busy={loading}
            className="min-h-80 overflow-x-auto rounded-xl border border-line bg-surface p-2 sm:p-3"
          >
            {loading ? (
              <p
                role="status"
                className="animate-pulse py-20 text-center text-sm text-gray-600 dark:text-gray-300"
              >
                {labels.loading}
              </p>
            ) : visible.length ? (
              <div className="min-w-[720px] [container-type:inline-size]">
                <div className="grid grid-flow-row-dense grid-cols-12 auto-rows-[calc((100cqw-44px)/12)] gap-1">
                  {visible.map((offer) => (
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                      locale={locale}
                      labels={labels}
                      onSelect={setSelectedId}
                    />
                  ))}
                </div>
              </div>
            ) : (
              !failed && (
                <p className="py-20 text-center text-sm text-gray-600 dark:text-gray-300">
                  {(offers.data?.data.offers.length ?? 0) === 0
                    ? labels.noOffers
                    : labels.empty}
                </p>
              )
            )}
          </section>
        </>
        <p className="mt-4 text-right text-xs text-gray-600 dark:text-gray-400">
          {labels.refresh}
        </p>
      </div>
      <OfferDialog
        offer={selected}
        locale={locale}
        labels={labels}
        onClose={() => setSelectedId(null)}
      />
    </main>
  );
}
