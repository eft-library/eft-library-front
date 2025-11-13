type BoxArgs = [
  width?: number,
  height?: number,
  depth?: number,
  widthSegments?: number,
  heightSegments?: number,
  depthSegments?: number
];

export interface ThreeItemPath {
  boxArgs: BoxArgs; // 그대로 사용 가능
  position: [number, number, number]; // Vector3 → 배열로 변경
  childValue: string;
  filterInfo: SubFilter[];
  zoomLevel: number;
}
interface SubFilter {
  parent_value: string;
  name: LocaleName;
  image: string;
  value: string;
}

export interface MapData {
  id: string;
  three_image: string;
  jpg_image: string;
  depth: number;
  link: string;
  name: LocaleName;
  map_json: MapJson[];
  three_item_path: ThreeItemPath[];
  mot_image: LocaleName;
  jpg_item_path: JpgItemPath[];
  order: number;
  parent_value: string;
  main_image: string;
  children: MapData[];
}

interface MapJson {
  geometry: string;
  material: string;
}

export interface ItemFilterTypes {
  viewItemList: string[];
  onClickItemAction: (val: string) => void;
  onClickAllItemAction: (val: boolean) => void;
  originItemList: JpgItemPath[];
  mapType: string;
  setMapType: (val: string) => void;
}

export interface JpgItemPath {
  childValue: string;
  motherValue: string;
  x: number;
  y: number;
  scale: number;
  quest_info: UserNextQuest[];
}
interface UserNextQuest {
  url_mapping: string;
  id: string;
  name: LocaleName;
}

export interface Map3DTypes {
  mapData: MapData;
  viewItemList?: string[];
}
export interface MapSelectorTypes {
  onClickMapAction: (val: MapData) => void;
  mapData: MapData;
  mapSelector: MapSelector[];
}
export interface ThreeModel {
  filterInfo: SubFilter[];
  viewItemList: string[];
  map: MapData;
  zoomLevel: number;
}
export interface Map2DTypes {
  mapData: MapData;
  viewItemList: string[];
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
