"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, Package } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ContentWidthAdBanner } from "@/components/shared/ad-banner";
import type { Locale } from "@/i18n/config";
import type { PrestigeCondition, PrestigeLevel } from "./api";

const copy = {
  ko: {
    title: "프레스티지", intro: "조건을 달성해 캐릭터를 처음부터 다시 시작하고, 와이프 이후에도 남는 보상을 받으세요.",
    summary: [["그대로 남음", "프로필 통계, 업적, 아레나 ARP와 무기고 진행도"], ["일부 남음", "스킬과 무기 숙련도의 일부, 이전 칸에 넣은 아이템"], ["초기화", "레벨, 퀘스트, 상인 평판, 은신처, 창고"]],
    detail: "레벨별 조건과 보상", conditions: "달성 조건", rewards: "보상", other: "그 밖의 보상",
    compare: "한눈에 비교", how: "프레스티지 하는 방법", ad: "광고", empty: "프레스티지 정보를 불러올 수 없어요.",
    pve: "PvE 조건과 보상 데이터가 아직 제공되지 않아요.",
    steps: ["다음 프레스티지 레벨의 조건을 확인하세요.", "게임에서 해당 조건을 달성하세요.", "이전 칸에 유지할 아이템을 넣으세요.", "프레스티지를 완료하고 보상을 확인하세요."],
    rows: ["PMC 레벨", "루블", "퀘스트", "스토리 챕터", "스킬 조건", "은신처", "스킬·무기 숙련도 유지", "아이템 이전 칸"],
  },
  en: {
    title: "Prestige", intro: "Meet the requirements to restart your character and earn rewards that persist through wipes.",
    summary: [["Kept", "Profile stats, achievements, Arena ARP and armory progress"], ["Partly kept", "A share of skills and weapon mastery, and items in the transfer window"], ["Reset", "Level, quests, trader standing, hideout and stash"]],
    detail: "Requirements and rewards by level", conditions: "Requirements", rewards: "Rewards", other: "Other rewards",
    compare: "Compare all levels", how: "How to prestige", ad: "Advertisement", empty: "Prestige information could not be loaded.",
    pve: "PvE requirements and rewards are not available yet.",
    steps: ["Check the requirements for the next prestige level.", "Meet the requirements in game.", "Put the items you want to keep in the transfer window.", "Complete prestige and check your rewards."],
    rows: ["PMC level", "Roubles", "Quests", "Story chapters", "Skills", "Hideout", "Skills and mastery kept", "Item transfer window"],
  },
  ja: {
    title: "プレステージ", intro: "条件を満たしてキャラクターを最初からやり直し、ワイプ後も残る報酬を獲得しましょう。",
    summary: [["維持", "プロフィール統計、実績、アリーナのARPと武器庫の進行度"], ["一部維持", "スキル・武器熟練度の一部、転送枠に入れたアイテム"], ["リセット", "レベル、クエスト、商人信頼度、隠れ家、スタッシュ"]],
    detail: "レベル別の条件と報酬", conditions: "達成条件", rewards: "報酬", other: "その他の報酬",
    compare: "一覧で比較", how: "プレステージの手順", ad: "広告", empty: "プレステージ情報を読み込めませんでした。",
    pve: "PvEの条件と報酬はまだ取得できません。",
    steps: ["次のプレステージレベルの条件を確認します。", "ゲーム内で条件を達成します。", "残したいアイテムを転送枠に入れます。", "プレステージを完了して報酬を確認します。"],
    rows: ["PMCレベル", "ルーブル", "クエスト", "ストーリーチャプター", "スキル", "隠れ家", "スキル・武器熟練度維持", "アイテム転送枠"],
  },
} as const;

const panel = "rounded-xl border border-line bg-surface p-4 sm:p-6";
const summaryTone = [
  "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
  "bg-amber-500/10 text-amber-800 dark:text-amber-300",
  "bg-red-500/10 text-red-800 dark:text-red-300",
];
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

type Mode = "pvp" | "pve";
type Named = { name_ko: string | null; name_en: string | null; name_ja: string | null };

function name(value: Named, locale: Locale) {
  return value[`name_${locale}`] || value.name_en || value.name_ko || value.name_ja || "—";
}

function transferGrid(level: PrestigeLevel) {
  const grid = level.transfer_settings.find((setting) => setting.type === "item_grid");
  return grid?.grid_width && grid.grid_height ? { width: grid.grid_width, height: grid.grid_height } : null;
}

function retention(level: PrestigeLevel, locale: Locale) {
  const format = new Intl.NumberFormat(locale, { style: "percent" });
  const rates = level.transfer_settings.filter((setting) => setting.type === "skill" && setting.transfer_rate !== null);
  const unique = new Set(rates.map(({ transfer_rate }) => transfer_rate));
  if (unique.size === 1) return format.format(rates[0].transfer_rate ?? 0);
  return rates.map((setting) => `${name(setting, locale)} ${format.format(setting.transfer_rate ?? 0)}`).join(" · ") || "—";
}

function conditionContent(condition: PrestigeCondition, locale: Locale): ReactNode {
  const { task, station, items } = condition;
  const linkClass = "underline decoration-dotted underline-offset-4 hover:text-orange-700 dark:hover:text-orange-300";
  if (task) {
    return task.normalized_name ? <Link className={linkClass} href={`/quest/detail/${task.normalized_name}`}>{name(task, locale)}</Link> : name(task, locale);
  }
  if (station) {
    const label = `${name(station, locale)} Lv. ${station.level}`;
    return station.normalized_name ? <Link className={linkClass} href={`/hideout/${station.normalized_name}`}>{label}</Link> : label;
  }
  if (condition.skill_name) return `${condition.skill_name} Lv. ${condition.skill_level ?? "—"}`;
  if (items.length) return `${items.map((item) => name(item, locale)).join(" · ")} ×${condition.count ?? "—"}`;
  return condition[`description_${locale}`] || condition.description_en || "—";
}

const conditionGroups = ["taskStatus", "story", "skill", "hideoutStation"] as const;

function compareValue(level: PrestigeLevel, index: number, locale: Locale): ReactNode {
  if (index === 0) return level.conditions.find((condition) => condition.type === "playerLevel")?.player_level ?? "—";
  if (index === 1) {
    const count = level.conditions.find((condition) => condition.items.some((item) => item.normalized_name === "roubles"))?.count;
    return count == null ? "—" : `${new Intl.NumberFormat(locale).format(count)} ₽`;
  }
  if (index === 6) return retention(level, locale);
  if (index === 7) {
    const grid = transferGrid(level);
    return grid ? `${grid.width}×${grid.height}` : "—";
  }
  const conditions = level.conditions.filter((condition) => condition.type === conditionGroups[index - 2]);
  return conditions.length ? conditions.map((condition, i) => <span key={condition.id}>{i > 0 && " · "}{conditionContent(condition, locale)}</span>) : "—";
}

export function PrestigePage({ levels, locale }: { levels: PrestigeLevel[] | null; locale: Locale }) {
  const t = copy[locale];
  const [selected, setSelected] = useState<number>();
  const [mode, setMode] = useState<Mode>("pvp");
  const detail = useRef<HTMLElement>(null);
  const modeButtons = useRef<HTMLDivElement>(null);
  const compareButtons = useRef<HTMLDivElement>(null);
  const ordered = [...(levels ?? [])].sort((a, b) => a.prestige_level - b.prestige_level);
  const level = ordered.find((entry) => entry.prestige_level === selected) ?? ordered[0];

  useEffect(() => {
    function sync() {
      const params = new URLSearchParams(window.location.search);
      setSelected(Number(params.get("lv")) || undefined);
      const requested = params.get("mode") ?? localStorage.getItem("prestige-mode");
      setMode(requested === "pve" ? "pve" : "pvp");
    }
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  function selectLevel(next: number) {
    setSelected(next);
    const url = new URL(window.location.href);
    url.searchParams.set("lv", String(next));
    if (url.href !== window.location.href) window.history.pushState(null, "", url);
    detail.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function selectMode(next: Mode, control: HTMLDivElement | null) {
    if (next === mode) return;
    const top = control?.getBoundingClientRect().top;
    setMode(next);
    localStorage.setItem("prestige-mode", next);
    const url = new URL(window.location.href);
    url.searchParams.set("mode", next);
    window.history.pushState(null, "", url);
    requestAnimationFrame(() => {
      if (control && top !== undefined) window.scrollBy({ top: control.getBoundingClientRect().top - top, behavior: "instant" });
    });
  }

  const modePicker = (ref: typeof modeButtons) => (
    <div ref={ref} className="inline-flex shrink-0 gap-1 rounded-lg border border-line bg-surface-elevated p-1" role="group" aria-label="PvP / PvE">
      {(["pvp", "pve"] as const).map((value) => (
        <button key={value} type="button" aria-pressed={mode === value} onClick={() => selectMode(value, ref.current)}
          className={`rounded-md px-3 py-1.5 text-xs font-bold uppercase ${focus} ${mode === value ? "bg-surface text-foreground shadow-sm" : "text-gray-600 hover:text-foreground dark:text-gray-400"}`}>
          {value}
        </button>
      ))}
    </div>
  );

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1280px] space-y-9 px-4 py-8 sm:px-7 lg:px-10">
      <header className={panel}>
        <h1 className="text-center text-3xl font-black sm:text-4xl">{t.title}</h1>
        <div className="mt-5 grid items-center gap-4 lg:grid-cols-2">
          <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">{t.intro}</p>
          <ul className="grid gap-2 sm:grid-cols-3">
            {t.summary.map(([label, description], index) => (
              <li key={label} className={`rounded-lg p-3 text-xs leading-5 ${summaryTone[index]}`}><strong className="block">{label}</strong>{description}</li>
            ))}
          </ul>
        </div>
        {level && <nav aria-label={t.detail} className="mt-6 grid grid-cols-3 gap-2 border-t border-line pt-5 sm:grid-cols-6">
          {ordered.map((entry) => <button key={entry.id} type="button" aria-pressed={entry === level} onClick={() => selectLevel(entry.prestige_level)}
            className={`grid justify-items-center gap-1 rounded-lg border p-2 text-xs font-bold sm:p-3 ${focus} ${entry === level ? "border-amber-600 bg-amber-500/10" : "border-line bg-surface-elevated hover:border-amber-600"}`}>
            <Emblem level={entry} size={80} /><span>{t.title} {entry.prestige_level}</span>
          </button>)}
        </nav>}
      </header>
      {!level ? <p role="status" className={panel}>{t.empty}</p> : <>
        <section ref={detail} className="space-y-3 scroll-mt-20">
          <h2 className="text-xl font-black sm:text-2xl">{t.detail}</h2>
          <div className="sticky top-2 z-10 flex items-center justify-between gap-3 rounded-xl border border-line bg-surface p-3 shadow-sm sm:p-4">
            <div className="flex items-center gap-3"><span className="hidden sm:block"><Emblem level={level} size={42} /></span>
              <h3 className="text-lg font-bold sm:text-xl">{t.title} {level.prestige_level}</h3></div>
            {modePicker(modeButtons)}
          </div>
          {mode === "pve" ? <p role="status" className={panel}>{t.pve}</p> :
            <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
              <section className={panel}>
                <h4 className="mb-3 font-bold">{t.conditions}</h4>
                <dl className="grid grid-cols-2 gap-2">
                  {t.rows.slice(0, 2).map((label, index) => <div key={label} className="rounded-lg bg-surface-elevated p-3">
                    <dt className="text-xs text-gray-600 dark:text-gray-400">{label}</dt>
                    <dd className="mt-1 text-xl font-bold tabular-nums">{compareValue(level, index, locale)}</dd>
                  </div>)}
                </dl>
                {conditionGroups.map((group, index) => {
                  const conditions = level.conditions.filter((row) => row.type === group);
                  return conditions.length > 0 && <div key={group} className="mt-3 border-t border-line pt-3">
                    <h5 className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t.rows[index + 2]}</h5>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{conditions.map((row) => <li key={row.id}>{conditionContent(row, locale)}</li>)}</ul>
                  </div>;
                })}
                {level.conditions.filter((row) => row.type !== "playerLevel" && !conditionGroups.some((group) => group === row.type) && !row.items.some((item) => item.normalized_name === "roubles")).map((row) => (
                  <p key={row.id} className="mt-2 text-sm">{conditionContent(row, locale)}</p>
                ))}
              </section>
              <PrestigeRewards level={level} locale={locale} />
            </div>}
        </section>
        <ContentWidthAdBanner label={t.ad} />
        <section className={panel}>
          <div className="mb-4 flex items-center justify-between gap-3"><h2 className="text-xl font-black sm:text-2xl">{t.compare}</h2>{modePicker(compareButtons)}</div>
          {mode === "pve" ? <p role="status" className="text-sm text-gray-600 dark:text-gray-400">{t.pve}</p> :
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead><tr><td className="sticky left-0 z-10 bg-surface" />
                  {ordered.map((entry) => <th key={entry.id} scope="col" className={`p-2 ${entry === level ? "bg-amber-500/10" : ""}`}>
                    <button type="button" onClick={() => selectLevel(entry.prestige_level)} aria-label={`${t.title} ${entry.prestige_level}`} aria-pressed={entry === level} className={`mx-auto grid justify-items-center rounded px-2 ${focus}`}>
                      <Emblem level={entry} size={34} />{entry.prestige_level}
                    </button>
                  </th>)}
                </tr></thead>
                <tbody>{t.rows.map((label, index) => <tr key={label} className="border-t border-line">
                  <th scope="row" className="sticky left-0 z-10 whitespace-nowrap bg-surface p-2 font-medium text-gray-600 dark:text-gray-400">{label}</th>
                  {ordered.map((entry) => <td key={entry.id} className={`p-2 text-center ${index === 3 ? "min-w-32 break-keep" : "whitespace-nowrap"} ${index < 2 || index > 5 ? "font-semibold tabular-nums" : ""} ${entry === level ? "bg-amber-500/10" : ""}`}>{compareValue(entry, index, locale)}</td>)}
                </tr>)}</tbody>
              </table>
            </div>}
        </section>
      </>}
      <section className={panel}>
        <h2 className="text-xl font-bold">{t.how}</h2>
        <ol className="mt-4 grid list-inside list-decimal gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step) => <li key={step} className="rounded-lg bg-surface-elevated p-3">{step}</li>)}
        </ol>
      </section>
    </main>
  );
}

function Emblem({ level, size }: { level: PrestigeLevel; size: number }) {
  const image = (size >= 80 ? level.image_link : level.icon_link) ?? level.image_link;
  return image ? <Image src={image} alt="" width={size} height={size} className="aspect-square object-contain" /> : <Award aria-hidden="true" size={size} />;
}

function PrestigeRewards({ level, locale }: { level: PrestigeLevel; locale: Locale }) {
  const t = copy[locale];
  const grid = transferGrid(level);
  const items = level.rewards.items.flatMap(({ item, quantity }) => item ? [{
    id: item.id, image: item.image, label: name(item, "en") + (quantity > 1 ? ` ×${quantity}` : ""), kind: "",
  }] : []);
  const customizations = level.rewards.customizations.map((item) => ({
    id: item.id,
    image: item.image_link ?? item.items.find((related) => related.image)?.image ?? null,
    label: name(item, "en"),
    kind: item.customization_type === "DogTags" ? "BEAR · USEC" : item.customization_type ?? "",
  }));
  const rewards = [...items, ...customizations];
  return <section className={panel}>
    <h4 className="mb-3 font-bold">{t.rewards}</h4>
    <div className="mb-4 grid grid-cols-2 gap-2 lg:grid-cols-3">
      <div className="rounded-lg bg-surface-elevated p-3"><p className="text-xl font-black text-amber-800 dark:text-amber-300">{retention(level, locale)}</p><p className="text-xs">{t.rows[6]}</p></div>
      <div className="rounded-lg bg-surface-elevated p-3"><p className="text-xl font-black text-amber-800 dark:text-amber-300">{grid ? `${grid.width}×${grid.height}` : "—"}</p><p className="text-xs">{t.rows[7]}</p>
        {grid && <div aria-hidden="true" className="mt-2 grid max-w-24 gap-0.5" style={{ gridTemplateColumns: `repeat(${grid.width}, minmax(0, 1fr))` }}>
          {Array.from({ length: grid.width * grid.height }, (_, index) => <span key={index} className="aspect-square rounded-xs bg-amber-500/80" />)}
        </div>}
      </div>
      {level.rewards.skills.map((skill) => <div key={skill.skill_name} className="rounded-lg bg-surface-elevated p-3"><p className="text-xl font-black text-amber-800 dark:text-amber-300">+{skill.skill_level}</p><p className="text-xs">{skill.skill_name}</p></div>)}
    </div>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
      {rewards.map((reward) => reward.image && <article key={reward.id} className="rounded-lg border border-line p-2">
        <RewardImage src={reward.image} />
        <p className="mt-2 break-words text-xs font-semibold">{reward.label}</p>
        {reward.kind && <p className="text-xs text-gray-600 dark:text-gray-400">{reward.kind}</p>}
      </article>)}
    </div>
    {rewards.some((reward) => !reward.image) && <div className="mt-4">
      <h5 className="mb-2 text-sm font-bold">{t.other}</h5>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {rewards.filter((reward) => !reward.image).map((reward) => <li key={reward.id} className="flex items-center gap-2 rounded-lg bg-surface-elevated p-2 text-xs"><Package aria-hidden="true" className="size-4 shrink-0" />{reward.label}</li>)}
      </ul>
    </div>}
  </section>;
}

function RewardImage({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  return <div className="relative grid aspect-[5/4] place-items-center rounded-md bg-surface-elevated">
    {failed ? <Package aria-hidden="true" className="size-7 text-gray-500 dark:text-gray-400" /> :
      <Image src={src} alt="" fill sizes="(max-width: 640px) 45vw, 160px" className="object-contain p-2" onError={() => setFailed(true)} />}
  </div>;
}
