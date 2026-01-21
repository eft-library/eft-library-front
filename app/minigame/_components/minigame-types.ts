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
