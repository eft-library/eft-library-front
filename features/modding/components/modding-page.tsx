"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Check,
  ChevronRight,
  Crosshair,
  Layers,
  LoaderCircle,
  Plus,
  RotateCcw,
  Undo2,
  Redo2,
  Search,
  Settings2,
  X,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getWeapon, getWeapons } from "../api";
import { PresetReconstructionPanel } from "./preset-reconstruction-panel";
import { useWorkbenchData } from "../use-workbench-data";
import { buildSlots, itemName } from "../build";
import { useBuilds } from "../builds/provider";
import { BuildNavigation, BuildEditorPanel } from "../builds/editor-panel";
import { BuildsHub } from "../builds/hub";
import { nodePaths, selectionsFromNodes } from "../builds/tree";
import { moddingCopy, type ModdingCopy } from "../copy";
import type {
  ItemSummary,
  ModdingManifest,
  WeaponSnapshot,
  WeaponSummary,
} from "../types";

const panel = "rounded-2xl border border-line bg-surface";
const action =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70";
const number = (value: number | null | undefined) =>
  value == null
    ? "—"
    : new Intl.NumberFormat("en", { maximumFractionDigits: 3 }).format(value);

function ItemImage({
  item,
  large = false,
  card = false,
}: {
  item: ItemSummary;
  large?: boolean;
  card?: boolean;
}) {
  return item.image ? (
    <Image
      src={item.image}
      alt=""
      width={large || card ? 520 : 100}
      height={large || card ? 240 : 70}
      unoptimized
      className={
        card
          ? "h-40 w-full object-contain drop-shadow-lg sm:h-44"
          : large
            ? "h-44 w-full object-contain drop-shadow-xl sm:h-56"
            : "h-14 w-20 shrink-0 object-contain"
      }
    />
  ) : (
    <Box
      aria-hidden
      className={
        large
          ? "mx-auto h-32 w-32 text-foreground dark:text-white"
          : "h-12 w-16 shrink-0 text-foreground dark:text-white"
      }
    />
  );
}
function SearchField({
  value,
  onChange,
  placeholder,
  clear,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  clear: string;
}) {
  return (
    <div className="relative">
      <Search
        aria-hidden
        className="absolute left-3 top-3 h-4 w-4 text-foreground dark:text-white"
      />
      <input
        aria-label={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") onChange("");
        }}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-line bg-background pl-9 pr-10 text-sm outline-none placeholder:text-foreground dark:text-white focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
      {value && (
        <button
          aria-label={clear}
          onClick={() => onChange("")}
          className="absolute right-2 top-2 rounded p-1 hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-accent"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
function Notice({
  copy,
  error,
  retry,
}: {
  copy: ModdingCopy;
  error?: boolean;
  retry?: () => void;
}) {
  return (
    <div
      role={error ? "alert" : "status"}
      className={`${panel} flex min-h-48 flex-col items-center justify-center gap-4 p-8 text-center text-sm text-foreground dark:text-white`}
    >
      {!error && <LoaderCircle className="h-6 w-6 animate-spin text-accent" />}
      {error ? copy.error : copy.loading}
      {error && (
        <button className={action} onClick={retry}>
          {copy.retry}
        </button>
      )}
    </div>
  );
}
function Stat({
  label,
  value,
  unit,
}: {
  label: string;
  value: number | null | undefined;
  unit?: string;
}) {
  return (
    <div className="min-w-0 p-3">
      <dt className="truncate text-xs text-foreground dark:text-white">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-lg font-semibold tabular-nums">
        {number(value)}
        {value != null && unit && (
          <span className="ml-1 text-xs font-normal text-foreground dark:text-white">
            {unit}
          </span>
        )}
      </dd>
    </div>
  );
}

export function ModdingPage({
  locale,
  weaponId: routeWeaponId,
}: {
  locale: Locale;
  weaponId?: string;
}) {
  const router = useRouter();
  const attemptedRoute = useRef<string | null>(null);
  const builds = useBuilds();
  const copy = moddingCopy[locale];
  const weaponId = builds.screen === "editor" ? routeWeaponId : null;
  const [word, setWord] = useState("");
  const [limit, setLimit] = useState(24);
  const weapons = useQuery({
    queryKey: ["modding", "weapons"],
    queryFn: ({ signal }) => getWeapons(signal),
    staleTime: 5 * 60_000,
  });
  const filtered = useMemo(
    () =>
      weapons.data?.list.weapons.filter(({ item }) => matches(item, word)) ??
      [],
    [weapons.data, word],
  );
  const chosen = weapons.data?.list.weapons.find(
    ({ item }) => item.id === weaponId,
  );
  useEffect(() => {
    if (!routeWeaponId) {
      attemptedRoute.current = null;
      return;
    }
    if (!chosen || attemptedRoute.current === routeWeaponId) return;
    attemptedRoute.current = routeWeaponId;
    if (builds.content?.weapon_item_id === routeWeaponId) return;
    void builds.start(chosen).then((opened) => {
      if (!opened)
        router.replace(
          builds.content
            ? `/modding/${builds.content.weapon_item_id}`
            : "/modding",
        );
    });
  }, [routeWeaponId, chosen, builds.content, builds.start, router]);
  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-accent">
            <Crosshair className="h-4 w-4" /> ARMORY / WEAPON MODDING
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {copy.title}
          </h1>
        </div>
        {chosen && (
          <button
            disabled={builds.pending}
            onClick={() => builds.setScreen("weapons")}
            className={action}
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.back}
          </button>
        )}
      </div>
      <BuildNavigation />
      {builds.enabled &&
      (builds.screen === "public" || builds.screen === "mine") ? (
        <BuildsHub key={builds.screen} />
      ) : (
        <>
          {builds.screen === "editor" && <BuildEditorPanel />}
          {weapons.isPending ? (
            <Notice copy={copy} />
          ) : weapons.isError || !weapons.data ? (
            <Notice copy={copy} error retry={() => void weapons.refetch()} />
          ) : weaponId ? (
            chosen ? (
              builds.content?.weapon_item_id !== weaponId ? (
                <Notice copy={copy} />
              ) : (
                <WeaponLoader
                  key={chosen.item.id}
                  weapon={chosen}
                  manifest={weapons.data.manifest}
                  locale={locale}
                />
              )
            ) : (
              <p className="rounded-xl border border-line bg-surface p-5 text-sm text-foreground dark:text-white">
                {builds.t(
                  "현재 정적 데이터에 총기가 없습니다. 저장본의 구성은 위 목록에 보존되어 있습니다.",
                  "This weapon is absent from current static data. Your saved contents are preserved above.",
                  "現在の静的データに武器がありません。保存済みの構成は上の一覧に保持されています。",
                )}
              </p>
            )
          ) : (
            <>
              <div
                className={`${panel} mb-6 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between`}
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Layers className="h-4 w-4 text-accent" />
                  {copy.weapons}
                  <span className="rounded-md bg-surface-elevated px-2 py-1 font-mono text-xs">
                    {filtered.length}
                  </span>
                </div>
                <div className="w-full sm:w-80">
                  <SearchField
                    value={word}
                    onChange={(value) => {
                      setWord(value);
                      setLimit(24);
                    }}
                    placeholder={copy.searchWeapons}
                    clear={copy.clear}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.slice(0, limit).map((weapon) => (
                  <button
                    key={weapon.item.id}
                    onClick={() => void builds.start(weapon)}
                    className={`${panel} group overflow-hidden text-left transition hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
                  >
                    <div className="relative flex h-52 items-center justify-center bg-surface-elevated/60 px-5 pb-5 pt-9 sm:h-56">
                      <ItemImage item={weapon.item} card />
                      <span className="absolute left-3 top-3 font-mono text-[10px] tracking-widest text-foreground dark:text-white">
                        {weapon.weapon_properties.caliber?.replace(
                          /^Caliber/,
                          "",
                        ) ?? "—"}
                      </span>
                      <ArrowRight className="absolute bottom-3 right-3 h-4 w-4 text-foreground dark:text-white group-hover:text-accent" />
                    </div>
                    <div className="p-4">
                      <h2 className="min-h-10 text-sm font-semibold leading-5">
                        {itemName(weapon.item, locale)}
                      </h2>
                      <div className="mt-4 flex justify-between border-t border-line pt-3 text-xs text-foreground dark:text-white">
                        <span>
                          {copy.presets}{" "}
                          <b className="text-foreground">
                            {weapon.preset_count}
                          </b>
                        </span>
                        <span>
                          {weapon.item.slot_count} {copy.slots}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {!filtered.length && (
                <p className="py-16 text-center text-sm text-foreground dark:text-white">
                  {copy.noResults}
                </p>
              )}
              {filtered.length > limit && (
                <div className="mt-6 text-center">
                  <button
                    className={action}
                    onClick={() => setLimit((value) => value + 24)}
                  >
                    {copy.more} ({Math.min(limit, filtered.length)}/
                    {filtered.length})
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
}
function matches(item: ItemSummary, word: string) {
  const query = word.trim().toLocaleLowerCase();
  return (
    !query ||
    [
      item.name_ko,
      item.name_en,
      item.name_ja,
      item.normalized_name,
      item.id,
    ].some((value) => value?.toLocaleLowerCase().includes(query))
  );
}
function WeaponLoader({
  weapon,
  manifest,
  locale,
}: {
  weapon: WeaponSummary;
  manifest: ModdingManifest | null;
  locale: Locale;
}) {
  const query = useQuery({
    queryKey: [
      "modding",
      "snapshot",
      manifest?.generation ?? "api",
      weapon.item.id,
    ],
    queryFn: ({ signal }) => getWeapon(manifest, weapon.item.id, signal),
    staleTime: 5 * 60_000,
    retry: false,
    gcTime: 5 * 60_000,
  });
  if (query.isPending) return <Notice copy={moddingCopy[locale]} />;
  if (query.isError || !query.data)
    return (
      <Notice
        copy={moddingCopy[locale]}
        error
        retry={() => void query.refetch()}
      />
    );
  return (
    <Workbench
      key={query.data.generation}
      snapshot={query.data.snapshot}
      source={query.data.source}
      locale={locale}
    />
  );
}

function Workbench({
  snapshot: baseSnapshot,
  source,
  locale,
}: {
  snapshot: WeaponSnapshot;
  source: "static" | "api";
  locale: Locale;
}) {
  const copy = moddingCopy[locale];
  const builds = useBuilds();
  const selections = useMemo(
    () => (builds.content ? selectionsFromNodes(builds.content) : {}),
    [builds.content],
  );
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [word, setWord] = useState("");
  const [tab, setTab] = useState<"build" | "presets">("build");
  const [presetId, setPresetId] = useState(
    () =>
      baseSnapshot.preset_references.presets.find(
        (p) => p.link.is_default_reference,
      )?.item.id ??
      baseSnapshot.preset_references.presets[0]?.item.id ??
      "",
  );
  const [limit, setLimit] = useState(40);
  const [sort, setSort] = useState("name");
  const parentPath = activeKey?.slice(0, activeKey.lastIndexOf("/"));
  const ownerId =
    parentPath && builds.content
      ? nodePaths(builds.content.nodes, builds.content.weapon_item_id).get(
          parentPath,
        )?.item_id
      : undefined;
  const slotId = activeKey?.slice(activeKey.lastIndexOf("/") + 1);
  const data = useWorkbenchData(
    baseSnapshot,
    source,
    builds.content?.nodes.map((node) => node.item_id) ?? [],
    ownerId,
    slotId,
    presetId,
    tab,
  );
  const snapshot = data.snapshot;
  const slots = useMemo(
    () =>
      buildSlots(
        snapshot,
        selections,
        builds.content?.nodes.map((node) => node.item),
      ),
    [snapshot, selections, builds.content],
  );
  const active = slots.find((slot) => slot.key === activeKey);
  const candidates = active
    ? (snapshot.slot_candidates[active.slot.item_id]?.[active.slot.slot_id]
        ?.candidates ?? [])
    : [];
  const filtered = candidates
    .filter(({ item }) => matches(item, word))
    .sort((a, b) => {
      if (sort === "weight")
        return (a.item.weight ?? Infinity) - (b.item.weight ?? Infinity);
      if (sort === "ergo")
        return (
          (b.item.mod_properties?.ergonomics ?? -Infinity) -
          (a.item.mod_properties?.ergonomics ?? -Infinity)
        );
      return itemName(a.item, locale).localeCompare(
        itemName(b.item, locale),
        locale,
      );
    });
  const weapon = snapshot.weapon;
  const stats = weapon.weapon_properties;
  const preset = snapshot.presets[presetId];
  function selectSlot(key: string) {
    setActiveKey(key);
    setWord("");
    setLimit(40);
  }
  function equip(id?: string) {
    if (active)
      builds.mount(
        active.key,
        id
          ? (candidates.find((candidate) => candidate.item.id === id)?.item ??
              snapshot.items[id]?.item)
          : undefined,
      );
  }
  return (
    <>
      {data.itemError && <Notice copy={copy} error retry={data.retryItems} />}
      {data.itemsLoading && (
        <p
          role="status"
          className="mb-3 text-sm text-foreground dark:text-white"
        >
          {copy.loading}
        </p>
      )}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-accent/10 p-2.5 text-accent">
            <Settings2 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold">
              {itemName(weapon.item, locale)}
            </h2>
            <p className="mt-1 font-mono text-xs text-foreground dark:text-white">
              {stats.caliber?.replace(/^Caliber/, "")} ·{" "}
              {number(stats.fire_rate)} RPM
            </p>
          </div>
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={copy.workbench}
        >
          <button
            type="button"
            className={action}
            disabled={builds.pending || !builds.canUndo}
            onClick={builds.undo}
            title={builds.t(
              "되돌리기 (Ctrl/Cmd+Z)",
              "Undo (Ctrl/Cmd+Z)",
              "元に戻す (Ctrl/Cmd+Z)",
            )}
          >
            <Undo2 className="h-4 w-4" />
            {builds.t("되돌리기", "Undo", "元に戻す")}
          </button>
          <button
            type="button"
            className={action}
            disabled={builds.pending || !builds.canRedo}
            onClick={builds.redo}
            title={builds.t(
              "다시 실행 (Ctrl/Cmd+Shift+Z, Ctrl+Y)",
              "Redo (Ctrl/Cmd+Shift+Z, Ctrl+Y)",
              "やり直す (Ctrl/Cmd+Shift+Z, Ctrl+Y)",
            )}
          >
            <Redo2 className="h-4 w-4" />
            {builds.t("다시 실행", "Redo", "やり直す")}
          </button>
          {(
            [
              ["build", copy.workbench],
              ["presets", copy.presets],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              aria-pressed={tab === id}
              onClick={() => setTab(id)}
              className={`${action} ${tab === id ? "border-accent/50 bg-accent/10 text-orange-700 dark:text-orange-300" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid items-start gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <section className={`${panel} overflow-hidden`}>
            <div className="bg-surface-elevated/50 px-5 py-7">
              <ItemImage item={weapon.item} large />
            </div>
            <div className="px-4 pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground dark:text-white">
                {copy.base}
              </h3>
            </div>
            <dl className="grid grid-cols-2 divide-x divide-line px-1 pb-2">
              <Stat label={copy.ergo} value={stats.ergonomics} />
              <Stat label={copy.weight} value={weapon.item.weight} unit="kg" />
              <Stat label={copy.vertical} value={stats.recoil_vertical} />
              <Stat label={copy.horizontal} value={stats.recoil_horizontal} />
            </dl>
          </section>
          {tab === "build" && (
            <section className={`${panel} p-4`}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">{copy.assembly}</h3>
                <span className="font-mono text-xs text-accent">
                  {Object.keys(selections).length}
                </span>
              </div>
              {slots
                .filter((slot) => slot.selected)
                .map((slot) => (
                  <div
                    key={slot.key}
                    className="flex items-center gap-2 border-t border-line py-2 text-xs"
                  >
                    <Check className="h-3 w-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span className="min-w-0 flex-1">
                      {slot.selected && itemName(slot.selected, locale)}
                    </span>
                    <button
                      disabled={builds.pending}
                      aria-label={`${copy.remove} ${slot.selected && itemName(slot.selected, locale)}`}
                      className="rounded p-1 hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-accent"
                      onClick={() => {
                        builds.mount(slot.key);
                        setActiveKey(slot.key);
                      }}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              <button
                disabled={builds.pending || !Object.keys(selections).length}
                onClick={() => {
                  void builds.reset();
                }}
                className={`${action} mt-3 w-full`}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {copy.reset}
              </button>
            </section>
          )}
        </aside>
        {tab === "build" ? (
          <div className="min-w-0 space-y-5">
            <section className={`${panel} p-4 sm:p-5`}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <Layers className="h-4 w-4 text-accent" />
                  {copy.slots}
                </h3>
                <span className="font-mono text-xs text-foreground dark:text-white">
                  {slots.length} {copy.count}
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-3">
                {slots.map((entry) => (
                  <div key={entry.key} className="min-w-0">
                    <button
                      onClick={() => selectSlot(entry.key)}
                      aria-pressed={activeKey === entry.key}
                      className={`flex min-h-24 w-full items-center gap-3 rounded-xl border p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${activeKey === entry.key ? "border-accent bg-accent/10 ring-1 ring-accent/20" : "border-line bg-background/60 hover:border-accent/50 hover:bg-surface-elevated"}`}
                    >
                      {entry.selected ? (
                        <ItemImage item={entry.selected} />
                      ) : (
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-dashed border-foreground/20 text-foreground dark:text-white">
                          <Plus className="h-5 w-5" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="mb-1 flex flex-wrap items-center gap-1 text-[10px] text-foreground dark:text-white">
                          {entry.depth > 0 && (
                            <span className="font-mono text-accent">
                              ↳{entry.depth}
                            </span>
                          )}
                          {itemName(entry.slot, locale)}
                          {entry.slot.required && (
                            <span className="rounded bg-amber-500/10 px-1 text-amber-800 dark:text-amber-300">
                              {copy.required}
                            </span>
                          )}
                        </span>
                        <span
                          className={`line-clamp-2 text-xs font-medium ${entry.selected ? "text-foreground" : "text-foreground dark:text-white"}`}
                        >
                          {entry.selected
                            ? itemName(entry.selected, locale)
                            : copy.emptySlot}
                        </span>
                        <span className="mt-1 block font-mono text-[10px] text-foreground dark:text-white">
                          {snapshot.slot_candidates[entry.slot.item_id]?.[
                            entry.slot.slot_id
                          ]?.total ?? (source === "api" ? "—" : 0)}{" "}
                          {copy.parts}
                        </span>
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-foreground dark:text-white" />
                    </button>
                    {entry.blocked && (
                      <p className="p-2 text-[11px] text-amber-800 dark:text-amber-300">
                        {copy.depth}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {!slots.length && (
                <p className="py-8 text-center text-sm text-foreground dark:text-white">
                  {copy.noSlots}
                </p>
              )}
            </section>
            <section
              className={`${panel} overflow-hidden`}
              aria-label={copy.parts}
            >
              <div className="border-b border-line p-4 sm:p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">
                    {active ? itemName(active.slot, locale) : copy.parts}
                    <span className="ml-2 font-mono text-xs font-normal text-accent">
                      {active ? filtered.length : ""}
                    </span>
                  </h3>
                  {active?.selected && (
                    <button
                      className={`${action} text-xs`}
                      disabled={builds.pending}
                      onClick={() => equip()}
                    >
                      <X className="h-3 w-3" />
                      {copy.remove}
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="flex-1">
                    <SearchField
                      value={word}
                      onChange={(value) => {
                        setWord(value);
                        setLimit(40);
                      }}
                      placeholder={copy.searchParts}
                      clear={copy.clear}
                    />
                  </div>
                  <select
                    aria-label={builds.t(
                      "파츠 정렬",
                      "Sort parts",
                      "パーツの並び順",
                    )}
                    value={sort}
                    onChange={(event) => {
                      setSort(event.target.value);
                      setLimit(40);
                    }}
                    className="rounded-lg border border-line bg-background px-3 py-2 text-xs outline-none focus:border-accent"
                  >
                    <option value="name">
                      {builds.t("이름순", "Name", "名前順")}
                    </option>
                    <option value="weight">
                      {builds.t(
                        "무게 낮은순",
                        "Weight: low to high",
                        "重量の軽い順",
                      )}
                    </option>
                    <option value="ergo">
                      {builds.t(
                        "인체공학 높은순",
                        "Ergonomics: high to low",
                        "エルゴノミクスの高い順",
                      )}
                    </option>
                  </select>
                </div>
              </div>
              {!active ? (
                <div className="flex min-h-56 flex-col items-center justify-center gap-3 p-6 text-center text-sm text-foreground dark:text-white">
                  <Crosshair className="h-8 w-8 text-accent/50" />
                  {copy.pickSlot}
                </div>
              ) : data.candidatesError ? (
                <Notice copy={copy} error retry={data.retryCandidates} />
              ) : data.candidatesLoading ? (
                <Notice copy={copy} />
              ) : !filtered.length ? (
                <p className="py-16 text-center text-sm text-foreground dark:text-white">
                  {copy.noResults}
                </p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[570px] text-left text-xs">
                      <thead className="bg-surface-elevated/60 text-foreground dark:text-white">
                        <tr>
                          <th className="px-4 py-3 font-medium">{copy.name}</th>
                          <th className="px-3 py-3 font-medium">{copy.ergo}</th>
                          <th className="px-3 py-3 font-medium">
                            {copy.recoil}
                          </th>
                          <th className="px-3 py-3 font-medium">
                            {copy.weight}
                          </th>
                          <th className="px-4 py-3">
                            <span className="sr-only">{copy.equip}</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.slice(0, limit).map(({ item }) => {
                          const equipped = active.selected?.id === item.id;
                          return (
                            <tr
                              key={item.id}
                              onClick={() => {
                                if (!builds.pending)
                                  equip(equipped ? undefined : item.id);
                              }}
                              className={`border-t border-line ${builds.pending ? "cursor-wait" : "cursor-pointer"} ${equipped ? "bg-accent/10 hover:bg-accent/15" : "hover:bg-surface-elevated/60"}`}
                            >
                              <td className="px-4 py-2">
                                <div className="flex items-center gap-3">
                                  <ItemImage item={item} />
                                  <div className="max-w-72">
                                    <p className="font-medium leading-5">
                                      {itemName(item, locale)}
                                    </p>
                                    <p className="mt-1 text-[10px] text-foreground dark:text-white">
                                      {item.slot_count} {copy.slots} ·{" "}
                                      {item.width ?? "—"}×{item.height ?? "—"}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-3 py-3 font-mono">
                                {number(item.mod_properties?.ergonomics)}
                              </td>
                              <td className="px-3 py-3 font-mono">
                                {number(item.mod_properties?.recoil_modifier)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-3 font-mono">
                                {number(item.weight)} kg
                              </td>
                              <td className="px-4 py-3">
                                <button
                                  disabled={builds.pending}
                                  aria-label={`${equipped ? copy.remove : copy.equip} ${itemName(item, locale)}`}
                                  className={`${action} whitespace-nowrap ${equipped ? "border-accent/40 text-orange-700 dark:text-orange-300" : ""}`}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    equip(equipped ? undefined : item.id);
                                  }}
                                >
                                  {equipped ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <Plus className="h-3 w-3" />
                                  )}
                                  {equipped ? copy.selected : copy.equip}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {filtered.length > limit && (
                    <div className="border-t border-line p-3 text-center">
                      <button
                        className={action}
                        onClick={() => setLimit((value) => value + 40)}
                      >
                        {copy.more} ({Math.min(limit, filtered.length)}/
                        {filtered.length})
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        ) : (
          <section className={`${panel} min-w-0 p-4 sm:p-6`}>
            <div className="mb-5">
              <h3 className="mb-3 text-sm font-semibold">
                {copy.presets}{" "}
                <span className="ml-2 text-accent">
                  {snapshot.preset_references.total}
                </span>
              </h3>
              <label className="sr-only" htmlFor="modding-preset">
                {copy.choosePreset}
              </label>
              <select
                id="modding-preset"
                className="w-full rounded-lg border border-line bg-background px-3 py-3 text-sm outline-none focus:border-accent"
                value={presetId}
                onChange={(event) => setPresetId(event.target.value)}
              >
                {snapshot.preset_references.presets.map((p) => (
                  <option key={p.item.id} value={p.item.id}>
                    {p.link.is_default_reference
                      ? `★ ${copy.defaultPreset} · `
                      : ""}
                    {itemName(p.item, locale)}
                  </option>
                ))}
              </select>
            </div>
            {data.presetError ? (
              <Notice copy={copy} error retry={data.retryPreset} />
            ) : data.presetLoading ? (
              <Notice copy={copy} />
            ) : preset ? (
              <>
                <div className="rounded-xl border border-line bg-surface-elevated/40 p-5">
                  <ItemImage item={preset.preset.item} large />
                  <h4 className="mt-4 text-center text-lg font-semibold">
                    {itemName(preset.preset.item, locale)}
                  </h4>
                  <dl className="mt-4 grid grid-cols-2 divide-x divide-line sm:grid-cols-4">
                    <Stat label={copy.ergo} value={preset.preset.ergonomics} />
                    <Stat
                      label={copy.vertical}
                      value={preset.preset.recoil_vertical}
                    />
                    <Stat
                      label={copy.horizontal}
                      value={preset.preset.recoil_horizontal}
                    />
                    <Stat label="MOA" value={preset.preset.moa} />
                  </dl>
                </div>
                <PresetReconstructionPanel
                  key={preset.preset.item.id}
                  detail={preset}
                  items={snapshot.items}
                  loading={data.itemsLoading}
                  onImported={() => {
                    setTab("build");
                    setActiveKey(null);
                    setWord("");
                  }}
                />
                <h4 className="mb-3 text-sm font-semibold">
                  {copy.components}{" "}
                  <span className="ml-2 text-accent">
                    {preset.components.length}
                  </span>
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {preset.components.map((component) => (
                    <div
                      key={component.component_index}
                      className="flex items-center gap-3 rounded-xl border border-line p-3"
                    >
                      <ItemImage item={component.item} />
                      <p className="min-w-0 flex-1 text-xs leading-5">
                        {itemName(component.item, locale)}
                      </p>
                      <span
                        aria-label={`${copy.quantity} ${component.quantity}`}
                        className="font-mono text-xs text-accent"
                      >
                        ×{component.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="py-12 text-center text-sm text-foreground dark:text-white">
                {copy.noPresets}
              </p>
            )}
          </section>
        )}
      </div>
    </>
  );
}
