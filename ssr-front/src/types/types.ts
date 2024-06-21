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

interface strID {
  id: string;
}

export interface ThreeItemPath {
  boxArgs: Vector3Like;
  position: Vector3;
  childValue: string;
}

export interface Youtube extends strID {}

export interface BossContents {
  bossList: BossInfo[];
  bossId: string;
}

export interface BossDetail {
  bossList: Boss[];
  bossId: string | true;
}

export interface BossInfo extends strID {
  loot: string[];
  health_image: string[];
  location_guide: string;
}

interface CommonData {
  name_kr: string;
  name_en: string;
  image: string;
}

export interface NPC extends strID, CommonData {}

interface NameImage {
  name: string;
  image: string;
}

interface DefenseData extends NameImage {
  durability: number;
  capacity: number;
  class_value: number;
  areas_kr: string[];
  weight: number;
}

export interface HeadsetList extends NameImage, strID {}

export interface Backpack extends NameImage, strID {
  capacity: number;
  grids: Size[];
  weight: number;
}

export interface Extraction extends strID {
  name: string;
  faction: string;
  single_use: boolean;
  tip: string[];
  image: string;
  image_thumbnail: string;
  always_available: boolean;
  requirements: Requirement[];
  map: string;
}

export interface Icon {
  link: string;
  name: string;
}

export interface Requirement {
  desc: string;
  image: string;
  thumbnail: string;
}

export interface ArmorVest extends DefenseData, strID {}

export interface Headwear extends DefenseData, strID {
  ricochet_str_kr: string;
}

export interface Rig extends DefenseData, strID {}

export interface ExtractionSVG extends ExtractionJPG, Size {
  opacity: string;
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

interface MenuData {
  en_name: string;
  link: string | null;
  order: number;
  value: string;
  kr_name: string;
  image: string | null;
}

export interface Menu extends MenuData {
  sub_menus: SubMenu[];
}

export interface SubMenu extends MenuData {
  parent_value: string;
}

export interface JsonValue extends strID {
  link: string;
  name_kr: string;
  value: string;
  desc_en: string;
  desc_kr: string;
  order: number;
}

interface MapData extends strID {
  name_en: string;
  three_image: string;
  jpg_image: string;
  depth: number;
  link: string;
  name_kr: string;
  three_item_path: ThreeItemPath[];
  mot_image: string;
  jpg_item_path: JpgItemPath[];
  order: number;
  main_image: string;
}

export interface Map extends MapData {
  sub: SubMap[];
}

export interface SubMap extends MapData {
  parent_value: string;
}

export interface Boss extends BossInfo, CommonData {
  health_total: number;
  spawn: string[];
  faction: string;
  location_spawn_chance_en: SpawnChance[];
  location_spawn_chance_kr: SpawnChance[];
  followers_en: string[];
  followers_kr: string[];
}

export interface ContentsSelector {
  onClickEvent: Function;
  itemList: Item[] | Boss[] | JsonValue[];
  currentId: string;
  selectorId: string;
  itemDesc: string;
}

export interface LinkSelector {
  itemList: JsonValue[];
  itemDesc: string;
  itemLink: string;
  mt: number;
}

export interface MapOfTarkov {
  boss_list: Boss[];
  map_info: Map;
  extraction_info: Extraction[];
}

export interface MapOfTarkovContents {
  mapOfTarkov: MapOfTarkov;
}

export interface DividerContents {
  children: ReactNode;
  headText: string;
}

export interface Column extends strID {
  type: string;
  value_kr: string[] | null;
  value_en: string[] | null;
  json_value: JsonValue[] | null;
}

export interface FooterColumn extends strID {
  json_value: FooterJsonValue;
  type: string;
}

export interface FooterJsonValue {
  icon: Icon[];
  text: Text[];
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
  isEffect?: Boolean;
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
  isWeapon?: boolean;
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

export interface PageParent {
  children: ReactNode;
}

export interface OrbitControl {
  reset: () => void;
}

interface Coordinate {
  x: number;
  y: number;
}

export interface ExtractionJPG extends Coordinate {
  color: string;
}

export interface JpgItemPath extends Coordinate {
  childValue: string;
  motherValue: string;
}

export interface DynamicSVG extends Coordinate {
  svgValue: string;
  isEnable: boolean;
}

export interface DynamicJPG extends Coordinate {
  svgValue: AllColorKeys | string;
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

  sub: SubItem[];
}

export interface JPGView {
  map: Map;
  viewItemList: string[];
}

export interface MapDetail {
  mapData: Map;
  onClickMap: Function;
}

export interface SubMapSelector {
  onClickMap: Function;
  mapId: string;
}

export interface SubHeader {
  title: string;
}

export interface Throwable extends strID, NameImage {
  short_name: string;
  min_fuse: number;
  fuse: number;
  min_explosion_distance: number;
  max_explosion_distance: number;
  fragments: number;
}

export interface WeaponThrowable {
  throwableList: Throwable[];
}

export interface WeaponKnife {
  knifeList: JsonArrayText[];
}

interface Category {
  category: string;
}

export interface WeaponStationary extends Category {
  stationaryList: JsonArrayText[];
}

export interface WeaponSpecial extends Category {
  specialList: JsonArrayText[];
}

export interface WeaponDetail extends Category {}

export interface MedicalDetail extends Category {}

export interface Medical extends strID, CommonData, Category {
  short_name: string;
  cures_en: string[];
  cures_kr: string[];
  buff: JsonArrayText[];
  debuff: JsonArrayText[];
  use_time: number;
  uses: number;
  energy_impact: number;
  hydration_impact: number;
  painkiller_duration: number;
  hitpoints: number;
}

export interface MedicalList {
  medicalList: Medical[];
}

export interface RigList {
  class_rig: Rig[];
  no_class_rig: Rig[];
}

export interface WeaponGun extends Category {
  gunList: JsonArrayText[];
}

export interface ItemSelector {
  viewItemList: string[];
  onClickItem: Function;
  onClickAllItem: Function;
  originItemList: JpgItemPath[];
}

export interface HeadwearList {
  class_head_wear: Headwear[];
  no_class_head_wear: Headwear[];
}

export interface Quest extends strID, CommonData {
  npc_value: string;
  title_kr: string;
  title_en: string;
  required_kappa: boolean;
  objectives_kr: string[];
  rewards_kr: string[];
  guide: string;
  requires: JsonArrayText[];
  next: JsonArrayText[];
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

export interface Container extends strID {
  name: string;
  image: string;
  capacity: number;
  grids: Size[];
}

export interface Key extends strID {
  name: string;
  image: string;
  uses: number;
  use_map_en: string[];
  use_map_kr: string[];
  map_value: string[];
}

export interface Container extends NameImage {
  capacity: number;
  grids: Size[];
}

export interface Key extends NameImage {
  uses: number;
  use_map_en: string[];
  use_map_kr: string[];
  map_value: string[];
}

export interface KeyDetail extends Category {}

export interface Provisions extends CommonData, strID, Category {
  short_name: string;
  energy: number;
  hydration: number;
  stim_effects: JsonArrayText[];
}

export interface ImageZoom {
  originalImg: string;
  thumbnail: string;
  needFormat?: boolean;
  isMax?: boolean;
  isLoop?: boolean;
}
