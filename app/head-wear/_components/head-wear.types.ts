import { LocaleName } from "@/components/types/common";

export interface HeadWearViewTypes {
  headWearData: HeadWearData;
}
export interface HeadWearTableTypes {
  headWearData: HeadWearData;
  word: string;
}
interface HeadWearData {
  class_headwear: HeadWearDetail[];
  no_class_headwear: HeadWearDetail[];
}

interface HeadWearInfo {
  weight: number;
  zones: ZonesLocaleName;
  durability: number;
  class_value: number;
  ricochet_chance: RicochetChanceLocaleName;
}

interface HeadWearDetail {
  id: string;
  name: LocaleName;
  category: string;
  image: string;
  image_width: number;
  image_height: number;
  info: HeadWearInfo;
  update_time: string;
  url_mapping: string;
}

interface ZonesLocaleName {
  zones_en: string[];
  zones_ja: string[];
  zones_ko: string[];
}

interface RicochetChanceLocaleName {
  ricochet_chance_en: string;
  ricochet_chance_ja: string;
  ricochet_chance_ko: string;
}
