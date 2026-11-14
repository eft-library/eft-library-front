"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/i18n/config";
import type { BuildSlot } from "../build";
import { itemName } from "../build";
import { layoutSlots } from "../workbench-layout";
import { PartImage, PartChips as Chips } from "./workbench-tile";
import { WorkbenchFlowCanvas } from "./workbench-flow-canvas";
import { useBuilds } from "../builds/provider";
import { mountPart } from "../builds/tree";
import type { ItemSummary, WeaponSnapshot } from "../types";
import { PopupStatisticsSummary, useStatistics, WeaponStatisticsPanel } from "./weapon-statistics";

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const fmt = (value: number) => `${value > 0 ? "+" : ""}${new Intl.NumberFormat("en", { maximumFractionDigits: 3 }).format(value)}`;
export function WorkbenchStage({ snapshot, slots, activeKey, onActive, candidatesLoading, candidatesError, onRetry, generation, locale }: {
  snapshot: WeaponSnapshot; slots: BuildSlot[]; activeKey: string | null; onActive: (key: string | null) => void;
  candidatesLoading: boolean; candidatesError: unknown; onRetry: () => void; generation: string; locale: Locale;
}) {
  const builds = useBuilds();
  const t = builds.t;
  const stage = useRef<HTMLDivElement>(null);
  const popup = useRef<HTMLDivElement>(null);
  const updatePopup = useRef<() => void>(() => {});
  const moveFrame = useRef<number | null>(null);
  useEffect(() => () => {
    if (moveFrame.current !== null) cancelAnimationFrame(moveFrame.current);
  }, []);
  function followViewport() {
    if (!popup.current) return;
    if (moveFrame.current !== null) cancelAnimationFrame(moveFrame.current);
    moveFrame.current = requestAnimationFrame(() => {
      moveFrame.current = null;
      updatePopup.current();
    });
  }
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("base");
  const [hover, setHover] = useState<ItemSummary | "none" | null>(null);
  const [position, setPosition] = useState<{ left: number; top: number; width: number; cols: number; maxHeight: number } | null>(null);
  const active = slots.find((slot) => slot.key === activeKey);
  const raw = active ? snapshot.slot_candidates[active.slot.item_id]?.[active.slot.slot_id]?.candidates ?? [] : [];
  const many = raw.length >= 9;
  const filtered = raw.filter(({ item }) => !query.trim() || [item.name_en, item.name_ko, item.name_ja].some((name) => name?.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))).slice();
  if (sort !== "base") filtered.sort((a, b) => sort === "weight" ? (a.item.weight ?? Infinity) - (b.item.weight ?? Infinity) : sort === "ergo" ? (b.item.mod_properties?.ergonomics ?? -Infinity) - (a.item.mod_properties?.ergonomics ?? -Infinity) : (a.item.mod_properties?.recoil_modifier ?? Infinity) - (b.item.mod_properties?.recoil_modifier ?? Infinity));
  const [layoutState, setLayoutState] = useState(() => ({
    input: slots, weaponId: snapshot.weapon.item.id, layout: layoutSlots(slots, undefined, snapshot),
  }));
  if (layoutState.input !== slots || layoutState.weaponId !== snapshot.weapon.item.id) {
    // Conditional state adjustment is applied before React commits the render,
    // so edits cannot paint an intermediate reflowed arrangement.
    setLayoutState({ input: slots, weaponId: snapshot.weapon.item.id,
      layout: layoutSlots(slots, layoutState.weaponId === snapshot.weapon.item.id ? layoutState.layout : undefined, snapshot) });
  }
  const layout = layoutState.layout;
  const current = useStatistics(builds.content, generation);
  const previewRemoval = hover === "none" || (!!hover && hover.id === active?.selected?.id);
  const hoveredItem = hover === "none" || (hover && hover.id === active?.selected?.id) ? undefined : hover ?? undefined;
  const previewContent = active && hover && builds.content
    ? mountPart(builds.content, active.key, hoveredItem, () => {
      let id = "__preview__";
      while (builds.content?.nodes.some((node) => node.node_id === id)) id += "_";
      return id;
    }) : null;
  const preview = useStatistics(previewContent, generation);
  const popupReady = Boolean(active && position);
  useEffect(() => {
    if (popupReady) popup.current?.focus({ preventScroll: true });
  }, [popupReady, activeKey]);
  const currentHover = hover;
  const displayedHover = currentHover === "none" ? undefined : currentHover ?? undefined;
  const triggerId = (key: string) => `workbench-slot-${key}`;
  function close() {
    const key = activeKey;
    onActive(null); setHover(null); setPosition(null);
    if (key) document.getElementById(triggerId(key))?.focus({ preventScroll: true });
  }
  function toggle(key: string) {
    if (key === activeKey) { close(); return; }
    setQuery(""); setSort("base"); setHover(null); setPosition(null); onActive(key);
  }
  function equip(item?: ItemSummary) {
    if (!active || builds.pending) return;
    const removing = !item || item.id === active.selected?.id;
    // Commit the exact preview tree (including instance IDs), so its cached or
    // in-flight calculation becomes the current result without a value rollback.
    if (previewContent && (removing ? previewRemoval : hover !== "none" && hover?.id === item.id)) {
      builds.edit(previewContent);
    } else {
      builds.mount(active.key, removing ? undefined : item);
    }
    setHover(null);
    if (removing) {
      // Keep this slot, search and sorting available for the next attachment.
      popup.current?.focus({ preventScroll: true });
    } else {
      close();
    }
  }
  useEffect(() => {
    if (!activeKey || !active) return;
    function update() {
      const target = document.getElementById(triggerId(activeKey!));
      const bounds = target?.getBoundingClientRect();
      const stageBounds = stage.current?.getBoundingClientRect();
      if (!bounds || !stageBounds) return;
      const preferredCols = raw.length + 1 <= 6 ? 3 : raw.length + 1 <= 12 ? 4 : 7;
      // Include padding, border and a non-overlay vertical scrollbar.
      const availableWidth = Math.max(1, document.documentElement.clientWidth - 16);
      const cols = Math.max(1, Math.min(preferredCols, Math.floor((availableWidth - 38) / 100)));
      const width = Math.min(availableWidth, cols * 96 + (cols - 1) * 4 + 42);
      const minLeft = Math.max(4, stageBounds.left);
      const maxLeft = Math.min(document.documentElement.clientWidth - width - 8, stageBounds.right - width);
      const left = Math.max(4, Math.min(Math.max(minLeft, bounds.left - 4), maxLeft));
      const maxHeight = Math.min(many ? 640 : 500, window.innerHeight - 16);
      const top = Math.max(8, Math.min(bounds.bottom + 4, window.innerHeight - maxHeight - 8));
      setPosition({ left: left + window.scrollX, top: top + window.scrollY, width, cols, maxHeight });
    }
    updatePopup.current = update;
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => { updatePopup.current = () => {}; window.removeEventListener("resize", update); window.removeEventListener("scroll", update, true); };
  }, [activeKey, active, raw.length, many]);
  useEffect(() => {
    if (!activeKey) return;
    const key = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault(); onActive(null); setHover(null); setPosition(null);
      document.getElementById(triggerId(activeKey))?.focus({ preventScroll: true });
    };
    const pointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || popup.current?.contains(target)) return;
      const trigger = target instanceof Element ? target.closest("[data-workbench-slot]") : null;
      // Slot clicks retain their own toggle/switch behavior; the empty canvas
      // is outside the popup and should dismiss it like the rest of the page.
      if (trigger && stage.current?.contains(trigger)) return;
      onActive(null); setHover(null); setPosition(null);
    };
    document.addEventListener("keydown", key); document.addEventListener("pointerdown", pointer, true);
    return () => { document.removeEventListener("keydown", key); document.removeEventListener("pointerdown", pointer, true); };
  }, [activeKey, onActive]);
  const delta = (value: number | null | undefined, before: number | null | undefined, up: boolean) => {
    if (value == null || before == null) return <span className="font-mono">—</span>;
    const diff = value - before;
    return <span className={`font-mono ${diff === 0 ? "text-gray-600 dark:text-gray-400" : (up ? diff > 0 : diff < 0) ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>{fmt(diff)}</span>;
  };
  return <div className="space-y-3">
    <WeaponStatisticsPanel current={current} preview={preview} previewing={!!(active && hover)} locale={locale} snapshot={snapshot} />
    <p className="text-xs text-gray-600 dark:text-gray-400">{t("기본 프리셋 참고 이미지 · 휠 확대/축소 · 드래그 이동", "Default preset reference image · Wheel to zoom · Drag to pan", "基本プリセット参考画像 · ホイールで拡大縮小 · ドラッグで移動")}</p>
    <div ref={stage} className="relative h-[max(420px,calc(100dvh-390px))] overflow-hidden rounded-xl border border-line bg-[#e6e8ec] dark:bg-[#16181b]">
      <WorkbenchFlowCanvas layout={layout} snapshot={snapshot} activeKey={activeKey} pending={builds.pending} locale={locale} onToggle={toggle} onViewportChange={followViewport} onDismiss={() => { onActive(null); setHover(null); setPosition(null); }} />
    </div>
    {active && position && createPortal(<div ref={popup} id="modding-parts-popup" role="dialog" tabIndex={-1} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHover(null); }} aria-label={itemName(active.slot, locale)} className="absolute z-50 flex min-w-0 flex-col overflow-x-hidden rounded-lg border border-accent bg-surface shadow-2xl" style={{ left: position.left, top: position.top, width: position.width, maxHeight: position.maxHeight }}>
      <div className="shrink-0 border-b border-line p-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="min-w-0 flex-1 truncate text-sm font-bold">{itemName(active.slot, locale)} <span className="font-mono text-xs">{filtered.length}/{raw.length}</span></h3>
          {active.selected && <button type="button" disabled={builds.pending} onClick={() => equip()} title={t("하위 부품도 함께 해제합니다.", "Also removes child parts.", "子パーツも一緒に解除します。")}
            className={`inline-flex items-center gap-1 rounded border border-red-300 bg-red-50 px-2 py-1 text-xs font-semibold text-red-800 hover:bg-red-100 disabled:opacity-60 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200 dark:hover:bg-red-900/60 ${focus}`}>
            <X className="size-3" />{t("장착 해제", "Remove part", "パーツ解除")}
          </button>}
          <button type="button" aria-label={t("닫기", "Close", "閉じる")} className={`rounded p-1 hover:bg-surface-elevated ${focus}`} onClick={close}><X className="size-4" /></button>
        </div>
        {many && <><input aria-label={t("이름 검색", "Search by name", "名前検索")} placeholder={t("이름 검색", "Search by name", "名前検索")} value={query} onChange={(event) => { setQuery(event.target.value); setHover(null); }} className={`mt-2 w-full rounded border border-line bg-background px-2 py-1.5 text-xs ${focus}`} /><div className="mt-2 flex flex-wrap gap-1">{[
          ["base", t("기본순", "Default", "標準")], ["ergo", t("인체공학 높은순", "Ergonomics ↓", "エルゴ高い順")], ["recoil", t("반동 낮은순", "Recoil ↑", "反動低い順")], ["weight", t("무게 가벼운순", "Weight ↑", "重量軽い順")],
        ].map(([value, label]) => <button key={value} type="button" aria-pressed={sort === value} onClick={() => { setSort(value); setHover(null); }} className={`rounded border px-1.5 py-1 text-[10px] ${focus} ${sort === value ? "border-accent bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200" : "border-line bg-surface-elevated"}`}>{label}</button>)}</div></>}
      </div>
      {candidatesLoading ? <p role="status" className="p-4 text-sm">{t("파츠 불러오는 중…", "Loading parts…", "パーツ読込中…")}</p> : candidatesError ? <div role="alert" className="p-4 text-sm"><p>{t("파츠를 불러오지 못했습니다.", "Could not load parts.", "パーツを取得できませんでした。")}</p><button type="button" onClick={onRetry} className={`mt-2 rounded border border-line p-2 ${focus}`}>{t("다시 시도", "Retry", "再試行")}</button></div> : <div onMouseLeave={() => { if (!popup.current?.contains(document.activeElement)) setHover(null); }} className="grid min-h-0 min-w-0 shrink gap-1 overflow-x-hidden overflow-y-auto overscroll-contain [scrollbar-gutter:stable] p-2.5" style={{ gridTemplateColumns: `repeat(${position.cols}, minmax(0, 1fr))`, maxHeight: many ? 400 : undefined }}>
        {!query.trim() && <button type="button" disabled={builds.pending} onClick={() => equip()} onMouseEnter={() => setHover("none")} onFocus={() => setHover("none")} className={`flex h-[104px] min-w-0 items-center justify-center rounded border border-dashed border-line text-xs hover:border-accent ${focus}`} >{t("없음 (해제)", "None (remove)", "なし（解除）")}</button>}
        {filtered.map(({ item }) => <button key={item.id} type="button" disabled={builds.pending} aria-pressed={item.id === active.selected?.id} title={item.id === active.selected?.id ? `${itemName(item, locale)} · ${t("다시 누르면 해제", "Click again to remove", "再クリックで解除")}` : itemName(item, locale)} onClick={() => equip(item)} onMouseEnter={() => setHover(item)} onFocus={() => setHover(item)} className={`relative flex h-[104px] min-w-0 flex-col items-center gap-0.5 overflow-hidden rounded border p-1 ${focus} hover:border-accent disabled:opacity-60 ${item.id === active.selected?.id ? "border-accent bg-orange-50 dark:bg-orange-950/30" : "border-line bg-background"}`}>
          <span className="line-clamp-2 h-[26px] w-full break-words text-[11px] font-bold leading-[13px]">{itemName(item, locale)}</span><PartImage item={item} /><span className="absolute inset-x-0 bottom-1"><Chips item={item} /></span>{item.id === active.selected?.id && <span className="absolute right-0 top-0 rounded-bl bg-orange-600 px-0.5 text-[9px] font-bold text-white dark:bg-orange-500 dark:text-black">{t("장착됨", "Equipped", "装着中")}</span>}
        </button>)}
        {query.trim() && !filtered.length && <p className="col-span-full py-4 text-xs">{t("검색 결과가 없습니다.", "No results.", "検索結果がありません。")}</p>}
      </div>}
      <div className="min-w-0 shrink-0 border-t border-line bg-surface p-3 text-xs"><p className="line-clamp-2 h-8 font-semibold">{previewRemoval ? t("없음 · 하위 부품도 해제", "None · removes child parts", "なし · 子パーツも解除") : displayedHover ? itemName(displayedHover, locale) : t("파츠에 마우스를 올리거나 키보드로 선택하면 변화가 보입니다.", "Hover or focus a part to preview changes.", "パーツにマウスを乗せるかフォーカスして変化を確認できます。")}</p>
        <div className={`mt-2 flex h-4 gap-3 ${currentHover ? "" : "invisible"}`}><span>E {delta(previewRemoval ? 0 : displayedHover?.mod_properties?.ergonomics, active.selected?.mod_properties?.ergonomics ?? (active.selected ? null : 0), true)}</span><span>R% {delta(previewRemoval ? 0 : displayedHover?.mod_properties?.recoil_modifier == null ? null : displayedHover.mod_properties.recoil_modifier * 100, active.selected ? active.selected.mod_properties?.recoil_modifier == null ? null : active.selected.mod_properties.recoil_modifier * 100 : 0, false)}</span><span>kg {delta(previewRemoval ? 0 : displayedHover?.weight, active.selected?.weight ?? (active.selected ? null : 0), false)}</span></div>
        <PopupStatisticsSummary current={current} preview={preview} previewing={!!hover} locale={locale} />
      </div>
    </div>, document.body)}
  </div>;
}
