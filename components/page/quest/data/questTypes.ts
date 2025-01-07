export interface QuestSelectorClient {
  npcList: QuestJson[];
}

interface QuestJson {
  id: string;
  order: number;
  name_kr: string;
  name_en: string;
  image: string;
}

export interface Quest {
  id: string;
  name_kr: string;
  name_en: string;
  image: string;
  npc_value: string;
  title_kr: string;
  title_en: string;
  required_kappa: boolean;
  objectives_kr: string[];
  objectives_en: string[];
  requirements_en: string[];
  requirements_kr: string[];
  rewards_kr: string[];
  guide: string;
  requires: Require[] | null;
  next: Require[] | null;
  sub: RelatedQuests[];
  update_time: string;
  url_mapping: string;
}

interface RelatedQuests {
  item_name_en: string;
  item_name_kr: string;
  quest_id: string;
  quest_name_en: string;
  quest_name_kr: string;
  in_raid: boolean | null;
  type: string;
  item_id: string;
  desc_text: string[] | null;
  count: number;
  item_image: string;
  item_link: string;
}

interface Require {
  id: string;
  name: string;
  name_kr: string;
  is_other: boolean;
  url_mapping: string;
}

export interface QuestClient {
  questList: Quest[];
}

export interface QuestDetailClient {
  questInfo: Quest;
}
export interface QuestDesc {
  questInfo: Quest;
}

export interface NpcDetail {
  questInfo: Quest;
}
