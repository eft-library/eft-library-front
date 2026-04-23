export interface QuestListEntry {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  trader_id: string | null;
  kappa_required: boolean;
  min_player_level: number | null;
  trader_name_en?: string | null;
  trader_name_ko?: string | null;
  trader_name_ja?: string | null;
  trader_image?: string | null;
}

export interface QuestFeedEntry {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  guide_en: string | null;
  guide_ko: string | null;
  guide_ja: string | null;
  update_time: string;
}

export interface QuestTraderEntry {
  id: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  normalized_name: string;
  image: string;
}

export interface QuestListWithTraderResponse {
  quest_list: QuestListEntry[];
  trader_list: QuestTraderEntry[];
}

export interface QuestRelatedEntry {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
}

export interface QuestDetailItem {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  image: string | null;
}

export interface QuestObjectiveItem {
  item_type: string;
  item: QuestDetailItem;
}

export interface QuestObjectiveMap {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
}

export interface QuestObjective {
  objective_id: string;
  type: string;
  description_en: string;
  description_ko: string;
  description_ja: string;
  count: number | null;
  found_in_raid: boolean | null;
  items: QuestObjectiveItem[];
  required_keys: QuestDetailItem[];
  maps: QuestObjectiveMap[];
}

export interface QuestRewardSkill {
  name_en: string;
  name_ko: string;
  name_ja: string;
  skill_level: number;
  sort_order: number;
}

export interface QuestRewardStanding {
  standing: number;
  trader: QuestTraderEntry;
}

export interface QuestRewardOfferUnlock {
  offer_id: string;
  level: number;
  trader: QuestTraderEntry | null;
  item: QuestDetailItem | null;
}

export interface QuestRewardItem {
  quantity: number;
  item: QuestDetailItem;
}

export interface QuestRewardCraftUnlock {
  craft_id: string;
  station_level: number;
  reward_item: QuestDetailItem | null;
}

export interface QuestDetailResponse {
  quest: {
    id: string;
    normalized_name: string;
    name_en: string;
    name_ko: string;
    name_ja: string;
    experience: number | null;
    delay_max: number | null;
    delay_min: number | null;
    kappa_required: boolean;
    min_player_level: number | null;
    wiki_url: string | null;
    guide_en: string | null;
    guide_ko: string | null;
    guide_ja: string | null;
  };
  trader: QuestTraderEntry | null;
  require_quests: QuestRelatedEntry[];
  next_quests: QuestRelatedEntry[];
  objectives: QuestObjective[];
  finish_rewards: {
    skill_level_reward: QuestRewardSkill[];
    trader_standing: QuestRewardStanding[];
    offer_unlock: QuestRewardOfferUnlock[];
    items: QuestRewardItem[];
    craft_unlock: QuestRewardCraftUnlock[];
  };
}
