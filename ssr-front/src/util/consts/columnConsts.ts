// export const COLUMN_KEY = {
//   boss: "BOSS_COLUMN",
//   map: "MAP_COLUMN",
//   mapOfTarkov: "MAP_OF_TARKOV_COLUMN",
//   extraction: "EXTRACTION_COLUMN",
//   weaponType: "WEAPON_TYPE",
//   knife: "KNIFE_COLUMN",
//   special: "SPECIAL_COLUMN",
//   stationary: "STATIONARY_COLUMN",
//   throwable: "THROWABLE_COLUMN",
//   weapon: "WEAOPN_COLUMN",
//   gun: "GUN_CATEGORY_INFO",
//   footer: "FOOTER_COLUMN",
//   headset: "HEAD_PHONE_COLUMN",
//   headwear: "HEAD_WEAR_COLUMN",
//   armorVest: "ARMOR_VEST_COLUMN",
//   rig: "RIG_COLUMN",
// } as const;

// export type AllColumnKeys = keyof typeof COLUMN_KEY;

export const SPECIAL_COLUMN = {
  id: "SPECIAL_COLUMN",
  value_kr: ["사진", "이름"],
  type: "WEAPON",
  value_en: ["사진", "이름"],
};

export type SpecialColumnKeys = keyof typeof SPECIAL_COLUMN;

export const KNIFE_COLUMN = {
  id: "KNIFE_COLUMN",
  value_kr: ["사진", "이름", "기본 데미지", "찌르기 데미지", "기본 공격 범위"],
  type: "WEAPON",
  value_en: ["사진", "이름", "기본 데미지", "찌르기 데미지", "기본 공격 범위"],
};

export type KnifeColumnKeys = keyof typeof KNIFE_COLUMN;

export const STATIONARY_COLUMN = {
  id: "STATIONARY_COLUMN",
  value_kr: ["사진", "이름", "탄약통", "발사모드", "발사 속도"],
  type: "WEAPON",
  value_en: ["사진", "이름", "탄약통", "발사모드", "발사 속도"],
};

export type StationaryColumnKeys = keyof typeof STATIONARY_COLUMN;

export const GUN_CATEGORY_INFO = {
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
  type: "WEAPON",
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
};

export type GunCategoryInfoKeys = keyof typeof GUN_CATEGORY_INFO;

export const THROWABLE_COLUMN = {
  id: "THROWABLE_COLUMN",
  value_kr: ["사진", "이름", "폭발 지연", "폭발 거리", "파편 반경"],
  type: "WEAPON",
  value_en: ["사진", "이름", "폭발 지연", "폭발 거리", "파편 반경"],
};

export type ThrowableColumnKeys = keyof typeof THROWABLE_COLUMN;

export const WEAPON_TYPE = {
  id: "WEAPON_TYPE",
  json_value: [
    {
      value: "ALL",
      desc_en: "All",
      desc_kr: "전체",
    },
    {
      value: "Assault carbine",
      desc_en: "카빈 소총",
      desc_kr: "카빈 소총",
    },
    {
      value: "Assault rifle",
      desc_en: "돌격 소총",
      desc_kr: "돌격 소총",
    },
    {
      value: "Machinegun",
      desc_en: "경기관총",
      desc_kr: "경기관총",
    },
    {
      value: "SMG",
      desc_en: "기관단총",
      desc_kr: "기관단총",
    },
    {
      value: "Sniper rifle",
      desc_en: "볼트액션 소총",
      desc_kr: "볼트액션 소총",
    },
    {
      value: "Marksman rifle",
      desc_en: "지정사수 소총",
      desc_kr: "지정사수 소총",
    },
    {
      value: "Shotgun",
      desc_en: "산탄총",
      desc_kr: "산탄총",
    },
    {
      value: "Grenade launcher",
      desc_en: "유탄발사기",
      desc_kr: "유탄발사기",
    },
    {
      value: "Handgun",
      desc_en: "권총",
      desc_kr: "권총",
    },
    {
      value: "Stationary weapons",
      desc_en: "거치식 화기",
      desc_kr: "거치식 화기",
    },
    {
      value: "Knife",
      desc_en: "근접 무기",
      desc_kr: "근접 무기",
    },
    {
      value: "Throwable weapon",
      desc_en: "투척 무기",
      desc_kr: "투척 무기",
    },
    {
      value: "Special weapons",
      desc_en: "특수 무기",
      desc_kr: "특수 무기",
    },
  ],
  type: "WEAPON",
};

export type WeaponTypeKeys = keyof typeof WEAPON_TYPE;

export const WEAOPN_COLUMN = {
  id: "WEAOPN_COLUMN",
  value_kr: [
    "사진",
    "이름",
    "기본 탄약",
    "발사모드",
    "발사속도",
    "인체공학",
    "수평반동",
    "수직반동",
  ],
  type: "WEAPON",
  value_en: [
    "사진",
    "이름",
    "기본 탄약",
    "발사모드",
    "발사속도",
    "인체공학",
    "수평반동",
    "수직반동",
  ],
};

export type WeaponColumnKeys = keyof typeof WEAOPN_COLUMN;

export const BOSS_COLUMN = {
  id: "BOSS_COLUMN",
  value_kr: ["사진", "이름", "소속", "위치", "스폰 확률", "피통", "추종자"],
  type: "BOSS",
  value_en: ["사진", "이름", "소속", "위치", "스폰 확률", "피통", "추종자"],
};

export type BossColumn = keyof typeof BOSS_COLUMN;

export const FOOTER_COLUMN = {
  id: "FOOTER_COLUMN",
  json_value: {
    icon: [
      {
        link: "https://chzzk.naver.com",
        name: "HJ",
      },
      {
        link: "https://github.com",
        name: "SY",
      },
      {
        link: "https://youtube.com",
        name: "JY",
      },
    ],
    text: [
      {
        value: "문의: tarkovlibrary@gmail.com",
      },
      {
        value: "Copyright 2024. TKL. All rights reserved.",
      },
      {
        value: "개인정보처리방침 (Privacy Policy)",
      },
    ],
  },
  type: "FOOTER",
};

export type FooterColumnKeys = keyof typeof FOOTER_COLUMN;

export const MAP_COLUMN = {
  id: "MAP_COLUMN",
  json_value: [
    {
      id: "WOODS",
      link: "/map/WOODS",
      order: 7,
      name_kr: "삼림",
    },
    {
      id: "THE_LAB",
      link: "/map/THE_LAB",
      order: 10,
      name_kr: "연구소",
    },
    {
      id: "CUSTOM",
      link: "/map/CUSTOM",
      order: 1,
      name_kr: "세관",
    },
    {
      id: "RESERVE",
      link: "/map/RESERVE",
      order: 9,
      name_kr: "리저브",
    },
    {
      id: "STREET_OF_TARKOV",
      link: "/map/STREET_OF_TARKOV",
      order: 4,
      name_kr: "시내",
    },
    {
      link: "/map/LIGHT_HOUSE",
      order: 6,
      map_id: "LIGHT_HOUSE",
      name_kr: "등대",
    },
    {
      id: "GROUND_ZERO",
      link: "/map/GROUND_ZERO",
      order: 2,
      name_kr: "그라운드 제로",
    },
    {
      id: "INTERCHANGE",
      link: "/map/INTERCHANGE",
      order: 3,
      name_kr: "인터체인지",
    },
    {
      id: "SHORELINE",
      link: "/map/SHORELINE",
      order: 8,
      name_kr: "해안선",
    },
    {
      id: "FACTORY",
      link: "/map/FACTORY",
      order: 5,
      name_kr: "팩토리",
    },
  ],
  type: "MAP",
};

export type MapColumnKeys = keyof typeof MAP_COLUMN;

export const EXTRACTION_COLUMN = {
  id: "EXTRACTION_COLUMN",
  value_kr: ["사진", "이름", "소속", "항상 열림", "일회용", "필요 조건", "Tip"],
  type: "EXTRACTION",
  value_en: ["사진", "이름", "소속", "항상 열림", "일회용", "필요 조건", "Tip"],
};

export type ExtractionColumnKeys = keyof typeof EXTRACTION_COLUMN;

export const HEAD_WEAR_COLUMN = {
  id: "HEAD_WEAR_COLUMN",
  value_kr: [
    "사진",
    "이름",
    "보호 등급",
    "보호 부위",
    "내구성",
    "도탄 기회",
    "무게",
  ],
  type: "HEAD_WEAR",
  value_en: [
    "사진",
    "이름",
    "보호 등급",
    "보호 부위",
    "내구성",
    "도탄 기회",
    "무게",
  ],
};

export type HeadWearColumnKeys = keyof typeof HEAD_WEAR_COLUMN;

export const HEAD_PHONE_COLUMN = {
  id: "HEAD_PHONE_COLUMN",
  value_kr: ["사진", "이름"],
  type: "HEAD_PHONE",
  value_en: ["사진", "이름"],
};

export type HeadPhoneColumnKeys = keyof typeof HEAD_PHONE_COLUMN;

export const MAP_OF_TARKOV_COLUMN = {
  id: "MAP_OF_TARKOV_COLUMN",
  json_value: [
    {
      id: "CUSTOM",
      link: "/map-of-tarkov/CUSTOM",
      order: 1,
      name_kr: "세관",
    },
    {
      id: "GROUND_ZERO",
      link: "/map-of-tarkov/GROUND_ZERO",
      order: 2,
      name_kr: "그라운드 제로",
    },
    {
      id: "INTERCHANGE",
      link: "/map-of-tarkov/INTERCHANGE",
      order: 3,
      name_kr: "인터체인지",
    },
    {
      id: "STREET_OF_TARKOV",
      link: "/map-of-tarkov/STREET_OF_TARKOV",
      order: 4,
      name_kr: "시내",
    },
    {
      id: "FACTORY",
      link: "/map-of-tarkov/FACTORY",
      order: 5,
      name_kr: "팩토리",
    },
    {
      id: "LIGHT_HOUSE",
      link: "/map-of-tarkov/LIGHT_HOUSE",
      order: 6,
      name_kr: "등대",
    },
    {
      id: "WOODS",
      link: "/map-of-tarkov/WOODS",
      order: 7,
      name_kr: "삼림",
    },
    {
      id: "SHORELINE",
      link: "/map-of-tarkov/SHORELINE",
      order: 8,
      name_kr: "해안선",
    },
    {
      id: "RESERVE",
      link: "/map-of-tarkov/RESERVE",
      order: 9,
      name_kr: "리저브",
    },
    {
      id: "THE_LAB",
      link: "/map-of-tarkov/THE_LAB",
      order: 10,
      name_kr: "연구소",
    },
  ],
  type: "MAP_OF_TARKOV",
};

export type MapOfTarkovColumnKeys = keyof typeof MAP_OF_TARKOV_COLUMN;

export const ARMOR_VEST_COLUMN = {
  id: "ARMOR_VEST_COLUMN",
  value_kr: ["사진", "이름", "내구성", "보호 등급", "보호 부위", "무게"],
  type: "ARMOR_VEST",
  value_en: ["사진", "이름", "내구성", "보호 등급", "보호 부위", "무게"],
};

export type ArmorVestColumnKeys = keyof typeof ARMOR_VEST_COLUMN;

export const RIG_COLUMN = {
  id: "RIG_COLUMN",
  value_kr: [
    "사진",
    "이름",
    "내구성",
    "슬롯",
    "보호 등급",
    "보호 부위",
    "무게",
  ],
  type: "RIG",
  value_en: [
    "사진",
    "이름",
    "내구성",
    "슬롯",
    "보호 등급",
    "보호 부위",
    "무게",
  ],
};

export type RigColumnKeys = keyof typeof RIG_COLUMN;
