import type { Locale } from "@/i18n/config";

export const itemTypeSlugs = [
  "weapon",
  "ammo",
  "headwear",
  "medical",
  "container",
  "rig",
  "armor-vest",
  "key",
  "headset",
  "backpack",
  "provisions",
  "loot",
  "face-cover",
  "glasses",
  "arm-band",
  
] as const;

export type ItemTypeSlug = (typeof itemTypeSlugs)[number];

type LocalizedValue = Record<Locale, string>;

interface ItemSectionConfig {
  title: LocalizedValue;
  description: LocalizedValue;
}

const itemSectionConfig: Record<ItemTypeSlug, ItemSectionConfig> = {
  ammo: {
    title: { ko: "탄약", en: "Ammo", ja: "弾薬" },
    description: {
      ko: "Escape from Tarkov의 탄약 목록을 검색하고 빠르게 훑어볼 수 있습니다.",
      en: "Browse and search the Escape from Tarkov ammo list in one place.",
      ja: "Escape from Tarkovの弾薬一覧を検索しながら確認できます。",
    },
  },
  "arm-band": {
    title: { ko: "완장", en: "Armbands", ja: "アームバンド" },
    description: {
      ko: "Escape from Tarkov의 완장 목록을 검색하고 빠르게 확인할 수 있습니다.",
      en: "Browse the Escape from Tarkov armband list in one place.",
      ja: "Escape from Tarkovのアームバンド一覧をまとめて確認できます。",
    },
  },
  "armor-vest": {
    title: { ko: "방탄복", en: "Armor Vests", ja: "ボディアーマー" },
    description: {
      ko: "Escape from Tarkov의 방탄복 목록을 한 화면에서 확인할 수 있습니다.",
      en: "Review the Escape from Tarkov armor vest list in a single view.",
      ja: "Escape from Tarkovのボディアーマー一覧をまとめて確認できます。",
    },
  },
  backpack: {
    title: { ko: "백팩", en: "Backpacks", ja: "バックパック" },
    description: {
      ko: "Escape from Tarkov의 백팩 목록을 빠르게 검색할 수 있습니다.",
      en: "Search through the Escape from Tarkov backpack list quickly.",
      ja: "Escape from Tarkovのバックパック一覧をすばやく検索できます。",
    },
  },
  container: {
    title: { ko: "컨테이너", en: "Containers", ja: "コンテナ" },
    description: {
      ko: "Escape from Tarkov의 컨테이너 목록을 한 번에 살펴볼 수 있습니다.",
      en: "Explore the Escape from Tarkov container list at a glance.",
      ja: "Escape from Tarkovのコンテナ一覧をまとめて確認できます。",
    },
  },
  "face-cover": {
    title: { ko: "얼굴 가리개", en: "Face Covers", ja: "フェイスカバー" },
    description: {
      ko: "Escape from Tarkov의 얼굴 가리개 목록을 검색할 수 있습니다.",
      en: "Search the Escape from Tarkov face cover list.",
      ja: "Escape from Tarkovのフェイスカバー一覧を検索できます。",
    },
  },
  glasses: {
    title: { ko: "안경", en: "Glasses", ja: "グラス" },
    description: {
      ko: "Escape from Tarkov의 안경 아이템 목록입니다.",
      en: "A searchable list of Escape from Tarkov glasses items.",
      ja: "Escape from Tarkovのグラス系アイテム一覧です。",
    },
  },
  "headwear": {
    title: { ko: "헤드웨어", en: "Headwear", ja: "ヘッドウェア" },
    description: {
      ko: "Escape from Tarkov의 헤드웨어 목록을 확인할 수 있습니다.",
      en: "Review the Escape from Tarkov headwear list.",
      ja: "Escape from Tarkovのヘッドウェア一覧を確認できます。",
    },
  },
  headset: {
    title: { ko: "헤드셋", en: "Headsets", ja: "ヘッドセット" },
    description: {
      ko: "Escape from Tarkov의 헤드셋 목록을 정리해 보여줍니다.",
      en: "Browse the Escape from Tarkov headset list.",
      ja: "Escape from Tarkovのヘッドセット一覧を確認できます。",
    },
  },
  key: {
    title: { ko: "열쇠", en: "Keys", ja: "鍵" },
    description: {
      ko: "Escape from Tarkov의 열쇠와 키카드 목록을 검색할 수 있습니다.",
      en: "Search the Escape from Tarkov keys and keycards list.",
      ja: "Escape from Tarkovの鍵とキーカード一覧を検索できます。",
    },
  },
  loot: {
    title: { ko: "전리품", en: "Loot", ja: "ルート" },
    description: {
      ko: "Escape from Tarkov의 전리품 목록을 한 페이지에서 확인할 수 있습니다.",
      en: "Browse the Escape from Tarkov loot list on one page.",
      ja: "Escape from Tarkovのルート一覧を1ページで確認できます。",
    },
  },
  medical: {
    title: { ko: "의약품", en: "Medical", ja: "医療品" },
    description: {
      ko: "Escape from Tarkov의 의약품 목록을 검색할 수 있습니다.",
      en: "Search the Escape from Tarkov medical items list.",
      ja: "Escape from Tarkovの医療品一覧を検索できます。",
    },
  },
  provisions: {
    title: { ko: "식량", en: "Provisions", ja: "食料品" },
    description: {
      ko: "Escape from Tarkov의 식량과 음료 목록을 한 페이지에서 확인할 수 있습니다.",
      en: "Browse the Escape from Tarkov food and drink list on one page.",
      ja: "Escape from Tarkovの食料品と飲料一覧を1ページで確認できます。",
    },
  },
  rig: {
    title: { ko: "리그", en: "Rigs", ja: "リグ" },
    description: {
      ko: "Escape from Tarkov의 리그 목록을 정리해 확인할 수 있습니다.",
      en: "Review the Escape from Tarkov rigs list.",
      ja: "Escape from Tarkovのリグ一覧を確認できます。",
    },
  },
  weapon: {
    title: { ko: "무기", en: "Weapons", ja: "武器" },
    description: {
      ko: "Escape from Tarkov의 무기 목록을 검색하고 훑어볼 수 있습니다.",
      en: "Browse and search the Escape from Tarkov weapons list.",
      ja: "Escape from Tarkovの武器一覧を検索しながら確認できます。",
    },
  },
};

const itemListUiCopy = {
  searchPlaceholder: {
    ko: "아이템 이름으로 검색",
    en: "Search by item name",
    ja: "アイテム名で検索",
  },
  totalLabel: {
    ko: "전체 아이템",
    en: "Total items",
    ja: "総アイテム数",
  },
  noResultsLabel: {
    ko: "검색 결과가 없습니다.",
    en: "No matching items found.",
    ja: "一致するアイテムがありません。",
  },
} satisfies Record<string, LocalizedValue>;

export function getItemSectionConfig(itemType: ItemTypeSlug, locale: Locale) {
  const section = itemSectionConfig[itemType];

  return {
    title: section.title[locale],
    description: section.description[locale],
    searchPlaceholder: itemListUiCopy.searchPlaceholder[locale],
    totalLabel: itemListUiCopy.totalLabel[locale],
    noResultsLabel: itemListUiCopy.noResultsLabel[locale],
  };
}

export function isItemTypeSlug(value: string): value is ItemTypeSlug {
  return itemTypeSlugs.includes(value as ItemTypeSlug);
}

export function getItemTypeTabs(locale: Locale) {
  return itemTypeSlugs.map((slug) => ({
    href: `/item/${slug}`,
    label: itemSectionConfig[slug].title[locale],
    slug,
  }));
}
