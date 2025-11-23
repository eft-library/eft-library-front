import { Quest } from "@/app/quest/_components/quest.types";

export interface Planner {
  npc_id: string;
  npc_name: LocaleName;
  npc_image: string;
  quest_info: PlannerInfo[];
}

export interface PlannerCardTypes {
  npcInfo: Planner;
  openNPCs: Record<string, boolean>;
  toggleNPC: (npcId: string) => void;
  allNPCSelected: boolean;
  toggleNPCSelection: (npc: Planner) => void;
  selectedActiveQuests: string[];
  toggleActiveQuestSelection: (questId: string) => void;
  successUserQuest: (questId: string, next: TaskWrapper[]) => void;
}

export interface PreviewSelectTypes {
  selectedItems: Quest[];
  updateQuest: () => void;
  removeSelected: (val: Quest) => void;
  setSelectedItems: (val: Quest[]) => void;
}

interface PlannerInfo {
  quest_id: string;
  quest_name: LocaleName;
  objectives: Objective[];
  next: TaskWrapper[];
  url_mapping: string;
  task_requirements: TaskWrapper[];
  min_player_level: number;
}

export interface SearchFilterTypes {
  selectedItems: Quest[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Quest[]>>;
}

export interface PlannerViewTypes {
  userQuestList: Planner[];
}

export interface FetchSchema {
  status: number;
  msg: string;
  data: Planner[];
}

export interface PlannerList {
  userQuest: Planner;
  successQuest: (val: string, nextVal: TaskWrapper[]) => void;
  checkedQuest: string[];
  checkedBox: (val: string, pr: boolean) => void;
  isPreview?: boolean;
}
export interface PlannerPopOver {
  min_player_level: number;
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}
interface Objective {
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

interface RewardItemDetails {
  id: string;
  name_en: string;
  name_ja: string;
  name_ko: string;
  gridImageLink: string;
  normalizedName: string;
}

interface TaskWrapper {
  task: Task;
}

interface Task {
  id: string;
  name_en: string;
  name_ja: string;
  name_ko: string;
  normalizedName: string;
}
