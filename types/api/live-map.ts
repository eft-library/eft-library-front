import type { MapSelectorEntry, FindInfo } from "@/types/api/map-of-tarkov";

export interface LiveMapFloor {
  id: string;
  map_id: string;
  floor_no: number;
  name_en: string;
  name_ko: string;
  name_ja: string;
  image: string;
  min_z: number | null;
  max_z: number | null;
}

export interface LiveMapPoint {
  id: string;
  map_id: string;
  floor_id: string | null;
  point_type: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  x: number;
  y: number;
  z: number | null;
}

export interface LiveMapDetailResponse {
  map_selector: MapSelectorEntry[];
  floors: LiveMapFloor[];
  quest_points: LiveMapPoint[];
  static_points: LiveMapPoint[];
}

export interface LiveMapPageData extends LiveMapDetailResponse {
  coordinate_info: FindInfo | null;
}
