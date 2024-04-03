// 필터에 사용 될 아이템들

// Extractions
export const EXTRACTIONS = {
  en: 'Extractions',
  kr: '탈출구',
  value: 'EXTRACTIONS',
  child: [
    { value: 'PMC_EXTRACTION', en: 'PMC-Extraction', kr: 'PMC 탈출구' },
    {
      value: 'PMC_EXTRSCAV_EXTRACTIONACTION',
      en: 'SCAV-Extraction',
      kr: 'SCAV 탈출구',
    },
    { value: 'SHARED_EXTRACTION', en: 'Shared-Extraction', kr: '공유 탈출구' },
  ],
};

// Spawns
export const SPAWNS = {
  en: 'Spawns',
  kr: '스폰위치',
  value: 'SPAWNS',
  child: [{ value: 'PMC_SPAWN', en: 'Pmc-Spawn', kr: 'PMC 스폰 지역' }],
};

// Spawns-AI
export const SPAWNS_AI = {
  en: 'Spawns-AI',
  kr: 'AI스폰',
  value: 'SPAWNS_AI',
  child: [
    { value: 'SCAV_SPAWN', en: 'SCAV-Spawn', kr: 'SCAV 스폰 지역' },
    {
      value: 'SNIPER_SCAV_SPAWN',
      en: 'Sniper-Scav-Spawn',
      kr: '저격 SCAV 스폰 지역',
    },
    { value: 'BOSS_SPAWN', en: 'Boss-Spawn', kr: 'Boss 스폰 지역' },
    { value: 'CULTIST_SPAWN', en: 'Cultist-Spawn', kr: 'Cultist 스폰 지역' },
  ],
};

// Miscellaneous
export const MISCELLANEOUS = {
  en: 'Miscellaneous',
  kr: '여러가지',
  value: 'MISCELLANEOUS',
  child: [
    { value: 'LEVER', en: 'Lever', kr: '레버' },
    { value: 'LOCKED', en: 'Locked', kr: '잠긴 문' },
    { value: 'STATIONARY_WEAPON', en: 'Stationary-Weapon', kr: '고정형 무기' },
    { value: 'QUEST_RELATED', en: 'Quest-Related', kr: '퀘스트 관련' },
  ],
};

// Loot
export const LOOT = {
  en: 'Loot',
  kr: '루트',
  value: 'LOOT',
  child: [{ value: 'KEY_SPAWN', en: 'Key-Spawn', kr: '열쇠 생성 지역' }],
};

// Loot-Containers
export const LOOT_CONTAINERS = {
  en: 'Loot-Containers',
  kr: '전리품 컨테이너',
  value: 'LOOT_CONTAINERS',
  child: [
    { value: 'AMMO_BOX', en: 'ammoBox', kr: '총기 상자' },
    { value: 'MED_BAG', en: 'medBag', kr: '치료 가방' },
    {
      value: 'BARREL_GROUND_CACHE',
      en: 'barrelGroundCache',
      kr: '땅에 묻힌 통',
    },
    { value: 'MED_CASE', en: 'medCase', kr: '치료 케이스' },
    { value: 'SAFE', en: 'safe', kr: '안전 구역' },
    { value: 'CASH_REGISTER', en: 'cashRegister', kr: '금전 등록기' },
    { value: 'SPORTS_BAG', en: 'sportsBag', kr: '스포츠 가방' },
    { value: 'COMPUTER', en: 'computer', kr: '컴퓨터' },
    { value: 'SUPPLY_CRATE', en: 'supplyCrate', kr: '보급품 상자' },
    { value: 'DEAD_SCAV', en: 'deadScav', kr: 'SCAV 시체' },
    { value: 'TOOL_BOX', en: 'toolBox', kr: '공구 상자' },
  ],
};

// Wrapped Item
export const ItemList = [
  EXTRACTIONS,
  SPAWNS,
  SPAWNS_AI,
  MISCELLANEOUS,
  LOOT,
  LOOT_CONTAINERS,
];
