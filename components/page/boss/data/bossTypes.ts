interface Boss {
  faction: string;
  id: string;
  health_total: number;
  spawn_chance: SpawnChance[];
  order: number;
  update_time: string;
  name: LocaleName;
  parent_id: string;
  image: string;
  item_info: ItemInfo[];
  location_guide: LocaleName;
  health_image: string;
  url_mapping: string;
  is_boss: boolean;
  children: Boss[];
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

export interface BossClient {
  bossList: Boss[];
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
