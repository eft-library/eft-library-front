// Generated from weapon_modding_openapi.json (2026-11-13).
import type { BuildNodeInput } from "./builds/types";

export type BallisticsProperties = {
  properties_type: string;
  center_of_impact: number | null;
  deviation_curve: number | null;
  deviation_max: number | null;
  velocity_raw: number | null;
  initial_speed_mps: number | null;
  collected_at: string;
  update_time: string;
};

export type CalculationIssue = {
  code: string;
  node_id?: string | null;
  slot_id?: string | null;
  item_id?: string | null;
};

export type CalculationRequest = {
  weapon_item_id: string;
  nodes: BuildNodeInput[];
  ammo_item_id?: string | null;
};

export type CalculationResult = {
  calculation_version: string;
  source_revision: string;
  ammo_item_id: string | null;
  ammo_selection: "requested" | "weapon_default" | "unavailable";
  assumptions: string[];
  compatibility: CompatibilityResult;
  statistics: WeaponStatistics;
  unavailable: UnavailableMetric[];
};

export type CompatibilityResult = {
  scope: "stored_slot_constraints";
  status: "valid" | "invalid" | "unknown";
  issues: CalculationIssue[];
  excludes: string[];
};

export type WeaponStatistics = {
  weight_kg: number | null;
  ergonomics: number | null;
  recoil_vertical: number | null;
  recoil_horizontal: number | null;
  accuracy_moa: number | null;
  muzzle_velocity_mps: number | null;
  fire_modes: string[] | null;
  caliber: string | null;
  fire_rate_rpm: number | null;
};

export type UnavailableMetric = {
  metric: string;
  code: string;
  item_ids?: string[];
};

