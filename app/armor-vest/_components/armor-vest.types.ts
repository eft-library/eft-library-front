export interface ArmorVestListTypes {
  armorVestList: ArmorVestDetail[];
}

interface ArmorVestInfo {
  weight: number;
  zones: ZonesLocaleName;
  durability: number;
  class_value: number;
}

interface ArmorVestDetail {
  category: string;
  id: string;
  info: ArmorVestInfo;
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

interface ZonesLocaleName {
  zones_en: string[];
  zones_ja: string[];
  zones_ko: string[];
}
