export const COLUMN_KEY = {
  ammo: "AMMO_COLUMN",
  arm_band: "ARM_BAND_COLUMN",
  armorVest: "ARMOR_VEST_COLUMN",
  backpack: "BACKPACK_COLUMN",
  boss: "BOSS_COLUMN",
  container: "CONTAINER_COLUMN",
  headWearClass: "HEAD_WEAR_CLASS_COLUMN",
  headwearNoClass: "HEAD_WEAR_NO_CLASS_COLUMN",
  faceCoverClass: "FACE_COVER_CLASS_COLUMN",
  faceCoverNoClass: "FACE_COVER_NO_CLASS_COLUMN",
  rigClass: "RIG_CLASS_COLUMN",
  rigNoClass: "RIG_NO_CLASS_COLUMN",
  glassesClass: "GLASSES_CLASS_COLUMN",
  glassesNoClass: "GLASSES_NO_CLASS_COLUMN",
  headset: "HEAD_PHONE_COLUMN",
  stationType: "STATION_TYPE",
  key: "KEY_COLUMN",
  loot: "LOOT_COLUMN",
  map: "MAP_COLUMN",
  mapOfTarkov: "MAP_OF_TARKOV_COLUMN",
  medical: "MEDICAL_COLUMN",
  provisions: "PROVISIONS_COLUMN",
} as const;

export const ammoColumn = [
  { color: "#ffffff", value: "ALL", desc_en: "All", desc_kr: "전체" },
  {
    color: "#90bdff",
    value: "5.45x39mm",
    desc_en: "5.45x39mm",
    desc_kr: "5.45x39mm",
  },
  { color: "#90bdff", value: "9x39mm", desc_en: "9x39mm", desc_kr: "9x39mm" },
  {
    color: "#90bdff",
    value: "6.8x51mm",
    desc_en: "6.8x51mm",
    desc_kr: "6.8x51mm",
  },
  {
    color: "#90bdff",
    value: "5.56x45mm NATO",
    desc_en: "5.56x45mm NATO",
    desc_kr: "5.56x45mm NATO",
  },
  {
    color: "#90bdff",
    value: "7.62x51mm NATO",
    desc_en: "7.62x51mm NATO",
    desc_kr: "7.62x51mm NATO",
  },
  {
    color: "#90bdff",
    value: "7.62x54mmR",
    desc_en: "7.62x54mmR",
    desc_kr: "7.62x54mmR",
  },
  {
    color: "#90bdff",
    value: ".366 TKM",
    desc_en: ".366 TKM",
    desc_kr: ".366 TKM",
  },
  {
    color: "#90bdff",
    value: "7.62x39mm",
    desc_en: "7.62x39mm",
    desc_kr: "7.62x39mm",
  },
  {
    color: "#90bdff",
    value: "12.7x55mm STs-130",
    desc_en: "12.7x55mm STs-130",
    desc_kr: "12.7x55mm STs-130",
  },
  {
    color: "#90bdff",
    value: ".300 Blackout",
    desc_en: ".300 Blackout",
    desc_kr: ".300 Blackout",
  },
  {
    color: "#90bdff",
    value: ".338 Lapua Magnum",
    desc_en: ".338 Lapua Magnum",
    desc_kr: ".338 Lapua Magnum",
  },
  {
    color: "#61ffe3",
    value: "4.6x30mm HK",
    desc_en: "4.6x30mm HK",
    desc_kr: "4.6x30mm HK",
  },
  {
    color: "#61ffe3",
    value: "5.7x28mm FN",
    desc_en: "5.7x28mm FN",
    desc_kr: "5.7x28mm FN",
  },
  { color: "#ff4e4e", value: "12/70", desc_en: "12/70", desc_kr: "12/70" },
  { color: "#ff4e4e", value: "20/70", desc_en: "20/70", desc_kr: "20/70" },
  {
    color: "#ff4e4e",
    value: "23x75mm",
    desc_en: "23x75mm",
    desc_kr: "23x75mm",
  },
  {
    color: "#ffb169",
    value: "9x18mm Makarov",
    desc_en: "9x18mm Makarov",
    desc_kr: "9x18mm Makarov",
  },
  {
    color: "#ffb169",
    value: "9x21mm Gyurza",
    desc_en: "9x21mm Gyurza",
    desc_kr: "9x21mm Gyurza",
  },
  {
    color: "#ffb169",
    value: "9x19mm Parabellum",
    desc_en: "9x19mm Parabellum",
    desc_kr: "9x19mm Parabellum",
  },
  {
    color: "#ffb169",
    value: "7.62x25mm Tokarev",
    desc_en: "7.62x25mm Tokarev",
    desc_kr: "7.62x25mm Tokarev",
  },
  {
    color: "#ffb169",
    value: ".45 ACP",
    desc_en: ".45 ACP",
    desc_kr: ".45 ACP",
  },
  {
    color: "#ffb169",
    value: ".357 Magnum",
    desc_en: ".357 Magnum",
    desc_kr: ".357 Magnum",
  },
  {
    color: "#ffb169",
    value: ".50 Action Express",
    desc_en: ".50 Action Express",
    desc_kr: ".50 Action Express",
  },
  {
    color: "#fff500",
    value: "40x46mm",
    desc_en: "40x46mm",
    desc_kr: "40x46mm",
  },
  { color: "#fff500", value: "other", desc_en: "other", desc_kr: "other" },
];
export const bossColumn = [
  { id: "RESHALA", link: "/boss/RESHALA", order: 1, name_kr: "르샬라" },
  { id: "KOLLONTAY", link: "/boss/KOLLONTAY", order: 2, name_kr: "콜론테이" },
  { id: "KILLA", link: "/boss/KILLA", order: 3, name_kr: "킬라" },
  { id: "KABAN", link: "/boss/KABAN", order: 4, name_kr: "카반" },
  { id: "TAGILLA", link: "/boss/TAGILLA", order: 5, name_kr: "타길라" },
  { id: "ZRYACHIY", link: "/boss/ZRYACHIY", order: 6, name_kr: "지랴키" },
  { id: "SHTURMAN", link: "/boss/SHTURMAN", order: 7, name_kr: "슈트르만" },
  { id: "SANITAR", link: "/boss/SANITAR", order: 8, name_kr: "세니타" },
  { id: "GLUKHAR", link: "/boss/GLUKHAR", order: 9, name_kr: "글루하" },
  { id: "BIG_PIPE", link: "/boss/BIG_PIPE", order: 10, name_kr: "빅파이프" },
  { id: "BIRDEYE", link: "/boss/BIRDEYE", order: 11, name_kr: "버드아이" },
  { id: "KNIGHT", link: "/boss/KNIGHT", order: 12, name_kr: "나이트" },
  { id: "CULTISTS", link: "/boss/CULTISTS", order: 13, name_kr: "컬티스트" },
  { id: "PARTISAN", link: "/boss/PARTISAN", order: 14, name_kr: "파르티잔" },
];
export const footerColumn = {
  icon: [
    {
      link: "https://chzzk.naver.com/9f015658fd7b36976be2e849ac14f197",
      name: "HJ",
    },
    { link: "https://github.com/eft-library", name: "SY" },
    { link: "https://discord.gg/U39nmwB4ba", name: "JY" },
  ],
  text: [
    { value: "문의: tarkovlibrary@gmail.com" },
    { value: "Handcrafted Tarkov maps are Copyright 2024. TKL." },
    {
      value:
        "Game content and materials are trademarks and copyrights of Battlestate Games and its licensors. All rights reserved.",
    },
  ],
};

export const keyColumn = [
  { value: "ALL", desc_en: "All", desc_kr: "전체" },
  { value: "CUSTOMS", desc_en: "Customs", desc_kr: "세관" },
  { value: "GROUND_ZERO", desc_en: "Ground Zero", desc_kr: "그라운드 제로" },
  { value: "INTERCHANGE", desc_en: "Interchange", desc_kr: "인터체인지" },
  {
    value: "STREET_OF_TARKOV",
    desc_en: "Street of Tarkov",
    desc_kr: "타르코프 시내",
  },
  { value: "FACTORY", desc_en: "Factory", desc_kr: "팩토리" },
  { value: "LIGHT_HOUSE", desc_en: "Light House", desc_kr: "등대" },
  { value: "WOODS", desc_en: "Woods", desc_kr: "삼림" },
  { value: "SHORELINE", desc_en: "Shoreline", desc_kr: "해안선" },
  { value: "RESERVE", desc_en: "Reserve", desc_kr: "리저브" },
  { value: "THE_LAB", desc_en: "The Lab", desc_kr: "연구소" },
  { value: "N/A", desc_en: "N/A", desc_kr: "N/A" },
];

export const lootColumn = [
  { value: "ALL", desc_en: "All", desc_kr: "전체" },
  { value: "Battery", desc_en: "Battery", desc_kr: "에너지 용품" },
  { value: "Other", desc_en: "Other", desc_kr: "기타" },
  { value: "Tool", desc_en: "Tool", desc_kr: "도구" },
  { value: "Lubricant", desc_en: "Lubricant", desc_kr: "가연성 물질" },
  { value: "Electronics", desc_en: "Electronics", desc_kr: "전자 제품" },
  {
    value: "Medical supplies",
    desc_en: "Medical supplies",
    desc_kr: "의료용품",
  },
  { value: "Jewelry", desc_en: "Jewelry", desc_kr: "귀중품" },
  {
    value: "Household goods",
    desc_en: "Household goods",
    desc_kr: "가정용품",
  },
  {
    value: "Building material",
    desc_en: "Building material",
    desc_kr: "건축 자재",
  },
  { value: "Info", desc_en: "Info", desc_kr: "정보 아이템" },
  {
    value: "Special equipment",
    desc_en: "Special equipment",
    desc_kr: "특수 장비",
  },
  { value: "Money", desc_en: "Money", desc_kr: "화폐" },
  { value: "Quest items", desc_en: "Quest items", desc_kr: "퀘스트 아이템" },
];

export const medicalColumn = [
  { value: "ALL", desc_en: "All", desc_kr: "전체" },
  { value: "Drug", desc_en: "진통제", desc_kr: "진통제" },
  { value: "Stimulant", desc_en: "주사기", desc_kr: "주사기" },
  { value: "Medical item", desc_en: "부상 치료", desc_kr: "부상 치료" },
  { value: "Medikit", desc_en: "회복", desc_kr: "회복" },
];

export const detailThrowable = ["RGN", "RGO"];

export const gunColumnDefinition = {
  value_en: [
    "Assault carbine",
    "Assault rifle",
    "Machinegun",
    "SMG",
    "Sniper rifle",
    "Marksman rifle",
    "Shotgun",
    "Grenade launcher",
    "Handgun",
  ],
  type: "WEAPON",
  id: "GUN_CATEGORY_INFO",
  value_kr: [
    "Assault carbine",
    "Assault rifle",
    "Machinegun",
    "SMG",
    "Sniper rifle",
    "Marksman rifle",
    "Shotgun",
    "Grenade launcher",
    "Handgun",
  ],
};
