import { LocaleName } from "@/components/types/common";

export interface GlassesViewTypes {
  glassesData: RigData;
}

export interface GlassesTableTypes {
  glassesData: RigData;
  word: string;
}

interface RigData {
  class_glasses: GlassesDetail[];
  no_class_glasses: GlassesDetail[];
}

interface GlassesInfo {
  durability: number;
  class_value: number;
  blindness_protection: number;
}

interface GlassesDetail {
  id: string;
  name: LocaleName;
  category: string;
  image: string;
  image_width: number;
  image_height: number;
  info: GlassesInfo;
  update_time: string;
  url_mapping: string;
}
