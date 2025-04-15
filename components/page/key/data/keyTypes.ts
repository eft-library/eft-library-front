export interface KeyClient {
  keyList: KeyDetail[];
}

interface KeyInfo {
  uses: number;
  use_map_en: string[];
  use_map_kr: string[];
  map_value: string[];
}

interface KeyDetail {
  category: string;
  id: string;
  info: KeyInfo;
  image_height: number;
  name_kr: string;
  image: string;
  name_en: string;
  image_width: number;
  update_time: string;
  url_mapping: string;
}
