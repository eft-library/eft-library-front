import type { LocalizedName } from "@/types/api/home";
import type { QuestAffinityType } from "@/types/api/quest";

export interface RoadmapQuestNode extends LocalizedName {
  id: string;
  normalized_name: string;
  trader_id: string;
  kappa_required: boolean;
  min_player_level: number;
  affinity_type: QuestAffinityType | null;
  task_requirements: string[];
  task_next: string[];
  total_x_coordinate: number | null;
  total_y_coordinate: number | null;
  single_x_coordinate: number | null;
  single_y_coordinate: number | null;
  total_kappa_x_coordinate: number | null;
  total_kappa_y_coordinate: number | null;
  single_kappa_x_coordinate: number | null;
  single_kappa_y_coordinate: number | null;
}

export interface RoadmapTraderNode extends LocalizedName {
  id: string;
  normalized_name: string;
  image: string;
  sort_order: number;
  quests: RoadmapQuestNode[];
}

export interface RoadmapEdge {
  id: string;
  source_id: string;
  target_id: string;
  update_time: string;
}

export interface RoadmapResponse {
  node_info: RoadmapTraderNode[];
  edge_info: RoadmapEdge[];
}
