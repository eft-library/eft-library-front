import { LocaleName } from "@/components/types/common";

export interface BackpackViewTypes {
  backpackList: BackpackDetail[];
}

export interface BackpackTableTypes {
  backpackList: BackpackDetail[];
  word: string;
}

interface Size {
  width: number;
  height: number;
}

interface BackpackInfo {
  grids: Size[];
  weight: number;
  capacity: number;
}

interface BackpackDetail {
  category: string;
  id: string;
  info: BackpackInfo;
  image_height: number;
  name: LocaleName;
  image: string;
  image_width: number;
  update_time: string;
  url_mapping: string;
}
