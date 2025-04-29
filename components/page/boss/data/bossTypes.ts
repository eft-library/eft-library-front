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
  url_mapping: string;
  is_boss: boolean;
}

interface BossDefine {
  parent_id: string;
  boss_url_mappings: string;
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
  gridImageLink: string;
}

interface Followers {
  id: string;
  name_kr: string;
  name_en: string;
  boss_id: string;
  health_image: string;
  loot: FollowersLoot[];
}

export interface FollowersLoot {
  follower_name_en: string;
  follower_name_kr: string;
  follower_id: string;
  item_id: string;
  boss_id: string;
  item_type: string;
  item_type_en: string;
  item_type_kr: string;
  item_name_en: string;
  item_name_kr: string;
  item_image: string;
  link: string;
}

export interface BossClient {
  bossList: BossDefine[];
}

export interface BossHealth {
  subFollowers: Followers[];
}

export interface FollowerLoot {
  follower: Followers;
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}
