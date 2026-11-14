"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { calculateStatistics, calculationInput } from "../statistics-api";
import type { StoredContent } from "../builds/types";
import type { CalculationRequest, CalculationResult, WeaponStatistics } from "../statistics-types";
import { itemName } from "../build";
import type { WeaponSnapshot } from "../types";
import type { Locale } from "@/i18n/config";

export function useStatistics(content: StoredContent | null, generation: string) {
  const key = content ? JSON.stringify(calculationInput(content)) : "";
  const weaponId = content?.weapon_item_id ?? null;
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(key), 150);
    return () => clearTimeout(timer);
  }, [key]);
  const query = useQuery({
    // Observe the requested configuration immediately, including cached previews.
    // Debounce only network requests, not switching to an existing result.
    queryKey: ["modding-statistics", generation, weaponId, key],
    queryFn: ({ signal }) => calculateStatistics(JSON.parse(key) as CalculationRequest, signal),
    enabled: !!key && debounced === key,
    placeholderData: (previous, previousQuery) =>
      previousQuery?.queryKey[1] === generation && previousQuery.queryKey[2] === weaponId
        ? previous : undefined,
    retry: false, staleTime: 30_000, gcTime: 60_000, refetchOnWindowFocus: false,
  });
  // Retain the last result while the next candidate is debounced/fetched.
  // Scope placeholders by weapon and generation so another weapon's stats cannot leak in.
  return { ...query, data: key ? query.data : undefined,
    waiting: !!key && (query.isPending || query.isPlaceholderData) };
}

const format = (value: number) => new Intl.NumberFormat("en", { maximumFractionDigits: 3 }).format(value);
export function PopupStatisticsSummary({ current, preview, previewing, locale }: {
  current: ReturnType<typeof useStatistics>; preview: ReturnType<typeof useStatistics>; previewing: boolean; locale: Locale;
}) {
  const t = (ko: string, en: string, ja: string) => locale === "ko" ? ko : locale === "ja" ? ja : en;
  const shown = previewing ? preview : current;
  const comparing = previewing && !!preview.data && !(preview.isError && !preview.waiting);
  const data = comparing ? preview.data : current.data;
  const metrics = [
    ["weight_kg", t("무게", "Weight", "重量"), "kg", false],
    ["ergonomics", t("인체공학", "Ergonomics", "エルゴノミクス"), "", true],
    ["recoil_vertical", t("수직 반동", "Vertical recoil", "縦反動"), "", false],
    ["recoil_horizontal", t("수평 반동", "Horizontal recoil", "横反動"), "", false],
  ] as const;
  const failed = shown.isError && !shown.waiting;
  return <section aria-label={t("전체 구성 성능 비교", "Build statistics comparison", "構成全体の性能比較")} className="mt-2 border-t border-line pt-2">
    <div className="mb-2 flex min-h-4 items-center justify-between gap-2 text-[10px]">
      <h4 className="shrink-0 font-semibold">{t("전체 구성 성능", "Build statistics", "構成全体の性能")}</h4>
      <span role={failed ? "alert" : "status"} className={`min-w-0 truncate text-right ${failed ? "text-red-700 dark:text-red-300" : "text-gray-600 dark:text-gray-400"}`}>
        {failed ? t("계산 실패 · 현재 수치", "Failed · current values", "計算失敗 · 現在値") : shown.waiting ? t("업데이트 중 · 이전 수치", "Updating · previous values", "更新中 · 前回値") : comparing ? t("현재 → 미리보기", "Current → preview", "現在 → プレビュー") : t("현재 구성 기준", "Current configuration", "現在の構成")}
      </span>
      {failed && <button type="button" onClick={() => void shown.refetch()} className="shrink-0 rounded border border-line px-1 focus-visible:outline-2 focus-visible:outline-accent">{t("재시도", "Retry", "再試行")}</button>}
    </div>
    <dl className="grid grid-cols-2 gap-1.5">{metrics.map(([key, label, unit, up]) => {
      const before = current.data?.statistics[key];
      const value = data?.statistics[key];
      const difference = comparing && before != null && value != null ? value - before : null;
      const good = difference !== null && (up ? difference > 0 : difference < 0);
      return <div key={key} className="min-w-0 rounded border border-line bg-background px-2 py-1.5">
        <dt className="truncate text-[10px] text-gray-600 dark:text-gray-400">{label}{unit && ` (${unit})`}</dt>
        <dd className="mt-0.5 flex min-h-4 flex-wrap items-baseline gap-x-1 font-mono text-[11px] tabular-nums">
          {comparing && <><span className="text-gray-600 dark:text-gray-400">{before == null ? "—" : format(before)}</span><span aria-hidden="true">→</span></>}
          <span>{value == null ? "—" : format(value)}</span>
          {difference !== null && <span className={difference === 0 ? "text-gray-600 dark:text-gray-400" : good ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}>({difference > 0 ? "+" : ""}{format(difference)})</span>}
        </dd>
      </div>;
    })}</dl>
  </section>;
}

export function WeaponStatisticsPanel({ current, preview, previewing, locale, snapshot }: {
  current: ReturnType<typeof useStatistics>; preview: ReturnType<typeof useStatistics>; previewing: boolean; locale: Locale; snapshot: WeaponSnapshot;
}) {
  const t = (ko: string, en: string, ja: string) => locale === "ko" ? ko : locale === "ja" ? ja : en;
  const shown = previewing ? preview : current;
  const showingPreview = previewing && !!preview.data && !(preview.isError && !preview.waiting);
  const data = showingPreview ? preview.data : current.data;
  const metrics: { key: keyof Pick<WeaponStatistics, "weight_kg" | "ergonomics" | "recoil_vertical" | "recoil_horizontal">; label: string; unit: string; max: number; up?: boolean }[] = [
    { key: "weight_kg", label: t("무게", "Weight", "重量"), unit: "kg", max: 8 },
    { key: "ergonomics", label: t("인체공학", "Ergonomics", "エルゴノミクス"), unit: "", max: 100, up: true },
    { key: "recoil_vertical", label: t("수직 반동", "Vertical recoil", "縦反動"), unit: "", max: 200 },
    { key: "recoil_horizontal", label: t("수평 반동", "Horizontal recoil", "横反動"), unit: "", max: 500 },
  ];
  const reason = (code: string) => {
    const labels: Record<string, [string, string, string]> = {
      MISSING_SOURCE_VALUE: ["원천 값 없음", "Missing source value", "元データなし"],
      AMMO_UNAVAILABLE: ["적용 탄약 정보 없음", "Ammunition unavailable", "弾薬情報なし"],
      VELOCITY_FORMULA_UNVERIFIED: ["속도 계산식 미검증", "Velocity formula unverified", "初速計算式未検証"],
      MISSING_AMMO_INITIAL_SPEED: ["탄약 초기 속도 없음", "Missing ammo initial speed", "弾薬初速なし"],
      AMMO_CORRECTION_UNVERIFIED: ["탄약 보정 미검증", "Ammo correction unverified", "弾薬補正未検証"],
      MISSING_AMMO_MODIFIER: ["탄약 보정 값 없음", "Missing ammo modifier", "弾薬補正値なし"],
      MULTIPLE_BARRELS_UNSUPPORTED: ["다중 총열 계산 미지원", "Multiple barrels unsupported", "複数バレル未対応"],
      INVALID_SOURCE_VALUE: ["원천 값 오류", "Invalid source value", "元データ不正"],
    };
    return labels[code] ? t(...labels[code]) : code;
  };
  return <section className="relative z-0 [overflow-anchor:none] rounded-2xl border border-line bg-surface p-4">
    <div className="mb-3 flex h-6 items-center justify-between gap-3">
      <h3 className="shrink-0 font-bold">{t("총기 성능", "Weapon statistics", "武器性能")}</h3>
      <p role={shown.isError && !shown.waiting ? "alert" : "status"} className={`min-w-0 flex-1 truncate text-right text-xs ${shown.isError && !shown.waiting ? "text-red-700 dark:text-red-300" : "text-gray-600 dark:text-gray-400"}`}>
        {shown.waiting ? (data ? t("수치 업데이트 중…", "Updating statistics…", "性能更新中…") : t("성능 계산 중…", "Calculating…", "計算中…")) : shown.isError ? t("성능 계산에 실패했습니다.", "Could not calculate statistics.", "性能計算に失敗しました。") : previewing ? t("미리보기 · 선택한 파츠를 장착했을 때", "Preview · with the selected part", "プレビュー · 選択パーツ装着時") : t("현재 구성 기준", "Current configuration", "現在の構成")}
      </p>
      {shown.isError && !shown.waiting && <button type="button" onClick={() => void shown.refetch()} className="h-8 shrink-0 rounded border border-line px-2 text-xs focus-visible:outline-2 focus-visible:outline-accent">{t("다시 시도", "Retry", "再試行")}</button>}
    </div>
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">{metrics.map((metric) => {
        const value = data?.statistics[metric.key];
        const before = current.data?.statistics[metric.key];
        const delta = showingPreview && value != null && before != null ? value - before : null;
        const good = delta !== null && (metric.up ? delta > 0 : delta < 0);
        const width = value == null ? 0 : Math.max(0, Math.min(100, value / metric.max * 100));
        const oldWidth = before == null ? width : Math.max(0, Math.min(100, before / metric.max * 100));
        return <div key={metric.key}><div className="relative flex h-[34px] items-center justify-between gap-2 overflow-hidden rounded border border-line bg-gray-100 px-2 text-xs dark:bg-[#1b1d21]">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-100 to-orange-200 shadow-[inset_-2px_0_0_#f97316] dark:from-white/[0.04] dark:to-white/[0.14] dark:shadow-[inset_-2px_0_0_#fb923c] transition-[width] duration-200 ease-out motion-reduce:transition-none" style={{ width: `${width}%` }} />
          {delta !== null && delta !== 0 && <div aria-hidden="true" className={`absolute inset-y-0 transition-[left,width] duration-200 ease-out motion-reduce:transition-none ${good ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`} style={{ left: `${Math.min(oldWidth, width)}%`, width: `${Math.abs(width - oldWidth)}%`, backgroundImage: "repeating-linear-gradient(135deg, currentColor 0px, currentColor 1.5px, transparent 1.5px, transparent 6px)" }} />}
          <span title={metric.label} className="relative min-w-0 truncate">{metric.label}</span><span className="relative shrink-0 font-mono text-[10px] tabular-nums sm:text-xs">{value == null ? "—" : `${format(value)} ${metric.unit}`}{delta !== null && delta !== 0 && <span className={`ml-1 ${good ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>({delta > 0 ? "+" : ""}{format(delta)})</span>}</span>
        </div>{value === null && <p className="mt-1 text-[11px] leading-4 text-gray-600 dark:text-gray-400">{[...new Set(data?.unavailable.filter((item) => item.metric === metric.key).map((item) => reason(item.code)))].join(" · ") || t("계산 불가", "Unavailable", "計算不可")}</p>}</div>;
      })}</div>
      <dl className="grid gap-2 text-xs sm:grid-cols-3">{[
        [t("발사 방식", "Fire modes", "射撃モード"), data?.statistics.fire_modes?.map((mode) => ({ single_fire: t("단발", "Single", "単発"), full_auto: t("연사", "Full auto", "連射"), burst_fire: t("점사", "Burst", "バースト"), double_action: t("더블 액션", "Double action", "ダブルアクション"), double_tap: t("더블 탭", "Double tap", "ダブルタップ"), semi_auto: t("반자동", "Semi-auto", "セミオート") }[mode] ?? mode)).join(" / ")],
        [t("발사 속도", "Fire rate", "連射速度"), data?.statistics.fire_rate_rpm == null ? null : `${data.statistics.fire_rate_rpm} RPM`],
        [t("구경", "Caliber", "口径"), data?.statistics.caliber?.replace(/^Caliber/, "")],
      ].map(([label, value]) => <div key={label} className="flex h-[34px] items-center justify-between gap-3 overflow-hidden rounded border border-line bg-background px-2"><dt className="text-gray-600 dark:text-gray-400">{label}</dt><dd title={value ?? undefined} className="line-clamp-2 min-w-0 text-right font-mono leading-4">{value ?? "—"}</dd></div>)}</dl>
    </div>
    <div className="mt-3 flex flex-col items-start gap-2 sm:flex-row sm:justify-between">
    <Compatibility data={data} locale={locale} snapshot={snapshot} />
    <p className="text-[10px] text-gray-600 dark:text-gray-400">{t("데이터 제공자 기준 참조 계산 · 내구도 100% · 실탄 무게·스킬·접힘 상태 제외", "Source reference calculation · 100% durability · excludes loaded ammo, skills and folded state", "提供元基準の参考計算 · 耐久100% · 装填弾薬・スキル・折り畳み状態を除外")}</p></div>
  </section>;
}
function Compatibility({ data, locale, snapshot }: { data: CalculationResult | undefined; locale: Locale; snapshot: WeaponSnapshot }) {
  const t = (ko: string, en: string, ja: string) => locale === "ko" ? ko : locale === "ja" ? ja : en;
  const issueLabels: Record<string, [string, string, string]> = {
    REQUIRED_SLOT_UNFILLED: ["필수 슬롯이 비어 있습니다", "Required slot is empty", "必須スロットが空です"],
    ITEM_CONFLICT: ["부품이 서로 충돌합니다", "Parts conflict", "パーツが干渉しています"],
    CATEGORY_CONFLICT: ["부품 분류가 충돌합니다", "Part categories conflict", "カテゴリが干渉しています"],
    SLOT_CONFLICT: ["슬롯이 충돌합니다", "Slots conflict", "スロットが干渉しています"],
    SLOT_FILTER_REJECTED: ["슬롯 허용 조건에 맞지 않습니다", "Part does not match slot filters", "スロット条件に適合しません"],
    UNRESOLVED_CONFLICT_SLOT: ["슬롯 충돌 정보가 불완전합니다", "Slot conflict information is incomplete", "スロット干渉情報が不完全です"],
    UNKNOWN_PARENT_SLOT: ["슬롯 정보를 찾을 수 없습니다", "Slot information missing", "スロット情報がありません"],
  };
  return <details className={`max-w-full shrink-0 text-xs ${data?.compatibility.status === "valid" ? "text-emerald-800 dark:text-emerald-300" : "text-amber-900 dark:text-amber-200"}`}><summary className="h-4 cursor-pointer truncate rounded leading-4 focus-visible:outline-2 focus-visible:outline-accent">{!data ? t("장착 규칙 확인 중…", "Checking attachment rules…", "装着ルール確認中…") : data.compatibility.status === "valid" ? t("저장된 장착 규칙 통과", "Stored attachment rules passed", "保存済み装着ルール適合") : data?.compatibility.status === "invalid" ? t("장착 규칙 위반 있음", "Attachment rule violations", "装着ルール違反あり") : t("장착 호환성 확인 불가", "Compatibility uncertain", "互換性未確認")}{data ? ` (${data.compatibility.issues.length})` : ""}</summary><div className="mt-2 h-40 overflow-y-auto"><p>{t("게임 클라이언트 전체 검증은 아닙니다.", "This is not full game-client validation.", "ゲームクライアント全体の検証ではありません。")}</p><ul className="mt-2 space-y-1">{data?.compatibility.issues.map((issue, index) => <li key={index} className="break-all">{issueLabels[issue.code] ? t(...issueLabels[issue.code]) : t("장착 규칙을 확인해주세요", "Check attachment rules", "装着ルールを確認してください")}{(() => {
    const definition = issue.slot_id ? Object.values(snapshot.items).flatMap((item) => item.slots).find((slot) => slot.slot_id === issue.slot_id) : undefined;
    const item = issue.item_id ? snapshot.items[issue.item_id]?.item : undefined;
    return definition ? ` · ${itemName(definition, locale)}` : item ? ` · ${itemName(item, locale)}` : "";
  })()}</li>)}</ul></div></details>;
}
