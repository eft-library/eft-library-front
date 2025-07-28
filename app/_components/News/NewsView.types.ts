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

export interface NewsViewTypes {
  news: NewsMapColumn;
}

export interface RenderSectionTypes {
  icon: string;
  title: string;
  items: LinkInfoTypes[];
  sectionKey: string;
}

export interface NewsMapColumn {
  id: string;
  json_value: JsonValueTypes;
}
