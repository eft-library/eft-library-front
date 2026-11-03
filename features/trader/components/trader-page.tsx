"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type {
  TraderList,
  TraderManifest,
  TraderMode,
  TraderOffers,
} from "@/types/api/trader";
import { getTraderJson, TRADER_REFRESH_MS } from "../api";
import { getTraderCopy, getTraderName } from "../copy";
import { OfferCard } from "./offer-card";
import { OfferDialog } from "./offer-detail";

const traderOrder = [
  "prapor",
  "therapist",
  "fence",
  "skier",
  "peacekeeper",
  "mechanic",
  "ragman",
  "jaeger",
  "ref",
];
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

export function TraderPage({ locale }: { locale: Locale }) {
  const labels = getTraderCopy(locale);
  const [mode, setMode] = useState<TraderMode>("pvp");
  const [traderName, setTraderName] = useState("prapor");
  const [level, setLevel] = useState<number | "all">(4);
  const [word, setWord] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const index = useQuery({
    queryKey: ["trader", "manifest"],
    queryFn: ({ signal }) =>
      getTraderJson<TraderManifest>("/static/trader/v3/index.json", signal),
    staleTime: TRADER_REFRESH_MS,
    refetchInterval: TRADER_REFRESH_MS,
    refetchOnWindowFocus: false,
  });
  const entry = index.data?.modes[mode];
  const list = useQuery({
    queryKey: ["trader", "list", entry?.list],
    queryFn: ({ signal }) => getTraderJson<TraderList>(entry!.list, signal),
    enabled: Boolean(entry),
    staleTime: Infinity,
  });
  const traders = useMemo(
    () =>
      traderOrder.flatMap(
        (name) =>
          list.data?.traders.filter(
            (trader) => trader.normalized_name === name,
          ) ?? [],
      ),
    [list.data],
  );
  const trader = traders.find((value) => value.normalized_name === traderName);
  const offersPath = trader && entry?.offers[trader.id];
  const offers = useQuery({
    queryKey: ["trader", "offers", offersPath],
    queryFn: ({ signal }) => getTraderJson<TraderOffers>(offersPath!, signal),
    enabled: Boolean(offersPath),
    staleTime: Infinity,
  });
  const visible = useMemo(() => {
    const search = word.trim().toLocaleLowerCase();
    return (offers.data?.offers ?? [])
      .filter(
        (offer) =>
          (level === "all" || offer.trader_level <= level) &&
          (!search ||
            offer.rewards.some(({ item }) =>
              [item.name_ko, item.name_en, item.name_ja].some((name) =>
                name.toLocaleLowerCase().includes(search),
              ),
            )),
      )
      .sort((a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id));
  }, [offers.data, level, word]);
  const selected =
    offers.data?.offers.find((offer) => offer.id === selectedId) ?? null;
  const failed = index.isError || list.isError || offers.isError;
  const loading =
    index.isPending ||
    (Boolean(entry) && list.isPending) ||
    (Boolean(offersPath) && offers.isPending);
  const missing = Boolean(index.data && !entry);
  function retry() {
    void index.refetch();
    if (entry) void list.refetch();
    if (offersPath) void offers.refetch();
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
        {missing ? (
          <p role="status" className="py-16 text-center">
            {labels.unavailable}
          </p>
        ) : (
          <>
            <div
              role="group"
              aria-label={labels.title}
              className="grid grid-cols-3 gap-2 md:grid-cols-9 md:gap-2.5"
            >
              {traders.map((value) => (
                <button
                  type="button"
                  key={value.id}
                  aria-pressed={trader?.id === value.id}
                  onClick={() => {
                    setTraderName(value.normalized_name);
                    setSelectedId(null);
                  }}
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
                </button>
              ))}
            </div>
            <div className="mb-2 mt-6 flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold">{labels.level}</span>
              <div
                role="group"
                aria-label={labels.level}
                className="flex gap-1"
              >
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
                    {(offers.data?.offers.length ?? 0) === 0
                      ? labels.noOffers
                      : labels.empty}
                  </p>
                )
              )}
            </section>
          </>
        )}
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
