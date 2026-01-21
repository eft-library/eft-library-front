import { LocaleName } from "@/components/types/common";

export interface MinigameTabTypes {
  setTabState: (val: string) => void;
  tabState: string;
}

export interface MinigameNavTypes {
  score: number;
  playTime: number;
  onClickReset: () => void;
}

export interface RngItemResponseTypes {
  data: RngItemTypes[];
  status: number;
  msg: string;
}

export interface RngItemTypes {
  id: string;
  image: string;
  flea_market_price: number;
  height: number;
  width: number;
  name: LocaleName;
}

export interface BackpackGridTypes {
  itemList: RngItemTypes[];
}
