import { InfiniteQueryObserverResult } from "@tanstack/react-query";

export interface PriceTableTypes {
  items: Price[];
  priceType: string;
  setSelectItem: (val: Price) => void;
  selectItem: Price | undefined;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export interface PriceTablePCTypes {
  items: Price[];
  priceType: string;
  setSelectItem: (val: Price) => void;
  selectItem: Price | undefined;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export interface PriceTableMTypes {
  items: Price[];
  priceType: string;
  setSelectItem: (val: Price) => void;
  selectItem: Price | undefined;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export interface TraderInfo {
  npc_id: string;
  npc_image: string;
  npc_name_en: string;
  npc_name_ko: string;
  npc_name_ja: string;
}

export interface TradeOption {
  price: number;
  trader: TraderInfo;
}

export interface Price {
  image: string;
  name: LocaleName;
  update_time: string;
  trader: {
    pve_trader: TradeOption[];
    pvp_trader: TradeOption[];
  };
  width: number;
  height: number;
  category: string;
  history_by_type: HistoryDefine;
  id: string;
}

export interface TraderPriceTypes {
  item: Price | undefined;
  priceType: string;
}

export interface PriceHistory {
  id: string;
  item_price: number;
  price_time: string;
  price_type: string;
}

export interface HistoryDefine {
  pve: PriceHistory[];
  pvp: PriceHistory[];
}

export interface PriceChartTypes {
  item: Price | undefined;
  priceType: string;
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}

export interface ControlPanelTypes {
  priceType: string;
  setPriceType: (val: string) => void;
  search: string;
  setSearch: (val: string) => void;
  setFetchWord: (val: string) => void;
}
