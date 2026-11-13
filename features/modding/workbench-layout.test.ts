import { test } from "node:test";
import assert from "node:assert/strict";
import { layoutSlots } from "./workbench-layout";
import type { BuildSlot } from "./build";
function slot(name: string, key = `root/${name}`): BuildSlot {
  return { key, depth: 0, blocked: false, slot: { item_id: "root", slot_id: key, name_id: name, name_key: null, name_en: null, name_ko: null, name_ja: null, required: false, sort_order: 0, collected_at: "", update_time: "", filters: { allowed_items: [], excluded_items: [], allowed_categories: [], excluded_categories: [] } } };
}
test("slot kind normalization includes numeric suffixes with or without underscores", () => {
  const result = layoutSlots([slot("mod_tactical001"), slot("mod_tactical_002"), slot("mod_scope_003")]);
  assert.equal(result.slots.find((x) => x.entry.slot.name_id === "mod_scope_003")?.row, 0);
  assert.equal(result.slots.filter((x) => x.entry.slot.name_id.startsWith("mod_tactical")).every((x) => x.row === 2), true);
});
test("mount inherits parent zone immediately outside the parent", () => {
  const result = layoutSlots([slot("mod_reciever", "root/r"), slot("mod_mount", "root/r/m")]);
  assert.deepEqual(result.slots.map((x) => [x.col, x.row]), [[4, 1], [3, 1]]);
});
test("many slots never overlap the weapon or one another and extend overflow rows", () => {
  const result = layoutSlots(Array.from({ length: 200 }, (_, i) => slot(`mod_scope_${i}`, `root/${i}`)));
  const cells = result.slots.map((x) => `${x.col},${x.row}`);
  assert.equal(new Set(cells).size, 200);
  assert.ok(result.height > 600);
  for (const x of result.slots) {
    assert.ok(x.col >= 0 && x.col <= 12);
    assert.ok(!(x.col >= 5 && x.col <= 7 && (x.row === 1 || x.row === 2)));
    assert.ok(x.y + 112 <= result.height);
  }
});
test("repeated slot kinds on different instances remain distinct", () => {
  const result = layoutSlots([slot("mod_stock", "root/a"), slot("mod_stock", "root/a/b")]);
  assert.equal(result.slots.length, 2);
  assert.notEqual(result.slots[0].col, result.slots[1].col);
});
