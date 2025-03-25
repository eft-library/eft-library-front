interface Bonus {
  value: number;
  name_en: string;
  name_kr: string | null;
  skill_name_en: string | null;
  skill_name_kr: string | null;
}

export interface BonusItem {
  bonus: Bonus;
}

export interface BonusList {
  bonuses: Bonus[];
}

export interface StationClient {
  hideoutData: HideoutData;
}

interface HideoutData {
  hideout_info: Hideout[];
  complete_list: string[];
}

interface Hideout {
  master_id: string;
  master_name_en: string;
  master_name_kr: string | null;
  image: string;
  data: HideoutLevel[];
}

interface Craft {
  level: number | null;
  name_en: string | null;
  name_kr: string | null;
  height: number;
  width: number;
  duration: number;
  req_item: CraftItem[];
  image: string;
}

interface CraftItem {
  item: CraftItemDetail;
  quantity: number;
}

interface CraftItemDetail {
  gridImageLink: string;
  height: number;
  width: number;
  name: string;
}

interface LevelInfo {
  level: number;
  construction_time: number;
}

export interface ItemRequire {
  id: string;
  count: number;
  image: string;
  name_en: string;
  name_kr: string | null;
  quantity: number;
}

export interface SkillRequire {
  level: number | null;
  name_en: string | null;
  name_kr: string | null;
  image: string | null;
}

export interface TraderRequire {
  image: string | null;
  value: number | null;
  compare: string | null;
  name_en: string | null;
  name_kr: string | null;
  require_type: string | null;
}

interface StationRequire {
  image: string | null;
  level: number | null;
  name_en: string | null;
  name_kr: string | null;
}

interface Bonus {
  value: number;
  name_en: string;
  name_kr: string | null;
  skill_name_en: string | null;
  skill_name_kr: string | null;
}

interface HideoutLevel {
  bonus: Bonus[];
  crafts: Craft[];
  level_id: string;
  level_info: LevelInfo[];
  item_require: ItemRequire[];
  skill_require: SkillRequire[];
  trader_require: TraderRequire[];
  station_require: StationRequire[];
}

export interface HideoutSelectorClient {
  hideoutType: HideoutType;
}

interface HideoutType {
  id: string;
  json_value: HideoutJson[];
}

interface HideoutJson {
  value: string;
  desc_en: string;
  desc_kr: string;
  image: string;
}

export interface RequireList {
  items: ItemRequire[] | SkillRequire[] | TraderRequire[] | StationRequire[];
  type: string;
}

interface JsonValue {
  width: number;
  height: number;
  station_list: StationMapList[];
}

interface StationMapList {
  id: string;
  top: number;
  left: number;
  image: string;
}

export interface StationMapColumn {
  id: string;
  json_value: JsonValue;
}

export interface StationMap {
  onChangeMaster: (val: string) => void;
  masterId: string;
  completeList: string[];
}

export interface LevelSelector {
  masterId: string;
  hideoutData: HideoutData;
  onChangeLevel: (val: string) => void;
}

export interface StationDetail {
  levelId: string;
  hideoutData: HideoutData;
}

export interface ItemRequire {
  id: string;
  count: number;
  image: string;
  name_en: string;
  name_kr: string | null;
  quantity: number;
}

export interface SkillRequire {
  level: number | null;
  name_en: string | null;
  name_kr: string | null;
  image: string | null;
}

export interface TraderRequire {
  image: string | null;
  value: number | null;
  compare: string | null;
  name_en: string | null;
  name_kr: string | null;
  require_type: string | null;
}

interface StationRequire {
  image: string | null;
  level: number | null;
  name_en: string | null;
  name_kr: string | null;
}

export interface RequireList {
  items: ItemRequire[] | SkillRequire[] | TraderRequire[] | StationRequire[];
  type: string;
}

interface Bonus {
  value: number;
  name_en: string;
  name_kr: string | null;
  skill_name_en: string | null;
  skill_name_kr: string | null;
}

export interface BonusItem {
  bonus: Bonus;
}

export interface BonusList {
  bonuses: Bonus[];
}

export interface DetailCraft {
  crafts: Craft[];
}
