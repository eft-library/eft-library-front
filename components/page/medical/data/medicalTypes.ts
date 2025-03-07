export interface StimulantClient {
  medicalList: Medical[];
}

export interface MediKitClient {
  medicalList: Medical[];
}

export interface ItemClient {
  medicalList: Medical[];
}

export interface DrugClient {
  medicalList: Medical[];
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

export interface MedicalSelectorClient {
  medicalType: MedicalType;
}

interface MedicalType {
  id: string;
  json_value: MedicalJson[];
}

interface MedicalJson {
  value: string;
  desc_en: string;
  desc_kr: string;
}
