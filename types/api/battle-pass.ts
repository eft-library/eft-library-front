export type BattlePassDocumentRole = "exchange" | "classified";

export interface BattlePassSeason {
  id: string;
  code: string;
  title_en: string | null;
  title_ko: string | null;
  title_ja: string | null;
  description_en: string | null;
  description_ko: string | null;
  description_ja: string | null;
  page_count: number;
  start_time: string | null;
  end_time: string | null;
  is_active: boolean;
  sort_order: number | null;
  update_time: string | null;
}

export interface BattlePassDocument {
  id: string;
  name_en: string;
  name_ko: string | null;
  name_ja: string | null;
  image: string | null;
  document_role: BattlePassDocumentRole;
  sort_order: number | null;
}

export interface BattlePassRequirement {
  quantity: number;
  sort_order: number | null;
  document: Omit<BattlePassDocument, "sort_order">;
}

export interface BattlePassReward {
  id: string;
  reward_type: string;
  name_en: string;
  name_ko: string | null;
  name_ja: string | null;
  image: string | null;
  reward_quantity: number;
  document_price: number;
  sort_order: number;
  requirements: BattlePassRequirement[];
}

export interface BattlePassPage {
  page_number: number;
  rewards: BattlePassReward[];
}

export interface BattlePassData {
  season: BattlePassSeason;
  documents: BattlePassDocument[];
  pages: BattlePassPage[];
}
