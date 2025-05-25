export interface ItemDetail {
  category: string;
  id: string;
  image_height: number;
  name: LocaleName;
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
  rewarded_by_quests_craft_unlock: RewardedByQuestsCraftUnlock[];
  rewarded_by_quests_offer_unlock: RewardedByQuestsOfferUnlock[];
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}

export interface ItemClient {
  itemInfo: ItemDetail;
}

export interface ItemView {
  item: any;
}

interface Item {
  id: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  gridImageLink: string;
  normalizedName: string;
}

interface RequiredItem {
  item: Item;
  quantity: number;
}

interface RewardItem {
  item: Item;
  quantity: number;
}

interface RewardedByQuestsOfferUnlock {
  name: LocaleName;
  reward: RewardItem;
  level: number;
  trader: Trader;
  url_mapping: string;
  npc_image: string;
  npc_name: LocaleName;
}

interface Trader {
  id: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  imageLink: string;
  quest_id: string;
  npc_image: string;
  url_mapping: string;
}

interface RewardedByQuestsCraftUnlock {
  name: LocaleName;
  reward: RewardItem;
  quantity: number;
  npc_name: LocaleName;
  quest_id: string;
  npc_image: string;
  url_mapping: string;
}

interface BarterInfo {
  level: string;
  rewardItems: RewardItem;
  requiredItems: RequiredItem[];
}

interface RewardedByNpc {
  npc_id: string;
  barter_info: BarterInfo;
  npc_name: LocaleName;
  npc_image: string;
}

interface RewardItem {
  item: Item;
}

interface QuestRewardItem {
  item: Item;
  count: number;
  quantity: number;
}

interface RewardedByQuest {
  reward: QuestRewardItem;
  name: LocaleName;
  quest_id: string;
  url_mapping: string;
  npc_image: string;
  npc_name: LocaleName;
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
  name: LocaleName;
  quest_id: string;
  objective: Objective;
  url_mapping: string;
  npc_image: string;
  npc_name: LocaleName;
}
interface ObjectiveWithQuestItem {
  id: string;
  type: string;
  count: number;
  questItem: Item;
  description: string;
}

interface RequiredByQuestSingleItem {
  name: LocaleName;
  quest_id: string;
  objective: ObjectiveWithQuestItem;
  url_mapping: string;
  npc_image: string;
  npc_name: LocaleName;
}

interface HideoutItem {
  id: string;
  count: number;
  image: string;
  item_id: string;
  name: LocaleName;
  level_id: string;
  quantity: number;
  master_id: string;
  master_name: LocaleName;
}

interface UsedInCraft {
  id: string;
  image: string;
  level: number;
  name: LocaleName;
  duration: number;
  level_id: string;
  quantity: number;
  req_item: InventoryEntry[];
  reward_item_id: string;
  master_id: string;
  master_name: LocaleName;
}

export interface RelatedInfo {
  item: ItemDetail;
}

interface CraftItem {
  id: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  width: number;
  height: number;
  gridImageLink: string;
}

interface InventoryEntry {
  item: CraftItem;
  quantity: number;
}
