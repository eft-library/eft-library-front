export interface UserQuest {
  npc_id: string;
  npc_name_kr: string;
  npc_name_en: string;
  npc_image: string;
  quest_info: UserQuestInfo[];
}

export interface UserQuestInfo {
  quest_id: string;
  quest_name_en: string;
  quest_name_kr: string;
  objectives_en: string[];
  objectives_kr: string[];
  requirements_en: string[];
  requirements_kr: string[];
  next: UserNextQuest[];
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

export interface Require {
  id: string;
  name: string;
  name_kr: string;
  is_other: boolean;
  url_mapping: string;
}

export interface UserNextQuest {
  url_mapping: string;
  id: string;
  name: string;
  name_kr: string;
}
export interface UserClientQuest {
  userQuestList: UserQuest[];
}

export interface FetchSchema {
  status: number;
  msg: string;
  data: UserQuest[];
}

export interface UserQuestList {
  userQuest: UserQuest;
  successQuest: (val: string, nextVal: any) => void;
  checkedQuest: string[];
  checkedBox: (val: string) => void;
}
export interface UserQuestPopOver {
  quest: UserQuestInfo;
}

export interface UserQuestSelector {
  updateQuest: Function;
}