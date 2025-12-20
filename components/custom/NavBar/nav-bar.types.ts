import { LocaleName } from "@/components/types/common";

interface MenuData {
  name: LocaleName;
  link: string;
  order: number;
  value: string;
  image: string | null;
}

interface SubMenu extends MenuData {
  parent_value: string;
}

export interface NavTypes extends MenuData {
  sub_menus: SubMenu[];
}

interface NavWithSearch {
  main_menu_list: NavTypes[];
  search_list: SearchData[];
}

export interface NavBarTypes {
  navData: NavWithSearch;
}

export interface RenderNavTypes {
  navMain: NavTypes;
  setActiveMenu: (val: string | null) => void;
  activeMenu: string | null;
  setIsMobileMenuOpen: (val: boolean) => void;
}

export interface NavSearchTypes {
  searchList: SearchData[];
}

export interface SearchData {
  link: string;
  page_value: string;
  type: string;
  value: string;
  order: number;
  lang: string;
}

export interface NotificationTypes {
  setActiveMenu: (val: string | null) => void;
  activeMenu: string | null;
  notificationList: NotificationDataTypes[];
  setNotifications: React.Dispatch<
    React.SetStateAction<NotificationDataTypes[]>
  >;
}

export interface NotificationDataTypes {
  noti_type: string;
  end_time?: string;
  start_time?: string;
  user_email?: string;
  url?: string;
  title?: string;
  author_email?: string;
  author_nickname?: string;
  post_id?: number;
  parent_comment_id?: string;
  follower_email?: string;
  following_email?: string;
}
