export type KordBreachModifierCategory = "global" | "positive" | "negative";

export interface KordBreachModifier {
  id: string;
  category: KordBreachModifierCategory;
  nameEn: string;
  nameKo: string;
  nameJa: string | null;
  effect: string;
  effectEn: string | null;
  effectKo: string | null;
  effectJa: string | null;
  score: number;
  iconUrl: string;
  sortOrder: number;
  isActive: boolean;
  updateTime: string;
}

export interface KordBreachModifiersResponse {
  globalModifiers: KordBreachModifier[];
  positiveModifiers: KordBreachModifier[];
  negativeModifiers: KordBreachModifier[];
  conflictMap: Record<string, string[]>;
}

export interface KordBreachPreset {
  id: string;
  slotNo: number;
  name: string;
  modifierIds: string[];
  positiveIds: string[];
  negativeIds: string[];
  savedAt?: string;
  totalScore: number;
  isPassed: boolean;
}

export interface KordBreachSelection {
  modifierIds: string[];
  positiveIds: string[];
  negativeIds: string[];
  totalScore: number;
  isPassed: boolean;
}

export type KordBreachSaveResult =
  | { success: true; preset: KordBreachPreset }
  | { success: false; reason: string; totalScore?: number };

export interface KordBreachDeleteResult { success: boolean }

// KORD BREACH Rewards API OpenAPI, 2026-11-13.
export interface KordRewardQuest {
  id: string;
  name_en: string | null;
  name_ko: string | null;
  name_ja: string | null;
  normalized_name: string | null;
  start_required_level: number | null;
  is_registered: boolean;
}
export interface KordRewardCondition {
  group_no: number;
  sort_order: number;
  condition_type: "player_level" | "quest_completed";
  required_level: number | null;
  quest: KordRewardQuest | null;
}
export interface KordReward {
  id: string;
  sort_order: number;
  item: {
    id: string;
    name_en: string | null;
    name_ko: string | null;
    name_ja: string | null;
    image: string | null;
    normalized_name: string | null;
    category: string | null;
  };
  required_level: number | null;
  unlock_conditions_known: boolean;
  unlock_conditions: KordRewardCondition[];
}
export interface KordRewardsResult {
  season_id: string;
  total: number;
  source_url: string;
  source_revision: string;
  collected_at: string;
  condition_logic: "or_groups_of_and_conditions";
  rewards: KordReward[];
}
