export interface PriceTable {
  price: Price;
  viewType: string;
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
  id: string;
}
