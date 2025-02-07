export interface PriceTable {
  price: Price;
  viewType: string;
  setSelectItem: (val: Price) => void;
  selectItem: Price | undefined;
}

export interface TraderInfo {
  npc_id: string;
  npc_image: string;
  npc_name_en: string;
  npc_name_kr: string;
}

export interface TradeOption {
  price: number;
  trader: TraderInfo;
}

export interface Price {
  item_image: string;
  item_name_en: string;
  item_name_kr: string | null;
  update_time: string;
  trader: {
    pve_trader: TradeOption[];
    pvp_trader: TradeOption[];
  };
  history_by_type: HistoryDefine;
  id: string;
}

export interface PriceDetail {
  item: Price | undefined;
  viewType: string;
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

export interface PriceChart {
  item: Price | undefined;
  viewType: string;
}

export interface PriceTab {
  tabState: string;
  setTabState: (val: string) => void;
}
