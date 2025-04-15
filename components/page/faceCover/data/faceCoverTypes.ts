export interface FaceCoverClient {
  face_cover_data: FaceCoverData;
  isClass: boolean;
}

interface FaceCoverData {
  class_face_cover: FaceCoverDetail[];
  no_class_face_cover: FaceCoverDetail[];
}

interface FaceCoverInfo {
  weight: number;
  areas_en: string[];
  areas_kr: string[];
  class_value: number;
  ricochet_chance: number;
  ricochet_str_en: string;
  ricochet_str_kr: string;
  durability: number;
}

interface FaceCoverDetail {
  id: string;
  name_en: string;
  name_kr: string;
  category: string;
  image: string;
  image_width: number;
  image_height: number;
  info: FaceCoverInfo;
  update_time: string;
  url_mapping: string;
}
