export interface KeyClient {
  keyList: Key[];
}

interface Key {
  id: string;
  uses: number;
  use_map_en: string[];
  use_map_kr: string[];
  map_value: string[];
  notes: QuestNotes[];
  name: string;
  image: string;
}

interface QuestNotes {
  id: string;
  name: string;
  count: number;
  in_raid: boolean;
  name_kr: string;
  url_mapping: string;
}
