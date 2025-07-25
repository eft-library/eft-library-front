import { LocaleName } from "@/components/types/common";

export interface ContainerViewTypes {
  containerList: ContainerDetail[];
}

export interface ContainerTableTypes {
  containerList: ContainerDetail[];
  word: string;
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
