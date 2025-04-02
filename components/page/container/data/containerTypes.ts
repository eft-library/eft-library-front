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
  name_kr: string;
  image: string;
  name_en: string;
  image_width: number;
  update_time: string;
}
