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
  parent_value: string;
  main_image: string;
  children: MapData[];
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
  mapData: MapData;
  mapSelector: MapSelector[];
}
export interface ThreeModel {
  filterInfo: SubFilter[];
  viewItemList: string[];
  map: MapData;
  zoomLevel: number;
}
export interface JPGView {
  map: MapData;
  viewItemList: string[];
}

export interface MapInfoData {
  map: MapData;
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
