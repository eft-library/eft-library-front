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
  name_kr: string;
  image: string;
  name_en: string;
  image_width: number;
  update_time: string;
}
