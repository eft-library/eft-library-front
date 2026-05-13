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
    accentClass: "border-sky-200 bg-sky-50 dark:border-sky-400/70 dark:bg-sky-400/20",
    badgeClass: "border-sky-200 bg-sky-100 text-sky-700 dark:border-sky-300/40 dark:bg-sky-300/20 dark:text-sky-100",
  },
  branch: {
    accentClass: "border-indigo-200 bg-indigo-50 dark:border-indigo-400/70 dark:bg-indigo-400/20",
    badgeClass: "border-indigo-200 bg-indigo-100 text-indigo-700 dark:border-indigo-300/40 dark:bg-indigo-300/20 dark:text-indigo-100",
  },
  craft: {
    accentClass: "border-purple-200 bg-purple-50 dark:border-purple-400/70 dark:bg-purple-400/20",
    badgeClass: "border-purple-200 bg-purple-100 text-purple-700 dark:border-purple-300/40 dark:bg-purple-300/20 dark:text-purple-100",
  },
  payment: {
    accentClass: "border-amber-200 bg-amber-50 dark:border-amber-400/70 dark:bg-amber-400/20",
    badgeClass: "border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-300/40 dark:bg-amber-300/20 dark:text-amber-100",
  },
  achievement: {
    accentClass: "border-lime-200 bg-lime-50 dark:border-lime-400/70 dark:bg-lime-400/20",
    badgeClass: "border-lime-200 bg-lime-100 text-lime-700 dark:border-lime-300/40 dark:bg-lime-300/20 dark:text-lime-100",
  },
  penalty: {
    accentClass: "border-red-200 bg-red-50 dark:border-red-400/70 dark:bg-red-400/20",
    badgeClass: "border-red-200 bg-red-100 text-red-700 dark:border-red-300/40 dark:bg-red-300/20 dark:text-red-100",
  },
  timegate: {
    accentClass: "border-cyan-200 bg-cyan-50 dark:border-cyan-400/70 dark:bg-cyan-400/20",
    badgeClass: "border-cyan-200 bg-cyan-100 text-cyan-700 dark:border-cyan-300/40 dark:bg-cyan-300/20 dark:text-cyan-100",
  },
  ending: {
    accentClass: "border-orange-200 bg-orange-50 dark:border-orange-400/70 dark:bg-orange-400/20",
    badgeClass: "border-orange-200 bg-orange-100 text-orange-700 dark:border-orange-300/40 dark:bg-orange-300/20 dark:text-orange-100",
  },
};

export function getStoryPageCopy(locale: Locale) {
  return {
    pageTitle: storyUiCopy.pageTitle[locale],
    pageDescription: storyUiCopy.pageDescription[locale],
    selectorLabel: storyUiCopy.selectorLabel[locale],
    updatedAtLabel: storyUiCopy.updatedAtLabel[locale],
    roadmapLabel: storyUiCopy.roadmapLabel[locale],
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
