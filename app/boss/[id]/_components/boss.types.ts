export interface Boss {
  faction: string;
  id: string;
  health_total: number;
  spawn_chance: SpawnChance[];
  order: number;
  update_time: string;
  name: LocaleName;
  parent_id: string;
  image: string;
  health_detail: HealthDetail[];
  item_info: ItemInfo[];
  location_guide: LocaleName;
  health_image: string;
  url_mapping: string;
  is_boss: boolean;
  children: Boss[];
}

interface HealthDetail {
  max: number;
  bodyPart_en: string;
  bodyPart_ja: string;
  bodyPart_ko: string;
}

export interface SpawnChance {
  name_en: string;
  name_ja: string;
  name_ko: string;
  spawnChance: number;
}

interface ItemInfo {
  item: ItemDetail;
  count: number;
  quantity: number;
}

interface ItemDetail {
  id: string;
  name_en: string;
  name_ja: string;
  name_ko: string;
  normalizedName: string;
  gridImageLink: string;
}

export interface BossDetail {
  bossData: BossData;
}

export interface BossViewTypes {
  bossData: BossData;
}

export interface BossSelectorTypes {
  bossData: BossData;
}

export interface BossData {
  boss_selector: BossSelector[];
  boss: Boss;
}

interface BossSelector {
  url_mapping: string;
  name: LocaleName;
}

export interface BossHealth {
  subFollowers: Boss[];
}

export interface FollowerLoot {
  follower: Boss;
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}
