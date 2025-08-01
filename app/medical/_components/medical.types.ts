import { LocaleName } from "@/components/types/common";

export interface MedicalViewTypes {
  medical: MedicalData;
}

export interface MedicalData {
  Drug: DrugDetail[];
  Medicalitem: MedicalDetail[];
  Medikit: MedikitDetail[];
  Stimulant: StimulantDetail[];
}

export interface StimulantTypes {
  medicalList: StimulantDetail[];
  word: string;
}

export interface MediKitTypes {
  medicalList: MedikitDetail[];
  word: string;
}

export interface MedicalItemTypes {
  medicalList: MedicalDetail[];
  word: string;
}

export interface DrugTypes {
  medicalList: DrugDetail[];
  word: string;
}

interface DrugInfo {
  stim_effects: StimEffect[] | [];
  uses: number;
  cures: LocaleNameArray;
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
  name: LocaleName;
  image: string;
  image_width: number;
  malus: StimEffect[];
  buff: StimEffect[];
  de_buff: StimEffect[];
  advantage: StimEffect[];
  url_mapping: string;
}

interface MedicalInfo {
  stim_effects: StimEffect[] | [];
  uses: number;
  cures: LocaleNameArray;
  use_time: number;
  hitpoints: number | null;
  energy_impact: number | null;
  hydration_impact: number | null;
  medical_category: string;
  painkiller_duration: number | null;
  malus: StimEffect[];
  buff: StimEffect[];
  de_buff: StimEffect[];
  advantage: StimEffect[];
}

interface MedicalDetail {
  category: string;
  id: string;
  info: MedicalInfo;
  image_height: number;
  name: LocaleName;
  image: string;
  image_width: number;
  url_mapping: string;
}

interface MedikitInfo {
  stim_effects: StimEffect[] | [];
  uses: number | null;
  cures: LocaleNameArray;
  use_time: number;
  hitpoints: number | null;
  energy_impact: number | null;
  hydration_impact: number | null;
  medical_category: string;
  painkiller_duration: number | null;
  malus: StimEffect[];
  buff: StimEffect[];
  de_buff: StimEffect[];
  advantage: StimEffect[];
}

interface MedikitDetail {
  category: string;
  id: string;
  info: MedikitInfo;
  image_height: number;
  name: LocaleName;
  image: string;
  image_width: number;
  url_mapping: string;
}

interface StimulantInfo {
  stim_effects: StimEffect[] | [];
  malus: StimEffect[];
  buff: StimEffect[];
  de_buff: StimEffect[];
  advantage: StimEffect[];
  uses: number | null;
  cures: LocaleNameArray;
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
  image: string;
  name: LocaleName;
  image_width: number;
  url_mapping: string;
}

interface LocaleNameArray {
  en: string[];
  ja: string[];
  ko: string[];
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
