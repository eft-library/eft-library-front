import { LocaleName } from "@/components/types/common";

export interface ArmBandViewTypes {
  armBandList: ArmbandDetail[];
}

export interface ArmBandTableTypes {
  armBandList: ArmbandDetail[];
  word: string;
}

interface ArmbandDetail {
  category: string;
  id: string;
  image_height: number;
  name: LocaleName;
  image: string;
  image_width: number;
  update_time: string;
  url_mapping: string;
}
