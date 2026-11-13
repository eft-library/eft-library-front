import { test } from "node:test";
import assert from "node:assert/strict";
import { calculationInput, calculateStatistics } from "./statistics-api";
import { newContent, mountPart } from "./builds/tree";
import type { ItemSummary, WeaponSummary } from "./types";
const item: ItemSummary = { id: "weapon", name_en: "Weapon", name_ko: null, name_ja: null, normalized_name: null, image: null, weight: 0, width: 1, height: 1, slot_count: 1, mod_properties: null };
const weapon: WeaponSummary = { item, preset_count: 0, default_preset: null, weapon_properties: { caliber: null, fire_rate: null, ergonomics: null, recoil_horizontal: null, recoil_vertical: null, default_ammo_item_id: null, is_single_fire: null, is_full_auto: null, is_burst_fire: null, is_double_action: null, is_double_tap: null, is_semi_auto: null } };
test("calculation uses instance tree only and allows untitled drafts", () => {
  let content = newContent(weapon);
  content = mountPart(content, "weapon/a", { ...item, id: "same-part" }, () => "a");
  content = mountPart(content, "weapon/b", { ...item, id: "same-part" }, () => "b");
  content.nodes[1].attributes = { setting: 0 };
  const input = calculationInput(content);
  assert.equal(input.nodes.length, 3);
  assert.equal(input.nodes.filter((node) => node.item_id === "same-part").length, 2);
  assert.deepEqual(input.nodes[1].attributes, { setting: 0 });
  assert.ok(!("item" in input.nodes[0]) && !("title" in input));
});
test("preview replaces parent and removes descendants without mutating current build", () => {
  let content = newContent(weapon);
  content = mountPart(content, "weapon/parent", { ...item, id: "parent" }, () => "p");
  content = mountPart(content, "weapon/parent/child", { ...item, id: "child" }, () => "c");
  const next = mountPart(content, "weapon/parent", { ...item, id: "other" }, () => "preview");
  assert.equal(content.nodes.length, 3);
  assert.deepEqual(calculationInput(next).nodes.map((node) => node.item_id), ["weapon", "other"]);
  assert.equal(mountPart(content, "weapon/parent", { ...item, id: "parent" }), content);
});
test("removing an installed parent clears its subtree and leaves other branches", () => {
  let content = newContent(weapon);
  content = mountPart(content, "weapon/parent", { ...item, id: "parent" }, () => "p");
  content = mountPart(content, "weapon/parent/child", { ...item, id: "child" }, () => "c");
  content = mountPart(content, "weapon/other", { ...item, id: "other" }, () => "o");
  const removed = mountPart(content, "weapon/parent");
  assert.deepEqual(removed.nodes.map((node) => node.item_id), ["weapon", "other"]);
  assert.equal(content.nodes.length, 4);
});
test("calculation API is no-store, abortable, preserves zero/null and surfaces errors", async () => {
  const original = globalThis.fetch;
  const signal = new AbortController().signal;
  globalThis.fetch = async (url, init) => {
    assert.ok(String(url).endsWith("/api/modding/v3/calculate"));
    assert.equal(init?.method, "POST"); assert.equal(init?.cache, "no-store"); assert.equal(init?.signal, signal);
    assert.equal(JSON.parse(String(init?.body)).ammo_item_id, null);
    return Response.json({ status: 200, msg: "OK", data: { statistics: { weight_kg: 0, accuracy_moa: null } } });
  };
  try {
    const result = await calculateStatistics(calculationInput(newContent(weapon)), signal);
    assert.equal(result.statistics.weight_kg, 0); assert.equal(result.statistics.accuracy_moa, null);
    globalThis.fetch = async () => Response.json({ detail: "MODDING_LOOKUP_UNAVAILABLE" }, { status: 503 });
    await assert.rejects(calculateStatistics(calculationInput(newContent(weapon)), signal), /MODDING_LOOKUP_UNAVAILABLE/);
    globalThis.fetch = async () => Response.json({ status: 200, msg: "FAIL", data: null });
    await assert.rejects(calculateStatistics(calculationInput(newContent(weapon)), signal));
  } finally { globalThis.fetch = original; }
});
