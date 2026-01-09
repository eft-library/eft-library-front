export interface Progress {
  userRebirthList: string[];
  userKappaList: string[];
  allKappaItemList: ProgressItemTypes[];
  allRebirthList: ProgressItemTypes[];
}

export interface ProgressItemTypes {
  image: string;
  id: string;
  progress_type: "Rebrith" | "Kappa";
  name: LocaleName;
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}

export interface ProgressViewTypes {
  progress: Progress;
}

export interface ProgressItemBoxTypes {
  item: ProgressItemTypes;
  handleClick: (itemId: string) => void;
  currentUserList: string[];
}
