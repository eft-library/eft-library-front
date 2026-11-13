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
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(key), 150);
    return () => clearTimeout(timer);
  }, [key]);
  const query = useQuery({
    queryKey: ["modding-statistics", generation, debounced],
    queryFn: ({ signal }) => calculateStatistics(JSON.parse(debounced) as CalculationRequest, signal),
    enabled: !!key && debounced === key,
    retry: false, staleTime: 0, gcTime: 60_000,
  });
  // Never show a previous part's result during the debounce window.
  return { ...query, data: key && debounced === key ? query.data : undefined, waiting: !!key && (debounced !== key || query.isPending) };
}

const format = (value: number) => new Intl.NumberFormat("en", { maximumFractionDigits: 3 }).format(value);
export function WeaponStatisticsPanel({ current, preview, previewing, locale, snapshot }: {
  current: ReturnType<typeof useStatistics>; preview: ReturnType<typeof useStatistics>; previewing: boolean; locale: Locale; snapshot: WeaponSnapshot;
}) {
  const t = (ko: string, en: string, ja: string) => locale === "ko" ? ko : locale === "ja" ? ja : en;
  const shown = previewing ? preview : current;
  const data = shown.data;
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
  return <section className="relative z-0 [overflow-anchor:none] rounded-2xl border border-line bg-surface p-4 sm:p-5">
    <div className="mb-4 flex h-8 items-center justify-between gap-3">
      <h3 className="shrink-0 font-bold">{t("총기 성능", "Weapon statistics", "武器性能")}</h3>
      <p role={shown.isError && !shown.waiting ? "alert" : "status"} className={`min-w-0 flex-1 truncate text-right text-xs ${shown.isError && !shown.waiting ? "text-red-700 dark:text-red-300" : "text-gray-600 dark:text-gray-400"}`}>
        {shown.waiting ? t("성능 계산 중…", "Calculating…", "計算中…") : shown.isError ? t("성능 계산에 실패했습니다.", "Could not calculate statistics.", "性能計算に失敗しました。") : previewing ? t("미리보기 · 선택한 파츠를 장착했을 때", "Preview · with the selected part", "プレビュー · 選択パーツ装着時") : t("현재 구성 기준", "Current configuration", "現在の構成")}
      </p>
      {shown.isError && !shown.waiting && <button type="button" onClick={() => void shown.refetch()} className="h-8 shrink-0 rounded border border-line px-2 text-xs focus-visible:outline-2 focus-visible:outline-accent">{t("다시 시도", "Retry", "再試行")}</button>}
    </div>
    <div className="grid gap-5 lg:grid-cols-[1fr_230px]">
      <div className="grid grid-cols-2 gap-3">{metrics.map((metric) => {
        const value = data?.statistics[metric.key];
        const before = current.data?.statistics[metric.key];
        const delta = previewing && value != null && before != null ? value - before : null;
        const good = delta !== null && (metric.up ? delta > 0 : delta < 0);
        const width = value == null ? 0 : Math.max(0, Math.min(100, value / metric.max * 100));
        const oldWidth = before == null ? width : Math.max(0, Math.min(100, before / metric.max * 100));
        return <div key={metric.key}><div className="relative flex h-[34px] items-center justify-between gap-2 overflow-hidden rounded border border-line bg-background px-2 text-xs">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 bg-orange-500/15" style={{ width: `${width}%` }} />
          {delta !== null && delta !== 0 && <div aria-hidden="true" className={`absolute inset-y-0 ${good ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`} style={{ left: `${Math.min(oldWidth, width)}%`, width: `${Math.abs(width - oldWidth)}%`, backgroundImage: "repeating-linear-gradient(135deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 5px)", opacity: 0.4 }} />}
          <span title={metric.label} className="relative min-w-0 truncate">{metric.label}</span><span className="relative shrink-0 font-mono text-[10px] tabular-nums sm:text-xs">{value == null ? "—" : `${format(value)} ${metric.unit}`}{delta !== null && delta !== 0 && <span className={`ml-1 ${good ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>({delta > 0 ? "+" : ""}{format(delta)})</span>}</span>
        </div><p className="mt-1 h-8 overflow-hidden text-[11px] leading-4 text-gray-600 dark:text-gray-400"><span className="line-clamp-2">{value === null ? [...new Set(data?.unavailable.filter((item) => item.metric === metric.key).map((item) => reason(item.code)))].join(" · ") || t("계산 불가", "Unavailable", "計算不可") : "\u00a0"}</span></p></div>;
      })}</div>
      <dl className="space-y-3 text-xs">{[
        [t("발사 방식", "Fire modes", "射撃モード"), data?.statistics.fire_modes?.map((mode) => ({ single_fire: t("단발", "Single", "単発"), full_auto: t("연사", "Full auto", "連射"), burst_fire: t("점사", "Burst", "バースト"), double_action: t("더블 액션", "Double action", "ダブルアクション"), double_tap: t("더블 탭", "Double tap", "ダブルタップ"), semi_auto: t("반자동", "Semi-auto", "セミオート") }[mode] ?? mode)).join(" / ")],
        [t("구경", "Caliber", "口径"), data?.statistics.caliber?.replace(/^Caliber/, "")],
        [t("발사 속도", "Fire rate", "連射速度"), data?.statistics.fire_rate_rpm == null ? null : `${data.statistics.fire_rate_rpm} RPM`],
      ].map(([label, value]) => <div key={label} className="flex h-10 items-start justify-between gap-3 overflow-hidden border-b border-line pb-2"><dt className="text-gray-600 dark:text-gray-400">{label}</dt><dd title={value ?? undefined} className="line-clamp-2 min-w-0 text-right font-mono leading-4">{value ?? "—"}</dd></div>)}</dl>
    </div>
    <Compatibility data={data} locale={locale} snapshot={snapshot} />
    <p className="mt-4 text-[11px] text-gray-600 dark:text-gray-400">{t("데이터 제공자 기준 참조 계산 · 내구도 100% · 실탄 무게·스킬·접힘 상태 제외", "Source reference calculation · 100% durability · excludes loaded ammo, skills and folded state", "提供元基準の参考計算 · 耐久100% · 装填弾薬・スキル・折り畳み状態を除外")}</p>
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
  return <details className={`mt-4 rounded-lg border border-line p-3 text-xs ${data?.compatibility.status === "valid" ? "text-emerald-800 dark:text-emerald-300" : "text-amber-900 dark:text-amber-200"}`}><summary className="h-4 cursor-pointer truncate rounded leading-4 focus-visible:outline-2 focus-visible:outline-accent">{!data ? t("장착 규칙 확인 중…", "Checking attachment rules…", "装着ルール確認中…") : data.compatibility.status === "valid" ? t("저장된 장착 규칙 통과", "Stored attachment rules passed", "保存済み装着ルール適合") : data?.compatibility.status === "invalid" ? t("장착 규칙 위반 있음", "Attachment rule violations", "装着ルール違反あり") : t("장착 호환성 확인 불가", "Compatibility uncertain", "互換性未確認")}{data ? ` (${data.compatibility.issues.length})` : ""}</summary><div className="mt-2 h-40 overflow-y-auto"><p>{t("게임 클라이언트 전체 검증은 아닙니다.", "This is not full game-client validation.", "ゲームクライアント全体の検証ではありません。")}</p><ul className="mt-2 space-y-1">{data?.compatibility.issues.map((issue, index) => <li key={index} className="break-all">{issueLabels[issue.code] ? t(...issueLabels[issue.code]) : t("장착 규칙을 확인해주세요", "Check attachment rules", "装着ルールを確認してください")}{(() => {
    const definition = issue.slot_id ? Object.values(snapshot.items).flatMap((item) => item.slots).find((slot) => slot.slot_id === issue.slot_id) : undefined;
    const item = issue.item_id ? snapshot.items[issue.item_id]?.item : undefined;
    return definition ? ` · ${itemName(definition, locale)}` : item ? ` · ${itemName(item, locale)}` : "";
  })()}</li>)}</ul></div></details>;
}
