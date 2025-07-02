import type { StimEffect } from "../../provisions/data/provisionsTypes";

export interface MedicalClient {
  medical: MedicalData;
}

export interface MedicalData {
  Drug: DrugDetail[];
  Medicalitem: MedicalDetail[];
  Medikit: MedikitDetail[];
  Stimulant: StimulantDetail[];
}

export interface StimulantClient {
  medicalList: StimulantDetail[];
  searchWord: string;
}

export interface MediKitClient {
  medicalList: MedikitDetail[];
  searchWord: string;
}

export interface ItemClient {
  medicalList: MedicalDetail[];
  searchWord: string;
}

export interface DrugClient {
  medicalList: DrugDetail[];
  searchWord: string;
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

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}

interface LocaleNameArray {
  en: string[];
  ja: string[];
  ko: string[];
}
