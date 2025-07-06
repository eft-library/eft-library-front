import { LocaleName } from "@/components/types/common";

export interface GridItemTypes {
  main_info: MainInfoType[];
}

interface MainInfoType {
  image: string;
  name: LocaleName;
  link: string;
  order: number;
  value: string;
}
