import type { LocalizedName } from "@/types/api/home";

export interface HideoutStationSummary extends LocalizedName {
  id: string;
  normalized_name: string;
}

export interface HideoutStationListResponse {
  user_hideout: unknown;
  hideout_list: HideoutStationSummary[];
}

export interface HideoutRequirementTrader extends LocalizedName {
  id: string;
  hideout_level_id: string;
  trader_id: string;
  trader_level: number;
}

export interface HideoutRequirementItem extends LocalizedName {
  id: string;
  hideout_level_id: string;
  item_id: string;
  quantity: number;
  in_raid: boolean;
  image: string;
  width: number;
  height: number;
  normalized_name: string;
}

export interface HideoutRequirementStation extends LocalizedName {
  id: string;
  hideout_level_id: string;
  require_master_id: string;
  station_level: number;
}

export interface HideoutRequirementSkill extends LocalizedName {
  id: string;
  hideout_level_id: string;
  skill_id: string;
  skill_level: number;
}

export interface HideoutBonus extends LocalizedName {
  id: string;
  hideout_level_id: string;
  bonus_type: string;
  skill_name_en: string | null;
  skill_name_ko: string | null;
  skill_name_ja: string | null;
  bonus_value: number | null;
}

export interface HideoutCraftRequirement extends LocalizedName {
  id: string;
  craft_id: string;
  item_id: string;
  quantity: number;
  image: string;
  width: number;
  height: number;
  normalized_name: string;
}

export interface HideoutCraft extends LocalizedName {
  id: string;
  hideout_level_id: string;
  reward_item_id: string;
  duration: number;
  reward_quantity: number;
  image: string;
  width: number;
  height: number;
  normalized_name: string;
  require_items: HideoutCraftRequirement[];
}

export interface HideoutLevelDetail {
  id: string;
  master_id: string;
  hideout_level: number;
  construction_time: number;
  trader_require: HideoutRequirementTrader[];
  item_require: HideoutRequirementItem[];
  station_require: HideoutRequirementStation[];
  skill_require: HideoutRequirementSkill[];
  bonus: HideoutBonus[];
  crafts: HideoutCraft[];
}

export interface HideoutDetailResponse {
  master: HideoutStationSummary;
  levels: HideoutLevelDetail[];
}
