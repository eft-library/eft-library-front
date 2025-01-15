export interface SearchData {
  link: string;
  page_value: string;
  type: string;
  value: string;
  order: number;
}

export interface SearchClient {
  searchList: SearchData[];
}

interface News {
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
  is_new: boolean;
}

export interface NewsClient {
  news: News;
}

interface NavItem {
  en_name: string;
  link: string;
  order: number;
  value: string;
  kr_name: string;
  image: string;
  parent_value: string;
}

export interface NavItemList {
  navItemList: NavItem[];
}

interface ThreeItemPath {
  boxArgs: number[];
  position: number[];
  childValue: string;
}

interface JpgItemPath {
  x: number;
  y: number;
  childValue: string;
  motherValue: string;
}

interface MapJson {
  geometry: string;
  material: string;
}

interface SubItem {
  name_kr: string;
  id: string;
  three_item_path: ThreeItemPath[];
  jpg_image: string;
  depth: number;
  link: string;
  main_image: string;
  map_json: MapJson[];
  three_image: string;
  name_en: string;
  jpg_item_path: JpgItemPath[];
  order: number;
  parent_value: string;
  mot_image: string;
  update_time: string;
}

interface MapData {
  name_en: string;
  three_image: string;
  three_item_path: ThreeItemPath[];
  jpg_item_path: JpgItemPath[];
  order: number;
  main_image: string;
  map_json: MapJson[];
  id: string;
  name_kr: string;
  jpg_image: string;
  depth: number;
  link: string;
  mot_image: string;
  update_time: string;
  sub: SubItem[];
}

export interface MapSlider {
  mapList: MapData[];
}
