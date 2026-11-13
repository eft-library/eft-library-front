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

test("left-heavy builds wrap on the left while the weapon center stays fixed", () => {
  const entries = Array.from({ length: 12 }, (_, index) => slot("mod_handguard", `root/left-${index}`));
  entries.push(slot("mod_stock", "root/right"));
  const result = layoutSlots(entries);
  assert.equal(result.weaponCol, 5);
  assert.ok(result.slots.filter((position) => position.entry.key.includes("left-")).every((position) => position.col <= 4));
  assert.ok(result.slots.some((position) => position.row >= 3));
});
test("new children do not move existing slots, and removing children does not compact holes", () => {
  const first = [slot("mod_reciever", "root/r"), slot("mod_barrel", "root/b"), slot("mod_stock", "root/s")];
  const before = layoutSlots(first);
  const child = slot("mod_mount", "root/r/m");
  const added = layoutSlots([first[0], child, ...first.slice(1)], before);
  const position = (layout: ReturnType<typeof layoutSlots>, key: string) => {
    const cell = layout.slots.find((entry) => entry.entry.key === key)!;
    return [cell.col, cell.row];
  };
  for (const entry of first) assert.deepEqual(position(added, entry.key), position(before, entry.key));
  assert.deepEqual(position(added, child.key), [2, 1]);
  const removed = layoutSlots([first[0], child, first[2]], added);
  assert.deepEqual(position(removed, child.key), position(added, child.key));
  assert.deepEqual(position(removed, first[2].key), position(added, first[2].key));
});
test("stage height does not shrink when removing overflow slots", () => {
  const entries = Array.from({ length: 40 }, (_, index) => slot("mod_handguard", `root/${index}`));
  const before = layoutSlots(entries);
  assert.ok(before.height > 600);
  const after = layoutSlots([entries[0]], before);
  assert.equal(after.height, before.height);
  assert.equal(after.weaponCol, 5);
});
