export interface ProvisionsList {
  provisionsList: Provisions[];
}

interface Provisions {
  id: string;
  name_kr: string;
  name_en: string;
  image: string;
  category: string;
  short_name: string;
  energy: number;
  hydration: number;
  width: number;
  height: number;
  stim_effects: StimEffet[];
  notes: QuestNotes[];
}
interface StimEffet {
  id: string;
  type: string;
  delay?: number;
  value: number;
  chance: number;
  krSkill: string;
  duration?: number;
  skillName: string;
}

interface QuestNotes {
  id: string;
  name: string;
  count: number;
  in_raid: boolean;
  name_kr: string;
  url_mapping: string;
}
export interface EffectText {
  effect: StimEffet;
}
