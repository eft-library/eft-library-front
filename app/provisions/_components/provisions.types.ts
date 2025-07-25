import { LocaleName } from "@/components/types/common";

export interface ProvisionsViewTypes {
  provisionsList: ProvisionsDetail[];
}

export interface ProvisionsTableTypes {
  provisionsList: ProvisionsDetail[];
  word: string;
}

export interface StimEffect {
  type: string;
  delay?: number;
  value: number;
  chance: number;
  duration?: number;
  skill_name_en: string | null;
  skill_name_ja: string | null;
  skill_name_ko: string | null;
}

export interface EffectText {
  effect: StimEffect;
}

interface ProvisionsInfo {
  energy: number;
  hydration: number;
  stim_effects: StimEffect[];
  malus: StimEffect[];
  buff: StimEffect[];
  de_buff: StimEffect[];
  advantage: StimEffect[];
}

interface ProvisionsDetail {
  category: string;
  id: string;
  info: ProvisionsInfo;
  image_height: number;
  name: LocaleName;
  image: string;
  image_width: number;
  url_mapping: string;
}
