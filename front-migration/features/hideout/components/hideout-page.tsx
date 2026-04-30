import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type {
  HideoutBonus,
  HideoutCraft,
  HideoutDetailResponse,
  HideoutLevelDetail,
  HideoutRequirementItem,
  HideoutRequirementSkill,
  HideoutRequirementStation,
  HideoutRequirementTrader,
  HideoutStationSummary,
} from "@/types/api/hideout";

function getLocalizedName(
  value: { name_en: string; name_ko: string; name_ja: string },
  locale: Locale,
) {
  const localized = pickLocalizedField(
    value as unknown as Record<string, unknown>,
    locale,
    "name",
  );

  return typeof localized === "string" && localized ? localized : value.name_en;
}

function formatSecondsToDuration(totalSeconds: number) {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return [days > 0 ? `${days}d` : null, hours > 0 ? `${hours}h` : null, `${minutes}m`]
    .filter(Boolean)
    .join(" ");
}

function RequirementItemCard({
  item,
  locale,
}: {
  item: HideoutRequirementItem;
  locale: Locale;
}) {
  return (
    <Link
      href={`/item/info/${item.normalized_name}`}
      className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3 shadow-sm transition hover:border-orange-300 dark:border-gray-700 dark:bg-[#1f222a]"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-[#252830]">
        <Image
          src={item.image}
          alt={getLocalizedName(item, locale)}
          fill
          sizes="64px"
          className="object-contain p-1.5"
        />
      </div>
      <div className="min-w-0">
        <p className="line-clamp-2 text-sm font-semibold">{getLocalizedName(item, locale)}</p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          x{item.quantity} · {item.in_raid ? "Found in raid" : "Any source"}
        </p>
      </div>
    </Link>
  );
}

function SimpleRequirementList({
  title,
  entries,
  renderEntry,
}: {
  title: string;
  entries: Array<HideoutRequirementTrader | HideoutRequirementStation | HideoutRequirementSkill | HideoutBonus>;
  renderEntry: (entry: HideoutRequirementTrader | HideoutRequirementStation | HideoutRequirementSkill | HideoutBonus, index: number) => React.ReactNode;
}) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <section>
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
        {title}
      </h3>
      <div className="mt-3 grid gap-3">{entries.map(renderEntry)}</div>
    </section>
  );
}

function CraftCard({ craft, locale }: { craft: HideoutCraft; locale: Locale }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-[#1f222a]">
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-[#252830]">
          <Image
            src={craft.image}
            alt={getLocalizedName(craft, locale)}
            fill
            sizes="64px"
            className="object-contain p-1.5"
          />
        </div>
        <div>
          <h4 className="font-semibold">{getLocalizedName(craft, locale)}</h4>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            x{craft.reward_quantity} · {formatSecondsToDuration(craft.duration)}
          </p>
        </div>
      </div>

      {craft.require_items.length > 0 ? (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {craft.require_items.map((item) => (
            <Link
              key={item.id}
              href={`/item/info/${item.normalized_name}`}
              className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-[#252830]"
            >
              {getLocalizedName(item, locale)} x{item.quantity}
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function LevelCard({
  level,
  locale,
}: {
  level: HideoutLevelDetail;
  locale: Locale;
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
          Level {level.hideout_level}
        </span>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-[#1f222a] dark:text-gray-300">
          {formatSecondsToDuration(level.construction_time)}
        </span>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          {level.item_require.length > 0 ? (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
                Required Items
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {level.item_require.map((item) => (
                  <RequirementItemCard key={item.id} item={item} locale={locale} />
                ))}
              </div>
            </section>
          ) : null}

          {level.crafts.length > 0 ? (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
                Unlocks
              </h3>
              <div className="mt-3 grid gap-3">
                {level.crafts.map((craft) => (
                  <CraftCard key={craft.id} craft={craft} locale={locale} />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <div className="space-y-5">
          <SimpleRequirementList
            title="Trader Requirements"
            entries={level.trader_require}
            renderEntry={(entry, index) => {
              const trader = entry as HideoutRequirementTrader;
              return (
                <div
                  key={`${trader.id}-${index}`}
                  className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm dark:border-gray-700 dark:bg-[#1f222a]"
                >
                  {getLocalizedName(trader, locale)} Lv.{trader.trader_level}
                </div>
              );
            }}
          />
          <SimpleRequirementList
            title="Station Requirements"
            entries={level.station_require}
            renderEntry={(entry, index) => {
              const station = entry as HideoutRequirementStation;
              return (
                <div
                  key={`${station.id}-${index}`}
                  className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm dark:border-gray-700 dark:bg-[#1f222a]"
                >
                  {getLocalizedName(station, locale)} Lv.{station.station_level}
                </div>
              );
            }}
          />
          <SimpleRequirementList
            title="Skill Requirements"
            entries={level.skill_require}
            renderEntry={(entry, index) => {
              const skill = entry as HideoutRequirementSkill;
              return (
                <div
                  key={`${skill.id}-${index}`}
                  className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm dark:border-gray-700 dark:bg-[#1f222a]"
                >
                  {getLocalizedName(skill, locale)} Lv.{skill.skill_level}
                </div>
              );
            }}
          />
          <SimpleRequirementList
            title="Bonuses"
            entries={level.bonus}
            renderEntry={(entry, index) => {
              const bonus = entry as HideoutBonus;
              return (
                <div
                  key={`${bonus.id}-${index}`}
                  className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm dark:border-gray-700 dark:bg-[#1f222a]"
                >
                  <div className="font-medium">{getLocalizedName(bonus, locale)}</div>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {bonus.bonus_type}
                    {bonus.bonus_value !== null ? ` · ${bonus.bonus_value}` : ""}
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
    </article>
  );
}

export function HideoutPage({
  selectedStation,
  stations,
  hideout,
  locale,
}: {
  selectedStation: string;
  stations: HideoutStationSummary[];
  hideout: HideoutDetailResponse;
  locale: Locale;
}) {
  const masterName = getLocalizedName(hideout.master, locale);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
            Hideout
          </p>
          <h1 className="mt-2 text-3xl font-bold">{masterName}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
            V3 hideout 상세 응답을 기준으로 스테이션별 레벨, 요구 재료, 해금 제작을 한 화면에
            정리했습니다.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {stations.map((station) => (
              <Link
                key={station.id}
                href={`/hideout/${station.normalized_name}`}
                className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                  station.normalized_name === selectedStation
                    ? "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
                    : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:bg-[#1f222a] dark:text-gray-200"
                }`}
              >
                {getLocalizedName(station, locale)}
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-5">
          {hideout.levels.map((level) => (
            <LevelCard key={level.id} level={level} locale={locale} />
          ))}
        </section>
      </div>
    </main>
  );
}
