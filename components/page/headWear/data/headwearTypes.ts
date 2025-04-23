export interface HeadWearClient {
  headWearData: HeadWearData;
}

interface HeadWearData {
  class_headwear: HeadWearDetail[];
  no_class_headwear: HeadWearDetail[];
}

interface HeadWearInfo {
  weight: number;
  areas_en: string[];
  areas_kr: string[];
  durability: number;
  class_value: number;
  ricochet_chance: number;
  ricochet_str_en: string;
  ricochet_str_kr: string;
}

interface HeadWearDetail {
  id: string;
  name_en: string;
  name_kr: string;
  category: string;
  image: string;
  image_width: number;
  image_height: number;
  info: HeadWearInfo;
  update_time: string;
  url_mapping: string;
}
