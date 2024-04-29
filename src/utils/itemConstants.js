export const ALL_ITEM = {
  // Extractions
  EXTRACTIONS: 'EXTRACTIONS',
  PMC_EXTRACTION: 'PMC_EXTRACTION',
  SCAV_EXTRACTION: 'SCAV_EXTRACTION',
  SHARED_EXTRACTION: 'SHARED_EXTRACTION',

  // Spawns
  SPAWNS: 'SPAWNS',
  PMC_SPAWN: 'PMC_SPAWN',
  SCAV_SPAWN: 'SCAV_SPAWN',
  SNIPER_SCAV_SPAWN: 'SNIPER_SCAV_SPAWN',
  BOSS_SPAWN: 'BOSS_SPAWN',
  CULTIST_SPAWN: 'CULTIST_SPAWN',
  ROUGE_SPAWN: 'ROUGE_SPAWN',

  // Miscellaneous
  MISCELLANEOUS: 'MISCELLANEOUS',
  LEVER: 'LEVER',
  LOCKED: 'LOCKED',
  STATIONARY_WEAPON: 'STATIONARY_WEAPON',
  QUEST_RELATED: 'QUEST_RELATED',

  // Loot
  LOOT: 'LOOT',
  AMMO_BOX: 'AMMO_BOX',
  MED_BAG: 'MED_BAG',
  MED_CASE: 'MED_CASE',
  CASH_REGISTER: 'CASH_REGISTER',
  SPORTS_BAG: 'SPORTS_BAG',
  COMPUTER: 'COMPUTER',
  SUPPLY_CRATE: 'SUPPLY_CRATE',
  TOOL_BOX: 'TOOL_BOX',
  KEY: 'KEY',
  WEAPON_BOX: 'WEAPON',
  WOOD_BOX: 'WOOD_BOX',
  JACKET: 'JACKET',
  GRENADE_BOX: 'GRENADE_BOX',
  DRAWERS: 'DRAWERS',
  DEAD_BODY: 'DEAD_BODY',
  SUITCASE: 'SUITCASE',
  KEY_CARD: 'KEY_CARD',
  HIDDEN_STASH: 'HIDDEN_STASH',
  SAFE: 'SAFE',
};

// Extractions
export const EXTRACTIONS = {
  en: ALL_ITEM.EXTRACTIONS,
  kr: '탈출구',
  value: 'EXTRACTIONS',
  child: [
    {
      value: ALL_ITEM.PMC_EXTRACTION,
      en: 'PMC-Extraction',
      kr: 'PMC 탈출구',
    },
    {
      value: ALL_ITEM.SCAV_EXTRACTION,
      en: 'SCAV-Extraction',
      kr: '스캐브 탈출구',
    },
    {
      value: ALL_ITEM.SHARED_EXTRACTION,
      en: 'Shared-Extraction',
      kr: '공용 탈출구',
    },
  ],
};

// Spawns
export const SPAWNS = {
  en: 'Spawns',
  kr: '스폰',
  value: ALL_ITEM.SPAWNS,
  child: [
    { value: ALL_ITEM.PMC_SPAWN, en: 'Pmc Spawn', kr: 'PMC 스폰' },
    { value: ALL_ITEM.SCAV_SPAWN, en: 'Scav Spawn', kr: '스캐브 스폰' },
    {
      value: ALL_ITEM.SNIPER_SCAV_SPAWN,
      en: 'Sniper Scav Spawn',
      kr: '저격 스캐브 스폰',
    },
    { value: ALL_ITEM.BOSS_SPAWN, en: 'Boss Spawn', kr: '보스 스폰' },
    {
      value: ALL_ITEM.CULTIST_SPAWN,
      en: 'Cultist Spawn',
      kr: '컬티스트 스폰',
    },
    { value: ALL_ITEM.ROUGE_SPAWN, en: 'Rogue Spawn', kr: '로그 스폰' },
  ],
};

// Miscellaneous
export const MISCELLANEOUS = {
  en: 'Miscellaneous',
  kr: '기타',
  value: ALL_ITEM.MISCELLANEOUS,
  child: [
    { value: ALL_ITEM.LEVER, en: 'Lever', kr: '레버' },
    { value: ALL_ITEM.LOCKED, en: 'Locked', kr: '잠김' },
    {
      value: ALL_ITEM.STATIONARY_WEAPON,
      en: 'Stationary-Weapon',
      kr: '고정형 무기',
    },
    {
      value: ALL_ITEM.QUEST_RELATED,
      en: 'Quest-Related',
      kr: '퀘스트 관련',
    },
  ],
};

// Loot
export const LOOT = {
  en: 'Loot',
  kr: '전리품',
  value: ALL_ITEM.LOOT,
  child: [
    { value: ALL_ITEM.KEY, en: 'Key', kr: '열쇠' },
    { value: ALL_ITEM.AMMO_BOX, en: 'ammoBox', kr: '탄약 상자' },
    { value: ALL_ITEM.MED_BAG, en: 'medBag', kr: '의료 가방' },
    {
      value: ALL_ITEM.HIDDEN_STASH,
      en: 'Hidden Stash',
      kr: '히든 스태쉬',
    },
    { value: ALL_ITEM.MED_CASE, en: 'medCase', kr: '의료 상자' },
    { value: ALL_ITEM.SAFE, en: 'Safe', kr: '금고' },
    { value: ALL_ITEM.SPORTS_BAG, en: 'sportsBag', kr: '스포츠 가방' },
    {
      value: ALL_ITEM.CASH_REGISTER,
      en: 'cashRegister',
      kr: '금전등록기',
    },
    {
      value: ALL_ITEM.SUPPLY_CRATE,
      en: 'supplyCrate',
      kr: '보급 상자',
    },
    { value: ALL_ITEM.TOOL_BOX, en: 'toolBox', kr: '공구 상자' },
    { value: ALL_ITEM.WEAPON_BOX, en: 'weaponBox', kr: '무기 상자' },
    { value: ALL_ITEM.WOOD_BOX, en: 'woodBox', kr: '나무 상자' },
    { value: ALL_ITEM.JACKET, en: 'jacket', kr: '재킷' },
    { value: ALL_ITEM.GRENADE_BOX, en: 'GrenadeBox', kr: '수류탄 상자' },
    { value: ALL_ITEM.DRAWERS, en: 'Drawers', kr: '서랍' },
    { value: ALL_ITEM.DEAD_BODY, en: 'Dead Body', kr: '시체' },
    { value: ALL_ITEM.COMPUTER, en: 'computer', kr: '컴퓨터' },
    { value: ALL_ITEM.SUITCASE, en: 'SuitCase', kr: '여행 가방' },
    { value: ALL_ITEM.KEY_CARD, en: 'KeyCard', kr: '키 카드' },
  ],
};

// Wrapped Item
export const ITEM_LIST = [EXTRACTIONS, SPAWNS, MISCELLANEOUS, LOOT];

// child value 리스트
export const CHILD_VALUE_LIST = ITEM_LIST.map((item) =>
  item.child.map((childItem) => childItem.value),
).flat();

// root, child value 리스트
export const ALL_VALUE_LIST = Object.values(ALL_ITEM);
