export interface RoadmapClient {
  roadmapInfo: RoadmapData;
}

export interface RoadmapData {
  node_info: NPCData[];
  quest_list: string[];
  edge_info: Edge[];
}

interface Edge {
  id: string;
  source_id: string;
  target_id: string;
}

// 최상위 인터페이스
interface NPCData {
  name: LocaleName;
  image: string;
  id: string;
  quests: Quest[];
}

// 퀘스트 인터페이스
export interface Quest {
  name: LocaleName;
  id: string;
  kappa_required: boolean;
  task_next: string[];
  task_requirements: string[];
  url_mapping: string;
  npc_id: string;
  node_color: string;
  single_x_coordinate: number;
  single_y_coordinate: number;
  total_x_coordinate: number;
  total_y_coordinate: number;
}

export interface RoadmapTab {
  npcList: TabNpc[];
  setTabState: (val: string) => void;
  tabState: string;
}

interface TabNpc {
  id: string;
  name: LocaleName;
  color: string;
}
interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}
