export interface MapData {
  id: string;
  three_image: string;
  depth: number;
  link: string;
  name: LocaleName;
  map_json: MapJson[];
  mot_image: LocaleName;
  order: number;
  parent_value: string;
  main_image: string;
  children: MapData[];
}

interface MapJson {
  geometry: string;
  material: string;
}

export interface Map3DTypes {
  mapData: MapData;
}
export interface MapSelectorTypes {
  onClickMapAction: (val: MapData) => void;
  mapData: MapData;
  mapSelector: MapSelector[];
}
export interface ThreeModel {
  map: MapData;
  zoomLevel: number;
}

export interface MapInfoData {
  map: MapData;
  map_selector: MapSelector[];
}

export interface MapViewTypes {
  mapInfo: MapInfoData;
}

export interface MapSelector {
  id: string;
  link: string;
  name: LocaleName;
}

export interface MapWrapper {
  mapData: MapData;
  mapSelector: MapSelector[];
  onClickMapAction: (val: MapData) => void;
}

interface MapJson {
  id: string;
  link: string;
  order: number;
  name: LocaleName;
  sub_list: SubMapJson[];
}

interface SubMapJson {
  id: string;
  order: number;
  depth: number;
  name: LocaleName;
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}
