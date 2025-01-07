export interface RoadmapClient {
  roadmapInfo: RoadmapData;
}

export interface RoadmapData {
  quest_info: NPCData[];
  quest_list: string[];
}

// 최상위 인터페이스
interface NPCData {
  name_en: string;
  image: string;
  order: number;
  id: string;
  name_kr: string;
  update_time: string;
  all_quest: Quest[];
}

// 퀘스트 인터페이스
interface Quest {
  title_en: string;
  id: string;
  objectives_en: string[];
  rewards_en: string[];
  required_kappa: boolean;
  requirements_kr: string[] | null;
  order: number;
  guide: string | null;
  next: string | null;
  url_mapping: string;
  npc_value: string;
  title_kr: string;
  objectives_kr: string[];
  rewards_kr: string[];
  requirements_en: string[] | null;
  update_time: string;
  requires: Requirement[];
  is_event: boolean;
}

// 퀘스트 요구 조건 인터페이스
interface Requirement {
  id: string;
  name: string;
  name_kr: string;
  is_other: boolean;
  url_mapping: string;
}
