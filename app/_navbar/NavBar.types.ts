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

export interface NavBarTypes {
  navData: NavTypes[];
}
