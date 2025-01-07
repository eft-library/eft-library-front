import type { DefenseData } from "../../armorVest/data/armorVestTypes";

export interface FaceCoverClient {
  face_cover_data: FaceCoverData;
  isClass: boolean;
}

interface FaceCoverData {
  class_face_cover: DefenseData[];
  no_class_face_cover: DefenseData[];
}
