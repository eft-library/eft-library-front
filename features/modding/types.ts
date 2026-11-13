import type { BallisticsProperties } from "./statistics-types";

// Generated from gun_preset/weapon_modding_openapi.json (2026-11-10).
export type Candidate = {
  item: ItemSummary;
};

export type CandidatePage = {
  total: number;
  page: number;
  page_size: number;
  item_id: string;
  slot_id: string;
  validation_scope: "slot_filters_only";
  candidates: Candidate[];
};

export type CategoryEntry = {
  category: CategorySummary;
  sort_order: number;
};

export type CategorySummary = {
  id: string;
  parent_id: string | null;
  name_key: string | null;
  name_en: string | null;
  name_ko: string | null;
  name_ja: string | null;
  normalized_name: string | null;
};

export type Conflicts = {
  items: ItemEntry[];
  slots: SlotConflict[];
  categories: CategoryEntry[];
};

export type HTTPValidationError = {
  detail?: ValidationError[];
};

export type ItemDetail = {
  // Older V3 static generations can omit this additive source field.
  ballistics?: BallisticsProperties | null;
  item: ItemSummary;
  categories: CategoryEntry[];
  weapon_properties: WeaponProperties | null;
  allowed_ammo: ItemSummary[];
  slots: Slot[];
  conflicts: Conflicts;
};

export type ItemEntry = {
  item: ItemSummary;
  sort_order: number;
};

export type ItemSummary = {
  id: string;
  name_en: string | null;
  name_ko: string | null;
  name_ja: string | null;
  normalized_name: string | null;
  image: string | null;
  weight: number | null;
  width: number | null;
  height: number | null;
  slot_count: number;
  mod_properties: ModProperties | null;
};

export type LinkedPreset = {
  item: ItemSummary;
  base_item_id: string;
  is_default: boolean | null;
  ergonomics: number | null;
  recoil_vertical: number | null;
  recoil_horizontal: number | null;
  moa: number | null;
  collected_at: string;
  update_time: string;
  link: PresetLink;
};

export type ModProperties = {
  properties_type: string;
  ergonomics: number | null;
  recoil_modifier: number | null;
  accuracy_modifier: number | null;
  zoom_levels: number[][] | null;
  ergonomics_modifier: number | null;
  item_recoil_modifier: number | null;
  item_accuracy_modifier: number | null;
  collected_at: string;
  update_time: string;
};

export type ModdingResponse_CandidatePage_ = {
  status: 200;
  msg: "OK";
  data: CandidatePage;
};

export type ModdingResponse_ItemDetail_ = {
  status: 200;
  msg: "OK";
  data: ItemDetail;
};

export type ModdingResponse_PresetDetail_ = {
  status: 200;
  msg: "OK";
  data: PresetDetail;
};

export type ModdingResponse_PresetPage_ = {
  status: 200;
  msg: "OK";
  data: PresetPage;
};

export type ModdingResponse_WeaponPage_ = {
  status: 200;
  msg: "OK";
  data: WeaponPage;
};

export type PresetComponent = {
  component_index: number;
  quantity: number;
  attributes: Record<string, unknown> | null;
  item: ItemSummary;
};

export type PresetDetail = {
  // Older V3 static generations intentionally remain readable (see preset_reconstruction.md).
  reconstruction?: PresetReconstruction;
  preset: PresetSummary;
  components: PresetComponent[];
  weapon_links: WeaponPresetLink[];
  composition_type: "flat_source_list";
};

export type PresetLink = {
  is_listed: boolean;
  is_default_reference: boolean;
  sort_order: number | null;
};

export type PresetPage = {
  total: number;
  page: number;
  page_size: number;
  weapon_item_id: string;
  presets: LinkedPreset[];
};

export type PresetSummary = {
  item: ItemSummary;
  base_item_id: string;
  is_default: boolean | null;
  ergonomics: number | null;
  recoil_vertical: number | null;
  recoil_horizontal: number | null;
  moa: number | null;
  collected_at: string;
  update_time: string;
};

export type Slot = {
  item_id: string;
  slot_id: string;
  name_id: string;
  name_key: string | null;
  name_en: string | null;
  name_ko: string | null;
  name_ja: string | null;
  required: boolean;
  sort_order: number;
  collected_at: string;
  update_time: string;
  filters: SlotFilters;
};

export type SlotConflict = {
  sort_order: number;
  slot_id: string;
  definitions: SlotDefinition[];
};

export type SlotDefinition = {
  item_id: string;
  slot_id: string;
  name_id: string;
  name_key: string | null;
  name_en: string | null;
  name_ko: string | null;
  name_ja: string | null;
};

export type SlotFilters = {
  allowed_items: ItemEntry[];
  excluded_items: ItemEntry[];
  allowed_categories: CategoryEntry[];
  excluded_categories: CategoryEntry[];
};

export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
};

export type WeaponPage = {
  total: number;
  page: number;
  page_size: number;
  weapons: WeaponSummary[];
};

export type WeaponPresetLink = {
  is_listed: boolean;
  is_default_reference: boolean;
  sort_order: number | null;
  weapon_item_id: string;
};

export type WeaponProperties = {
  caliber: string | null;
  fire_rate: number | null;
  ergonomics: number | null;
  recoil_horizontal: number | null;
  recoil_vertical: number | null;
  default_ammo_item_id: string | null;
  is_single_fire: boolean | null;
  is_full_auto: boolean | null;
  is_burst_fire: boolean | null;
  is_double_action: boolean | null;
  is_double_tap: boolean | null;
  is_semi_auto: boolean | null;
};

export type DefaultPresetSummary = {
  id: string;
  name_en: string | null;
  name_ko: string | null;
  name_ja: string | null;
  image: string | null;
};

export type WeaponSummary = {
  default_preset: DefaultPresetSummary | null;
  item: ItemSummary;
  weapon_properties: WeaponProperties;
  preset_count: number;
};

// Static snapshots merge API pages and omit page/page_size.
export interface ModdingManifest {
  generation: string;
  schema_version: 1;
  weapons_list: string;
  weapons: Record<string, string>;
  total: number;
}
export interface WeaponList {
  total: number;
  weapons: WeaponSummary[];
}
export interface WeaponSnapshot {
  weapon: WeaponSummary;
  items: Record<string, ItemDetail>;
  slot_candidates: Record<
    string,
    Record<string, Omit<CandidatePage, "page" | "page_size">>
  >;
  preset_references: Omit<PresetPage, "page" | "page_size">;
  presets: Record<string, PresetDetail>;
  validation_scope: "slot_filters_only";
  composition_type: "flat_source_list";
}

// Additive reconstruction contract from the updated V3 OpenAPI.
export type PresetReconstruction = {
  method: "inferred";
  algorithm_version: 1;
  is_source_tree: false;
  validation_scope: "stored_slot_constraints";
  status:
    | "unique"
    | "ambiguous"
    | "incomplete"
    | "unavailable"
    | "search_limited";
  can_import: boolean;
  requires_confirmation: true;
  is_unique: boolean | null;
  search_complete: boolean;
  solution_count_lower_bound: number;
  states_examined: number;
  candidate_trees: ReconstructedTree[];
  partial_tree: ReconstructedTree | null;
  unplaced_components: UnplacedComponent[];
  issues: ReconstructionIssue[];
  issues_truncated: boolean;
};

export type ReconstructedTree = {
  nodes: ReconstructedNode[];
};

export type ReconstructedNode = {
  node_id: string;
  item_id: string;
  parent_node_id: string | null;
  slot_id: string | null;
  attributes: Record<string, unknown> | null;
  source_component_index: number;
  source_unit_index: number;
};

export type UnplacedComponent = {
  component_index: number;
  item_id: string;
  quantity: number;
  attributes: Record<string, unknown> | null;
};

export type ReconstructionIssue = {
  code:
    | "UNSUPPORTED_BASE_ITEM"
    | "INVALID_COMPONENTS"
    | "NODE_LIMIT"
    | "ROOT_COMPONENT_COUNT"
    | "MISSING_ITEM_DEFINITION"
    | "UNRESOLVED_CONFLICT_SLOT"
    | "ITEM_CONFLICT"
    | "CATEGORY_CONFLICT"
    | "SLOT_UNREACHABLE"
    | "AMMUNITION_WITHOUT_SLOT"
    | "MULTIPLE_SOLUTIONS"
    | "SEARCH_LIMIT"
    | "SOLUTION_LIMIT"
    | "REQUIRED_SLOT_UNFILLED"
    | "NO_COMPLETE_TREE";
  node_id?: string | null;
  other_node_id?: string | null;
  item_id?: string | null;
  slot_id?: string | null;
};
