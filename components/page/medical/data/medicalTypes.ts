export interface StimulantClient {
  medicalList: Medical[];
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

interface Medical {
  id: string;
  category: string;
  name_kr: string;
  name_en: string;
  image: string;
  short_name: string;
  cures_en: string[];
  cures_kr: string[];
  buff: Effect[];
  debuff: Effect[];
  use_time: number;
  width: number;
  height: number;
  uses: number;
  energy_impact: number;
  hydration_impact: number;
  painkiller_duration: number;
  hitpoints: number;
}
export interface Effect {
  id: string;
  type: string;
  delay?: number;
  value: number;
  chance: number;
  krSkill: string;
  duration?: number;
  skillName: string;
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
}
