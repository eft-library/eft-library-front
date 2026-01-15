interface Bonus {
  value: number;
  name: LocaleName;
  skill_name: LocaleName;
}

export interface BonusItem {
  bonus: Bonus;
}

export interface BonusTabTypes {
  bonuses: Bonus[];
}

export interface CraftingTabTypes {
  crafts: Craft[];
}

export interface LevelSelectorTypes {
  masterInfo: Hideout;
}

export interface HideoutViewTypes {
  hideoutData: HideoutData;
}

interface HideoutData {
  hideout_info: Hideout[];
  complete_list: string[];
  item_list: UserItemTypes[];
  item_require_info: ItemRequireInfoTypes[];
}

export interface ItemRequireInfoTypes {
  image: string;
  item_id: string;
  name: LocaleName;
  quantity: number;
}

export interface UserItemTypes {
  id: string;
  count: number;
}

interface Hideout {
  master_id: string;
  master_name: LocaleName;
  image: string;
  data: HideoutLevel[];
}

export interface Craft {
  level: number | null;
  name: LocaleName;
  height: number;
  width: number;
  duration: number;
  quantity: number;
  req_item: CraftItem[];
  image: string;
}

export interface CraftItem {
  item: CraftItemDetail;
  quantity: number;
}

interface CraftItemDetail {
  gridImageLink: string;
  height: number;
  width: number;
  name_en: string;
  name_ko: string;
  name_ja: string;
  normalizedName: string;
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
  name_ko: string;
  name_ja: string;
  quantity: number;
  found_in_raid: boolean;
}

export interface SkillRequire {
  level: number | null;
  name: LocaleName;
  image: string | null;
}

export interface TraderRequire {
  image: string | null;
  value: number | null;
  compare: string | null;
  name: LocaleName;
  require_type: string | null;
}

interface StationRequire {
  image: string | null;
  level: number | null;
  name: LocaleName;
}

interface Bonus {
  value: number;
  name: LocaleName;
  skill_name: LocaleName;
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

export interface RequireTabTypes {
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

export interface StationMapStateTypes {
  id: string;
  json_value: JsonValue;
}

export interface StationMapTypes {
  onChangeMaster: (val: string) => void;
  onClickReset: () => void;
  onClickResetItem: () => void;
  onClickSaveItem: () => void;
  masterId: string;
  completeList: string[];
  userItemList: UserItemTypes[];
  itemRequireInfo: ItemRequireInfoTypes[];
  hideoutInfo: Hideout[];
  setUserItemList: React.Dispatch<React.SetStateAction<UserItemTypes[]>>;
}

export interface LevelSelector {
  masterId: string;
  selectLevelId: string;
  hideoutData: HideoutData;
  onChangeLevel: (val: string) => void;
}

export interface HideoutDetailTypes {
  levelId: string;
  hideoutData: HideoutData;
  onClickSave: (val: string, type: string) => void;
  complete_list: string[];
  onChangeLevel: (val: string) => void;
}

export interface ItemRequire {
  id: string;
  count: number;
  image: string;
  name: LocaleName;
  quantity: number;
  level_id: string;
  station_master_id: string;
}

export interface SkillRequire {
  level: number | null;
  name: LocaleName;
  image: string | null;
  level_id: string;
  station_master_id: string;
}

export interface TraderRequire {
  image: string | null;
  value: number | null;
  compare: string | null;
  name: LocaleName;
  level_id: string;
  station_master_id: string;
}

interface StationRequire {
  image: string | null;
  level: number | null;
  name: LocaleName;
  level_id: string;
  station_master_id: string;
}

export interface RequireList {
  items: ItemRequire[] | SkillRequire[] | TraderRequire[] | StationRequire[];
  type: string;
}

interface Bonus {
  value: number;
  name: LocaleName;
  skill_name: LocaleName;
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

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}
