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
  image: string;
  name: LocaleName;
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

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}
