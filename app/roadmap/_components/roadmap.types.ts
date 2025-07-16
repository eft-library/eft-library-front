export interface RoadmapViewTypes {
  roadmapInfo: RoadmapDataTypes;
}

export interface RoadmapDataTypes {
  node_info: NPCData[];
  quest_list: string[];
  edge_info: Edge[];
}

export interface ControlPanelTypes {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  handleSearch: () => void;
  checkAllNodes: () => void;
  uncheckAllNodes: () => void;
  onClickSave: () => void;
  onClickKappaFilter: () => void;
  onlyKappa: boolean;
}

export interface StatsPanelTypes {
  getAllCount: number;
  getAllKappaCount: number;
  getKappaCompleteCount: number;
  getCompleteCount: number;
  onlyKappa: boolean;
}

export interface Edge {
  id: string;
  source_id: string;
  target_id: string;
}

// 최상위 인터페이스
export interface NPCData {
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
  single_kappa_x_coordinate: number;
  single_kappa_y_coordinate: number;
  total_kappa_x_coordinate: number;
  total_kappa_y_coordinate: number;
}

export interface TraderTabTypes {
  npcList: TabNpc[];
  setTabState: (val: string) => void;
  tabState: string;
}

interface TabNpc {
  id: string;
  name: LocaleName;
  color: string;
  image: string;
}
interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}
