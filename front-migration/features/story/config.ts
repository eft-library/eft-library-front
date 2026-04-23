import type { Locale } from "@/i18n/config";
import type { StoryNodeType } from "@/types/api/story";

interface LocalizedValue {
  ko: string;
  en: string;
  ja: string;
}

const storyUiCopy = {
  pageTitle: {
    ko: "스토리",
    en: "Story",
    ja: "ストーリー",
  },
  pageDescription: {
    ko: "Escape from Tarkov 스토리 라인과 로드맵을 실제 V3 데이터 기준으로 확인할 수 있습니다.",
    en: "Browse Escape from Tarkov story chapters and the roadmap with live V3 data.",
    ja: "Escape from Tarkov のストーリーチャプターとロードマップを V3 データで確認できます。",
  },
  selectorLabel: {
    ko: "챕터 선택",
    en: "Chapter selector",
    ja: "チャプター選択",
  },
  updatedAtLabel: {
    ko: "업데이트",
    en: "Updated",
    ja: "更新日時",
  },
  roadmapLabel: {
    ko: "로드맵",
    en: "Roadmap",
    ja: "ロードマップ",
  },
  roadmapDescription: {
    ko: "노드 좌표와 타입을 기반으로 스토리 진행 흐름을 한눈에 볼 수 있게 정리했습니다.",
    en: "The roadmap is arranged from the node coordinates and types returned by the API.",
    ja: "API が 반환한ノード座標とタイプを元に、進行の流れを見やすく整理しています。",
  },
  nodeCountLabel: {
    ko: "전체 노드",
    en: "Total nodes",
    ja: "総ノード数",
  },
  chapterCountLabel: {
    ko: "챕터 수",
    en: "Chapters",
    ja: "チャプター数",
  },
  coordinateRangeLabel: {
    ko: "좌표 범위",
    en: "Coordinate range",
    ja: "座標範囲",
  },
  requirementsLabel: {
    ko: "요구 조건",
    en: "Requirements",
    ja: "必要条件",
  },
  objectivesLabel: {
    ko: "목표",
    en: "Objectives",
    ja: "目的",
  },
  guideLabel: {
    ko: "가이드",
    en: "Guide",
    ja: "ガイド",
  },
  noSectionLabel: {
    ko: "표시할 내용이 없습니다.",
    en: "There is no content to display.",
    ja: "表示できる内容がありません。",
  },
  chapterSummaryLabel: {
    ko: "챕터 개요",
    en: "Chapter overview",
    ja: "チャプター概要",
  },
} satisfies Record<string, LocalizedValue>;

export const storyNodeTypeMeta: Record<
  StoryNodeType,
  { accentClass: string; badgeClass: string }
> = {
  base: {
    accentClass: "border-sky-500/40 bg-sky-500/10",
    badgeClass: "bg-sky-500/15 text-sky-200",
  },
  branch: {
    accentClass: "border-indigo-500/40 bg-indigo-500/10",
    badgeClass: "bg-indigo-500/15 text-indigo-200",
  },
  craft: {
    accentClass: "border-emerald-500/40 bg-emerald-500/10",
    badgeClass: "bg-emerald-500/15 text-emerald-200",
  },
  payment: {
    accentClass: "border-amber-500/40 bg-amber-500/10",
    badgeClass: "bg-amber-500/15 text-amber-200",
  },
  achievement: {
    accentClass: "border-fuchsia-500/40 bg-fuchsia-500/10",
    badgeClass: "bg-fuchsia-500/15 text-fuchsia-200",
  },
  penalty: {
    accentClass: "border-rose-500/40 bg-rose-500/10",
    badgeClass: "bg-rose-500/15 text-rose-200",
  },
  timegate: {
    accentClass: "border-cyan-500/40 bg-cyan-500/10",
    badgeClass: "bg-cyan-500/15 text-cyan-200",
  },
  ending: {
    accentClass: "border-orange-500/40 bg-orange-500/10",
    badgeClass: "bg-orange-500/15 text-orange-200",
  },
};

export function getStoryPageCopy(locale: Locale) {
  return {
    pageTitle: storyUiCopy.pageTitle[locale],
    pageDescription: storyUiCopy.pageDescription[locale],
    selectorLabel: storyUiCopy.selectorLabel[locale],
    updatedAtLabel: storyUiCopy.updatedAtLabel[locale],
    roadmapLabel: storyUiCopy.roadmapLabel[locale],
    roadmapDescription: storyUiCopy.roadmapDescription[locale],
    nodeCountLabel: storyUiCopy.nodeCountLabel[locale],
    chapterCountLabel: storyUiCopy.chapterCountLabel[locale],
    coordinateRangeLabel: storyUiCopy.coordinateRangeLabel[locale],
    requirementsLabel: storyUiCopy.requirementsLabel[locale],
    objectivesLabel: storyUiCopy.objectivesLabel[locale],
    guideLabel: storyUiCopy.guideLabel[locale],
    noSectionLabel: storyUiCopy.noSectionLabel[locale],
    chapterSummaryLabel: storyUiCopy.chapterSummaryLabel[locale],
  };
}
