export interface ProvisionsList {
  provisionsList: ProvisionsDetail[];
}

interface StimEffect {
  id: string;
  type: string;
  delay?: number;
  value: number;
  chance: number;
  krSkill: string;
  duration?: number;
  skillName: string;
}

export interface EffectText {
  effect: StimEffect;
}

interface ProvisionsInfo {
  energy: number;
  hydration: number;
  stim_effects: StimEffect[];
}

interface ProvisionsDetail {
  category: string;
  id: string;
  info: ProvisionsInfo;
  image_height: number;
  name_kr: string;
  image: string;
  name_en: string;
  image_width: number;
  update_time: string;
}
