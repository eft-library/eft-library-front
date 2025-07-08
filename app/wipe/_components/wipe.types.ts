export interface WipeViewTypes {
  wipeList: WipeData[];
}

interface WipeData {
  id: number;
  season_start: string;
  season_end: string;
  patch_version: string;
}
export interface DurationBarTypes {
  duration: number;
  maxDuration: number;
  isActive?: boolean;
  isMobile?: boolean;
}

export interface WipeCardTypes {
  wipe: WipeData;
  maxDuration: number;
  isActive: boolean;
}
