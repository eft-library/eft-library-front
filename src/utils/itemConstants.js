export const ALL_ITEM = {
  // Extractions
  EXTRACTIONS: 'EXTRACTIONS',
  PMC_EXTRACTION_VALUE: 'PMC_EXTRACTION',
  SCAV_EXTRACTION_VALUE: 'SCAV_EXTRACTION',
  SHARED_EXTRACTION_VALUE: 'SHARED_EXTRACTION',

  // Spawns
  SPAWNS: 'SPAWNS',
  PMC_SPAWN_VALUE: 'PMC_SPAWN',
  SCAV_SPAWN_VALUE: 'SCAV_SPAWN',
  SNIPER_SCAV_SPAWN_VALUE: 'SNIPER_SCAV_SPAWN',
  BOSS_SPAWN_VALUE: 'BOSS_SPAWN',
  CULTIST_SPAWN_VALUE: 'CULTIST_SPAWN',
  ROUGE_SPAWN_VALUE: 'ROUGE_SPAWN',

  // Miscellaneous
  MISCELLANEOUS: 'MISCELLANEOUS',
  LEVER_VALUE: 'LEVER',
  LOCKED_VALUE: 'LOCKED',
  STATIONARY_WEAPON_VALUE: 'STATIONARY_WEAPON',
  QUEST_RELATED_VALUE: 'QUEST_RELATED',

  // Loot
  LOOT: 'LOOT',
  AMMO_BOX_VALUE: 'AMMO_BOX',
  MED_BAG_VALUE: 'MED_BAG',
  MED_CASE_VALUE: 'MED_CASE',
  CASH_REGISTER_VALUE: 'CASH_REGISTER',
  SPORTS_BAG_VALUE: 'SPORTS_BAG',
  COMPUTER_VALUE: 'COMPUTER',
  SUPPLY_CRATE_VALUE: 'SUPPLY_CRATE',
  TOOL_BOX_VALUE: 'TOOL_BOX',
  KEY_VALUE: 'KEY',
  WEAPON_BOX_VALUE: 'WEAPON',
  WOOD_BOX_VALUE: 'WOOD_BOX',
  JACKET_VALUE: 'JACKET',
  GRENADE_BOX_VALUE: 'GRENADE_BOX',
  DRAWERS_VALUE: 'DRAWERS',
  DEAD_BODY_VALUE: 'DEAD_BODY',
  SUITCASE_VALUE: 'SUITCASE',
  KEY_CARD_VALUE: 'KEY_CARD',
  HIDDEN_STASH_VALUE: 'HIDDEN_STASH',
  SAFE_VALUE: 'SAFE',
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
      kr: '스캐브 탈출구',
    },
    {
      value: ALL_ITEM.SHARED_EXTRACTION_VALUE,
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
    { value: ALL_ITEM.PMC_SPAWN_VALUE, en: 'Pmc Spawn', kr: 'PMC 스폰' },
    { value: ALL_ITEM.SCAV_SPAWN_VALUE, en: 'Scav Spawn', kr: '스캐브 스폰' },
    {
      value: ALL_ITEM.SNIPER_SCAV_SPAWN_VALUE,
      en: 'Sniper Scav Spawn',
      kr: '저격 스캐브 스폰',
    },
    { value: ALL_ITEM.BOSS_SPAWN_VALUE, en: 'Boss Spawn', kr: '보스 스폰' },
    {
      value: ALL_ITEM.CULTIST_SPAWN_VALUE,
      en: 'Cultist Spawn',
      kr: '컬티스트 스폰',
    },
    { value: ALL_ITEM.ROUGE_SPAWN_VALUE, en: 'Rogue Spawn', kr: '로그 스폰' },
  ],
};

// Miscellaneous
export const MISCELLANEOUS = {
  en: 'Miscellaneous',
  kr: '기타',
  value: ALL_ITEM.MISCELLANEOUS,
  child: [
    { value: ALL_ITEM.LEVER_VALUE, en: 'Lever', kr: '레버' },
    { value: ALL_ITEM.LOCKED_VALUE, en: 'Locked', kr: '잠김' },
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
  kr: '전리품',
  value: ALL_ITEM.LOOT,
  child: [
    { value: ALL_ITEM.KEY_VALUE, en: 'Key', kr: '열쇠' },
    { value: ALL_ITEM.AMMO_BOX_VALUE, en: 'ammoBox', kr: '탄약 상자' },
    { value: ALL_ITEM.MED_BAG_VALUE, en: 'medBag', kr: '의료 가방' },
    {
      value: ALL_ITEM.HIDDEN_STASH_VALUE,
      en: 'Hidden Stash',
      kr: '히든 스태쉬',
    },
    { value: ALL_ITEM.MED_CASE_VALUE, en: 'medCase', kr: '의료 상자' },
    { value: ALL_ITEM.SAFE_VALUE, en: 'Safe', kr: '금고' },
    { value: ALL_ITEM.SPORTS_BAG_VALUE, en: 'sportsBag', kr: '스포츠 가방' },
    {
      value: ALL_ITEM.CASH_REGISTER_VALUE,
      en: 'cashRegister',
      kr: '금전등록기',
    },
    {
      value: ALL_ITEM.SUPPLY_CRATE_VALUE,
      en: 'supplyCrate',
      kr: '보급 상자',
    },
    { value: ALL_ITEM.TOOL_BOX_VALUE, en: 'toolBox', kr: '공구 상자' },
    { value: ALL_ITEM.WEAPON_BOX_VALUE, en: 'weaponBox', kr: '무기 상자' },
    { value: ALL_ITEM.WOOD_BOX_VALUE, en: 'woodBox', kr: '나무 상자' },
    { value: ALL_ITEM.JACKET_VALUE, en: 'jacket', kr: '재킷' },
    { value: ALL_ITEM.GRENADE_BOX_VALUE, en: 'GrenadeBox', kr: '수류탄 상자' },
    { value: ALL_ITEM.DRAWERS_VALUE, en: 'Drawers', kr: '서랍' },
    { value: ALL_ITEM.DEAD_BODY_VALUE, en: 'Dead Body', kr: '시체' },
    { value: ALL_ITEM.COMPUTER_VALUE, en: 'computer', kr: '컴퓨터' },
    { value: ALL_ITEM.SUITCASE_VALUE, en: 'SuitCase', kr: '여행 가방' },
    { value: ALL_ITEM.KEY_CARD_VALUE, en: 'KeyCard', kr: '키 카드' },
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
