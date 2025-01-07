import type { DefenseData } from "../../armorVest/data/armorVestTypes";

export interface HeadWearClient {
  headWearData: HeadWearData;
  isClass: boolean;
}

interface HeadWearData {
  class_headwear: DefenseData[];
  no_class_headwear: DefenseData[];
}
