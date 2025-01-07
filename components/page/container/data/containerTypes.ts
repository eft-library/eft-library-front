export interface ContainerList {
  containerList: Container[];
}

interface Container {
  id: string;
  name_en: string;
  name_kr: string;
  image: string;
  capacity: number;
  grids: Size[];
}

interface Size {
  width: number;
  height: number;
}
