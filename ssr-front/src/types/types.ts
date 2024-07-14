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
  filterInfo: SubFilter[];
}

export interface ThreeModel {
  filterInfo: SubFilter[];
  viewItemList: string[];
  map: SubMap | Map;
}

export interface News {
  game_version: string;
  arena_version: string;
  patch_link: string;
  event_link: string;
  youtube_id: string;
  next_update: string[];
}

export interface BossContents {
  bossList: BossInfo[];
  bossId: string;
}

export interface BossDetail {
  bossList: Boss[];
  bossId: string | true;
}

export interface BossInfo extends strID {
  location_guide: string;
  followers_health: JsonArrayText[];
  boss_loot_list: JsonArrayText[];
  followers_loot_list: JsonArrayText[];
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
  tip: Requirement[];
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

export interface SVG extends JPG, Size {
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
  color?: string;
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

export interface SubFilter {
  en: string;
  parent_value: string;
  kr: string;
  image: string;
  value: string;
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
  itemList: Item[] | Boss[] | JsonValue[] | JsonArrayText[];
  currentId: string;
  selectorId: string;
  itemDesc: string;
  isSpace?: boolean;
  isEng?: boolean;
  isImage?: boolean;
  isAmmo?: boolean;
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

export interface GridImageText {
  jsonList: JsonArrayText[];
}

export interface GridContents extends strID {
  children: ReactNode;
  contentsWidth?: string;
  columnDesign: Array<number | null>;
  isHideout?: boolean;
  padding?: number;
}

export interface GridNotes {
  notes: JsonArrayText;
  isKey?: boolean;
}

export interface GridCenterText {
  children: ReactNode;
  mb?: number;
  mt?: number;
  otherColor?: string;
  isHover?: boolean;
}

export interface GridArrayText {
  arrayText: string[];
}

export interface JsonArrayText {
  [key: string]: any;
}

export interface GridJsonText {
  jsonArrayText: JsonArrayText[];
  jatType: string;
  word?: string;
  isDivider: boolean;
}

export interface GridTitle {
  columnDesign: Array<number | null>;
  column: string[];
  isShadow: boolean;
  shadowColor: string;
  isWeapon?: boolean;
  isAmmo?: boolean;
  titleWidth?: string;
  isExtraction?: boolean;
  isHideout?: boolean;
  isNote?: boolean;
  isQuest?: boolean;
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

export interface JPG extends Coordinate {
  color?: string;
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

export interface AmmoDetail extends Category {}

export interface Ammo extends strID, Category {
  name: string;
  round: string;
  damage: number;
  penetration_power: number;
  armor_damage: number;
  accuracy_modifier: number;
  recoil_modifier: number;
  light_bleed_modifier: number;
  heavy_bleed_modifier: number;
  efficiency: number[];
  image: string;
}

export interface LootDetail extends Category {}

export interface Loot extends strID, Category {
  name_en: string;
  name_kr: string;
  image: string;
  related_quests: JsonArrayText[];
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
  class_headwear: Headwear[];
  no_class_headwear: Headwear[];
}

export interface FaceCoverList {
  class_face_cover: Headwear[];
  no_class_face_cover: Headwear[];
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
  sub: RelatedQuests[];
}

export interface RelatedQuests {
  item_name: string;
  quest_id: string;
  quest_name: string;
  in_raid: boolean | null;
  type: string;
  item_id: string;
  desc_text: string[] | null;
  count: number;
  item_image: string;
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

export interface Container extends strID {
  name_en: string;
  name_kr: string;
  image: string;
  capacity: number;
  grids: Size[];
}

export interface Container extends NameImage {
  capacity: number;
  grids: Size[];
}

export interface Key extends NameImage, strID {
  uses: number;
  use_map_en: string[];
  use_map_kr: string[];
  map_value: string[];
  related_quests: JsonArrayText[];
}

export interface KeyDetail extends Category {}

export interface Provisions extends CommonData, strID, Category {
  short_name: string;
  energy: number;
  hydration: number;
  stim_effects: JsonArrayText[];
  related_quests: JsonArrayText[];
}

export interface ImageZoom {
  originalImg: string;
  thumbnail: string;
  needFormat?: boolean;
  isMax?: boolean;
  isLoop?: boolean;
  isHideout?: boolean;
  isBoss?: boolean;
  isQuest?: boolean;
}

export interface HideoutDetail extends Category {}

export interface Hideout {
  master_id: string;
  master_name_en: string;
  master_name_kr: string | null;
  image: string;
  data: HideoutLevel[];
}

export interface BonusList {
  bonuses: Bonus[];
}

interface HideoutLevel {
  bonus: Bonus[];
  crafts: Craft[];
  level_id: string;
  level_info: LevelInfo[];
  item_require: ItemRequire[];
  skill_require: SkillRequire[];
  trader_require: TraderRequire[];
  station_require: StationRequire[];
}

interface Bonus {
  value: number;
  name_en: string;
  name_kr: string | null;
  skill_name_en: string | null;
  skill_name_kr: string | null;
}

interface Craft {
  level: number | null;
  name_en: string | null;
  name_kr: string | null;
}

interface LevelInfo {
  level: number;
  construction_time: number;
}

export interface RequireList {
  items: ItemRequire[] | SkillRequire[] | TraderRequire[] | StationRequire[];
  type: string;
}

interface ItemRequire {
  id: string;
  count: number;
  image: string;
  name_en: string;
  name_kr: string | null;
  quantity: number;
}

interface SkillRequire {
  level: number | null;
  name_en: string | null;
  name_kr: string | null;
  image: string | null;
}

interface TraderRequire {
  image: string | null;
  value: number | null;
  compare: string | null;
  name_en: string | null;
  name_kr: string | null;
  require_type: string | null;
}

interface StationRequire {
  image: string | null;
  level: number | null;
  name_en: string | null;
  name_kr: string | null;
}

interface UserQuestInfo {
  quest_id: string;
  quest_name_en: string;
  quest_name_kr: string;
  objectives_en: string[];
  objectives_kr: string[];
  next: UserNextQuest[];
}

interface UserNextQuest {
  id: string;
  name: string;
  name_kr: string;
}

export interface UserQuest {
  npc_id: string;
  npc_name_kr: string;
  npc_name_en: string;
  npc_image: string;
  quest_info: UserQuestInfo[];
}

export interface UserQuestDetail {
  userQuestList: UserQuest[];
  successQuest: Function;
}

export interface UserQuestList {
  userQuest: UserQuest;
  successQuest: Function;
  deleteQuest: Function;
}

export interface UserQuestSelector {
  updateQuest: Function;
}
