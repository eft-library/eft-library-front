export interface ContainerList {
  containerList: ContainerDetail[];
}

interface Size {
  width: number;
  height: number;
}

interface ContainerInfo {
  grids: Size[];
  width: number;
  height: number;
  capacity: number;
}

interface ContainerDetail {
  category: string;
  id: string;
  info: ContainerInfo;
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
