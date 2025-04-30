import { Vector3 } from "three";

type Vector3Like = [
  width?: number,
  height?: number,
  depth?: number,
  widthSegments?: number,
  heightSegments?: number,
  depthSegments?: number
];
export interface ThreeItemPath {
  boxArgs: Vector3Like;
  position: Vector3;
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
  mot_image: string;
  jpg_item_path: JpgItemPath[];
  order: number;
  main_image: string;
  sub: SubMap[];
}

export interface SubMap extends MapData {
  parent_value: string;
}
interface MapJson {
  geometry: string;
  material: string;
}

export interface ItemSelector {
  viewItemList: string[];
  onClickItemAction: (val: string) => void;
  onClickAllItemAction: (val: boolean) => void;
  originItemList: JpgItemPath[];
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

export interface ThreeviewDetail {
  mapData: MapData;
  viewItemList: string[];
}
export interface SubMapSelector {
  onClickMapAction: (val: MapData) => void;
  mapId: string;
  mapSelector: MapSelector[];
}
export interface ThreeModel {
  filterInfo: SubFilter[];
  viewItemList: string[];
  map: SubMap | Map;
  zoomLevel: number;
}
export interface Map extends MapData {
  sub: SubMap[];
}
export interface JPGView {
  map: Map;
  viewItemList: string[];
}

export interface MapInfoData {
  map: Map;
  map_selector: MapSelector[];
}

export interface MapDetailClient {
  mapInfo: MapInfoData;
}

interface MapSelector {
  id: string;
  link: string;
  name: LocaleName;
}

export interface MapWrapper {
  mapData: Map;
  mapSelector: MapSelector[];
  onClickMapAction: (val: MapData) => void;
}

export interface MapSelectorClient {
  mapType: MapType;
}

export interface MapType {
  id: string;
  json_value: MapJson[];
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
