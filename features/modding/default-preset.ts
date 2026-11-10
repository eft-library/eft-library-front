import type {
  DefaultPresetSummary,
  PresetDetail,
  PresetPage,
  WeaponSummary,
} from "./types";
import { supportedReconstruction } from "./builds/preset-import";

export function defaultPresetFromReferences(
  references: Pick<PresetPage, "presets">,
): DefaultPresetSummary | null {
  const preset = references.presets.find(
    (row) => row.link.is_default_reference,
  );
  if (!preset) return null;
  const { id, name_en, name_ko, name_ja, image } = preset.item;
  return { id, name_en, name_ko, name_ja, image };
}
export function weaponPreviewImage(weapon: WeaponSummary) {
  return weapon.default_preset?.image ?? weapon.item.image;
}
export function initialPresetAction(
  detail: PresetDetail,
): "confirm" | "choose" | "unavailable" {
  const r = detail.reconstruction;
  if (
    !supportedReconstruction(detail) ||
    !r?.can_import ||
    !r.candidate_trees.length ||
    r.unplaced_components.length
  )
    return "unavailable";
  if (
    r.status === "unique" &&
    r.is_unique === true &&
    r.search_complete &&
    r.candidate_trees.length === 1
  )
    return "confirm";
  if (r.status === "ambiguous" || r.status === "search_limited")
    return "choose";
  return "unavailable";
}
export function validDefaultPreset(value: unknown): boolean {
  if (value === null) return true;
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === "string" &&
    !!row.id &&
    ["name_en", "name_ko", "name_ja", "image"].every(
      (field) => row[field] === null || typeof row[field] === "string",
    )
  );
}
