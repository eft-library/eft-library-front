import { LocaleName } from "@/components/types/common";

export interface FaceCoverViewTypes {
  face_cover_data: FaceCoverData;
}

export interface FaceCoverTableTypes {
  face_cover_data: FaceCoverData;
  word: string;
}

interface FaceCoverData {
  class_face_cover: FaceCoverDetail[];
  no_class_face_cover: FaceCoverDetail[];
}

interface FaceCoverInfo {
  weight: number;
  zones: ZonesLocaleName;
  class_value: number;
  ricochet_chance: RicochetChanceLocaleName;
  durability: number;
}

interface FaceCoverDetail {
  id: string;
  name: LocaleName;
  category: string;
  image: string;
  image_width: number;
  image_height: number;
  info: FaceCoverInfo;
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
