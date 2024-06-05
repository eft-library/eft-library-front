export const COLUMN_KEY = {
  boss: "BOSS_COLUMN",
  map: "MAP_COLUMN",
  mapOfTarkov: "MAP_OF_TARKOV_COLUMN",
  extraction: "EXTRACTION_COLUMN",
  weaponType: "WEAPON_TYPE",
  knife: "KNIFE_COLUMN",
  special: "SPECIAL_COLUMN",
  stationary: "STATIONARY_COLUMN",
  throwable: "THROWABLE_COLUMN",
  weapon: "WEAOPN_COLUMN",
  gun: "GUN_CATEGORY_INFO",
  footer: "FOOTER_COLUMN",
  headset: "HEAD_PHONE_COLUMN",
  headwear: "HEAD_WEAR_COLUMN",
  armorVest: "ARMOR_VEST_COLUMN",
  rig: "RIG_COLUMN",
} as const;

export type AllColumnKeys = keyof typeof COLUMN_KEY;
