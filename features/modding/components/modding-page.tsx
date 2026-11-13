"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Crosshair,
  Layers,
  LoaderCircle,
  RotateCcw,
  Undo2,
  Redo2,
  Search,
  Settings2,
  X,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { initialPresetAction, weaponPreviewImage } from "../default-preset";
import { getWeapon, getWeapons } from "../api";
import { WorkbenchStage } from "./workbench-stage";
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
  "inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-base font-medium hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70";
const number = (value: number | null | undefined) =>
  value == null
    ? "—"
    : new Intl.NumberFormat("en", { maximumFractionDigits: 3 }).format(value);

function ItemImage({
  item,
  large = false,
  card = false,
  image,
}: {
  item: ItemSummary;
  large?: boolean;
  card?: boolean;
  image?: string | null;
}) {
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const src = [image, item.image].find(
    (url) => !!url && !failedImages.includes(url),
  );
  return src ? (
    <Image
      src={src}
      onError={() =>
        setFailedImages((previous) =>
          previous.includes(src) ? previous : [...previous, src],
        )
      }
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
        className="h-11 w-full rounded-lg border border-line bg-background pl-9 pr-10 text-base outline-none placeholder:text-foreground dark:text-white focus:border-accent focus:ring-2 focus:ring-accent/20"
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
      className={`${panel} flex min-h-48 flex-col items-center justify-center gap-4 p-8 text-center text-base text-foreground dark:text-white`}
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
      <dt className="truncate text-sm text-foreground dark:text-white">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-xl font-semibold tabular-nums">
        {number(value)}
        {value != null && unit && (
          <span className="ml-1 text-sm font-normal text-foreground dark:text-white">
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
  const { content: routeContent, start: startWeapon } = builds;
  useEffect(() => {
    if (!routeWeaponId) {
      attemptedRoute.current = null;
      return;
    }
    if (!chosen || attemptedRoute.current === routeWeaponId) return;
    attemptedRoute.current = routeWeaponId;
    if (routeContent?.weapon_item_id === routeWeaponId) return;
    void startWeapon(chosen).then((opened) => {
      if (!opened)
        router.replace(
          routeContent
            ? `/modding/${routeContent.weapon_item_id}`
            : "/modding",
        );
    });
  }, [routeWeaponId, chosen, routeContent, startWeapon, router]);
  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-bold tracking-[0.18em] text-accent">
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
              <p className="rounded-xl border border-line bg-surface p-5 text-base text-foreground dark:text-white">
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
                <div className="flex items-center gap-2 text-base font-semibold">
                  <Layers className="h-4 w-4 text-accent" />
                  {copy.weapons}
                  <span className="rounded-md bg-surface-elevated px-2 py-1 font-mono text-sm">
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
                      <ItemImage
                        item={weapon.item}
                        image={weaponPreviewImage(weapon)}
                        card
                      />
                      <span className="absolute left-3 top-3 font-mono text-sm font-bold tracking-widest text-foreground dark:text-white">
                        {weapon.weapon_properties.caliber?.replace(
                          /^Caliber/,
                          "",
                        ) ?? "—"}
                      </span>
                      <ArrowRight className="absolute bottom-3 right-3 h-4 w-4 text-foreground dark:text-white group-hover:text-accent" />
                    </div>
                    <div className="p-4">
                      <h2 className="min-h-10 text-base font-semibold leading-5">
                        {itemName(weapon.item, locale)}
                      </h2>
                      <div className="mt-4 flex justify-between border-t border-line pt-3 text-sm text-foreground dark:text-white">
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
                <p className="py-16 text-center text-base text-foreground dark:text-white">
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
      generation={query.data.generation}
      locale={locale}
    />
  );
}

function Workbench({
  snapshot: baseSnapshot,
  source,
  generation,
  locale,
}: {
  snapshot: WeaponSnapshot;
  source: "static" | "api";
  generation: string;
  locale: Locale;
}) {
  const copy = moddingCopy[locale];
  const builds = useBuilds();
  const selections = useMemo(
    () => (builds.content ? selectionsFromNodes(builds.content) : {}),
    [builds.content],
  );
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const tab: "build" | "presets" = requestedTab === "presets" ||
    (requestedTab !== "build" && builds.initialPresetPending) ? "presets" : "build";
  const setTab = useCallback((value: "build" | "presets", replace = false) => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("tab") === value) return;
    url.searchParams.set("tab", value);
    if (replace) window.history.replaceState(null, "", url);
    else window.history.pushState(null, "", url);
  }, []);
  const initialPresetHandled = useRef(false);
  const [presetId, setPresetId] = useState(
    () =>
      baseSnapshot.preset_references.presets.find(
        (p) => p.link.is_default_reference,
      )?.item.id ??
      baseSnapshot.preset_references.presets[0]?.item.id ??
      "",
  );
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
    builds.initialPresetPending ? "presets" : tab,
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
  const weapon = snapshot.weapon;
  const stats = weapon.weapon_properties;
  const preset = snapshot.presets[presetId];
  const { initialPresetPending, finishInitialPreset, importPreset } = builds;
  useEffect(() => {
    if (!initialPresetPending || initialPresetHandled.current || !preset)
      return;
    initialPresetHandled.current = true;
    finishInitialPreset();
    const action = initialPresetAction(preset);
    if (action === "confirm") {
      void importPreset(preset, 0).then(() => {
        if (requestedTab !== "presets") setTab("build", true);
        setActiveKey(null);
      });
    } else if (requestedTab !== "build") {
      setTab("presets", true);
    }
    // Ambiguous or incomplete defaults stay in the preset panel for explicit
    // selection/inspection. No first-candidate or partial import is automatic.
  }, [
    preset,
    initialPresetPending,
    finishInitialPreset,
    importPreset,
    requestedTab,
    setTab,
  ]);
  return (
    <>
      {data.itemError && <Notice copy={copy} error retry={data.retryItems} />}
      {data.itemsLoading && (
        <p
          role="status"
          className="mb-3 text-base text-foreground dark:text-white"
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
            <h2 className="text-xl font-bold">
              {itemName(weapon.item, locale)}
            </h2>

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
          <button type="button" className={action} disabled={builds.pending || !Object.keys(selections).length} onClick={() => void builds.reset()}><RotateCcw className="h-4 w-4" />{builds.t("구성 초기화", "Reset configuration", "構成リセット")}</button>
          <div className="inline-flex gap-1 rounded-xl border border-line bg-surface-elevated p-1">
            {(
              [
                ["build", copy.workbench],
                ["presets", copy.presets],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                aria-pressed={tab === id}
                onClick={() => {
                  if (id === "build") builds.finishInitialPreset();
                  setTab(id);
                }}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${tab === id ? "bg-orange-600 text-white shadow-sm hover:bg-orange-700 dark:bg-orange-500 dark:text-black dark:hover:bg-orange-400" : "text-foreground hover:bg-surface dark:text-white"}`}
              >
                {id === "presets" ? (
                  <Layers aria-hidden className="h-4 w-4" />
                ) : (
                  <Settings2 aria-hidden className="h-4 w-4" />
                )}
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={tab === "presets" ? "grid items-start gap-5 xl:grid-cols-[300px_minmax(0,1fr)]" : "min-w-0"}>
        {tab === "presets" && <aside className="space-y-4">
          <section className={`${panel} overflow-hidden`}>
            <div className="bg-surface-elevated/50 px-5 py-7">
              <ItemImage
                item={weapon.item}
                image={
                  Object.keys(selections).length
                    ? weaponPreviewImage(weapon)
                    : undefined
                }
                large
              />
            </div>
            <div className="px-4 pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground dark:text-white">
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
        </aside>}
        {tab === "build" ? (
          <WorkbenchStage snapshot={snapshot} slots={slots} activeKey={activeKey} onActive={setActiveKey} candidatesLoading={data.candidatesLoading} candidatesError={data.candidatesError} onRetry={data.retryCandidates} generation={generation} locale={locale} />
        ) : (
          <section className={`${panel} min-w-0 p-4 sm:p-6`}>
            <div className="mb-5">
              <h3 className="mb-3 text-base font-semibold">
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
                className="w-full rounded-lg border border-line bg-background px-3 py-3 text-base outline-none focus:border-accent"
                value={presetId}
                onChange={(event) => {
                  builds.finishInitialPreset();
                  initialPresetHandled.current = true;
                  setPresetId(event.target.value);
                }}
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
                  <h4 className="mt-4 text-center text-xl font-semibold">
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
                  }}
                />
                <h4 className="mb-3 text-base font-semibold">
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
                      <p className="min-w-0 flex-1 text-sm leading-5">
                        {itemName(component.item, locale)}
                      </p>
                      <span
                        aria-label={`${copy.quantity} ${component.quantity}`}
                        className="font-mono text-sm text-accent"
                      >
                        ×{component.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="py-12 text-center text-base text-foreground dark:text-white">
                {copy.noPresets}
              </p>
            )}
          </section>
        )}
      </div>
    </>
  );
}
