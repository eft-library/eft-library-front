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

export interface PlacedItem extends RngItemTypes {
  x: number;
  y: number;
  rotated: boolean;
}

export interface BackpackGridTypes {
  dragState: DragState | null;
  setDragState: React.Dispatch<React.SetStateAction<DragState | null>>;
  placedItems: PlacedItem[];
  setPlacedItems: React.Dispatch<React.SetStateAction<PlacedItem[]>>;
}

export interface DragState {
  item: RngItemTypes | PlacedItem;
  from: "pool" | "backpack";
  rotated: boolean;
  hoverX: number;
  hoverY: number;
  canPlace: boolean;
}
export interface ItemPoolTypes {
  itemList: RngItemTypes[];
  setDragState: React.Dispatch<React.SetStateAction<DragState | null>>;
}

export interface RngStartOverlayTypes {
  onClickStart: (val: boolean) => void;
}

export interface RngEndOverlayTypes {
  onClickReset: () => void;
  score: number;
}

export interface RngRankTypes {
  rankOpen: boolean;
  setRankOpen: (val: boolean) => void;
  score: number;
  nickname: string;
}

export interface RngAllRankTypes {
  rankOpen: boolean;
  setRankOpen: (val: boolean) => void;
}

export interface RngRankDataTypes {
  rank: number;
  nickname: string;
  score: number;
  create_time: string;
}
