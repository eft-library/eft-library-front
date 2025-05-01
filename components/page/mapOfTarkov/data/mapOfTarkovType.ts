export interface Boss extends BossInfo {
  health_total: number;
  spawn: string[];
  faction: string;
  location_spawn_chance_en: SpawnChance[];
  location_spawn_chance_kr: SpawnChance[];
  followers_en: string[];
  followers_kr: string[];
  name_kr: string;
  name_en: string;
  image: string;
  order: number;
}
interface SpawnChance {
  order: number;
  chance: number;
  location: string;
}
interface BossInfo {
  id: string;
  location_guide: string;
  sub: BossLoot[];
  sub_followers: Followers[];
}
interface BossLoot {
  boss_name_en: string;
  boss_name_kr: string;
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

interface Followers {
  id: string;
  name_kr: string;
  name_en: string;
  boss_id: string;
  health_image: string;
  loot: FollowersLoot[];
}

interface FollowersLoot {
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
  bossInfo: Boss;
}

interface Requirement {
  desc: string;
  image: string;
  thumbnail: string;
}

export interface ExtractionRender {
  extractionInfo: Extraction;
}

export interface MapOfTarkovSelectorClient {
  setImageSelect: (val: string) => void;
  imageSelect: string;
}

export interface MapOfTarkovType {
  id: string;
  json_value: MapOfTarkovJson[];
}

interface MapOfTarkovJson {
  id: string;
  link: string;
  order: number;
  name_kr: string;
  image_list: ImageJson[];
}

interface ImageJson {
  id: string;
  name_en: string;
  name_kr: string;
}

export interface MapOfTarkovClient {
  mapOfTarkovList: MapOfTarkov[];
  imageSelect: string;
}

export interface MapOfTarkovWrapper {
  mapData: MapOfTarkov;
}

export interface MapOfTarkov {
  boss_list: Boss[];
  map_info: Map;
  extraction_info: Extraction[];
  transits_info: Extraction[];
  find_info: FindInfo[];
  map_id: string;
}

interface FindInfo {
  id: string;
  map_bounds: [number, number][];
  image_bounds: [number, number][];
  name: string;
  image: string;
}

interface Requirement {
  desc: string;
  image: string;
  thumbnail: string;
}
export interface Extraction {
  id: string;
  name: string;
  faction: string;
  single_use: boolean;
  tip: Requirement[];
  image: string;
  image_thumbnail: string;
  always_available: boolean;
  requirements: Requirement[];
  map: string;
}
interface Map {
  sub: SubMap[];
  id: string;
  name_en: string;
  three_image: string;
  jpg_image: string;
  depth: number;
  link: string;
  name_kr: string;
  mot_image: string;
  order: number;
  main_image: string;
}
interface SubMap {
  id: string;
  name_en: string;
  three_image: string;
  jpg_image: string;
  depth: number;
  link: string;
  name_kr: string;
  mot_image: string;
  order: number;
  main_image: string;
  parent_value: string;
}

export interface MapSlider {
  mapInfo: Map;
  imageSelect: string;
  findInfo: FindInfo[];
}

export type CoordPx = [number, number, number, number];
