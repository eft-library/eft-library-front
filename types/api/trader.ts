import type { LocalizedName } from "@/types/api/home";

export type TraderMode = "pvp" | "pve" | "pvp-season";

export interface Trader extends LocalizedName {
  id: string;
  normalized_name: string;
  image: string;
  sort_order: number;
  next_restock_at: string | null;
  restock_collected_at: string | null;
}

export interface TraderItem extends LocalizedName {
  id: string;
  normalized_name: string;
  image: string;
  width: number;
  height: number;
}

export interface TraderOffer {
  id: string;
  source_offer_id: string;
  trader_id: string;
  trader_level: number;
  offer_type: "purchase" | "barter";
  game_mode: TraderMode;
  season_id: string | null;
  buy_limit: number | null;
  raw_buy_limit: number | null;
  is_unlimited: boolean;
  sort_order: number;
  collected_at: string;
  update_time: string;
  trader: LocalizedName & {
    id: string;
    image: string;
    normalized_name: string;
  };
  costs: { item: TraderItem; quantity: number }[];
  rewards: { item: TraderItem; quantity: number }[];
  task_unlocks: (LocalizedName & {
    quest_id: string;
    normalized_name: string;
  })[];
}

export interface TraderManifest {
  generation: string;
  modes: Partial<
    Record<
      TraderMode,
      {
        season_id: string | null;
        list: string;
        offers: Record<string, string>;
        total: number;
      }
    >
  >;
}

export interface TraderList {
  game_mode: TraderMode;
  season_id: string | null;
  traders: Trader[];
}

export interface TraderOffers {
  game_mode: TraderMode;
  season_id: string | null;
  trader_id: string;
  total: number;
  offers: TraderOffer[];
}
