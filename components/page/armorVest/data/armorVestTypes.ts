export interface DefenseData {
  id: string;
  durability: number;
  class_value: number;
  areas_kr: string[];
  weight: number;
  width: number;
  height: number;
  name: string;
  image: string;
  ricochet_str_kr: string;
  blindness_protection: number;
  notes: QuestNotes[];
}

export interface ArmorVestList {
  armorVestList: DefenseData[];
}

export interface QuestNotes {
  id: string;
  name: string;
  count: number;
  in_raid: boolean;
  name_kr: string;
  url_mapping: string;
}
