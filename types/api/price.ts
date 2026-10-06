export type PriceMode = "pvp" | "pve" | "pvp-season";

export interface PriceSeason {
  id: string;
  name: string | null;
  starts_at: string | null;
  ends_at: string | null;
  is_current: boolean;
  collected_at: string;
  update_time: string;
}

export interface PriceTraderInfo {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  image: string;
}

export interface PriceTraderRow {
  id: string;
  game_mode: PriceMode;
  season_id: string | null;
  trader_id: string;
  price: number | null;
  trader: PriceTraderInfo;
}

export interface PriceSummaryRow {
  game_mode: PriceMode;
  season_id: string | null;
  highest_trader_price: number | null;
  highest_trader_id: string | null;
  flea_market_price: number | null;
  trader_count: number;
  has_flea: boolean;
  update_time: string;
}

export interface PriceHistoryRow {
  game_mode: PriceMode;
  season_id: string | null;
  price: number;
  price_time: string;
}

export interface PriceSearchItem {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  image: string;
  category: string | null;
  parent_category: string | null;
  width: number;
  height: number;
  prices: {
    pvp: PriceSummaryRow | null;
    pve: PriceSummaryRow | null;
    "pvp-season": PriceSummaryRow | null;
  };
  history_by_type: {
    pvp: PriceHistoryRow[];
    pve: PriceHistoryRow[];
    "pvp-season": PriceHistoryRow[];
  };
  trader_prices: {
    pvp: PriceTraderRow[];
    pve: PriceTraderRow[];
    "pvp-season": PriceTraderRow[];
  };
}

export interface PriceSearchResponse {
  selected_season_id: string | null;
  data: PriceSearchItem[];
  total_count: number;
  max_pages: number;
  current_page: number;
}

export interface PriceTopRequest {
  categoryList: string[];
  seasonId?: string;
}

export interface PriceTopItem {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  image: string;
  width: number;
  height: number;
  category: string;
  flea_market_price: number;
  highest_trader_price: number | null;
  highest_trader_id: string | null;
  per_slot: number;
}

export interface PriceTopTier {
  tier: "S" | "A" | "B" | "C" | "D" | "E" | "F";
  min: number;
  max: number;
  list: PriceTopItem[];
}

export interface PriceTopResponse {
  pvp_top_list: PriceTopTier[];
  pve_top_list: PriceTopTier[];
  "pvp-season_top_list": PriceTopTier[];
  selected_season_id: string | null;
}

export interface RngRankEntry {
  rank: number;
  nickname: string;
  score: number;
  create_time: string;
}

export interface RngItemEntry {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  image: string;
  category: string;
  width: number;
  height: number;
  flea_market_price: number | null;
  update_time: string;
}
