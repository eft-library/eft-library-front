export const ALL_ITEM = {
  // Extractions
  EXTRACTIONS: 'EXTRACTIONS',
  PMC_EXTRACTION_VALUE: 'PMC_EXTRACTION',
  SCAV_EXTRACTION_VALUE: 'SCAV_EXTRACTION',
  SHARED_EXTRACTION_VALUE: 'SHARED_EXTRACTION',

  // Spawns
  SPAWNS: 'SPAWNS',
  PMC_SPAWN_VALUE: 'PMC_SPAWN',

  // Spawns-AI
  SPAWNS_AI: 'SPAWNS_AI',
  SCAV_SPAWN_VALUE: 'SCAV_SPAWN',
  SNIPER_SCAV_SPAWN_VALUE: 'SNIPER_SCAV_SPAWN',
  BOSS_SPAWN_VALUE: 'BOSS_SPAWN',
  CULTIST_SPAWN_VALUE: 'CULTIST_SPAWN',

  // Miscellaneous
  MISCELLANEOUS: 'MISCELLANEOUS',
  LEVER_VALUE: 'LEVER',
  LOCKED_VALUE: 'LOCKED',
  STATIONARY_WEAPON_VALUE: 'STATIONARY_WEAPON',
  QUEST_RELATED_VALUE: 'QUEST_RELATED',

  // Loot
  LOOT: 'LOOT',
  KEY_SPAWN_VALUE: 'KEY_SPAWN',

  // Loot-Containers
  LOOT_CONTAINERS: 'LOOT_CONTAINERS',
  AMMO_BOX_VALUE: 'AMMO_BOX',
  MED_BAG_VALUE: 'MED_BAG',
  BARREL_GROUND_CACHE_VALUE: 'BARREL_GROUND_CACHE',
  MED_CASE_VALUE: 'MED_CASE',
  SAFE_VALUE: 'SAFE',
  CASH_REGISTER_VALUE: 'CASH_REGISTER',
  SPORTS_BAG_VALUE: 'SPORTS_BAG',
  COMPUTER_VALUE: 'COMPUTER',
  SUPPLY_CRATE_VALUE: 'SUPPLY_CRATE',
  DEAD_SCAV_VALUE: 'DEAD_SCAV',
  TOOL_BOX_VALUE: 'TOOL_BOX',
};

// Extractions
export const EXTRACTIONS = {
  en: ALL_ITEM.EXTRACTIONS,
  kr: '탈출구',
  value: 'EXTRACTIONS',
  child: [
    {
      value: ALL_ITEM.PMC_EXTRACTION_VALUE,
      en: 'PMC-Extraction',
      kr: 'PMC 탈출구',
    },
    {
      value: ALL_ITEM.SCAV_EXTRACTION_VALUE,
      en: 'SCAV-Extraction',
      kr: 'SCAV 탈출구',
    },
    {
      value: ALL_ITEM.SHARED_EXTRACTION_VALUE,
      en: 'Shared-Extraction',
      kr: '공유 탈출구',
    },
  ],
};

// Spawns
export const SPAWNS = {
  en: 'Spawns',
  kr: '스폰위치',
  value: ALL_ITEM.SPAWNS,
  child: [{ value: ALL_ITEM.PMC_SPAWN_VALUE, en: 'Pmc-Spawn', kr: 'PMC 스폰' }],
};

// Spawns-AI
export const SPAWNS_AI = {
  en: 'Spawns-AI',
  kr: 'AI스폰',
  value: ALL_ITEM.SPAWNS_AI,
  child: [
    {
      value: ALL_ITEM.SCAV_SPAWN_VALUE,
      en: 'SCAV-Spawn',
      kr: 'SCAV 스폰',
    },
    {
      value: ALL_ITEM.SNIPER_SCAV_SPAWN_VALUE,
      en: 'Sniper-Scav-Spawn',
      kr: '저격 SCAV 스폰',
    },
    {
      value: ALL_ITEM.BOSS_SPAWN_VALUE,
      en: 'Boss-Spawn',
      kr: 'Boss 스폰',
    },
    {
      value: ALL_ITEM.CULTIST_SPAWN_VALUE,
      en: 'Cultist-Spawn',
      kr: 'Cultist 스폰',
    },
  ],
};

// Miscellaneous
export const MISCELLANEOUS = {
  en: 'Miscellaneous',
  kr: '여러가지',
  value: ALL_ITEM.MISCELLANEOUS,
  child: [
    { value: ALL_ITEM.LEVER_VALUE, en: 'Lever', kr: '레버' },
    { value: ALL_ITEM.LOCKED_VALUE, en: 'Locked', kr: '잠긴 문' },
    {
      value: ALL_ITEM.STATIONARY_WEAPON_VALUE,
      en: 'Stationary-Weapon',
      kr: '고정형 무기',
    },
    {
      value: ALL_ITEM.QUEST_RELATED_VALUE,
      en: 'Quest-Related',
      kr: '퀘스트 관련',
    },
  ],
};

// Loot
export const LOOT = {
  en: 'Loot',
  kr: '루트',
  value: ALL_ITEM.LOOT,
  child: [
    { value: ALL_ITEM.KEY_SPAWN_VALUE, en: 'Key-Spawn', kr: '열쇠 생성 지역' },
  ],
};

// Loot-Containers
export const LOOT_CONTAINERS = {
  en: 'Loot-Containers',
  kr: '전리품 컨테이너',
  value: ALL_ITEM.LOOT_CONTAINERS,
  child: [
    { value: ALL_ITEM.AMMO_BOX_VALUE, en: 'ammoBox', kr: '총기 상자' },
    { value: ALL_ITEM.MED_BAG_VALUE, en: 'medBag', kr: '치료 가방' },
    {
      value: ALL_ITEM.BARREL_GROUND_CACHE_VALUE,
      en: 'barrelGroundCache',
      kr: '땅에 묻힌 통',
    },
    { value: ALL_ITEM.MED_CASE_VALUE, en: 'medCase', kr: '치료 케이스' },
    { value: ALL_ITEM.SAFE_VALUE, en: 'safe', kr: '안전 구역' },
    {
      value: ALL_ITEM.CASH_REGISTER_VALUE,
      en: 'cashRegister',
      kr: '금전 등록기',
    },
    { value: ALL_ITEM.SPORTS_BAG_VALUE, en: 'sportsBag', kr: '스포츠 가방' },
    { value: ALL_ITEM.COMPUTER_VALUE, en: 'computer', kr: '컴퓨터' },
    {
      value: ALL_ITEM.SUPPLY_CRATE_VALUE,
      en: 'supplyCrate',
      kr: '보급품 상자',
    },
    { value: ALL_ITEM.DEAD_SCAV_VALUE, en: 'deadScav', kr: 'SCAV 시체' },
    { value: ALL_ITEM.TOOL_BOX_VALUE, en: 'toolBox', kr: '공구 상자' },
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

// child value 리스트
export const CHILD_VALUE_LIST = ITEM_LIST.map((item) =>
  item.child.map((childItem) => childItem.value),
).flat();

// root, child value 리스트
export const ALL_VALUE_LIST = Object.values(ALL_ITEM);
