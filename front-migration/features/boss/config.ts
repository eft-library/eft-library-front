import type { Locale } from "@/i18n/config";

interface LocalizedValue {
  ko: string;
  en: string;
  ja: string;
}

const bossUiCopy = {
  pageTitle: {
    ko: "보스",
    en: "Boss",
    ja: "ボス",
  },
  pageDescription: {
    ko: "보스 정보, 스폰 지역, 체력, 장비 정보를 실제 V3 응답 기준으로 확인할 수 있습니다.",
    en: "Review boss info, spawn maps, health, and gear from live V3 responses.",
    ja: "ボス情報、出現マップ、体力、装備を V3 レスポンス基準で確認できます。",
  },
  selectorLabel: {
    ko: "보스 선택",
    en: "Boss selector",
    ja: "ボス選択",
  },
  factionLabel: {
    ko: "세력",
    en: "Faction",
    ja: "勢力",
  },
  totalHealthLabel: {
    ko: "총 체력",
    en: "Total health",
    ja: "総体力",
  },
  spawnLabel: {
    ko: "스폰 정보",
    en: "Spawn info",
    ja: "出現情報",
  },
  lootLabel: {
    ko: "주요 장비",
    en: "Main loadout",
    ja: "主要装備",
  },
  followersLabel: {
    ko: "팔로워",
    en: "Followers",
    ja: "フォロワー",
  },
  guideLabel: {
    ko: "공략",
    en: "Guide",
    ja: "ガイド",
  },
  healthBreakdownLabel: {
    ko: "부위별 체력",
    en: "Health breakdown",
    ja: "部位ごとの体力",
  },
  noFollowersLabel: {
    ko: "표시할 팔로워가 없습니다.",
    en: "There are no followers to display.",
    ja: "表示するフォロワーがありません。",
  },
  noSpawnLabel: {
    ko: "등록된 스폰 정보가 없습니다.",
    en: "No spawn entries are available.",
    ja: "登録された出現情報がありません。",
  },
  noGuideLabel: {
    ko: "등록된 공략이 없습니다.",
    en: "There is no guide content yet.",
    ja: "登録されたガイドがありません。",
  },
  noLootLabel: {
    ko: "등록된 장비 정보가 없습니다.",
    en: "There are no listed items.",
    ja: "登録された装備情報がありません。",
  },
} satisfies Record<string, LocalizedValue>;

export function getBossPageCopy(locale: Locale) {
  return {
    pageTitle: bossUiCopy.pageTitle[locale],
    pageDescription: bossUiCopy.pageDescription[locale],
    selectorLabel: bossUiCopy.selectorLabel[locale],
    factionLabel: bossUiCopy.factionLabel[locale],
    totalHealthLabel: bossUiCopy.totalHealthLabel[locale],
    spawnLabel: bossUiCopy.spawnLabel[locale],
    lootLabel: bossUiCopy.lootLabel[locale],
    followersLabel: bossUiCopy.followersLabel[locale],
    guideLabel: bossUiCopy.guideLabel[locale],
    healthBreakdownLabel: bossUiCopy.healthBreakdownLabel[locale],
    noFollowersLabel: bossUiCopy.noFollowersLabel[locale],
    noSpawnLabel: bossUiCopy.noSpawnLabel[locale],
    noGuideLabel: bossUiCopy.noGuideLabel[locale],
    noLootLabel: bossUiCopy.noLootLabel[locale],
  };
}
