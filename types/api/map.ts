import type { LocalizedName } from "@/types/api/home";

export interface MapSelectorEntry extends LocalizedName {
  normalized_name: string;
}

export interface MapMeshLayer {
  geometry: string;
  material: string;
}

export interface MapDetailModel extends MapSelectorEntry {
  id: string;
  three_image: string | null;
  three_json: MapMeshLayer[];
}

export interface MapDetailResponse {
  map: MapDetailModel;
  related_maps: MapSelectorEntry[];
  top_level_map: MapSelectorEntry[];
}
