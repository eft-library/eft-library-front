import { LocaleName } from "@/components/types/common";

export interface LootTableTypes {
  lootList: LootDetail[];
  word: string;
}

export interface LootViewTypes {
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
