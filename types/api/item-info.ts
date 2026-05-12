export interface RelatedItemInfo {
  id: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  normalized_name: string;
  image: string;
  width?: number;
  height?: number;
}

export interface RelatedQuestInfo {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
}

export interface RelatedTraderInfo {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  image: string;
}

export interface RelatedHideoutInfo {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  level: number | null;
  level_id: string | null;
}

export interface RelatedBossInfo {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  image?: string | null;
}

export interface RelatedQuantityItem {
  id: string;
  quantity: number;
  item: RelatedItemInfo;
}

export interface QuestObjectiveInfo {
  objective_id: string;
  type: string | null;
  description_en: string | null;
  description_ko: string | null;
  description_ja: string | null;
  count: number | null;
  found_in_raid: boolean | null;
  item_type: string | null;
}

export interface ItemPenalties {
  ergonomics_penalty: number | null;
  turn_speed_penalty: number | null;
  movement_speed_penalty: number | null;
  distance_modifier: number | null;
}

export interface WeaponFireModes {
  single_fire: boolean;
  full_auto: boolean;
  burst_fire: boolean;
  double_action: boolean;
  double_tap: boolean;
  semi_auto: boolean;
}

export interface WeaponInfo {
  caliber: string | null;
  fire_rate: number | null;
  ergonomics: number | null;
  recoil_horizontal: number | null;
  recoil_vertical: number | null;
  default_ammo: RelatedItemInfo | null;
  fire_modes: WeaponFireModes;
  allowed_ammo: RelatedItemInfo[];
}

export interface AmmoEfficiency {
  value_1: number | null;
  value_2: number | null;
  value_3: number | null;
  value_4: number | null;
  value_5: number | null;
  value_6: number | null;
}

export interface AmmoInfo {
  damage: number | null;
  armor_damage: number | null;
  penetration_power: number | null;
  recoil_modifier: number | null;
  accuracy_modifier: number | null;
  heavy_bleed_modifier: number | null;
  light_bleed_modifier: number | null;
  efficiency?: AmmoEfficiency;
}

export interface MeleeInfo {
  hit_radius: number | null;
  slash_damage: number | null;
  stab_damage: number | null;
}

export interface ThrowableInfo {
  throwable_type: string | null;
  fuse: number | null;
  fragments: number | null;
  contusion_radius: number | null;
  min_explosion_distance: number | null;
  max_explosion_distance: number | null;
}

export interface StorageGridInfo {
  grid_index: number;
  width: number;
  height: number;
}

export interface StorageInfo {
  storage_type: string | null;
  capacity: number | null;
  grids: StorageGridInfo[];
}

export interface ProtectionZones {
  head_top: boolean;
  head_nape: boolean;
  head_ears: boolean;
  head_face: boolean;
  head_jaws: boolean;
  head_eyes: boolean;
  thorax_throat: boolean;
  thorax_neck: boolean;
  thorax: boolean;
  upper_back: boolean;
  stomach: boolean;
  left_side: boolean;
  right_side: boolean;
  lower_back: boolean;
  groin: boolean;
  buttocks: boolean;
  left_shoulder: boolean;
  right_shoulder: boolean;
  front_plate: boolean;
  back_plate: boolean;
  left_plate: boolean;
  right_plate: boolean;
  side_plate: boolean;
}

export interface ProtectionInfo {
  protection_type: string | null;
  armor_class: number | null;
  durability: number | null;
  material: string | null;
  ricochet_y: number | null;
  deafening: string | null;
  blindness_protection: number | null;
  zones: ProtectionZones;
}

export interface ConsumableStimEffect {
  effect_index: number;
  effect_type: string | null;
  value: number | null;
  delay: number | null;
  duration: number | null;
  skill_name: string | null;
}

export interface ConsumableInfo {
  consumable_type: string | null;
  energy: number | null;
  hydration: number | null;
  units: number | null;
  use_time: number | null;
  hitpoints: number | null;
  painkiller_duration: number | null;
  energy_impact: number | null;
  hydration_impact: number | null;
  cures: string[];
  stim_effects: ConsumableStimEffect[];
}

export interface UsageInfo {
  max_uses: number | null;
}

export interface ItemQuestRequirement {
  quest: RelatedQuestInfo;
  trader: RelatedTraderInfo | null;
  objective: QuestObjectiveInfo | null;
}

export interface ItemTraderBarter {
  barter_id: string;
  reward_quantity?: number | null;
  require_quantity?: number | null;
  trader_level: number | null;
  trader: RelatedTraderInfo;
  require_items?: RelatedQuantityItem[];
  reward_items?: RelatedQuantityItem[];
}

export interface ItemHideoutCraft {
  craft_id: string;
  duration: number | null;
  reward_quantity: number | null;
  role: "reward" | "require" | "reward_and_require" | string | null;
  hideout: RelatedHideoutInfo;
  require_items: RelatedQuantityItem[];
  reward_items?: RelatedQuantityItem[];
}

export interface ItemQuestReward {
  quest: RelatedQuestInfo;
  trader: RelatedTraderInfo | null;
  reward_type: "item" | "offer_unlock" | string | null;
  quantity: number | null;
  offer_id: string | null;
  level: number | null;
}

export interface ItemHideoutConstruction {
  id: string;
  quantity: number | null;
  in_raid: boolean | null;
  construction_time: number | null;
  hideout: RelatedHideoutInfo;
}

export interface ItemQuestCraftUnlockReward {
  quest: RelatedQuestInfo;
  trader: RelatedTraderInfo | null;
  station_level: number | null;
  level?: number | null;
}

export interface ItemBossDrop {
  boss: RelatedBossInfo;
  quantity?: number | null;
}

export interface ItemInfoResponse {
  id: string;
  parent_category: string | null;
  category: string | null;
  name_en: string;
  name_ko: string;
  name_ja: string;
  normalized_name: string;
  weight: number | null;
  width: number;
  height: number;
  image: string;
  penalties?: ItemPenalties;
  weapon_info?: WeaponInfo;
  ammo_info?: AmmoInfo;
  melee_info?: MeleeInfo;
  throwable_info?: ThrowableInfo;
  storage_info?: StorageInfo;
  protection_info?: ProtectionInfo;
  consumable_info?: ConsumableInfo;
  usage_info?: UsageInfo;
  quest_requirements?: ItemQuestRequirement[];
  trader_barters?: ItemTraderBarter[];
  used_in_trader_barters?: ItemTraderBarter[];
  hideout_crafts?: ItemHideoutCraft[];
  quest_rewards?: ItemQuestReward[];
  hideout_constructions?: ItemHideoutConstruction[];
  quest_craft_unlock_rewards?: ItemQuestCraftUnlockReward[];
  boss_drops?: ItemBossDrop[];
  compatible_weapons?: RelatedItemInfo[];
  default_for_weapons?: RelatedItemInfo[];
}
