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

export interface RankData {
  pvp_top_list: TopList[];
  pve_top_list: TopList[];
}

interface TopList {
  max: number;
  min: number;
  tier: string;
  list: TopListDetailData[];
}

export interface TopListDetailData {
  item_image: string;
  item_name_en: string;
  item_name_kr: string | null;
  trader_list: TradeOption[];
  width: number;
  height: number;
  category: string;
  id: string;
  per_slot: number;
  flea_market_price: number;
}

export interface TierIndicator {
  max: number;
  min: number;
  tier: string;
  viewType: string;
}

export interface InventoryGrid {
  topList: TopListDetailData[];
  viewType: string;
  searchWord: string;
}
