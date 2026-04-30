"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { getApiBaseUrl } from "@/lib/config/app-env";
import { priceTopEndpoint } from "@/lib/config/api-endpoints";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { Locale } from "@/i18n/config";
import type { PriceTopResponse, PriceTopTier } from "@/types/api/price";

const rankCategories = [
  "Keys",
  "Weapon",
  "Ammo",
  "Food",
  "Drink",
  "Common container",
  "Medical",
  "Headwear",
  "Backpack",
  "Info",
] as const;

const copyByLocale = {
  ko: {
    title: "아이템 랭크",
    description: "아이템 1칸당 가치를 기준으로 V3 가격 상위 구간을 확인할 수 있습니다.",
    notice: "현재 카테고리 조합은 V3 API의 실제 category 값을 기준으로 선택합니다.",
    loading: "랭크 데이터를 불러오는 중입니다.",
    empty: "표시할 랭크 데이터가 없습니다.",
    error: "랭크 데이터를 불러오지 못했습니다.",
    pvp: "PVP",
    pve: "PVE",
    leaderboard: "주간 미니게임 랭크는 아직 데이터가 없습니다.",
  },
  en: {
    title: "Item Rank",
    description: "Review the top V3 price tiers based on value per slot.",
    notice: "The category filters are aligned to the real category values returned by the V3 API.",
    loading: "Loading rank data.",
    empty: "There is no ranking data to display.",
    error: "Failed to load rank data.",
    pvp: "PVP",
    pve: "PVE",
    leaderboard: "There is no weekly minigame ranking data yet.",
  },
  ja: {
    title: "アイテムランク",
    description: "1スロットあたりの価値を基準に、V3価格上位ティアを確認できます。",
    notice: "カテゴリフィルターは V3 API が返す実際の category 値に合わせています。",
    loading: "ランクデータを読み込み中です。",
    empty: "表示できるランクデータがありません。",
    error: "ランクデータの読み込みに失敗しました。",
    pvp: "PVP",
    pve: "PVE",
    leaderboard: "週次ミニゲームランキングデータはまだありません。",
  },
} as const;

function formatPrice(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ko" ? "ko-KR" : locale === "ja" ? "ja-JP" : "en-US").format(
    value,
  );
}

export function RankPage({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];
  const [priceType, setPriceType] = useState<"pvp" | "pve">("pvp");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Keys",
    "Weapon",
    "Ammo",
    "Food",
    "Drink",
  ]);
  const [data, setData] = useState<PriceTopResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await fetch(`${getApiBaseUrl()}${priceTopEndpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryList: selectedCategories }),
        });

        if (!response.ok) {
          throw new Error(String(response.status));
        }

        const payload = await response.json();
        if (payload.msg !== "OK" || payload.data === null) {
          throw new Error("invalid-payload");
        }

        if (isMounted) {
          setData(payload.data as PriceTopResponse);
        }
      } catch {
        if (isMounted) {
          setData(null);
          setErrorMessage(copy.error);
        }
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
  }, [copy.error, selectedCategories]);

  const tiers = useMemo(() => {
    if (!data) {
      return [];
    }

    return priceType === "pvp" ? data.pvp_top_list : data.pve_top_list;
  }, [data, priceType]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">{copy.title}</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{copy.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
            {copy.description}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{copy.notice}</p>

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

          <div className="mt-6 flex flex-wrap gap-2">
            {rankCategories.map((category) => {
              const isSelected = selectedCategories.includes(category);

              return (
                <button
                  type="button"
                  key={category}
                  onClick={() =>
                    setSelectedCategories((current) => {
                      if (current.includes(category)) {
                        return current.length === 1
                          ? current
                          : current.filter((value) => value !== category);
                      }

                      return [...current, category];
                    })
                  }
                  className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                    isSelected
                      ? "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
                      : "border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-[#2a2d35] dark:text-gray-200"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        {isLoading ? (
          <section className="rounded-lg border border-gray-200 bg-white px-6 py-8 text-sm shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
            {copy.loading}
          </section>
        ) : errorMessage ? (
          <section className="rounded-lg border border-amber-300 bg-amber-50 px-6 py-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
            {errorMessage}
          </section>
        ) : (
          <section className="grid gap-6">
            {tiers.some((tier) => tier.list.length > 0) ? (
              tiers.map((tier) =>
                tier.list.length > 0 ? (
                  <TierSection key={tier.tier} tier={tier} locale={locale} />
                ) : null,
              )
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white px-6 py-8 text-sm shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
                {copy.empty}
              </div>
            )}
          </section>
        )}

        <section className="rounded-lg border border-gray-200 bg-white px-6 py-5 text-sm shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          {copy.leaderboard}
        </section>
      </div>
    </main>
  );
}

function TierSection({ tier, locale }: { tier: PriceTopTier; locale: Locale }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">{tier.tier} Tier</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {formatPrice(tier.min, locale)} to {formatPrice(tier.max, locale)} per slot
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{tier.list.length} items</div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tier.list.map((item) => {
          const localizedName = String(
            pickLocalizedField(item as unknown as Record<string, unknown>, locale, "name") ??
              item.name_en,
          );

          return (
            <article
              key={item.id}
              className="flex gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-[#252830]">
                <Image
                  src={item.image}
                  alt={localizedName}
                  fill
                  sizes="80px"
                  className="object-contain p-2"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-semibold">{localizedName}</h3>
                <p className="mt-2 truncate text-xs text-gray-500 dark:text-gray-400">
                  {item.category}
                </p>
                <div className="mt-3 grid gap-1 text-xs text-gray-600 dark:text-gray-300">
                  <span>Per slot: {formatPrice(item.per_slot, locale)}</span>
                  <span>Flea: {formatPrice(item.flea_market_price, locale)}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
