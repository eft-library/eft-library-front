"use client";

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { BookMarked, LoaderCircle, RotateCcw, Save, Shuffle, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  deleteKordBreachPreset,
  getKordBreachPresets,
  getRandomKordBreachSelection,
  saveKordBreachPreset,
} from "@/features/kord-breach/api";
import type { Locale } from "@/i18n/config";
import type { KordBreachModifier, KordBreachModifiersResponse, KordBreachPreset } from "@/types/api/kord-breach";

const copy = {
  ko: { title: "모디파이어 특성 선택", board: "현황판", global: "공통 모디파이어", positive: "개인 긍정효과", negative: "개인 부정효과", random: "랜덤", presets: "프리셋", reset: "초기화", none: "선택 없음", total: "합산" },
  en: { title: "Select Modifiers", board: "Status", global: "Global Modifiers", positive: "Personal Positive", negative: "Personal Negative", random: "Random", presets: "Presets", reset: "Reset", none: "None selected", total: "Total" },
  ja: { title: "モディファイア選択", board: "ステータス", global: "共通モディファイア", positive: "個人ポジティブ", negative: "個人ネガティブ", random: "ランダム", presets: "プリセット", reset: "リセット", none: "選択なし", total: "合計" },
} as const;

export function KordBreachPage({ modifiers, locale }: { modifiers: KordBreachModifiersResponse; locale: Locale }) {
  const t = copy[locale];
  const { data: session, status } = useSession();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [presets, setPresets] = useState<KordBreachPreset[]>([]);
  const [presetOpen, setPresetOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const selectable = useMemo(() => [...modifiers.positiveModifiers, ...modifiers.negativeModifiers], [modifiers]);
  const byId = useMemo(() => new Map(selectable.map((item) => [item.id, item])), [selectable]);
  const selectedItems = useMemo(() => selectable.filter((item) => selected.has(item.id)), [selectable, selected]);
  const positives = selectedItems.filter((item) => item.category === "positive");
  const negatives = selectedItems.filter((item) => item.category === "negative");
  const total = selectedItems.reduce((sum, item) => sum + item.score, 0);
  const blocked = useMemo(() => {
    const ids = new Set<string>();
    selected.forEach((id) => modifiers.conflictMap[id]?.forEach((conflict) => ids.add(conflict)));
    return ids;
  }, [modifiers.conflictMap, selected]);

  useEffect(() => {
    if (!session?.accessToken) { setPresets([]); return; }
    let cancelled = false;
    getKordBreachPresets(session.accessToken).then((data) => { if (!cancelled) setPresets(data); }).catch(() => { if (!cancelled) setMessage("프리셋을 불러오지 못했습니다."); });
    return () => { cancelled = true; };
  }, [session?.accessToken]);

  const toggle = useCallback((id: string) => {
    setSelected((current) => {
      if (!current.has(id) && blocked.has(id)) return current;
      const next = new Set(current);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, [blocked]);

  async function randomize() {
    setBusy(true); setMessage("");
    try { const result = await getRandomKordBreachSelection(); setSelected(new Set(result.modifierIds)); }
    catch { setMessage("랜덤 조합을 생성하지 못했습니다."); }
    finally { setBusy(false); }
  }

  function loadPreset(preset: KordBreachPreset) {
    setSelected(new Set(preset.modifierIds.filter((id) => byId.has(id))));
    setPresetOpen(false);
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5">
        <div><p className="text-xs font-bold tracking-[0.28em] text-orange-600 dark:text-orange-400">KORD · BREACH</p><h1 className="mt-1 text-xl font-black tracking-tight">{t.title}</h1></div>
        {message && <div role="status" className="rounded-lg border border-orange-300 bg-orange-50 px-4 py-3 text-sm text-orange-800 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-200">{message}</div>}
        <StatusPanel t={t} positives={positives} negatives={negatives} total={total} busy={busy} onRemove={toggle} onRandom={randomize} onPresets={() => setPresetOpen(true)} onReset={() => setSelected(new Set())} />
        <ModifierSection title={t.global} subtitle="GLOBAL MODIFIERS" tone="global" description="모든 플레이어에게 기본 적용되며 점수 계산과 프리셋 저장에는 포함되지 않습니다." items={modifiers.globalModifiers} locale={locale} selected={selected} blocked={blocked} />
        <ModifierSection title={t.positive} subtitle="PERSONAL POSITIVE" tone="positive" description="선택하면 점수가 감소합니다. 총점이 0 이상이어야 PASS입니다." items={modifiers.positiveModifiers} locale={locale} selected={selected} blocked={blocked} onToggle={toggle} />
        <ModifierSection title={t.negative} subtitle="PERSONAL NEGATIVE" tone="negative" description="선택하면 긍정효과에 사용할 점수를 얻습니다." items={modifiers.negativeModifiers} locale={locale} selected={selected} blocked={blocked} onToggle={toggle} />
      </div>
      {presetOpen && <PresetDialog presets={presets} selected={[...selected]} accessToken={session?.accessToken} authLoading={status === "loading"} busy={busy} setBusy={setBusy} onClose={() => setPresetOpen(false)} onLoad={loadPreset} onChange={setPresets} onMessage={setMessage} />}
    </main>
  );
}

function StatusPanel({ t, positives, negatives, total, busy, onRemove, onRandom, onPresets, onReset }: { t: typeof copy.ko | typeof copy.en | typeof copy.ja; positives: KordBreachModifier[]; negatives: KordBreachModifier[]; total: number; busy: boolean; onRemove: (id: string) => void; onRandom: () => void; onPresets: () => void; onReset: () => void }) {
  return <section aria-label={t.board} className="rounded-xl border border-line bg-surface p-4 shadow-sm sm:p-5">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="font-bold text-orange-600 dark:text-orange-400">{t.board}</h2><div className="flex flex-wrap gap-2"><Action icon={busy ? LoaderCircle : Shuffle} label={t.random} onClick={onRandom} disabled={busy} spin={busy} /><Action icon={BookMarked} label={t.presets} onClick={onPresets} /><Action icon={RotateCcw} label={t.reset} onClick={onReset} /></div></div>
    <div className="grid gap-3 sm:grid-cols-2"><SelectedBox title={t.positive} items={positives} tone="positive" empty={t.none} onRemove={onRemove} /><SelectedBox title={t.negative} items={negatives} tone="negative" empty={t.none} onRemove={onRemove} /></div>
    <div className="mt-4 flex items-center justify-end gap-3 text-sm"><span className="text-gray-500 dark:text-gray-400">{t.total}</span><strong className="tabular-nums">{total > 0 ? `+${total}` : total}</strong><span className={`rounded-md border px-3 py-1 text-xs font-black tracking-widest ${total >= 0 ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400"}`}>{total >= 0 ? "PASS" : "FAIL"}</span></div>
  </section>;
}

function Action({ icon: Icon, label, onClick, disabled, spin }: { icon: typeof Shuffle; label: string; onClick: () => void; disabled?: boolean; spin?: boolean }) { return <button type="button" onClick={onClick} disabled={disabled} className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-elevated px-3 py-2 text-xs font-semibold hover:border-orange-400 hover:text-orange-600 disabled:cursor-wait disabled:opacity-60 dark:hover:text-orange-400"><Icon className={`size-3.5 ${spin ? "animate-spin" : ""}`} />{label}</button>; }

function SelectedBox({ title, items, tone, empty, onRemove }: { title: string; items: KordBreachModifier[]; tone: "positive" | "negative"; empty: string; onRemove: (id: string) => void }) { const green = tone === "positive"; return <div className={`min-h-24 rounded-lg border p-3 ${green ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5"}`}><div className="mb-2 flex items-center justify-between"><strong className={green ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"}>{title} <span className="text-xs">{items.length}</span></strong><span className="text-sm font-bold tabular-nums">{items.reduce((sum, item) => sum + item.score, 0)}</span></div>{items.length === 0 ? <p className="text-xs text-gray-400">{empty}</p> : <div className="flex flex-wrap gap-1.5">{items.map((item) => <button key={item.id} onClick={() => onRemove(item.id)} className="inline-flex items-center gap-1 rounded-md border border-line bg-surface px-2 py-1 text-xs hover:border-gray-400">{item.nameKo}<X className="size-3" /></button>)}</div>}</div>; }

function ModifierSection({ title, subtitle, tone, description, items, locale, selected, blocked, onToggle }: { title: string; subtitle: string; tone: "global" | "positive" | "negative"; description: string; items: KordBreachModifier[]; locale: Locale; selected: Set<string>; blocked: Set<string>; onToggle?: (id: string) => void }) { return <section className="rounded-xl border border-line bg-surface p-4 shadow-sm"><div className="flex flex-wrap items-baseline gap-2"><h2 className={`font-bold ${tone === "negative" ? "text-red-700 dark:text-red-400" : tone === "positive" ? "text-emerald-700 dark:text-emerald-400" : "text-orange-700 dark:text-orange-400"}`}>{title}</h2><span className="text-[10px] font-bold tracking-wider text-gray-400">{subtitle}</span></div><p className="mb-4 mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">{items.map((item) => <ModifierCard key={item.id} item={item} locale={locale} isGlobal={tone === "global"} selected={selected.has(item.id)} disabled={!selected.has(item.id) && blocked.has(item.id)} onClick={onToggle ? () => onToggle(item.id) : undefined} />)}</div></section>; }

function ModifierCard({ item, locale, isGlobal, selected, disabled, onClick }: { item: KordBreachModifier; locale: Locale; isGlobal: boolean; selected: boolean; disabled: boolean; onClick?: () => void }) { const name = locale === "ja" ? item.nameJa ?? item.nameEn : locale === "en" ? item.nameEn : item.nameKo; const effect = locale === "ja" ? item.effectJa ?? item.effect : locale === "en" ? item.effectEn ?? item.effect : item.effectKo ?? item.effect; const tone = item.category === "positive" ? "emerald" : item.category === "negative" ? "red" : "orange"; return <button type="button" onClick={onClick} disabled={isGlobal || disabled} aria-pressed={isGlobal ? undefined : selected} title={disabled ? "선택한 특성과 함께 사용할 수 없습니다." : effect} className={`relative flex min-h-48 flex-col items-center rounded-lg border bg-surface-elevated p-3 text-center outline-none transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-orange-500 disabled:hover:translate-y-0 ${selected ? tone === "emerald" ? "border-emerald-500 ring-2 ring-emerald-500/25" : "border-red-500 ring-2 ring-red-500/25" : "border-line hover:border-gray-400"} ${disabled ? "cursor-not-allowed opacity-35 grayscale" : ""}`}>
    {!isGlobal && <span className={`absolute right-2 top-2 rounded px-1.5 py-0.5 text-[10px] font-black ${tone === "emerald" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-red-500/10 text-red-700 dark:text-red-400"}`}>{item.score > 0 ? `+${item.score}` : item.score}</span>}
    <Image src={item.iconUrl} alt="" width={64} height={64} className="my-2 size-16 object-contain dark:brightness-110" /><strong className="text-xs">{name}</strong><span className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">{item.nameEn}</span><p className="mt-2 line-clamp-3 text-[10px] leading-relaxed text-gray-600 dark:text-gray-300">{effect}</p>
  </button>; }

function PresetDialog({ presets, selected, accessToken, authLoading, busy, setBusy, onClose, onLoad, onChange, onMessage }: { presets: KordBreachPreset[]; selected: string[]; accessToken?: string; authLoading: boolean; busy: boolean; setBusy: (value: boolean) => void; onClose: () => void; onLoad: (preset: KordBreachPreset) => void; onChange: (presets: KordBreachPreset[]) => void; onMessage: (message: string) => void }) {
  const bySlot = new Map(presets.map((preset) => [preset.slotNo, preset]));
  async function save(slotNo: number) { if (!accessToken) return; setBusy(true); try { const result = await saveKordBreachPreset(slotNo, `프리셋 ${slotNo}`, selected, accessToken); if (result.success) onChange([...presets.filter((p) => p.slotNo !== slotNo), result.preset].sort((a, b) => a.slotNo - b.slotNo)); else onMessage(saveError(result.reason)); } catch { onMessage("프리셋 저장에 실패했습니다."); } finally { setBusy(false); } }
  async function remove(slotNo: number) { if (!accessToken) return; setBusy(true); try { const result = await deleteKordBreachPreset(slotNo, accessToken); if (result.success) onChange(presets.filter((p) => p.slotNo !== slotNo)); } catch { onMessage("프리셋 삭제에 실패했습니다."); } finally { setBusy(false); } }
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}><div role="dialog" aria-modal="true" aria-label="프리셋 관리" className="w-full max-w-lg rounded-xl border border-line bg-surface p-5 shadow-2xl"><div className="mb-4 flex items-center justify-between"><h2 className="font-bold text-orange-600 dark:text-orange-400">프리셋 관리</h2><button onClick={onClose} aria-label="닫기" className="rounded p-1 hover:bg-surface-elevated"><X className="size-5" /></button></div>
    {!accessToken ? <div className="py-8 text-center"><p className="mb-4 text-sm text-gray-500">프리셋 저장은 로그인이 필요합니다.</p><button disabled={authLoading} onClick={() => signIn("google")} className="rounded-md bg-orange-600 px-4 py-2 text-sm font-bold text-white hover:bg-orange-700">Google로 로그인</button></div> : <div className="space-y-3">{[1,2,3].map((slotNo) => { const preset = bySlot.get(slotNo); return <div key={slotNo} className="rounded-lg border border-line bg-surface-elevated p-4"><div className="flex items-center justify-between gap-3"><div className="min-w-0"><strong className="block truncate text-sm">{preset?.name ?? `프리셋 ${slotNo}`}</strong>{preset ? <p className="mt-1 text-xs text-gray-500">긍정 {preset.positiveIds.length} · 부정 {preset.negativeIds.length} · 합산 {preset.totalScore}</p> : <p className="mt-1 text-xs text-gray-400">비어 있는 슬롯</p>}</div><div className="flex shrink-0 gap-1">{preset && <><button disabled={busy} onClick={() => onLoad(preset)} className="rounded border border-line px-2 py-1.5 text-xs hover:border-orange-400">불러오기</button><button disabled={busy} onClick={() => remove(slotNo)} aria-label={`프리셋 ${slotNo} 삭제`} className="rounded p-2 text-red-600 hover:bg-red-500/10"><Trash2 className="size-3.5" /></button></>}<button disabled={busy || selected.length === 0} onClick={() => save(slotNo)} className="rounded border border-orange-500/30 px-2 py-1.5 text-xs text-orange-700 hover:bg-orange-500/10 disabled:opacity-40 dark:text-orange-400"><Save className="mr-1 inline size-3" />{preset ? "덮어쓰기" : "저장"}</button></div></div></div>; })}</div>}
  </div></div>;
}

function saveError(reason: string) { if (reason === "empty_selection") return "저장할 특성을 선택해 주세요."; if (reason === "fail_score") return "총점이 0 미만인 조합은 저장할 수 없습니다."; if (reason.startsWith("conflict:")) return "함께 선택할 수 없는 특성이 포함되어 있습니다."; return `프리셋을 저장할 수 없습니다. (${reason})`; }
