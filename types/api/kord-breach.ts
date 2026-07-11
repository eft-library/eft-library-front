export type KordBreachModifierCategory = "global" | "positive" | "negative";

export interface KordBreachModifier {
  id: string;
  category: KordBreachModifierCategory;
  nameEn: string;
  nameKo: string;
  nameJa: string | null;
  effect: string;
  effectEn: string | null;
  effectKo: string | null;
  effectJa: string | null;
  score: number;
  iconUrl: string;
  sortOrder: number;
  isActive: boolean;
  updateTime: string;
}

export interface KordBreachModifiersResponse {
  globalModifiers: KordBreachModifier[];
  positiveModifiers: KordBreachModifier[];
  negativeModifiers: KordBreachModifier[];
  conflictMap: Record<string, string[]>;
}

export interface KordBreachPreset {
  id: string;
  slotNo: number;
  name: string;
  modifierIds: string[];
  positiveIds: string[];
  negativeIds: string[];
  savedAt?: string;
  totalScore: number;
  isPassed: boolean;
}

export interface KordBreachSelection {
  modifierIds: string[];
  positiveIds: string[];
  negativeIds: string[];
  totalScore: number;
  isPassed: boolean;
}

export type KordBreachSaveResult =
  | { success: true; preset: KordBreachPreset }
  | { success: false; reason: string; totalScore?: number };

export interface KordBreachDeleteResult { success: boolean }
