import { type AllColorKeys } from "@/util/consts/colorConsts";
import type { ReactNode } from "react";
import { Vector3 } from "three";
import { Collada } from "three/examples/jsm/loaders/ColladaLoader.js";

export type Vector3Like = [
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
}

export interface Youtube {
  id: string;
}

export interface BossContents {
  bossList: BossInfo[];
  bossId: string;
}

export interface BossInfo {
  id: string;
  loot: string[];
  health_image: string[];
  location_guide: string;
}

export interface NPC {
  id: string;
  image: string;
  name_kr: string;
}

export interface ArmorVest {
  name: string;
  image: string;
  durability: number;
  capacity: number;
  class_value: number;
  areas_kr: string[];
  weight: number;
}

export interface ExtractionSVG extends ExtractionJPG {
  width: number;
  height: number;
  opacity: string;
}

export interface ExtractionJPG {
  x: number;
  y: number;
  color: string;
}

export interface Size {
  width: number;
  height: number;
}

export interface SpawnChance {
  order: number;
  chance: number;
  location: string;
}

export interface Boss {
  id: string;
  name_kr: string;
  name_en: string;
  image: string;
  health_total: number;
  loot: string[];
  spawn: string[];
  faction: string;
  location_spawn_chance_en: SpawnChance[];
  location_spawn_chance_kr: SpawnChance[];
  followers_en: string[];
  followers_kr: string[];
  health_image: string[];
  location_guide: string;
  update_time: string;
}

export interface ContentsSelector {
  onClickEvent: Function;
  itemList: Item[] | Boss[] | JsonValue[];
  currentId: string;
  selectorId: string;
  itemDesc: string;
}

export interface MapOfTarkov {
  boss_list: Boss[];
  map_info: Map;
  extraction_info: Extraction[];
}

export interface Extraction {
  name: string;
  faction: string;
  single_use: boolean;
  tip: string[];
  update_time: string;
  image: string;
  id: string;
  always_available: boolean;
  requirements: Requirement[];
  map: string;
}

export interface Requirement {
  desc: string;
  image: string;
}

export interface MapOfTarkovContents {
  mapOfTarkov: MapOfTarkov;
}

export interface DividerContents {
  children: ReactNode;
  headText: string;
}

export interface Column {
  id: string;
  type: string;
  update_time: string;
  value_kr: string[] | null;
  value_en: string[] | null;
  json_value: JsonValue[] | null;
}

export interface FooterColumn {
  id: string;
  json_value: FooterJsonValue;
  type: string;
}

export interface FooterJsonValue {
  icon: Icon[];
  text: Text[];
}

export interface Icon {
  link: string;
  name: string;
}

export interface Text {
  value: string;
}

export interface GridContents {
  children: ReactNode;
  columnDesign: Array<number | null>;
}

export interface GridCenterText {
  value: string | number;
}

export interface RenderArrayText {
  arrayText: string[];
}

export interface JsonArrayText {
  [key: string]: any;
}

export interface RenderJsonText {
  jsonArrayText: JsonArrayText[];
  jatType: string;
  isDivider: boolean;
}

export interface RenderText {
  text: string | number;
}

export interface GridTitle {
  columnDesign: Array<number | null>;
  column: string[];
  isShadow: boolean;
  shadowColor: string;
}

export interface Menu {
  en_name: string;
  link: string | null;
  order: number;
  update_time: string;
  value: string;
  kr_name: string;
  image: string | null;
  sub_menus: SubMenu[];
}

export interface SubMenu {
  parent_value: string;
  en_name: string;
  order: number;
  update_time: string;
  kr_name: string;
  value: string;
  link: string;
  image: string;
}

export interface SliderOption {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
  draggable: boolean;
}

export interface ImageSlider {
  mapList: any[];
  imagePath: string;
  sliderOption: SliderOption;
  useZoom: boolean;
}

export interface JsonValue {
  id: string;
  link: string;
  name_kr: string;
  value: string;
  desc_en: string;
  desc_kr: string;
  order: number;
}

export interface LinkSelector {
  itemList: JsonValue[];
  itemDesc: string;
  itemLink: string;
  mt: number;
}

export interface BossDetail {
  bossList: Boss[];
  bossId: string | true;
}

export interface PageParent {
  children: ReactNode;
}

export interface OrbitControl {
  reset: () => void;
}

export interface JpgItemPath {
  x: number;
  y: number;
  childValue: string;
  motherValue: string;
}

export interface SubItem {
  value: string;
  kr: string;
  en: string;
}

export interface Item {
  value: string;
  kr: string;
  en: string;
  update_time: string;
  sub: SubItem[];
}

export interface JPGView {
  map: Map;
  viewItemList: string[];
}

export interface Map {
  name_en: string;
  three_image: string;
  jpg_image: string;
  depth: number;
  link: string;
  update_time: string;
  name_kr: string;
  id: string;
  three_item_path: ThreeItemPath[];
  jpg_item_path: JpgItemPath[];
  order: number;
  main_image: string;
  sub: SubMap[];
}

export interface SubMapSelector {
  onClickMap: Function;
  mapId: string;
}

export interface SubMap {
  name_en: string;
  three_image: string;
  three_item_path: ThreeItemPath[];
  jpg_item_path: JpgItemPath[];
  order: number;
  parent_value: string;
  update_time: string;
  name_kr: string;
  id: string;
  jpg_image: string;
  depth: number;
  link: string;
  main_image: string;
}

export interface DynamicSVG {
  x: number;
  y: number;
  svgValue: string;
  isEnable: boolean;
}

export interface DynamicJPG {
  x: number;
  y: number;
  svgValue: AllColorKeys | string;
}

export interface SubHeader {
  title: string;
}

export interface WeaponThrowable {
  throwableList: JsonArrayText[];
}

export interface WeaponKnife {
  knifeList: JsonArrayText[];
}

// interface StationaryList {
//     name: string;
//     short_name: string;
//     image: string;
//     category: string;
//     caliber: string;
//     modes_kr: string[];
//     fire_rate: number;
//     carliber: string;
//   }

export interface WeaponStationary {
  stationaryList: JsonArrayText[];
  category: string;
}

// interface SpecialListType {
//     name: string;
//     short_name: string;
//     image: string;
//     category: string;
//     caliber: string;
//     modes_kr: string[];
//     fire_rate: number;
//     carliber: string;
//   }
export interface WeaponSpecial {
  specialList: JsonArrayText[];
  category: string;
}

export interface WeaponDetail {
  category: string;
}

export interface Rig {
  name: string;
  image: string;
  durability: number;
  capacity: number;
  class_value: string;
  areas_kr: string[];
  weight: number;
}

export interface RigList {
  class_rig: Rig[];
  no_class_rig: Rig[];
}

// interface GunListType {
//     name: string;
//     short_name: string;
//     image: string;
//     category: string;
//     caliber: string;
//     modes_kr: string[];
//     fire_rate: number;
//     carliber: string;
//     default_ammo: string;
//     ergonomics: number;
//     recoil_horizontal: number;
//     recoil_vertical: number;
//   }

export interface WeaponGun {
  gunList: JsonArrayText[];
  category: string;
}

export interface ItemSelector {
  viewItemList: string[];
  onClickItem: Function;
  onClickAllItem: Function;
  originItemList: JpgItemPath[];
}

export interface Headwear {
  name: string;
  image: string;
  durability: number;
  capacity: number;
  class_value: string;
  areas_kr: string[];
  weight: number;
  ricochet_str_kr: string;
}

export interface HeadwearList {
  class_head_wear: Headwear[];
  no_class_head_wear: Headwear[];
}

export interface HeadsetList {
  name: string;
  image: string;
}

export interface Quest {
  id: string;
  npc_value: string;
  name_kr: string;
  name_en: string;
  title_kr: string;
  title_en: string;
  required_kappa: boolean;
  objectives_kr: string[];
  rewards_kr: string[];
  guide: string;
  image: string;
}

export interface QuestContents {
  quest: Quest;
}

export interface QuestInfo {
  quest: Quest;
}

export interface ThreeView {
  map: Map;
  viewItemList: string[];
}

export interface MapOfTarkovExtraction {
  extractionList: Extraction[];
}

export interface ColladaData {
  colladaData: Collada;
}

export interface TopNaviLogo {
  color: string;
}
