import type { Objective, TaskWrapper } from "../../quest/data/questTypes";

export interface Planner {
  npc_id: string;
  npc_name: LocaleName;
  npc_image: string;
  quest_info: PlannerInfo[];
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

export interface PlannerNextQuest {
  url_mapping: string;
  id: string;
  name: string;
  name_kr: string;
}
export interface PlannerClientQuest {
  userQuestList: Planner[];
}

export interface FetchSchema {
  status: number;
  msg: string;
  data: Planner[];
}

export interface PlannerList {
  userQuest: Planner;
  successQuest: (val: string, nextVal: any) => void;
  checkedQuest: string[];
  checkedBox: (val: string, pr: boolean) => void;
  isPreview?: boolean;
}
export interface PlannerPopOver {
  min_player_level: number;
}

export interface PlannerSelector {
  updateQuest: Function;
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}
