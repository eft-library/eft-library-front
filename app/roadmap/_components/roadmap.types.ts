import type {
  Connection,
  Edge as ReactFlowEdge,
  Node,
} from "@xyflow/react";

export interface RoadmapViewTypes {
  roadmapInfo: RoadmapDataTypes;
}

export interface RoadmapServerDataTypes {
  node_info: NPCData[];
  edge_info: Edge[];
}

export interface RoadmapDataTypes extends RoadmapServerDataTypes {
  quest_list: string[];
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
  stats: RoadmapStatsSummary;
  onlyKappa: boolean;
}

export interface Edge {
  id: string;
  source_id: string;
  target_id: string;
}

export type RoadmapNodeType = "npcNode" | "questNode";
export type RoadmapDataType = "npc" | "quest";

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

export interface TabNpc {
  id: string;
  name: LocaleName;
  color: string;
  image: string;
}
export interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}

export interface RoadmapNodeData extends Record<string, unknown> {
  name: LocaleName;
  id: string;
  type: RoadmapDataType;
  image: string;
  kappa_required: boolean;
  url_mapping: string;
  isCheck: boolean;
  task_requirements: string[];
  task_next: string[];
  npc_id: string;
  node_color: string;
  view_only_kappa: boolean;
  onChange?: (data: RoadmapNodeData, isCheck: boolean) => void;
}

export type RoadmapFlowNode = Node<RoadmapNodeData, RoadmapNodeType>;
export type RoadmapFlowEdge = ReactFlowEdge;
export type RoadmapConnection = Connection;

export interface RoadmapStatsSummary {
  allCount: number;
  allKappaCount: number;
  kappaCompleteCount: number;
  completeCount: number;
  kappaQuestRate: number;
  kappaCompleteRate: number;
  completeRate: number;
  overallProgressRate: number;
}
