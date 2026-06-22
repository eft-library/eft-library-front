export interface ApiEnvelope<T> {
  status: number;
  msg: string;
  data: T | null;
}

export interface LocalizedName {
  name_en: string;
  name_ko: string;
  name_ja: string;
}

export interface HomeMainItem extends LocalizedName {
  id: string;
  url: string;
  image: string;
}

export interface HomeMenuItem extends LocalizedName {
  id: string;
  parent_group_id: string;
  url: string;
}

export interface HomeMenuGroup extends LocalizedName {
  id: string;
  sub_menus: HomeMenuItem[];
}

export interface HomeNewsItem {
  id: number;
  news_type: string;
  title_en: string;
  title_ko: string;
  title_ja: string;
  link: string | null;
  is_new: boolean;
  is_renewal: boolean;
}

export interface HomeNewsGroups {
  patch: HomeNewsItem[];
  event: HomeNewsItem[];
  next_update: HomeNewsItem[];
  recommend: HomeNewsItem[];
  tarkov_info: HomeNewsItem[];
  notice: HomeNewsItem[];
}

export interface HomePostItem {
  id: string;
  slug: string | null;
  user_email: string | null;
  category: string | null;
  title: string | null;
}

export interface HomeMainResponse {
  main: HomeMainItem[];
  menu: HomeMenuGroup[];
  news: HomeNewsGroups;
  home_posts: HomePostItem[];
}

export interface HomeAutocompleteItem {
  url: string;
  autocomplete_text_en: string;
  autocomplete_text_ko: string;
  autocomplete_text_ja: string;
}

export interface HomeMenuResponse {
  nav_list: HomeMenuGroup[];
  autocomplete_items: HomeAutocompleteItem[];
}
