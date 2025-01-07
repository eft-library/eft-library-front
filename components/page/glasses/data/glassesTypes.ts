import type { DefenseData } from "../../armorVest/data/armorVestTypes";

export interface GlassesClient {
  glassesData: RigData;
  isClass: boolean;
}

interface RigData {
  class_glasses: DefenseData[];
  no_class_glasses: DefenseData[];
}
