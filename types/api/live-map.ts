import type { MapSelectorEntry } from "@/types/api/map-of-tarkov";
import type {
  QuestDetailItem,
  QuestObjectiveMap,
  QuestRelatedEntry,
  QuestRewardItem,
  QuestRewardStanding,
  QuestRewardGroup,
  QuestTraderEntry,
} from "@/types/api/quest";

export interface LiveMapFloor {
  id: string;
  map_id: string;
  floor_no: number;
  name_en: string | null;
  name_ko: string | null;
  name_ja: string | null;
  image: string | null;
  min_z: number | null;
  max_z: number | null;
  map_bounds: [[number, number], [number, number]] | null;
  default_zoom_level: number | null;
  zones: LiveMapFloorZone[];
}

export interface LiveMapFloorZone {
  id: string;
  floor_id: string;
  map_id: string;
  area_x_min: number;
  area_x_max: number;
  area_z_min: number;
  area_z_max: number;
  override_min_z: number;
  override_max_z: number;
}

export interface LiveMapCoordinateInfo {
  id: string;
  map_bounds: [[number, number], [number, number]];
  image_bounds: [[number, number], [number, number]];
  default_zoom_level: number;
}

export interface LiveMapPointDetail {
  id: string;
  description_en: string | null;
  description_ko: string | null;
  description_ja: string | null;
  image: string | null;
}

export interface LiveMapObjectivePoint {
  id: string;
  map_id: string;
  floor_id: string | null;
  floor_no: number | null;
  x: number;
  z: number;
  y: number;
  details: LiveMapPointDetail[];
  map?: MapSelectorEntry | null;
}

export interface LiveMapObjectiveItem {
  quantity?: number;
  count?: number | null;
  found_in_raid?: boolean | null;
  item_role?: string | null;
  item_type?: string;
  item: QuestDetailItem;
}

export interface LiveMapQuestObjective {
  objective_id: string;
  type: string | null;
  description_en: string | null;
  description_ko: string | null;
  description_ja: string | null;
  count: number | null;
  found_in_raid: boolean | null;
  items: LiveMapObjectiveItem[];
  required_keys: QuestDetailItem[];
  maps: QuestObjectiveMap[];
  live_map_points?: LiveMapObjectivePoint[];
  live_map_point?: LiveMapObjectivePoint | null;
}

export interface LiveMapQuestInfo {
  quest: {
    id: string;
    normalized_name: string;
    name_en: string;
    name_ko: string;
    name_ja: string;
    experience: number | null;
    delay_max: number | null;
    delay_min: number | null;
    kappa_required: boolean;
    min_player_level: number | null;
    wiki_url: string | null;
  };
  trader: QuestTraderEntry | null;
  require_quests: QuestRelatedEntry[];
  next_quests: QuestRelatedEntry[];
  objectives: LiveMapQuestObjective[];
  finish_rewards: QuestRewardGroup;
}

export interface LiveMapQuestSummaryInfo {
  quest: {
    id: string;
    normalized_name: string;
    name_en: string;
    name_ko: string;
    name_ja: string;
    min_player_level: number | null;
    kappa_required?: boolean | null;
  } | null;
  trader: QuestTraderEntry | null;
  objective: {
    objective_id: string;
    type: string | null;
    description_en: string | null;
    description_ko: string | null;
    description_ja: string | null;
    count: number | null;
    found_in_raid: boolean | null;
  } | null;
}

export interface LiveMapQuestPoint {
  id: string;
  map_id: string;
  floor_id: string | null;
  floor_no: number | null;
  x: number;
  z: number;
  y: number;
  quest_info: LiveMapQuestSummaryInfo | null;
}

export interface StoryRequirement {
  id: string;
  requirement_type: string | null;
  description_en: string | null;
  description_ko: string | null;
  description_ja: string | null;
  details?: LiveMapPointDetail[];
  items?: Array<{
    quantity: number | null;
    found_in_raid: boolean | null;
    item_role: string | null;
    item: QuestDetailItem | null;
  }>;
  maps?: QuestObjectiveMap[];
  live_map_points?: LiveMapObjectivePoint[];
}

export interface StoryObjective {
  objective_id: string;
  parent_objective_id: string | null;
  objective_type: string | null;
  description_en: string | null;
  description_ko: string | null;
  description_ja: string | null;
  count: number | null;
  is_optional: boolean;
  items: LiveMapObjectiveItem[];
  maps: QuestObjectiveMap[];
  live_map_points: LiveMapObjectivePoint[];
  rewards: {
    items: QuestRewardItem[];
    texts: Array<{
      id: string;
      reward_type: string | null;
      description_en: string | null;
      description_ko: string | null;
      description_ja: string | null;
    }>;
  };
  children: StoryObjective[];
}

export interface StoryInfo {
  story: {
    id: string;
    title_en: string;
    title_ko: string;
    title_ja: string;
  };
  requirements: StoryRequirement[];
  objectives: StoryObjective[];
  finish_rewards?: {
    trader_standing: QuestRewardStanding[];
    items: QuestRewardItem[];
  };
}

export interface StorySummaryInfo {
  story: StoryInfo["story"] | null;
  objective: {
    objective_id: string;
    description_en: string | null;
    description_ko: string | null;
    description_ja: string | null;
  } | null;
  requirement: {
    id: string;
    requirement_type: string | null;
    description_en: string | null;
    description_ko: string | null;
    description_ja: string | null;
  } | null;
}

export interface LiveMapStoryPoint {
  id: string;
  story_id: string;
  objective_id: string | null;
  requirement_id: string | null;
  map_id: string;
  floor_id: string | null;
  floor_no: number | null;
  x: number;
  z: number;
  y: number | null;
  story_info: StorySummaryInfo | null;
}

export interface EventObjective {
  objective_id: string;
  parent_objective_id: string | null;
  objective_type: string | null;
  description_en: string | null;
  description_ko: string | null;
  description_ja: string | null;
  count: number | null;
  is_optional: boolean;
  items: LiveMapObjectiveItem[];
  live_map_points: LiveMapObjectivePoint[];
  children: EventObjective[];
}

export interface EventInfo {
  event: {
    id: string;
    title_en: string;
    title_ko: string;
    title_ja: string;
    is_active: boolean;
  };
  trader: QuestTraderEntry | null;
  objectives: EventObjective[];
  finish_rewards?: {
    trader_standing: QuestRewardStanding[];
    items: QuestRewardItem[];
    texts: Array<{
      id: string;
      reward_type: string | null;
      description_en: string | null;
      description_ko: string | null;
      description_ja: string | null;
    }>;
  };
}

export interface EventSummaryInfo {
  event: EventInfo["event"];
  trader: QuestTraderEntry | null;
  objective: {
    objective_id: string;
    description_en: string | null;
    description_ko: string | null;
    description_ja: string | null;
  } | null;
}

export interface LiveMapEventPoint {
  id: string;
  event_id: string;
  objective_id: string | null;
  map_id: string;
  floor_id: string | null;
  floor_no: number | null;
  x: number;
  z: number;
  y: number;
  event_info: EventSummaryInfo | null;
}

export interface LiveMapStaticPoint {
  id: string;
  map_id: string;
  floor_id: string | null;
  floor_no: number | null;
  category: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  description_en: string | null;
  description_ko: string | null;
  description_ja: string | null;
  image: string | null;
  x: number;
  z: number;
  y: number;
  metadata: Record<string, unknown> | null;
}

export interface LiveMapDetailResponse {
  map_selector: MapSelectorEntry[];
  floors: LiveMapFloor[];
  quest_points: LiveMapQuestPoint[];
  story_points: LiveMapStoryPoint[];
  event_points: LiveMapEventPoint[];
  static_points: LiveMapStaticPoint[];
}

export interface LiveMapPageData extends LiveMapDetailResponse {
  coordinate_info: LiveMapCoordinateInfo | null;
}
