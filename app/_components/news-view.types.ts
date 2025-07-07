import { LocaleName } from "@/components/types/common";

export interface MainViewTypes {
  homeData: HomeDataType;
}

interface HomeDataType {
  main_info: MainInfoType[];
  menu: ParentMenuType[];
  news: NewsMapColumn;
}

interface MainInfoType {
  image: string;
  name: LocaleName;
  link: string;
  order: number;
  value: string;
}

interface ParentMenuType {
  name: LocaleName;
  order: number;
  value: string;
  sub_menus: MenuType[];
}

interface MenuType {
  name: LocaleName;
  order: number;
  value: string;
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

export interface NewsViewTypes {
  news: NewsMapColumn;
}

export interface NewsMapColumn {
  id: string;
  json_value: JsonValueTypes;
}
