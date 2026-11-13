"use client";

import Image from "next/image";
import { ChevronDown, X, Box } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/i18n/config";
import type { BuildSlot } from "../build";
import { itemName } from "../build";
import { layoutSlots } from "../workbench-layout";
import { weaponPreviewImage } from "../default-preset";
import { useBuilds } from "../builds/provider";
import { mountPart } from "../builds/tree";
import type { ItemSummary, WeaponSnapshot } from "../types";
import { useStatistics, WeaponStatisticsPanel } from "./weapon-statistics";

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const fmt = (value: number) => `${value > 0 ? "+" : ""}${new Intl.NumberFormat("en", { maximumFractionDigits: 3 }).format(value)}`;
function PartImage({ item, large = false, image }: { item: ItemSummary; large?: boolean; image?: string | null }) {
  const [failed, setFailed] = useState<string[]>([]);
  const src = [image, item.image].find((url) => !!url && !failed.includes(url));
  return src && !failed.includes(src) ? <Image src={src} alt="" width={large ? 292 : 80} height={large ? 238 : 48} unoptimized className={large ? "h-full w-full object-contain p-4" : "h-10 w-full object-contain"} onError={() => setFailed((old) => [...old, src])} /> : <Box aria-hidden="true" className="mx-auto size-7 text-gray-500 dark:text-gray-400" />;
}
function Chips({ item }: { item?: ItemSummary }) {
  const values = [[item?.mod_properties?.ergonomics, "E", true], [item?.mod_properties?.recoil_modifier == null ? null : item.mod_properties.recoil_modifier * 100, "R%", false]] as const;
  return <span className="flex h-5 justify-end gap-1 whitespace-nowrap">{values.map(([value, label, up]) => value == null || value === 0 ? null : <span key={label} className={`shrink-0 rounded px-0.5 font-mono text-[10px] leading-4 ${up ? value > 0 ? "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-200" : value < 0 ? "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-200"}`}>{label} {fmt(value)}</span>)}</span>;
}
export function WorkbenchStage({ snapshot, slots, activeKey, onActive, candidatesLoading, candidatesError, onRetry, generation, locale }: {
  snapshot: WeaponSnapshot; slots: BuildSlot[]; activeKey: string | null; onActive: (key: string | null) => void;
  candidatesLoading: boolean; candidatesError: unknown; onRetry: () => void; generation: string; locale: Locale;
}) {
  const builds = useBuilds();
  const t = builds.t;
  const stage = useRef<HTMLDivElement>(null);
  const popup = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("base");
  const [hover, setHover] = useState<ItemSummary | "none" | null>(null);
  const [position, setPosition] = useState<{ left: number; top: number; width: number; cols: number } | null>(null);
  const active = slots.find((slot) => slot.key === activeKey);
  const raw = active ? snapshot.slot_candidates[active.slot.item_id]?.[active.slot.slot_id]?.candidates ?? [] : [];
  const many = raw.length >= 9;
  const filtered = raw.filter(({ item }) => !query.trim() || [item.name_en, item.name_ko, item.name_ja].some((name) => name?.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))).slice();
  if (sort !== "base") filtered.sort((a, b) => sort === "weight" ? (a.item.weight ?? Infinity) - (b.item.weight ?? Infinity) : sort === "ergo" ? (b.item.mod_properties?.ergonomics ?? -Infinity) - (a.item.mod_properties?.ergonomics ?? -Infinity) : (a.item.mod_properties?.recoil_modifier ?? Infinity) - (b.item.mod_properties?.recoil_modifier ?? Infinity));
  const layout = layoutSlots(slots);
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
    if (popupReady) popup.current?.focus();
  }, [popupReady, activeKey]);
  const currentHover = hover;
  const displayedHover = currentHover === "none" ? undefined : currentHover ?? undefined;
  const triggerId = (key: string) => `workbench-slot-${key}`;
  function close() {
    const key = activeKey;
    onActive(null); setHover(null); setPosition(null);
    if (key) document.getElementById(triggerId(key))?.focus();
  }
  function toggle(key: string) {
    if (key === activeKey) { close(); return; }
    setQuery(""); setSort("base"); setHover(null); setPosition(null); onActive(key);
  }
  function equip(item?: ItemSummary) {
    if (!active || builds.pending) return;
    const removing = !item || item.id === active.selected?.id;
    builds.mount(active.key, removing ? undefined : item);
    setHover(null);
    if (removing) {
      // Keep this slot, search and sorting available for the next attachment.
      popup.current?.focus();
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
      const cols = Math.max(1, Math.min(preferredCols, Math.floor((window.innerWidth - 30) / 96)));
      const width = cols * 92 + (cols - 1) * 4 + 22;
      const minLeft = Math.max(4, stageBounds.left);
      const maxLeft = Math.min(window.innerWidth - width - 4, stageBounds.right - width);
      const left = Math.max(4, Math.min(Math.max(minLeft, bounds.left - 4), maxLeft));
      setPosition({ left: left + window.scrollX, top: bounds.bottom + window.scrollY + 4, width, cols });
    }
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => { window.removeEventListener("resize", update); window.removeEventListener("scroll", update, true); };
  }, [activeKey, active, raw.length]);
  useEffect(() => {
    if (!activeKey) return;
    const key = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault(); onActive(null); setHover(null); setPosition(null);
      document.getElementById(triggerId(activeKey))?.focus();
    };
    const pointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !popup.current?.contains(event.target) && !stage.current?.contains(event.target)) { onActive(null); setHover(null); setPosition(null); }
    };
    document.addEventListener("keydown", key); document.addEventListener("pointerdown", pointer);
    return () => { document.removeEventListener("keydown", key); document.removeEventListener("pointerdown", pointer); };
  }, [activeKey, onActive]);
  const delta = (value: number | null | undefined, before: number | null | undefined, up: boolean) => {
    if (value == null || before == null) return <span className="font-mono">—</span>;
    const diff = value - before;
    return <span className={`font-mono ${diff === 0 ? "text-gray-600 dark:text-gray-400" : (up ? diff > 0 : diff < 0) ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>{fmt(diff)}</span>;
  };
  return <div className="space-y-5">
    <p className="text-xs text-gray-600 dark:text-gray-400">{t("이미지는 기본 프리셋 참고 이미지입니다. 장착 구성에 따라 합성되지 않습니다. 좁은 화면에서는 작업대를 좌우로 스크롤하세요.", "The image is the default preset reference, not a composite of your build. Scroll horizontally on narrow screens.", "画像は基本プリセットの参考画像です。構成に応じた合成ではありません。狭い画面では横にスクロールできます。")}</p>
    <div className="relative z-10 rounded-xl border border-line">
      <div tabIndex={0} aria-label={t("모딩 작업대 · 가로 스크롤", "Workbench · horizontal scroll", "作業台 · 横スクロール")} className={`overflow-x-auto rounded-xl ${focus}`}>
        <div ref={stage} className="relative w-[1340px] bg-[#e6e8ec] dark:bg-[#16181b]" style={{ height: layout.height }}>
          <div className="absolute flex items-center justify-center rounded-lg border border-line bg-white/70 dark:bg-[#23262b]" style={{ left: 520, top: 166, width: 292, height: 238 }}><PartImage item={snapshot.weapon.item} image={weaponPreviewImage(snapshot.weapon)} large /></div>
          {layout.slots.map(({ entry, x, y }) => <div key={entry.key} className="absolute w-[92px]" style={{ left: x, top: y }}>
            <Chips item={entry.selected} />
            <button type="button" id={triggerId(entry.key)} disabled={builds.pending} aria-expanded={activeKey === entry.key} aria-controls={activeKey === entry.key ? "modding-parts-popup" : undefined} aria-haspopup="dialog" aria-label={`${itemName(entry.slot, locale)}: ${entry.selected ? itemName(entry.selected, locale) : t("비어 있음", "Empty", "空き")}`} title={`${itemName(entry.slot, locale)}${entry.selected ? `: ${itemName(entry.selected, locale)}` : ""}${entry.blocked ? ` · ${t("탐색 깊이 제한", "Exploration depth limit", "探索深度制限")}` : ""}`} onClick={() => toggle(entry.key)} className={`group relative flex size-[92px] flex-col items-center justify-center gap-1 rounded border p-1 text-center ${focus} disabled:cursor-wait disabled:opacity-60 ${activeKey === entry.key ? "border-accent bg-orange-50 ring-1 ring-accent dark:bg-orange-950/30" : "border-gray-400/60 bg-white hover:border-accent dark:border-gray-600 dark:bg-[#23262b] dark:hover:border-accent"} ${entry.selected ? "" : "border-dashed"}`}>
              {entry.selected ? <><span className="line-clamp-2 w-full text-[11px] font-semibold leading-tight">{itemName(entry.selected, locale)}</span><PartImage item={entry.selected} /></> : <span className="text-xs text-gray-600 dark:text-gray-300">{itemName(entry.slot, locale)}</span>}
              <span aria-hidden="true" className={`absolute bottom-0 right-0 flex size-[22px] items-center justify-center rounded-tl border-l border-t border-line bg-surface-elevated group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100 ${activeKey === entry.key ? "opacity-100" : "opacity-0"}`}><ChevronDown className="size-3" /></span>
            </button>
          </div>)}
          {!slots.length && <p className="absolute bottom-8 left-5 text-sm">{t("장착 슬롯이 없습니다.", "No attachment slots.", "装着スロットはありません。")}</p>}
        </div>
      </div>
    </div>
    {active && position && createPortal(<div ref={popup} id="modding-parts-popup" role="dialog" tabIndex={-1} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHover(null); }} aria-label={itemName(active.slot, locale)} className="absolute z-50 rounded-lg border border-accent bg-surface shadow-2xl" style={{ left: position.left, top: position.top, width: position.width }}>
      <div className="border-b border-line p-2.5">
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
      {candidatesLoading ? <p role="status" className="p-4 text-sm">{t("파츠 불러오는 중…", "Loading parts…", "パーツ読込中…")}</p> : candidatesError ? <div role="alert" className="p-4 text-sm"><p>{t("파츠를 불러오지 못했습니다.", "Could not load parts.", "パーツを取得できませんでした。")}</p><button type="button" onClick={onRetry} className={`mt-2 rounded border border-line p-2 ${focus}`}>{t("다시 시도", "Retry", "再試行")}</button></div> : <div onMouseLeave={() => { if (!popup.current?.contains(document.activeElement)) setHover(null); }} className="grid gap-1 overflow-y-auto p-2.5" style={{ gridTemplateColumns: `repeat(${position.cols},92px)`, maxHeight: many ? 400 : undefined }}>
        {!query.trim() && <button type="button" disabled={builds.pending} onClick={() => equip()} onMouseEnter={() => setHover("none")} onFocus={() => setHover("none")} className={`flex h-[92px] items-center justify-center rounded border border-dashed border-line text-xs hover:border-accent ${focus}`} >{t("없음 (해제)", "None (remove)", "なし（解除）")}</button>}
        {filtered.map(({ item }) => <button key={item.id} type="button" disabled={builds.pending} aria-pressed={item.id === active.selected?.id} title={item.id === active.selected?.id ? `${itemName(item, locale)} · ${t("다시 누르면 해제", "Click again to remove", "再クリックで解除")}` : itemName(item, locale)} onClick={() => equip(item)} onMouseEnter={() => setHover(item)} onFocus={() => setHover(item)} className={`relative flex h-[92px] flex-col items-center gap-0.5 overflow-hidden rounded border p-1 ${focus} hover:border-accent disabled:opacity-60 ${item.id === active.selected?.id ? "border-accent bg-orange-50 dark:bg-orange-950/30" : "border-line bg-background"}`}>
          <span className="line-clamp-2 text-[11px] font-semibold leading-tight">{itemName(item, locale)}</span><PartImage item={item} /><span className="absolute bottom-0 right-0"><Chips item={item} /></span>{item.id === active.selected?.id && <span className="absolute bottom-0 left-0 bg-surface px-0.5 text-[9px] font-bold text-orange-700 dark:text-orange-300">{t("장착됨", "Equipped", "装着中")}</span>}
        </button>)}
        {query.trim() && !filtered.length && <p className="col-span-full py-4 text-xs">{t("검색 결과가 없습니다.", "No results.", "検索結果がありません。")}</p>}
      </div>}
      <div className="border-t border-line p-3 text-xs"><p className="min-h-8 font-semibold">{previewRemoval ? t("없음 · 하위 부품도 해제", "None · removes child parts", "なし · 子パーツも解除") : displayedHover ? itemName(displayedHover, locale) : t("파츠에 마우스를 올리거나 키보드로 선택하면 변화가 보입니다.", "Hover or focus a part to preview changes.", "パーツにマウスを乗せるかフォーカスして変化を確認できます。")}</p>
        {currentHover && <div className="mt-2 flex flex-wrap gap-3"><span>E {delta(previewRemoval ? 0 : displayedHover?.mod_properties?.ergonomics, active.selected?.mod_properties?.ergonomics ?? (active.selected ? null : 0), true)}</span><span>R% {delta(previewRemoval ? 0 : displayedHover?.mod_properties?.recoil_modifier == null ? null : displayedHover.mod_properties.recoil_modifier * 100, active.selected ? active.selected.mod_properties?.recoil_modifier == null ? null : active.selected.mod_properties.recoil_modifier * 100 : 0, false)}</span><span>kg {delta(previewRemoval ? 0 : displayedHover?.weight, active.selected?.weight ?? (active.selected ? null : 0), false)}</span></div>}
      </div>
    </div>, document.body)}
    <WeaponStatisticsPanel current={current} preview={preview} previewing={!!(active && hover)} locale={locale} snapshot={snapshot} />
  </div>;
}
