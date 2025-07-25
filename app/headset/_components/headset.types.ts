import { LocaleName } from "@/components/types/common";

export interface HeadsetViewTypes {
  headsetList: HeadsetDetail[];
}

export interface HeadsetTableTypes {
  headsetList: HeadsetDetail[];
  word: string;
}

interface HeadsetDetail {
  category: string;
  id: string;
  image_height: number;
  name: LocaleName;
  image: string;
  image_width: number;
  update_time: string;
  url_mapping: string;
}
