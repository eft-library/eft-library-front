export interface RigListTypes {
  rig_data: RigData;
}

interface RigData {
  class_rig: RigDetail[];
  no_class_rig: RigDetail[];
}

interface RigInfo {
  weight?: number;
  zones: ZonesLocaleName;
  capacity?: number;
  durability?: number;
  class_value?: number;
}

interface RigDetail {
  id: string;
  name: LocaleName;
  category: string;
  image: string;
  image_width: number;
  image_height: number;
  info: RigInfo;
  update_time: string;
  url_mapping: string;
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}

interface ZonesLocaleName {
  zones_en: string[];
  zones_ja: string[];
  zones_ko: string[];
}
