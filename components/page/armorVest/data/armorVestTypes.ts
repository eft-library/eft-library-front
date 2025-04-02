export interface ArmorVestList {
  armorVestList: ArmorVestDetail[];
}

interface ArmorVestInfo {
  weight: number;
  areas_en: string[];
  areas_kr: string[];
  durability: number;
  class_value: number;
}

interface ArmorVestDetail {
  category: string;
  id: string;
  info: ArmorVestInfo;
  image_height: number;
  name_kr: string;
  image: string;
  name_en: string;
  image_width: number;
  update_time: string;
}
