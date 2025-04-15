export interface ItemDetail {
  category: string;
  id: string;
  image_height: number;
  name_kr: string;
  image: string;
  info: any;
  name_en: string;
  image_width: number;
  url_mapping: string;
  hideout_items: HideoutItem[];
  used_in_crafts: UsedInCraft[];
  rewarded_by_npcs: RewardedByNpc[];
  rewarded_by_quests: RewardedByQuest[];
  required_by_quest_item: RequiredByQuestSingleItem[];
  required_by_quest_item_array: RequiredByQuestItem[];
}

export interface ItemClient {
  itemInfo: ItemDetail;
}

export interface ItemView {
  item: any;
}

interface Item {
  id: string;
  name: string;
  gridImageLink: string;
}

interface RequiredItem {
  item: Item;
  quantity: number;
}

interface RewardItem {
  item: Item;
  quantity: number;
}

interface BarterInfo {
  level: string;
  rewardItems: RewardItem;
  requiredItems: RequiredItem[];
}

interface RewardedByNpc {
  npc_id: string;
  barter_info: BarterInfo;
  npc_name_en: string;
  npc_name_kr: string;
  npc_image: string;
}

interface QuestRewardItem {
  item: Item;
  count: number;
  quantity: number;
}

interface RewardedByQuest {
  reward: QuestRewardItem;
  name_en: string;
  name_kr: string;
  quest_id: string;
  url_mapping: string;
  npc_image: string;
  npc_name_en: string;
  npc_name_kr: string;
}

interface Objective {
  id: string;
  type: string;
  count: number;
  items: Item[];
  description: string;
  foundInRaid: boolean;
}

interface RequiredByQuestItem {
  name_en: string;
  name_kr: string;
  quest_id: string;
  objective: Objective;
  url_mapping: string;
  npc_image: string;
  npc_name_en: string;
  npc_name_kr: string;
}
interface ObjectiveWithQuestItem {
  id: string;
  type: string;
  count: number;
  questItem: Item;
  description: string;
}

interface RequiredByQuestSingleItem {
  name_en: string;
  name_kr: string;
  quest_id: string;
  objective: ObjectiveWithQuestItem;
  url_mapping: string;
  npc_image: string;
  npc_name_en: string;
  npc_name_kr: string;
}

interface HideoutItem {
  id: string;
  count: number;
  image: string;
  item_id: string;
  name_en: string;
  name_kr: string;
  level_id: string;
  quantity: number;
  master_id: string;
  master_name_en: string;
  master_name_kr: string;
}

interface UsedInCraft {
  id: string;
  image: string;
  level: number;
  name_en: string;
  name_kr: string;
  duration: number;
  level_id: string;
  quantity: number;
  req_item: InventoryEntry[];
  reward_item_id: string;
  master_id: string;
  master_name_en: string;
  master_name_kr: string;
}

export interface RelatedInfo {
  item: ItemDetail;
}

interface CraftItem {
  id: string;
  name: string;
  width: number;
  height: number;
  gridImageLink: string;
}

interface InventoryEntry {
  item: CraftItem;
  quantity: number;
}
