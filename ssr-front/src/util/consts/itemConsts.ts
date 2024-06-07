// Extractions
export const EXTRACTIONS = {
  en: "EXTRACTIONS",
  kr: "탈출구",
  value: "EXTRACTIONS",
  child: [
    {
      value: "PMC_EXTRACTION_VALUE",
      en: "PMC-Extraction",
      kr: "PMC 탈출구",
    },
    {
      value: "SCAV_EXTRACTION_VALUE",
      en: "SCAV-Extraction",
      kr: "SCAV 탈출구",
    },
    {
      value: "SHARED_EXTRACTION_VALUE",
      en: "Shared-Extraction",
      kr: "공유 탈출구",
    },
  ],
};

// Spawns
export const SPAWNS = {
  en: "Spawns",
  kr: "스폰위치",
  value: "SPAWNS",
  child: [{ value: "PMC_SPAWN_VALUE", en: "Pmc-Spawn", kr: "PMC 스폰" }],
};

// Spawns-AI
export const SPAWNS_AI = {
  en: "Spawns-AI",
  kr: "AI스폰",
  value: "SPAWNS_AI",
  child: [
    {
      value: "SCAV_SPAWN_VALUE",
      en: "SCAV-Spawn",
      kr: "SCAV 스폰",
    },
    {
      value: "SNIPER_SCAV_SPAWN_VALUE",
      en: "Sniper-Scav-Spawn",
      kr: "저격 SCAV 스폰",
    },
    {
      value: "BOSS_SPAWN_VALUE",
      en: "Boss-Spawn",
      kr: "Boss 스폰",
    },
    {
      value: "CULTIST_SPAWN_VALUE",
      en: "Cultist-Spawn",
      kr: "Cultist 스폰",
    },
  ],
};

// Miscellaneous
export const MISCELLANEOUS = {
  en: "Miscellaneous",
  kr: "여러가지",
  value: "MISCELLANEOUS",
  child: [
    { value: "LEVER_VALUE", en: "Lever", kr: "레버" },
    { value: "LOCKED_VALUE", en: "Locked", kr: "잠긴 문" },
    {
      value: "STATIONARY_WEAPON_VALUE",
      en: "Stationary-Weapon",
      kr: "고정형 무기",
    },
    {
      value: "QUEST_RELATED_VALUE",
      en: "Quest-Related",
      kr: "퀘스트 관련",
    },
  ],
};

// Loot
export const LOOT = {
  en: "Loot",
  kr: "루트",
  value: "LOOT",
  child: [{ value: "KEY_SPAWN_VALUE", en: "Key-Spawn", kr: "열쇠 생성 지역" }],
};

// Loot-Containers
export const LOOT_CONTAINERS = {
  en: "Loot-Containers",
  kr: "전리품 컨테이너",
  value: "LOOT_CONTAINERS",
  child: [
    { value: "AMMO_BOX_VALUE", en: "ammoBox", kr: "총기 상자" },
    { value: "MED_BAG_VALUE", en: "medBag", kr: "치료 가방" },
    {
      value: "BARREL_GROUND_CACHE_VALUE",
      en: "barrelGroundCache",
      kr: "땅에 묻힌 통",
    },
    { value: "MED_CASE_VALUE", en: "medCase", kr: "치료 케이스" },
    { value: "SAFE_VALUE", en: "safe", kr: "안전 구역" },
    {
      value: "CASH_REGISTER_VALUE",
      en: "cashRegister",
      kr: "금전 등록기",
    },
    { value: "SPORTS_BAG_VALUE", en: "sportsBag", kr: "스포츠 가방" },
    { value: "COMPUTER_VALUE", en: "computer", kr: "컴퓨터" },
    {
      value: "SUPPLY_CRATE_VALUE",
      en: "supplyCrate",
      kr: "보급품 상자",
    },
    { value: "DEAD_SCAV_VALUE", en: "deadScav", kr: "SCAV 시체" },
    { value: "TOOL_BOX_VALUE", en: "toolBox", kr: "공구 상자" },
  ],
};

// Wrapped Item
export const ITEM_LIST = [
  EXTRACTIONS,
  SPAWNS,
  SPAWNS_AI,
  MISCELLANEOUS,
  LOOT,
  LOOT_CONTAINERS,
];
