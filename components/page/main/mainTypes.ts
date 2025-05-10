export interface SearchData {
  link: string;
  page_value: string;
  type: string;
  value: string;
  order: number;
  lang: string;
}

export interface SearchClient {
  searchList: SearchData[];
}

export interface LinkInfo {
  link: string;
  name_en: string;
  name_kr: string;
  name_ja: string;
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
  next_update: LinkInfo[];
  recommend: LinkInfo[];
  event: LinkInfo[];
  patch: LinkInfo[];
  notice: LinkInfo[];
  tarkov_info: LinkInfo[];
}

interface NavItem {
  name: LocaleName;
  link: string;
  order: number;
  value: string;
  image: string;
  parent_value: string;
}

export interface NavItemList {
  navItemList: NavItem[];
}

interface SliderData extends NavItem {
  slide_image: string;
  use_slide: true;
}

export interface MainSlider {
  sliderList: SliderData[];
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}
