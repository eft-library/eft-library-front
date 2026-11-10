import { test } from "node:test";
import assert from "node:assert/strict";
import {
  defaultPresetFromReferences,
  initialPresetAction,
  validDefaultPreset,
  weaponPreviewImage,
} from "./default-preset";
import type {
  LinkedPreset,
  PresetDetail,
  PresetReconstruction,
  WeaponSummary,
} from "./types";
const item = {
  id: "weapon",
  name_en: "Weapon",
  name_ko: null,
  name_ja: null,
  normalized_name: null,
  image: "bare.webp",
  weight: 0,
  width: 1,
  height: 1,
  slot_count: 0,
  mod_properties: null,
};
const summary = {
  id: "default",
  name_en: "Standard",
  name_ko: null,
  name_ja: null,
  image: "complete.webp",
};
const props = {
  caliber: null,
  fire_rate: null,
  ergonomics: 0,
  recoil_horizontal: 0,
  recoil_vertical: 0,
  default_ammo_item_id: null,
  is_single_fire: null,
  is_full_auto: null,
  is_burst_fire: null,
  is_double_action: null,
  is_double_tap: null,
  is_semi_auto: null,
};
const preset: LinkedPreset = {
  item: { ...item, id: "default" },
  base_item_id: "weapon",
  is_default: false,
  ergonomics: null,
  recoil_vertical: null,
  recoil_horizontal: null,
  moa: null,
  collected_at: "",
  update_time: "",
  link: { is_listed: true, is_default_reference: false, sort_order: 0 },
};
function reconstruction(): PresetReconstruction {
  return {
    method: "inferred",
    algorithm_version: 1,
    is_source_tree: false,
    validation_scope: "stored_slot_constraints",
    status: "unique",
    can_import: true,
    requires_confirmation: true,
    is_unique: true,
    search_complete: true,
    solution_count_lower_bound: 1,
    states_examined: 1,
    candidate_trees: [{ nodes: [] }],
    partial_tree: null,
    unplaced_components: [],
    issues: [],
    issues_truncated: false,
  };
}
function detail(r?: PresetReconstruction): PresetDetail {
  return {
    preset,
    components: [],
    weapon_links: [],
    composition_type: "flat_source_list",
    reconstruction: r,
  };
}
test("weapon cards prefer the completed default image and fall back when absent", () => {
  const weapon: WeaponSummary = {
    item,
    weapon_properties: props,
    preset_count: 1,
    default_preset: summary,
  };
  assert.equal(weaponPreviewImage(weapon), "complete.webp");
  assert.equal(
    weaponPreviewImage({ ...weapon, default_preset: null }),
    "bare.webp",
  );
  assert.equal(
    weaponPreviewImage({
      ...weapon,
      default_preset: { ...summary, image: null },
    }),
    "bare.webp",
  );
  assert.equal(validDefaultPreset(summary), true);
  assert.equal(validDefaultPreset(null), true);
  assert.equal(validDefaultPreset(undefined), false);
});
test("API fallback selects only the explicit default reference, not the first or is_default flag", () => {
  assert.equal(
    defaultPresetFromReferences({ presets: [{ ...preset, is_default: true }] }),
    null,
  );
  const selected = defaultPresetFromReferences({
    presets: [
      preset,
      {
        ...preset,
        item: { ...item, id: "actual", image: "actual.webp" },
        link: { ...preset.link, is_default_reference: true },
      },
    ],
  });
  assert.equal(selected?.id, "actual");
  assert.equal(selected?.image, "actual.webp");
});
test("initial defaults require confirmation and ambiguous/limited layouts require selection", () => {
  assert.equal(initialPresetAction(detail(reconstruction())), "confirm");
  for (const status of ["ambiguous", "search_limited"] as const)
    assert.equal(
      initialPresetAction(
        detail({
          ...reconstruction(),
          status,
          is_unique: null,
          search_complete: false,
        }),
      ),
      "choose",
    );
  assert.equal(initialPresetAction(detail()), "unavailable");
  assert.equal(
    initialPresetAction(
      detail({ ...reconstruction(), status: "incomplete", can_import: false }),
    ),
    "unavailable",
  );
  assert.equal(
    initialPresetAction(
      detail({ ...reconstruction(), search_complete: false }),
    ),
    "unavailable",
  );
});
