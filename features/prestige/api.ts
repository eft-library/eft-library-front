import { apiGet } from "@/lib/api/api-client";

interface Named {
  name_ko: string | null;
  name_en: string | null;
  name_ja: string | null;
}

interface Reference extends Named {
  id: string;
  normalized_name: string | null;
}

interface Item extends Reference {
  image: string | null;
}

export interface PrestigeCondition {
  id: string;
  type: string;
  description_ko: string | null;
  description_en: string | null;
  description_ja: string | null;
  count: number | null;
  player_level: number | null;
  task: Reference | null;
  station: (Reference & { level: number }) | null;
  skill_name: string | null;
  skill_level: number | null;
  items: Item[];
}

export interface PrestigeLevel extends Named {
  id: string;
  prestige_level: number;
  icon_link: string | null;
  image_link: string | null;
  conditions: PrestigeCondition[];
  rewards: {
    items: { quantity: number; sort_order: number; item: Item | null }[];
    skills: { skill_name: string; skill_level: number }[];
    customizations: (Named & {
      id: string;
      image_link: string | null;
      customization_type: string | null;
      items: Item[];
    })[];
  };
  transfer_settings: (Named & {
    type: string;
    skill_type: string | null;
    transfer_rate: number | null;
    grid_width: number | null;
    grid_height: number | null;
  })[];
}

export function getPrestigeLevels() {
  return apiGet<PrestigeLevel[]>("/api/prestige/v3/all", { revalidate: 300 });
}
