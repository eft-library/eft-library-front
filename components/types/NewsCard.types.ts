export interface NewsCardTypes {
  section: NewsCardDataTypes;
}

export interface NewsCardDataTypes {
  id: number;
  title: string;
  icon: string;
  items: CardItemTypes[];
}

interface CardItemTypes {
  id: number;
  title: string;
}

interface JsonValueTypes {
  next_update: LinkInfoTypes[];
  recommend: LinkInfoTypes[];
  event: LinkInfoTypes[];
  patch: LinkInfoTypes[];
  notice: LinkInfoTypes[];
  tarkov_info: LinkInfoTypes[];
}

export interface LinkInfoTypes {
  link: string;
  en: string;
  ko: string;
  ja: string;
  is_new: boolean;
  is_renewal: boolean;
}

export interface News {
  news: NewsMapColumn;
}

export interface NewsMapColumn {
  id: string;
  json_value: JsonValueTypes;
}
