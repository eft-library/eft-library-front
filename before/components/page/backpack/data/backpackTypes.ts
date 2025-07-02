export interface BackpackList {
  backpackList: BackpackDetail[];
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
interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}
