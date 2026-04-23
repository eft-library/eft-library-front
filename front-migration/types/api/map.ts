import type { LocalizedName } from "@/types/api/home";

export interface MapSelectorEntry extends LocalizedName {
  normalized_name: string;
}

export interface MapDetailModel extends MapSelectorEntry {
  id: string;
  three_image: string | null;
  three_json: Array<Record<string, unknown>>;
}

export interface MapDetailResponse {
  map: MapDetailModel;
  related_maps: MapSelectorEntry[];
  top_level_map: MapSelectorEntry[];
}
