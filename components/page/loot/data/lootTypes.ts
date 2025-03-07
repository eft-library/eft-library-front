export interface LootSelectorClient {
  lootType: LootType;
}

interface LootType {
  id: string;
  json_value: LootJson[];
}

interface LootJson {
  value: string;
  desc_en: string;
  desc_kr: string;
}

export interface LootClient {
  lootList: Loot[];
}

interface Loot {
  id: string;
  category: string;
  name_en: string;
  name_kr: string;
  width: number;
  height: number;
  image: string;
  quest_notes: QuestNotes[];
  hideout_notes: HideoutNotes[];
}

interface HideoutNotes {
  name: string;
  count: number;
  item_id: string;
  name_kr: string;
  level_id: string;
  master_id: string;
}

interface QuestNotes {
  id: string;
  name: string;
  count: number;
  in_raid: boolean;
  name_kr: string;
  url_mapping: string;
}
