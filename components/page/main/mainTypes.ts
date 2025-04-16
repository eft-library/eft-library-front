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

export interface NewsUserFunction {
  link: string;
  name_en: string;
  name_kr: string;
  use_yn: boolean;
  is_new: boolean;
}

export interface NewsClient {
  news: NewsMapColumn;
}

export interface NewsMapColumn {
  id: string;
  json_value: JsonValue;
}

interface JsonValue {
  game_version: string;
  arena_version: string;
  patch_link: string;
  event_link: string;
  youtube_id: string;
  next_update: string[];
  user_function: NewsUserFunction[];
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

interface SliderData extends NavItem {
  main_image: string;
  use_slide: true;
}

export interface MainSlider {
  sliderList: SliderData[];
}
