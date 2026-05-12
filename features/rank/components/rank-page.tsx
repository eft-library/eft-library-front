"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Search, Store } from "lucide-react";

import { HorizontalAdBanner } from "@/components/shared/ad-banner";
import { getApiBaseUrl } from "@/lib/config/app-env";
import { priceTopEndpoint } from "@/lib/config/api-endpoints";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { Locale } from "@/i18n/config";
import type {
  PriceTopItem,
  PriceTopResponse,
  PriceTopTier,
} from "@/types/api/price";

const rankCategoryGroups = [
  { value: "Ammo", label: "Ammo", categories: ["Rocket"] },
  {
    value: "Armored equipment",
    label: "Armored equipment",
    categories: ["Armor", "Armor Plate", "Face Cover", "Headwear", "Vis. observ. device"],
  },
  {
    value: "Barter item",
    label: "Barter item",
    categories: [
      "Battery",
      "Building material",
      "Electronics",
      "Household goods",
      "Jewelry",
      "Lubricant",
      "Medical supplies",
      "Other",
      "Tool",
    ],
  },
  { value: "Completable", label: "Completable", categories: ["Notes", "Tapes"] },
  {
    value: "Compound item",
    label: "Compound item",
    categories: ["Common container", "Locking container"],
  },
  {
    value: "Cylinder Magazine",
    label: "Cylinder Magazine",
    categories: ["Spring Driven Cylinder"],
  },
  {
    value: "Equipment",
    label: "Equipment",
    categories: ["Arm Band", "Armored equipment", "Headphones"],
  },
  {
    value: "Essential mod",
    label: "Essential mod",
    categories: ["Barrel", "Handguard", "Pistol grip", "Receiver"],
  },
  { value: "Food and drink", label: "Food and drink", categories: ["Drink", "Food"] },
  {
    value: "Functional mod",
    label: "Functional mod",
    categories: ["Auxiliary Mod", "Bipod", "Comb. tact. device", "Flashlight", "Foregrip", "Gas block"],
  },
  {
    value: "Gear mod",
    label: "Gear mod",
    categories: ["Charging handle", "Magazine", "Mount", "Stock", "UBGL"],
  },
  { value: "Info", label: "Info", categories: ["Dialog Item"] },
  {
    value: "Item",
    label: "Item",
    categories: ["Flyer", "Info", "Knife", "Map", "Special item", "Throwable weapon"],
  },
  { value: "Key", label: "Key", categories: ["Keycard", "Mechanical Key"] },
  { value: "Lubricant", label: "Lubricant", categories: ["Fuel"] },
  { value: "Magazine", label: "Magazine", categories: ["Cylinder Magazine"] },
  { value: "Meds", label: "Meds", categories: ["Drug", "Medical item", "Medikit", "Stimulant"] },
  {
    value: "Muzzle device",
    label: "Muzzle device",
    categories: ["Comb. muzzle device", "Flashhider", "Silencer"],
  },
  { value: "Quest Item", label: "Quest Item", categories: ["Loot"] },
  {
    value: "Searchable item",
    label: "Searchable item",
    categories: ["Backpack", "Chest rig", "Port. container", "Random Loot Container"],
  },
  {
    value: "Sights",
    label: "Sights",
    categories: ["Assault scope", "Compact reflex sight", "Ironsight", "Reflex sight", "Scope", "Special scope"],
  },
  {
    value: "Special item",
    label: "Special item",
    categories: [
      "Compass",
      "Cultist Amulet",
      "Mark of the Unheard",
      "Multitools",
      "Planting Kits",
      "Portable Range Finder",
      "Radio Transmitter",
      "Recorder",
      "Repair Kits",
    ],
  },
  { value: "Special scope", label: "Special scope", categories: ["Night Vision", "Thermal Vision"] },
  { value: "Stackable item", label: "Stackable item", categories: ["Ammo", "Ammo container", "Money"] },
  {
    value: "Weapon",
    label: "Weapon",
    categories: [
      "Assault carbine",
      "Assault rifle",
      "Grenade launcher",
      "Handgun",
      "Machinegun",
      "Marksman rifle",
      "Revolver",
      "Rocket Launcher",
      "Shotgun",
      "SMG",
      "Sniper rifle",
    ],
  },
] as const;

const defaultRankCategories = [
  "Key",
  "Weapon",
  "Stackable item",
  "Food and drink",
  "Meds",
] as const;

const tierStyles = {
  S: {
    badge: "bg-red-500 text-white",
    panel: "border-red-200 bg-red-50/70 dark:border-red-500/30 dark:bg-red-500/10",
    text: "text-red-700 dark:text-red-300",
    card: "border-red-200 hover:border-red-400 dark:border-red-500/25 dark:hover:border-red-400/70",
  },
  A: {
    badge: "bg-orange-500 text-white",
    panel: "border-orange-200 bg-orange-50/70 dark:border-orange-500/30 dark:bg-orange-500/10",
    text: "text-orange-700 dark:text-orange-300",
    card: "border-orange-200 hover:border-orange-400 dark:border-orange-500/25 dark:hover:border-orange-400/70",
  },
  B: {
    badge: "bg-amber-400 text-amber-950",
    panel: "border-amber-200 bg-amber-50/70 dark:border-amber-400/30 dark:bg-amber-400/10",
    text: "text-amber-700 dark:text-amber-200",
    card: "border-amber-200 hover:border-amber-400 dark:border-amber-400/25 dark:hover:border-amber-300/70",
  },
  C: {
    badge: "bg-emerald-500 text-white",
    panel: "border-emerald-200 bg-emerald-50/70 dark:border-emerald-500/30 dark:bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-300",
    card: "border-emerald-200 hover:border-emerald-400 dark:border-emerald-500/25 dark:hover:border-emerald-400/70",
  },
  D: {
    badge: "bg-sky-500 text-white",
    panel: "border-sky-200 bg-sky-50/70 dark:border-sky-500/30 dark:bg-sky-500/10",
    text: "text-sky-700 dark:text-sky-300",
    card: "border-sky-200 hover:border-sky-400 dark:border-sky-500/25 dark:hover:border-sky-400/70",
  },
  E: {
    badge: "bg-violet-500 text-white",
    panel: "border-violet-200 bg-violet-50/70 dark:border-violet-500/30 dark:bg-violet-500/10",
    text: "text-violet-700 dark:text-violet-300",
    card: "border-violet-200 hover:border-violet-400 dark:border-violet-500/25 dark:hover:border-violet-400/70",
  },
  F: {
    badge: "bg-gray-500 text-white",
    panel: "border-gray-200 bg-gray-50 dark:border-gray-600/40 dark:bg-gray-700/20",
    text: "text-gray-700 dark:text-gray-300",
    card: "border-gray-200 hover:border-gray-400 dark:border-gray-600/40 dark:hover:border-gray-400",
  },
} as const;

const copyByLocale = {
  ko: {
    title: "아이템 랭크",
    description: "플리마켓 시세의 1칸당 가치를 기준으로 아이템 티어를 비교합니다.",
    notice: "카테고리는 V3 API가 반환하는 실제 category 값을 기준으로 동작합니다.",
    searchPlaceholder: "랭크 안에서 아이템 검색",
    loading: "랭크 데이터를 불러오는 중입니다.",
    empty: "표시할 랭크 데이터가 없습니다.",
    error: "랭크 데이터를 불러오지 못했습니다.",
    pvp: "PVP",
    pve: "PVE",
    allTiers: "전체 티어",
    selectedCategories: "선택 카테고리",
    items: "개 아이템",
    perSlot: "칸당",
    fleaMarket: "플리 마켓",
    trader: "상인 최고가",
  },
  en: {
    title: "Item Rank",
    description: "Compare item tiers by flea market value per slot.",
    notice: "Category filters use the real category values returned by the V3 API.",
    searchPlaceholder: "Search within ranked items",
    loading: "Loading rank data.",
    empty: "There is no ranking data to display.",
    error: "Failed to load rank data.",
    pvp: "PVP",
    pve: "PVE",
    allTiers: "All tiers",
    selectedCategories: "Selected categories",
    items: "items",
    perSlot: "Per slot",
    fleaMarket: "Flea market",
    trader: "Best trader",
  },
  ja: {
    title: "アイテムランク",
    description: "フリーマーケット相場の1スロットあたり価値でティアを比較します。",
    notice: "カテゴリフィルターは V3 API が返す実際の category 値に合わせています。",
    searchPlaceholder: "ランク内でアイテム検索",
    loading: "ランクデータを読み込み中です。",
    empty: "表示できるランクデータがありません。",
    error: "ランクデータの読み込みに失敗しました。",
    pvp: "PVP",
    pve: "PVE",
    allTiers: "全ティア",
    selectedCategories: "選択カテゴリ",
    items: "件",
    perSlot: "スロット単価",
    fleaMarket: "フリーマーケット",
    trader: "最高トレーダー価格",
  },
} as const;

interface PriceTopApiPayload {
  msg: string;
  data: PriceTopResponse | null;
}

function formatPrice(value: number | null, locale: Locale) {
  if (value === null) {
    return "-";
  }

  const formattedValue = new Intl.NumberFormat(locale === "ko" ? "ko-KR" : locale === "ja" ? "ja-JP" : "en-US").format(
    value,
  );

  return `${formattedValue} ₽`;
}

async function fetchPriceTop(categoryList: string[]) {
  const response = await fetch(`${getApiBaseUrl()}${priceTopEndpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categoryList }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(String(response.status));
  }

  const payload = (await response.json()) as PriceTopApiPayload;

  if (payload.msg !== "OK" || payload.data === null) {
    throw new Error("invalid-payload");
  }

  return payload.data;
}

function getLocalizedItemName(item: PriceTopItem, locale: Locale) {
  return String(
    pickLocalizedField(item as unknown as Record<string, unknown>, locale, "name") ??
      item.name_en,
  );
}

function matchesSearch(item: PriceTopItem, searchWord: string) {
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
  ].some((value) => value.toLowerCase().includes(keyword));
}

export function RankPage({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];
  const [priceType, setPriceType] = useState<"pvp" | "pve">("pvp");
  const [searchWord, setSearchWord] = useState("");
  const [selectedCategoryGroups, setSelectedCategoryGroups] = useState<string[]>([
    ...defaultRankCategories,
  ]);
  const selectedCategories = useMemo(
    () =>
      Array.from(
        new Set(
          rankCategoryGroups
            .filter((group) => selectedCategoryGroups.includes(group.value))
            .flatMap((group) => group.categories),
        ),
      ),
    [selectedCategoryGroups],
  );

  const { data, isError, isFetching, isLoading } = useQuery({
    queryKey: ["price-top", selectedCategories],
    queryFn: () => fetchPriceTop(selectedCategories),
    placeholderData: keepPreviousData,
  });

  const tiers = useMemo(() => {
    const selectedTiers = priceType === "pvp"
      ? data?.pvp_top_list
      : data?.pve_top_list;

    return (selectedTiers ?? [])
      .map((tier) => ({
        ...tier,
        list: tier.list.filter((item) => matchesSearch(item, searchWord)),
      }))
      .filter((tier) => tier.list.length > 0);
  }, [data, priceType, searchWord]);

  const totalItemCount = tiers.reduce((sum, tier) => sum + tier.list.length, 0);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#111418] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-black sm:text-4xl">{copy.title}</h1>
            </div>

            <div className="inline-flex self-start overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-[#2a3038] dark:bg-[#20242b] lg:self-end">
              <button
                type="button"
                onClick={() => setPriceType("pvp")}
                className={`px-5 py-2.5 text-sm font-bold transition ${
                  priceType === "pvp"
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-300"
                }`}
              >
                {copy.pvp}
              </button>
              <button
                type="button"
                onClick={() => setPriceType("pve")}
                className={`px-5 py-2.5 text-sm font-bold transition ${
                  priceType === "pve"
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-300"
                }`}
              >
                {copy.pve}
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <label className="relative min-w-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={searchWord}
                onChange={(event) => setSearchWord(event.target.value)}
                placeholder={copy.searchPlaceholder}
                className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-300 dark:border-[#2f3742] dark:bg-[#20242b] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-orange-500"
              />
            </label>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 dark:border-[#2a3038] dark:bg-[#20242b] dark:text-gray-300">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {totalItemCount}
              </span>{" "}
              {copy.items}
            </div>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              {copy.selectedCategories}
            </div>
            <div className="flex flex-wrap gap-2">
              {rankCategoryGroups.map((category) => {
                const isSelected = selectedCategoryGroups.includes(category.value);

                return (
                  <button
                    type="button"
                    key={category.value}
                    onClick={() =>
                      setSelectedCategoryGroups((current) => {
                        if (current.includes(category.value)) {
                          return current.length === 1
                            ? current
                            : current.filter((value) => value !== category.value);
                        }

                        return [...current, category.value];
                      })
                    }
                    className={`rounded-full border px-3 py-2 text-xs font-bold transition ${
                      isSelected
                        ? "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-400/50 dark:bg-orange-400/10 dark:text-orange-300"
                      : "border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-500 dark:border-[#2a3038] dark:bg-[#20242b] dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-300"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <HorizontalAdBanner className="my-0" />

        {isError ? (
          <section className="rounded-lg border border-amber-300 bg-amber-50 px-6 py-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
            {copy.error}
          </section>
        ) : null}

        {isLoading && !data ? (
          <section className="rounded-lg border border-gray-200 bg-white px-6 py-8 text-sm shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
            {copy.loading}
          </section>
        ) : tiers.length ? (
          <section className="grid gap-5">
            {tiers.map((tier) => (
              <TierSection
                key={tier.tier}
                tier={tier}
                locale={locale}
                labels={copy}
              />
            ))}
          </section>
        ) : (
          <section className="rounded-lg border border-gray-200 bg-white px-6 py-8 text-sm shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
            {copy.empty}
          </section>
        )}

        {isFetching && data ? (
          <div className="fixed bottom-5 right-5 rounded-lg border border-orange-200 bg-white px-4 py-2 text-xs font-semibold text-orange-600 shadow-lg dark:border-orange-400/30 dark:bg-[#181c21] dark:text-orange-300">
            {copy.loading}
          </div>
        ) : null}
      </div>
    </main>
  );
}

function TierSection({
  tier,
  locale,
  labels,
}: {
  tier: PriceTopTier;
  locale: Locale;
  labels: (typeof copyByLocale)[Locale];
}) {
  const style = tierStyles[tier.tier];

  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
      <div className={`flex flex-col gap-3 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between ${style.panel}`}>
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg font-black shadow-sm ${style.badge}`}>
            {tier.tier}
          </div>
          <div>
            <h2 className={`text-lg font-black ${style.text}`}>{tier.tier} Tier</h2>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {formatPrice(tier.min, locale)} - {formatPrice(tier.max, locale)} / slot
            </p>
          </div>
        </div>
        <div className="text-sm font-semibold text-gray-500 dark:text-gray-300">
          {tier.list.length} {labels.items}
        </div>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {tier.list.map((item, index) => (
          <RankItemCard
            key={item.id}
            item={item}
            index={index}
            tier={tier.tier}
            locale={locale}
            labels={labels}
          />
        ))}
      </div>
    </section>
  );
}

function RankItemCard({
  item,
  index,
  tier,
  locale,
  labels,
}: {
  item: PriceTopItem;
  index: number;
  tier: PriceTopTier["tier"];
  locale: Locale;
  labels: (typeof copyByLocale)[Locale];
}) {
  const localizedName = getLocalizedItemName(item, locale);

  return (
    <Link
      href={`/item/info/${item.normalized_name}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex min-w-0 gap-3 rounded-lg border bg-white p-3 transition focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 dark:bg-[#181c21] dark:focus:ring-offset-[#111418] ${tierStyles[tier].card}`}
    >
      <div className="flex w-7 shrink-0 justify-center pt-1 text-xs font-black text-gray-400">
        #{index + 1}
      </div>
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-[#2a3038] dark:bg-[#20242b]">
        <Image
          src={item.image}
          alt={localizedName}
          fill
          sizes="80px"
          className="object-contain p-2"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 min-w-0 break-words text-sm font-bold">
          {localizedName}
        </h3>
        <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
          {item.category}
        </p>
        <div className="mt-3 grid gap-1.5 text-xs">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold text-gray-500 dark:text-gray-400">
              {labels.perSlot}
            </span>
            <span className="font-black text-orange-600 dark:text-orange-300">
              {formatPrice(item.per_slot, locale)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <Store className="h-3.5 w-3.5" aria-hidden="true" />
              {labels.fleaMarket}
            </span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {formatPrice(item.flea_market_price, locale)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-gray-500 dark:text-gray-400">{labels.trader}</span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {formatPrice(item.highest_trader_price, locale)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
