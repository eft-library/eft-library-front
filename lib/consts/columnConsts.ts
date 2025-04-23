export const COLUMN_KEY = {
  stationType: "STATION_TYPE",
  map: "MAP_COLUMN",
  mapOfTarkov: "MAP_OF_TARKOV_COLUMN",
  news: "NEWS_COLUMN",
} as const;

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

export const detailThrowable = ["RGN", "RGO"];

export const glassesClassColumn = {
  value_en: ["사진", "이름", "보호 등급", "내구성", "실명 보호"],
  value_kr: ["사진", "이름", "보호 등급", "내구성", "실명 보호"],
};

export const glassesNoClassColumn = {
  value_en: ["사진", "이름", "실명 보호"],
  value_kr: ["사진", "이름", "실명 보호"],
};

export const keyTableColumn = {
  value_en: ["사진", "이름", "사용 맵", "사용 횟수"],
  value_kr: ["사진", "이름", "사용 맵", "사용 횟수"],
};

export const lootTableColumn = {
  value_en: ["사진", "이름"],
  value_kr: ["사진", "이름"],
};

export const provisionsTableColumn = {
  value_en: ["사진", "이름", "에너지", "수분", "효과"],
  value_kr: ["사진", "이름", "에너지", "수분", "효과"],
};

export const ammoTableColumn = {
  value_en: [
    "사진",
    "이름",
    "데미지",
    "관통력",
    "방어구 피해",
    "정확성",
    "반동",
    "가벼운 출혈",
    "깊은 출혈",
    "방탄 등급별 총알 효율성",
  ],
  value_kr: [
    "사진",
    "이름",
    "데미지",
    "관통력",
    "방어구 피해",
    "정확성",
    "반동",
    "가벼운 출혈",
    "깊은 출혈",
    "방탄 등급별 총알 효율성",
  ],
};

export const armBandTableColumn = {
  value_en: ["사진", "이름"],
  value_kr: ["사진", "이름"],
};

export const armorVestTableColumn = {
  value_en: ["사진", "이름", "내구성", "보호 등급", "보호 부위", "무게"],
  value_kr: ["사진", "이름", "내구성", "보호 등급", "보호 부위", "무게"],
};

export const backpackTableColumn = {
  value_en: ["사진", "이름", "슬롯", "그리드 크기", "무게"],
  value_kr: ["사진", "이름", "슬롯", "그리드 크기", "무게"],
};

export const bossTableColumn = {
  value_en: ["사진", "이름", "소속", "위치", "스폰 확률", "피통", "추종자"],
  value_kr: ["사진", "이름", "소속", "위치", "스폰 확률", "피통", "추종자"],
};

export const containerTableColumn = {
  value_en: ["사진", "이름", "슬롯", "내부 크기"],
  value_kr: ["사진", "이름", "슬롯", "내부 크기"],
};

export const faceCoverClassTableColumn = {
  value_en: [
    "사진",
    "이름",
    "보호 등급",
    "보호 부위",
    "내구성",
    "도탄 기회",
    "무게",
  ],
  value_kr: [
    "사진",
    "이름",
    "보호 등급",
    "보호 부위",
    "내구성",
    "도탄 기회",
    "무게",
  ],
};

export const faceCoverNoClassTableColumn = {
  value_en: ["사진", "이름"],
  value_kr: ["사진", "이름"],
};

export const headsetTableColumn = {
  value_en: ["사진", "이름"],
  value_kr: ["사진", "이름"],
};

export const headwearClassTableColumn = {
  value_en: [
    "사진",
    "이름",
    "보호 등급",
    "보호 부위",
    "내구성",
    "도탄 기회",
    "무게",
  ],
  value_kr: [
    "사진",
    "이름",
    "보호 등급",
    "보호 부위",
    "내구성",
    "도탄 기회",
    "무게",
  ],
};

export const headwearNoClassTableColumn = {
  value_en: ["사진", "이름"],
  value_kr: ["사진", "이름"],
};

export const rigClassTableColumn = {
  value_en: [
    "사진",
    "이름",
    "내구성",
    "슬롯",
    "보호 등급",
    "보호 부위",
    "무게",
  ],
  value_kr: [
    "사진",
    "이름",
    "내구성",
    "슬롯",
    "보호 등급",
    "보호 부위",
    "무게",
  ],
};

export const rigNoClassTableColumn = {
  value_en: ["사진", "이름", "슬롯", "무게"],
  value_kr: ["사진", "이름", "무게"],
};

export const drugTableColumn = {
  value_en: ["사진", "이름", "버프", "디버프", "사용 횟수", "사용 시간"],
  value_kr: ["사진", "이름", "버프", "디버프", "사용 횟수", "사용 시간"],
};

export const stimulantTableColumn = {
  value_en: ["사진", "이름", "버프", "디버프"],
  value_kr: ["사진", "이름", "버프", "디버프"],
};

export const medicalItemTableColumn = {
  value_en: ["사진", "이름", "버프", "사용 횟수", "사용 시간"],
  value_kr: ["사진", "이름", "버프", "사용 횟수", "사용 시간"],
};

export const medikitTableColumn = {
  value_en: ["사진", "이름", "회복량", "버프", "사용 시간"],
  value_kr: ["사진", "이름", "회복량", "버프", "사용 시간"],
};

export const gunTableColumn = {
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
};

export const knifeTableColumn = {
  value_en: ["사진", "이름", "기본 데미지", "찌르기", "기본 공격 범위"],
  value_kr: ["사진", "이름", "기본 데미지", "찌르기", "기본 공격 범위"],
};

export const stationaryTableColumn = {
  value_en: ["사진", "이름", "탄약통", "발사모드", "발사속도"],
  value_kr: ["사진", "이름", "탄약통", "발사모드", "발사속도"],
};

export const throwableTableColumn = {
  value_en: ["사진", "이름", "폭발 지연", "폭발 거리", "파편 반경"],
  value_kr: ["사진", "이름", "폭발 지연", "폭발 거리", "파편 반경"],
};

export const relatedQuestTableColumn = {
  value_en: ["사진", "이름", "수량", "인레이드", "노트"],
  value_kr: ["사진", "이름", "수량", "인레이드", "노트"],
};

export const follwerTableColumn = {
  value_en: ["사진", "이름"],
  value_kr: ["사진", "이름"],
};

export const motBossTableColumn = {
  value_en: ["사진", "이름", "소속", "위치", "스폰확률", "피통", "추종자"],
  value_kr: ["사진", "이름", "소속", "위치", "스폰확률", "피통", "추종자"],
};

export const extractionTableColumn = {
  value_en: ["사진", "이름", "소속", "항상 열림", "일회용", "필요 조건", "Tip"],
  value_kr: ["사진", "이름", "소속", "항상 열림", "일회용", "필요 조건", "Tip"],
};
