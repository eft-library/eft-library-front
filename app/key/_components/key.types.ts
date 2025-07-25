import { LocaleName } from "@/components/types/common";

export interface KeyViewTypes {
  keyList: KeyDetail[];
}

export interface KeyTableTypes {
  keyList: KeyDetail[];
  word: string;
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

interface LocaleMapName {
  en: string[];
  ja: string[];
  ko: string[];
}
