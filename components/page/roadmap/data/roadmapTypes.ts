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
  name_en: string;
  image: string;
  order: number;
  id: string;
  name_kr: string;
  all_quest: Quest[];
}

// 퀘스트 인터페이스
export interface Quest {
  title_en: string;
  id: string;
  is_kappa: boolean;
  next_list: string[] | null;
  prev_list: string[] | null;
  url_mapping: string;
  npc_value: string;
  title_kr: string;
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
  name_en: string;
  name_kr: string;
}
