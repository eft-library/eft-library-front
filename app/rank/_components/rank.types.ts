export interface CategoryFilterTypes {
  onChangeCategory: (val: string) => void;
  listCategory: string[];
}

export interface SearchFilterTypes {
  searchWord: string;
  setSearchWord: (val: string) => void;
  setSearchRealWord: (val: string) => void;
}

export interface ItemTooltipTypes {
  item: TopListDetailData;
  position: { x: number; y: number };
}

export interface TierSectionTypes {
  rankItem: RankData;
  priceType: string;
  onTooltipShow: (
    item: TopListDetailData | null,
    position?: { x: number; y: number }
  ) => void;
  searchWord: string;
}

export interface ItemCardTypes {
  item: TopListDetailData;
  onTooltipShow: (
    item: TopListDetailData | null,
    position?: { x: number; y: number }
  ) => void;
  tier: "S" | "A" | "B" | "C" | "D" | "E" | "F";
  isHighlighted: boolean;
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

export interface RankData {
  pvp_top_list: TopList[];
  pve_top_list: TopList[];
}

interface TopList {
  max: number;
  min: number;
  tier: "S" | "A" | "B" | "C" | "D" | "E" | "F";
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
  tier: "S" | "A" | "B" | "C" | "D" | "E" | "F";
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
