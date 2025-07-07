import { LocaleName } from "@/components/types/common";

export interface QuestSelectorClient {
  npcList: QuestJson[];
}

interface QuestJson {
  id: string;
  order: number;
  name: LocaleName;
  image: string;
}

export interface QuestCardTypes {
  quest_list: Quest[];
}

export interface TraderCardTypes {
  trader_list: QuestJson[];
}

export interface QuestViewTypes {
  questData: QuestDataTypes;
}

export interface QuestDataTypes {
  quest_list: Quest[];
  trader_list: QuestJson[];
}

export interface Quest {
  id: string;
  wiki_url: string;
  name: LocaleName;
  image: string;
  npc_id: string;
  npc_image: string;
  npc_name: string;
  objectives: Objective[];
  guide: LocaleName;
  update_time: string;
  min_player_level: number;
  url_mapping: string;
  kappa_required: boolean;
  finish_rewards: FinishRewards;
  barter_info: BarterInfo[];
  task_next: TaskWrapper[];
  task_requirements: TaskWrapper[];
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

export interface QuestDetailTypes {
  quest: Quest;
}

export interface Objective {
  id: string;
  type: string;
  description_en: string;
  description_ja: string;
  description_ko: string;
  count?: number;
  items?: RewardItemDetails[];
  questItem?: RewardItemDetails;
  foundInRaid?: boolean;
}

interface BarterInfo {
  level: number;
  rewardItems: BarterItem[];
  requiredItems: BarterItem[];
}

interface BarterItem {
  item: RewardItemDetails;
  quantity: number;
}

interface FinishRewards {
  items: RewardItem[];
  offerUnlock: OfferUnlock[];
  traderStanding: TraderStanding[];
  craftUnlock: CraftUnlock[];
  skillLevelReward: SkillLevelReward[];
}

interface SkillLevelReward {
  level: number;
  name_en: string;
  name_ja: string;
  name_ko: string;
}

interface CraftUnlock {
  level: number;
  station: StationDetail;
  rewardItems: BarterItem[];
}

interface StationDetail {
  id: string;
  name_en: string;
  name_ja: string;
  name_ko: string;
}

interface TraderStanding {
  trader: TraderDetail;
  standing: number;
}

interface OfferUnlock {
  item: RewardItemDetails;
  level: number;
  trader: TraderDetail;
}

interface TraderDetail {
  id: string;
  name_en: string;
  name_ja: string;
  name_ko: string;
  imageLink: string;
  normalizedName: string;
}

interface RewardItem {
  item: RewardItemDetails;
  count: number;
  quantity: number;
}

interface RewardItemDetails {
  id: string;
  name_en: string;
  name_ja: string;
  name_ko: string;
  gridImageLink: string;
  normalizedName: string;
}

export interface TaskWrapper {
  task: Task;
}

interface Task {
  id: string;
  name_en: string;
  name_ja: string;
  name_ko: string;
  normalizedName: string;
}

export interface QuestDetailViewTypes {
  quest: Quest;
}
