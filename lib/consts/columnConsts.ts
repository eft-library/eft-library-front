export const COLUMN_KEY = {
  stationType: "STATION_TYPE",
  news: "NEWS_COLUMN",
  terms: "TERMS_COLUMN",
  privacyPolicy: "PRIVACY_POLICY_COLUMN",
} as const;

export const footerData = {
  text: [
    "📌 Maps © 2024-2025 TKL | CC BY-NC-ND 4.0",
    "🔄 The automated data API is sourced from tarkov.dev, with additional content by TKL.",
    "🎮 Escape from Tarkov content © Battlestate Games. All rights reserved.",
    "📧 tarkovlibrary@gmail.com",
  ],
  info: {
    privacyLink: "/privacy-policy",
    termsLink: "/terms",
  },
  manager: {
    gitLink: "https://github.com/eft-library",
    chzzkLink: "https://chzzk.naver.com/9f015658fd7b36976be2e849ac14f197",
    discordLink: "https://discord.gg/U39nmwB4ba",
  },
};

export const detailThrowable = ["RGN", "RGO"];

export const glassesClassColumn = {
  en: ["Photo", "Name", "Armor Class", "Durability", "Flash Protection"],
  ko: ["사진", "이름", "보호 등급", "내구성", "실명 보호"],
  ja: ["写真", "名前", "防御等級", "耐久値", "閃光保護"],
};

export const glassesNoClassColumn = {
  en: ["Photo", "Name", "Flash Protection"],
  ko: ["사진", "이름", "실명 보호"],
  ja: ["写真", "名前", "閃光保護"],
};

export const keyTableColumn = {
  en: ["Photo", "Name", "Map Used", "Usage Count"],
  ko: ["사진", "이름", "사용 맵", "사용 횟수"],
  ja: ["写真", "名前", "使用マップ", "使用回数"],
};

export const provisionsTableColumn = {
  en: ["Photo", "Name", "Energy", "Hydration", "Effect"],
  ko: ["사진", "이름", "에너지", "수분", "효과"],
  ja: ["写真", "名前", "エネルギー", "水分", "効果"],
};

export const ammoTableColumn = {
  en: ["Photo", "Name", "Damage", "Penetration", "Armor Class Effectiveness"],
  ko: ["사진", "이름", "데미지", "관통력", "방탄 등급별 총알 효율성"],
  ja: ["写真", "名前", "ダメージ", "貫通力", "アーマークラス別弾丸効率"],
};

export const armorVestTableColumn = {
  en: ["Photo", "Name", "Durability", "Armor Class"],
  ko: ["사진", "이름", "내구성", "보호 등급"],
  ja: ["写真", "名前", "耐久値", "防御等級"],
};

export const backpackTableColumn = {
  en: ["Photo", "Name", "Slots", "Grid Size"],
  ko: ["사진", "이름", "슬롯", "그리드 크기"],
  ja: ["写真", "名前", "スロット", "グリッドサイズ"],
};

export const bossTableColumn = {
  en: [
    "Photo",
    "Name",
    "Affiliation",
    "Location",
    "Spawn Rate",
    "HP",
    "Followers",
  ],
  ko: ["사진", "이름", "소속", "위치", "스폰 확률", "피통", "추종자"],
  ja: ["写真", "名前", "所属", "位置", "出現率", "体力", "フォロワー"],
};

export const containerTableColumn = {
  en: ["Photo", "Name", "Slots", "Inner Size"],
  ko: ["사진", "이름", "슬롯", "내부 크기"],
  ja: ["写真", "名前", "スロット", "内部サイズ"],
};

export const faceCoverClassTableColumn = {
  en: ["Photo", "Name", "Armor Class", "Durability"],
  ko: ["사진", "이름", "보호 등급", "내구성"],
  ja: ["写真", "名前", "防御等級", "耐久値"],
};

export const headwearClassTableColumn = {
  en: ["Photo", "Name", "Armor Class", "Durability"],
  ko: ["사진", "이름", "보호 등급", "내구성"],
  ja: ["写真", "名前", "防御等級", "耐久値"],
};

export const rigClassTableColumn = {
  en: ["Photo", "Name", "Durability", "Armor Class"],
  ko: ["사진", "이름", "내구성", "보호 등급"],
  ja: ["写真", "名前", "耐久値", "防御等級"],
};

export const drugTableColumn = {
  en: ["Photo", "Name", "Buff", "Debuff", "Usage Count", "Duration"],
  ko: ["사진", "이름", "버프", "디버프", "사용 횟수", "사용 시간"],
  ja: ["写真", "名前", "バフ", "デバフ", "使用回数", "使用時間"],
};

export const stimulantTableColumn = {
  en: ["Photo", "Name", "Buff/Debuff"],
  ko: ["사진", "이름", "버프/디버프"],
  ja: ["写真", "名前", "バフ/デバフ"],
};

export const medicalItemTableColumn = {
  en: ["Photo", "Name", "Buff", "Usage Count", "Duration"],
  ko: ["사진", "이름", "버프", "사용 횟수", "사용 시간"],
  ja: ["写真", "名前", "バフ", "使用回数", "使用時間"],
};

export const medikitTableColumn = {
  en: ["Photo", "Name", "Heal Amount", "Buff", "Duration"],
  ko: ["사진", "이름", "회복량", "버프", "사용 시간"],
  ja: ["写真", "名前", "回復量", "バフ", "使用時間"],
};

export const imageNameTableColumn = {
  en: ["Photo", "Name"],
  ko: ["사진", "이름"],
  ja: ["写真", "名前"],
};

export const relatedQuestTableColumn = {
  en: ["Photo", "Name", "Quantity", "In Raid"],
  ko: ["사진", "이름", "수량", "인레이드"],
  ja: ["写真", "名前", "数量", "レイド中"],
};

export const motBossTableColumn = {
  en: [
    "Photo",
    "Name",
    "Affiliation",
    "Location",
    "Spawn Rate",
    "HP",
    "Followers",
  ],
  ko: ["사진", "이름", "소속", "위치", "스폰확률", "피통", "추종자"],
  ja: ["写真", "名前", "所属", "位置", "出現率", "体力", "フォロワー"],
};

export const extractionTableColumn = {
  en: [
    "Photo",
    "Name",
    "Affiliation",
    "Always Open",
    "One-time Use",
    "Requirements",
    "Tip",
  ],
  ko: ["사진", "이름", "소속", "항상 열림", "일회용", "필요 조건", "Tip"],
  ja: ["写真", "名前", "所属", "常時開放", "使い捨て", "必要条件", "ヒント"],
};

export const rankCategoryList = [
  { value: "Keys", en: "Key", ja: "鍵類", ko: "열쇠" },
  { value: "Meds", en: "Medical", ja: "医療品", ko: "의료품" },
  { value: "Weapon", en: "Weapon", ja: "ガンズ", ko: "무기" },
  { value: "Ammo", en: "Ammo", ja: "弾薬", ko: "탄약" },
  { value: "Provisions", en: "Provisions", ja: "食料品", ko: "식량" },
  {
    value: "Container",
    en: "Container",
    ja: "コンテナ",
    ko: "컨테이너",
  },
  { value: "Wearables", en: "Wearables", ja: "装備", ko: "장비" },
  { value: "Loot", en: "Loot", ja: "ルート", ko: "전리품" },
  { value: "Mods", en: "Mods", ja: "改造パーツ", ko: "부품" },
];
