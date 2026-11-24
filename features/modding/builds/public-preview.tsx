"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Locale } from "@/i18n/config";
import { getWeapon, type WeaponData } from "../api";
import { buildSlots } from "../build";
import { AttachmentRulesPanel, attachmentIssueLabel, useStatistics, WeaponStatisticsPanel } from "../components/weapon-statistics";
import { WorkbenchFlowCanvas } from "../components/workbench-flow-canvas";
import type { ModdingManifest } from "../types";
import { useWorkbenchData } from "../use-workbench-data";
import { layoutSlots } from "../workbench-layout";
import { violationLabels, violationParts } from "../workbench-violations";
import { selectionsFromNodes } from "./tree";
import type { StoredContent } from "./types";
import { buildButton, buildText } from "./ui";

interface PreviewProps {
  content: StoredContent;
  locale: Locale;
  manifest: ModdingManifest | null | undefined;
  children: ReactNode;
}

export function PublishedBuildPreview({ content, locale, manifest, children }: PreviewProps) {
  const t = (ko: string, en: string, ja: string) => buildText(locale, ko, en, ja);
  const weapon = useQuery({
    queryKey: ["modding", "snapshot", manifest?.generation ?? "api", content.weapon_item_id],
    queryFn: ({ signal }) => getWeapon(manifest ?? null, content.weapon_item_id, signal),
    enabled: manifest !== undefined,
    staleTime: 5 * 60_000,
    gcTime: 5 * 60_000,
    retry: false,
  });
  const current = useStatistics(weapon.data || weapon.isError ? content : null, weapon.data?.generation ?? "api");
  return <section className="mb-5 space-y-3">
    <h3 className="text-lg font-bold">{t("빌드 미리보기", "Build preview", "ビルドのプレビュー")}</h3>
    <WeaponStatisticsPanel current={current} preview={current} previewing={false} locale={locale} />
    {weapon.data ? (
      <PreviewCanvas content={content} weapon={weapon.data} current={current} locale={locale}>{children}</PreviewCanvas>
    ) : <>
      {weapon.isError ? (
        <div role="status" className="flex flex-wrap items-center gap-2 rounded-lg border border-line bg-surface-elevated p-3 text-sm">
          <span>{t("작업대 미리보기를 불러오지 못했습니다.", "Could not load the workbench preview.", "作業台プレビューを読み込めませんでした。")}</span>
          <button type="button" className={buildButton} onClick={() => void weapon.refetch()}>{t("다시 시도", "Retry", "再試行")}</button>
        </div>
      ) : <p role="status" className="rounded-lg border border-line bg-surface-elevated p-3 text-sm">
        {t("작업대 미리보기 불러오는 중…", "Loading the workbench preview…", "作業台プレビューを読み込み中…")}
      </p>}
      <PartsList locale={locale} show={weapon.isError}>{children}</PartsList>
    </>}
  </section>;
}

function PreviewCanvas({ content, weapon, current, locale, children }: {
  content: StoredContent;
  weapon: WeaponData;
  current: ReturnType<typeof useStatistics>;
  locale: Locale;
  children: ReactNode;
}) {
  const t = (ko: string, en: string, ja: string) => buildText(locale, ko, en, ja);
  const { snapshot, itemsLoading } = useWorkbenchData(
    weapon.snapshot, weapon.source, content.nodes.map((node) => node.item_id),
    undefined, undefined, "", "build",
  );
  const [location, setLocation] = useState<{ key: string } | null>(null);
  const slots = useMemo(() => buildSlots(
    snapshot, selectionsFromNodes(content), content.nodes.map((node) => node.item),
  ).filter((slot) => slot.selected), [snapshot, content]);
  const layout = useMemo(() => layoutSlots(slots, undefined, snapshot), [slots, snapshot]);
  const calculation = current.isPlaceholderData ? undefined : current.data;
  const issues = calculation?.compatibility.status === "invalid" ? calculation.compatibility.issues : undefined;
  const parts = useMemo(() => violationParts(content, slots, issues ?? [], locale), [content, slots, issues, locale]);
  const marks = useMemo(() => violationLabels(parts, (code) => attachmentIssueLabel(code, locale)), [parts, locale]);
  const incomplete = !itemsLoading && slots.length < content.nodes.length - 1;
  const root = content.nodes.find((node) => !node.parent_node_id);
  return <>
    <div aria-label={t("읽기 전용 작업대", "Read-only workbench", "読み取り専用の作業台")} className="relative h-[min(65dvh,600px)] min-h-[420px] overflow-hidden rounded-xl border border-line bg-[#e6e8ec] dark:bg-[#16181b]">
      <WorkbenchFlowCanvas layout={layout} snapshot={snapshot} weaponImage={root?.item.image}
        fitKey={`${content.weapon_item_id}:${itemsLoading}`} locale={locale} marks={marks} location={location}
        rulesPanel={<AttachmentRulesPanel data={calculation} locale={locale}
          issueParts={(issue) => parts.get(issue) ?? []} onPart={(key) => setLocation({ key })} />}
      />
    </div>
    {incomplete && <p role="status" className="text-xs text-amber-900 dark:text-amber-200">
      {t("현재 슬롯 정보에서 찾을 수 없는 부품은 아래 저장된 목록에서 확인할 수 있습니다.", "Parts missing from current slot data are available in the saved list below.", "現在のスロット情報にないパーツは、下の保存済みリストで確認できます。")}
    </p>}
    <PartsList locale={locale} show={incomplete}>{children}</PartsList>
  </>;
}

function PartsList({ locale, show, children }: { locale: Locale; show: boolean; children: ReactNode }) {
  return <details open={show || undefined} className="rounded-lg border border-line p-3">
    <summary className="cursor-pointer rounded text-sm font-semibold focus-visible:outline-2 focus-visible:outline-accent">
      {buildText(locale, "저장된 부품 목록", "Saved parts list", "保存済みパーツ一覧")}
    </summary>
    <div className="mt-3">{children}</div>
  </details>;
}
