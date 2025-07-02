export interface KeyClient {
  keyList: KeyDetail[];
}

interface KeyInfo {
  uses: number;
  use_map: LocaleMapName;
  map_value: string[];
}

interface KeyDetail {
  category: string;
  id: string;
  info: KeyInfo;
  image_height: number;
  name: LocaleName;
  image: string;
  image_width: number;
  update_time: string;
  url_mapping: string;
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}

interface LocaleMapName {
  en: string[];
  ja: string[];
  ko: string[];
}
