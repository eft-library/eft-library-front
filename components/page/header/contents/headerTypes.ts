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

export interface Menu extends MenuData {
  sub_menus: SubMenu[];
}

export interface MenuButton {
  menuData: Menu;
  selectedMenu: string | null;
  setSelectedMenu: (menu: string | null) => void;
}

export interface DefaultMenuButton {
  menuData: Menu;
  selectedMenu: string | null;
  setSelectedMenu: (menu: string | null) => void;
  setQuest: (parent: string, value: string) => void;
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}
