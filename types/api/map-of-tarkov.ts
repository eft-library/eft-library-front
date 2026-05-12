export interface MapSelectorEntry {
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
}

export interface MapInfo {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  mot_image_en: string;
  mot_image_ko: string;
  mot_image_ja: string;
}

export interface FindInfo {
  id: string;
  image: string;
  map_bounds: [[number, number], [number, number]];
  image_bounds: [[number, number], [number, number]];
  default_zoom_level: number;
}

export interface MapPointInfo {
  id: string;
  point_type: "extraction" | "transit";
  name_en: string;
  name_ko: string;
  name_ja: string;
  is_unlimited_use: boolean;
  is_one_time_use: boolean;
  image: string;
  faction: string;
  map_id: string;
  requirements_en: string | null;
  requirements_ko: string | null;
  requirements_ja: string | null;
  tip_en: string | null;
  tip_ko: string | null;
  tip_ja: string | null;
}

export interface MapBossFollower {
  id: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  normalized_name: string;
}

export interface MapBossInfo {
  id: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  faction: string | null;
  image: string;
  normalized_name: string;
  health_total: number;
  health_image: string | null;
  head_hp: number;
  thorax_hp: number;
  stomach_hp: number;
  left_arm_hp: number;
  right_arm_hp: number;
  left_leg_hp: number;
  right_leg_hp: number;
  spawn_chance: number;
  followers: MapBossFollower[];
}

export interface MapOfTarkovDetailResponse {
  map_info: MapInfo;
  map_selector: MapSelectorEntry[];
  child_maps: MapSelectorEntry[];
  find_info: FindInfo | null;
  extraction_info: MapPointInfo[];
  transit_info: MapPointInfo[];
  boss_info: MapBossInfo[];
}
