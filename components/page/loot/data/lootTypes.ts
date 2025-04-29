export interface LootClient {
  lootList: LootDetail[];
}

interface LootInfo {
  loot_category: string;
}

interface LootDetail {
  category: string;
  id: string;
  info: LootInfo;
  image_height: number;
  name: LocaleName;
  image: string;
  image_width: number;
  update_time: string;
  url_mapping: string;
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}
