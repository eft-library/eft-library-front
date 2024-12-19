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
  zoomLevel: number;
}

export interface ThreeModel {
  filterInfo: SubFilter[];
  viewItemList: string[];
  map: SubMap | Map;
  zoomLevel: number;
}

export interface News {
  game_version: string;
  arena_version: string;
  patch_link: string;
  event_link: string;
  youtube_id: string;
  next_update: string[];
  user_function: NewsUserFunction[];
}

export interface NewsUserFunction {
  link: string;
  name_en: string;
  name_kr: string;
  use_yn: boolean;
}

export interface NewsText {
  news: News;
}

export interface BossContents {
  boss: BossInfo;
}

export interface BossDetail {
  children: ReactNode;
}

export interface BossLootInfo {
  item_id: string;
  boss_id: string;
  item_type: string;
  item_type_en: string;
  item_type_kr: string;
  item_name_en: string;
  item_name_kr: string;
  item_image: string;
  link: string;
}

export interface BossLoot extends BossLootInfo {
  boss_name_en: string;
  boss_name_kr: string;
}

export interface BossLootDetail {
  title: string;
  column: Column;
  lootList: BossLoot[];
}

export interface FollowersLoot extends BossLootInfo {
  follower_name_en: string;
  follower_name_kr: string;
  follower_id: string;
}

export interface Followers extends strID {
  name_kr: string;
  name_en: string;
  boss_id: string;
  health_image: string;
  loot: FollowersLoot[];
}

export interface FollowersDetail {
  column: Column;
  follower: Followers;
}

export interface BossInfo extends strID {
  location_guide: string;
  sub: BossLoot[];
  sub_followers: Followers[];
}

export interface BossHealth {
  healthList: Followers[];
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
  map_json: JsonArrayText[];
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
  transits_info: Extraction[];
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
  questsNotes: JsonArrayText;
  hideoutNotes?: JsonArrayText;
  isKey?: boolean;
  isGlass?: boolean;
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
  scale: number;
}

export interface JPG extends Coordinate {
  color?: string;
}

export interface JpgItemPath extends Coordinate {
  childValue: string;
  motherValue: string;
  quest_info: UserNextQuest[];
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

export interface LootGetData extends Category {}

export interface LootDetail extends LootGetData {
  column: Column;
  lootList: Loot[];
}

export interface Loot extends strID, Category {
  name_en: string;
  name_kr: string;
  image: string;
  quest_notes: JsonArrayText[];
  hideout_notes: JsonArrayText[];
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

export interface InformationInfoDetail extends InfortmaionContent {
  information_group: InformationInfo[];
}

export interface InfortmaionContent {
  information: InformationInfo;
}

export interface Information extends InformationInfoDetail {
  link: string;
  detail_link: string;
  subTitle: string;
}

export interface InformationBottom {
  detail_link: string;
  information_group: InformationInfo[];
}

export interface InformationMain {
  information: InformationData;
  pageId: number;
  link: string;
  detail_link: string;
}

export interface InformationData {
  data: InformationInfo[];
  total_count: number;
  max_pages: number;
  current_page: number;
}

export interface InformationInfo extends strID {
  name_en: string[];
  name_kr: string[];
  notes_en: string;
  notes_kr: string;
  update_time: string;
}

export interface Quest extends strID, CommonData {
  npc_value: string;
  title_kr: string;
  title_en: string;
  required_kappa: boolean;
  objectives_kr: string[];
  objectives_en: string[];
  requirements_en: string[];
  requirements_kr: string[];
  rewards_kr: string[];
  guide: string;
  requires: JsonArrayText[];
  next: JsonArrayText[];
  sub: RelatedQuests[];
  update_time: string;
}

export interface RelatedQuests {
  item_name_en: string;
  item_name_kr: string;
  quest_id: string;
  quest_name_en: string;
  quest_name_kr: string;
  in_raid: boolean | null;
  type: string;
  item_id: string;
  desc_text: string[] | null;
  count: number;
  item_image: string;
  item_link: string;
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
  headerText: string;
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
  notes: JsonArrayText[];
}

export interface KeyDetail extends KeyGetData {
  keyList: Key[];
  column: Column;
}

export interface KeyGetData extends Category {}

export interface ProvisionsDetail {
  provisionList: Provisions[];
  column: Column;
}

export interface Provisions extends CommonData, strID, Category {
  short_name: string;
  energy: number;
  hydration: number;
  stim_effects: JsonArrayText[];
  notes: JsonArrayText[];
}

export interface ImageZoom {
  name: string;
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
  checkedQuest: string[];
  checkedBox: Function;
}

export interface UserQuestSelector {
  updateQuest: Function;
}

export interface UserPostStatistics {
  user_email: string;
  post_count: number;
  comment_count: number;
}

export interface Ban {
  user_email: string;
  ban_reason: string | null;
  ban_start_time: string | null;
  ban_end_time: string | null;
}

export interface ProfileBan {
  ban: Ban;
}

export interface Profile {
  userInfo?: User;
  grade?: string;
  icon_list?: string[];
  is_delete?: boolean;
  user_posts?: PostData[];
  user_comments?: Comment[];
  user_post_statistics?: UserPostStatistics;
}

export interface ProfileExit {
  userExit: Function;
}

export interface ProfileRight extends Profile {
  changeNickName: Function;
}

export interface ProfileLeft extends Profile {
  changeIcon: Function;
}

export interface ProfileBotton extends Profile {}

export interface ArmBand extends strID {
  name: string;
  short_name: string;
  weight: string;
  image: string;
}

export interface Pagination {
  total: number;
  routeLink: string;
  currentPage: number;
}

export interface CommentPagination {
  total: number;
  onPageChange: Function;
  currentPage: number;
}

export interface Glasses extends NameImage, strID {
  durability: number;
  blindness_protection: number;
  class_value: number;
  notes: JsonArrayText[];
}

export interface GlassesList {
  class_glasses: Glasses[];
  no_class_glasses: Glasses[];
}

interface SubContents {
  title: string;
  type: string;
}

export interface EditorSub {
  subContents: SubContents;
  setSubData: Function;
  userInfo: UserProfile;
}

export interface BoardType extends strID {
  name_en: string;
  name_kr: string;
  value: string;
}

export interface BoardMain extends BoardHeader {}

export interface CommentInfo {
  data: Comment[];
  total_count: number;
  max_pages: number;
  current_page: number;
}

export interface IssueCommentInfo {
  data: Comment[];
}

export interface DetailIssue {
  comment: Comment;
  onClickDelete: Function;
  onClickLikeOrDis: Function;
  getComment: Function;
}

export interface DetailComment {
  comment: Comment;
  onClickDelete: Function;
  submitComment: Function;
  onClickLikeOrDis: Function;
  currentComment: number;
  getComment: Function;
}

export interface CommentHeader {
  icon: string | null;
  nickName: string | null;
  createTime: string;
  email: string | null;
}

export interface CommentAction {
  comment: Comment;
  onLike: Function;
  onOpen: Function;
  onClickDelete: Function;
}

export interface Comment extends strID, Ban {
  board_id: string;
  board_type: string;
  parent_id: string | null;
  parent_nick_name: string | null;
  contents: string;
  depth: number;
  create_time: string;
  update_time: string | null;
  is_delete_by_admin: boolean;
  is_delete_by_user: boolean;
  like_count: number;
  dislike_count: number;
  root_id: string;
  path: string[];
  icon: string;
  nick_name: string;
  root_create_time: string;
  is_liked_by_user: boolean;
  is_disliked_by_user: boolean;
}

export interface BoardHeader {
  siteParam: string;
}

export interface BoardPost {
  post: PostData;
}

export interface PostInfo {
  data: PostData[];
  total_count: number;
  max_pages: number;
  current_page: number;
}

export interface BoardDetail extends BoardPost {
  onClickLike: Function;
  boardType: string;
}

export interface DetailAction {
  post: PostData;
  setIsWrite?: Function;
}

export interface DetailRewrite {
  post: PostData;
  setIsWrite: Function;
  boardType: string;
}

export interface CommentRewrite {
  comment: Comment;
  setIsRewrite: Function;
  editorWidth: string;
  getComment: Function;
  currentComment: number;
}

export interface CommentReport {
  comment: Comment;
  isOpen: boolean;
  onClose: any;
}

export interface DetailReport extends DetailAction {
  isOpen: boolean;
  onClose: any;
}

export interface CommentDetele {
  comment: Comment;
  isOpen: boolean;
  onClose: any;
  commentDelete: Function;
  isUser: boolean;
}

export interface CommentBan {
  comment: Comment;
  isOpen: boolean;
  onClose: any;
}

export interface PostBan {
  post: PostData;
  isOpen: boolean;
  onClose: any;
}

export interface CommentAdmin {
  comment: Comment;
  onClickDelete: Function;
}

export type MetaProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export interface User extends strID {
  icon: string;
  name: string;
  point: number;
  is_admin: boolean;
  create_time: string;
  update_time: string | null;
  email: string;
  nick_name: string;
  grade: number;
  attendance_count: number;
  attendance_time: string;
}

export interface UserInfo extends strID {
  name: string;
  email: string;
  icon: string;
  nick_name: string;
  is_admin: boolean;
  attendance_count: number;
  attendance_time: string;
  point: number;
  create_time: string;
  update_time: string;
}

export interface PostData extends strID {
  title: string;
  contents: string;
  thumbnail: string | null;
  writer: string;
  like_count: number;
  view_count: number;
  type: string;
  type_kr: string;
  create_time: string;
  update_time: string | null;
  icon: string;
  nick_name: string;
  comment_cnt: number;
}

export interface UserProfile {
  user: User;
  grade: string;
  icon_list: string[];
  ban: Ban;
  user_posts: PostData[];
  user_post_statistics: UserPostStatistics;
  user_comments: Comment[];
}

export interface CommentQuill {
  depth: number;
  submitComment: Function;
  comment: Comment;
  setWriteComment?: Function;
}

export interface CommentSubmit {
  onClick: Function;
  parent_email: string;
  contents: string;
  depth: number;
  parent_id: string;
  setEditorContent: Function;
  setWriteComment: Function;
}

export interface Popup extends strID {
  is_use: boolean;
  contents: string;
  create_time: string;
}

export interface ShortUserInfo {
  icon: string;
  nick_name: string;
  value: string;
  post_count: number;
  comment_count: number;
  ban_reason: null | string;
  ban_end_time: null | string;
  attendance_count: number;
}

export interface UserPost {
  data: PostData[];
  total_count: number;
  max_pages: number;
  current_page: number;
  user_info: ShortUserInfo;
}

export interface UserComment {
  data: CommentWithTitle[];
  total_count: number;
  max_pages: number;
  current_page: number;
  user_info: ShortUserInfo;
}

export interface UserPublicInfo {
  user: ShortUserInfo;
}

export interface UserPostAll {
  posts: PostData[];
}

export interface CommentWithTitle extends Comment {
  title: string;
}

export interface UserCommentAll {
  comments: CommentWithTitle[];
}

export interface UserMainSubComment {
  comment: CommentWithTitle;
}
