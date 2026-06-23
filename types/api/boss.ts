export interface BossSelectorEntry {
  id: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  parent_boss_id: string | null;
  normalized_name: string;
}

export interface BossCharacter {
  id: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  is_boss: boolean;
  parent_boss_id: string | null;
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
  guide_en: string | null;
  guide_ko: string | null;
  guide_ja: string | null;
}

export interface BossSpawnEntry {
  spawn_chance: number;
  name_en: string | null;
  name_ko: string | null;
  name_ja: string | null;
}

export interface BossItemEntry {
  quantity: number;
  name_en: string;
  name_ko: string;
  name_ja: string;
  normalized_name: string;
  width: number;
  height: number;
  image: string;
  boss_id?: string;
}

export interface BossFollowerItemsGroup {
  boss_id: string;
  items: BossItemEntry[];
}

export interface BossDetailResponse {
  boss: BossCharacter;
  spawn: BossSpawnEntry[];
  items: BossItemEntry[];
  followers: BossCharacter[];
  followers_item: BossFollowerItemsGroup[];
  boss_selector: BossSelectorEntry[];
}
