import { test } from "node:test";
import assert from "node:assert/strict";
import { attachmentRoute, layoutSlots, TILE_HEIGHT, TILE_WIDTH } from "./workbench-layout";
import type { BuildSlot } from "./build";
import type { ItemDetail, ItemSummary, WeaponSnapshot } from "./types";
const item = (id: string): ItemSummary => ({ id, name_en: id, name_ko: null, name_ja: null, normalized_name: id, image: null, weight: 1, width: 1, height: 1, slot_count: 0, mod_properties: null });
function slot(name: string, key: string, filled = false): BuildSlot {
  return { key, depth: key.split("/").length - 2, blocked: false, selected: filled ? item(`${key}-item`) : undefined, slot: { item_id: "root", slot_id: key.split("/").at(-1)!, name_id: name, name_key: null, name_en: name, name_ko: null, name_ja: null, required: false, sort_order: 0, collected_at: "", update_time: "", filters: { allowed_items: [], excluded_items: [], allowed_categories: [], excluded_categories: [] } } };
}
function detail(id: string, names: string[]): ItemDetail {
  return { item: item(id), categories: [], weapon_properties: null, allowed_ammo: [], conflicts: { items: [], categories: [], slots: [] }, slots: names.map((name, i) => slot(name, `root/${i}`).slot) };
}
const cell = (layout: ReturnType<typeof layoutSlots>, key: string) => layout.slots.find((position) => position.entry.key === key)!;
test("front axis is contiguous in specified order, excluding mounts and front sights", () => {
  const entries = [slot("mod_reciever", "root/r", true), slot("mod_mount", "root/r/m"), slot("mod_barrel", "root/r/b", true), slot("mod_sight_front", "root/r/b/f"), slot("mod_handguard", "root/r/h", true), slot("mod_gas_block", "root/r/g", true), slot("mod_muzzle", "root/r/b/m", true), slot("mod_muzzle_001", "root/r/b/m/s", true)];
  const result = layoutSlots(entries);
  assert.deepEqual(result.slots.filter((slot) => slot.area === "axis").sort((a,b) => b.col-a.col).map((slot) => slot.entry.key), ["root/r", "root/r/b", "root/r/h", "root/r/g", "root/r/b/m", "root/r/b/m/s"]);
  assert.deepEqual(result.slots.filter((slot) => slot.area === "axis").map((slot) => slot.col).sort((a,b) => b-a), [-1,-2,-3,-4,-5,-6]);
  assert.ok(cell(result,"root/r/b/f").row < 0);
  assert.ok(cell(result,"root/r/m").row > 0);
});
test("filled slot takes axis priority when a kind has several definitions", () => {
  const result = layoutSlots([slot("mod_barrel", "root/empty"), slot("mod_barrel_001", "root/filled", true)]);
  assert.equal(cell(result,"root/filled").area,"axis");
  assert.notEqual(cell(result,"root/empty").row,0);
});
test("rear axis follows stock chain, other stock children go below", () => {
  const result = layoutSlots([slot("mod_stock", "root/s", true), slot("mod_stock", "root/s/pad", true), slot("mod_stock_001", "root/s/cheek", true)]);
  assert.equal(cell(result,"root/s").col,3);
  assert.equal(cell(result,"root/s/pad").col,4);
  assert.ok(cell(result,"root/s/cheek").row > 0);
});
test("mount classification uses mounted definitions or candidate slot types", () => {
  const source: Pick<WeaponSnapshot,"items"|"slot_candidates"> = { items: { optic: detail("optic",["mod_scope_000"]), rail: detail("rail",["mod_tactical001"]) }, slot_candidates: { root: { upper: { item_id:"root",slot_id:"upper",total:1,validation_scope:"slot_filters_only",candidates:[{item:item("optic")}] }, lower: { item_id:"root",slot_id:"lower",total:1,validation_scope:"slot_filters_only",candidates:[{item:item("rail")}] } } } };
  const result = layoutSlots([slot("mod_mount","root/upper"),slot("mod_mount","root/lower")],undefined,source);
  assert.equal(cell(result,"root/upper").area,"top");
  assert.equal(cell(result,"root/lower").area,"rail");
});
test("rail descendants use successive rows and optic accessories stay with their optic", () => {
  const result = layoutSlots([slot("mod_mount","root/rail",true),slot("mod_tactical","root/rail/ring",true),slot("mod_flashlight","root/rail/ring/light",true),slot("mod_scope","root/optic",true),slot("mod_tactical","root/optic/laser")]);
  assert.equal(cell(result,"root/rail/ring").row,cell(result,"root/rail").row+1);
  assert.equal(cell(result,"root/rail/ring/light").row,cell(result,"root/rail/ring").row+1);
  assert.equal(cell(result,"root/optic/laser").area,"top");
  assert.ok(cell(result,"root/optic/laser").row < cell(result,"root/optic").row);
});
test("existing nodes retain exact positions across additions/removals and reordered input", () => {
  const entries = [slot("mod_reciever","root/r",true),slot("mod_barrel","root/r/b",true),slot("mod_mount","root/r/rail",true),slot("mod_scope","root/r/optic",true)];
  const first = layoutSlots(entries);
  const added = layoutSlots([...entries,slot("mod_tactical","root/r/rail/laser")],first);
  for (const entry of entries) assert.deepEqual([cell(added,entry.key).x,cell(added,entry.key).y],[cell(first,entry.key).x,cell(first,entry.key).y]);
  const removed = layoutSlots([entries[0],entries[1],entries[3]],added);
  assert.deepEqual([cell(removed,entries[3].key).x,cell(removed,entries[3].key).y],[cell(first,entries[3].key).x,cell(first,entries[3].key).y]);
});
test("200 slots never overlap, touch weapon cells or put non-axis slots on the axis", () => {
  const result = layoutSlots(Array.from({length:200},(_,i) => slot(i%2 ? "mod_tactical001":"mod_scope_003",`root/${i}`)));
  assert.equal(new Set(result.slots.map((slot)=>`${slot.col},${slot.row}`)).size,200);
  for (const slot of result.slots) assert.notEqual(slot.row,0);
});
test("route endpoints attach to the child and use orthogonal paths", () => {
  const route = attachmentRoute({x:0,y:0,width:296,height:TILE_HEIGHT},{x:-110,y:0,width:TILE_WIDTH,height:TILE_HEIGHT});
  assert.equal(route.path,"M0,52 H-14");
  const above = attachmentRoute({x:0,y:0,width:TILE_WIDTH,height:TILE_HEIGHT},{x:110,y:-118,width:TILE_WIDTH,height:TILE_HEIGHT});
  assert.equal(above.end.y,-14);
  assert.ok(above.path.includes(" V"));
});
