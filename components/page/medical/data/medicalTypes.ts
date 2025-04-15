export interface StimulantClient {
  medicalList: StimulantDetail[];
}

export interface MediKitClient {
  medicalList: MedikitDetail[];
}

export interface ItemClient {
  medicalList: MedicalDetail[];
}

export interface DrugClient {
  medicalList: DrugDetail[];
}

interface DrugInfo {
  buff: string | null;
  uses: number;
  debuff: string | null;
  cures_en: string[];
  cures_kr: string[];
  use_time: number;
  hitpoints: number | null;
  energy_impact: number;
  hydration_impact: number;
  medical_category: string;
  painkiller_duration: number;
}

interface DrugDetail {
  category: string;
  id: string;
  info: DrugInfo;
  image_height: number;
  name_kr: string;
  image: string;
  name_en: string;
  image_width: number;
  update_time: string;
  url_mapping: string;
}

interface MedicalInfo {
  buff: string | null;
  uses: number;
  debuff: string | null;
  cures_en: string[];
  cures_kr: string[];
  use_time: number;
  hitpoints: number | null;
  energy_impact: number | null;
  hydration_impact: number | null;
  medical_category: string;
  painkiller_duration: number | null;
}

interface MedicalDetail {
  category: string;
  id: string;
  info: MedicalInfo;
  image_height: number;
  name_kr: string;
  image: string;
  name_en: string;
  image_width: number;
  update_time: string;
  url_mapping: string;
}

interface MedikitInfo {
  buff: string | null;
  uses: number | null;
  debuff: string | null;
  cures_en: string[];
  cures_kr: string[];
  use_time: number;
  hitpoints: number | null;
  energy_impact: number | null;
  hydration_impact: number | null;
  medical_category: string;
  painkiller_duration: number | null;
}

interface MedikitDetail {
  category: string;
  id: string;
  info: MedikitInfo;
  image_height: number;
  name_kr: string;
  image: string;
  name_en: string;
  image_width: number;
  update_time: string;
  url_mapping: string;
}

export interface Buff {
  type: string;
  delay?: number;
  value: number;
  chance: number;
  krSkill: string;
  duration?: number;
  skillName: string | null;
}

export interface Debuff {
  type: string;
  delay?: number;
  value: number;
  chance: number;
  krSkill: string;
  duration?: number;
  skillName: string | null;
}

interface StimulantInfo {
  buff: Buff[];
  uses: number | null;
  debuff: Debuff[];
  cures_en: string | null;
  cures_kr: string | null;
  use_time: number | null;
  hitpoints: number | null;
  energy_impact: number | null;
  hydration_impact: number | null;
  medical_category: string;
  painkiller_duration: number | null;
}

interface StimulantDetail {
  category: string;
  id: string;
  info: StimulantInfo;
  image_height: number;
  name_kr: string;
  image: string;
  name_en: string;
  image_width: number;
  update_time: string;
  url_mapping: string;
}
