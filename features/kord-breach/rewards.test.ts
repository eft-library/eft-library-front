import { test } from "node:test";
import assert from "node:assert/strict";
import { rewardStage } from "./rewards";
import type { KordReward } from "../../types/api/kord-breach";

const reward: KordReward = {
  id: "test-reward", sort_order: 0,
  item: { id: "test-item", name_en: "Test", name_ko: null, name_ja: null, image: null, normalized_name: null, category: null },
  required_level: null, unlock_conditions_known: true, unlock_conditions: [],
};
const quest = { group_no: 0, sort_order: 0, condition_type: "quest_completed" as const, required_level: null, quest: null };
const level = { group_no: 0, sort_order: 1, condition_type: "player_level" as const, required_level: 25, quest: null };

test("only a confirmed empty condition list means unrestricted", () => {
  assert.equal(rewardStage(reward), "none");
  assert.equal(rewardStage({ ...reward, unlock_conditions_known: false }), "unknown");
});
test("quest requirements do not become unrestricted when required_level is null", () => {
  assert.equal(rewardStage({ ...reward, unlock_conditions: [quest] }), "quests");
});
test("only the API's standalone reward level determines the level stage", () => {
  assert.equal(rewardStage({ ...reward, required_level: 25, unlock_conditions: [level] }), "level:25");
});
test("AND and OR combinations retain the combined conditions stage", () => {
  assert.equal(rewardStage({ ...reward, unlock_conditions: [quest, level] }), "complex");
  assert.equal(rewardStage({ ...reward, unlock_conditions: [quest, { ...level, group_no: 1 }] }), "complex");
});
test("unconfirmed conditions stay unconfirmed even with known partial rows", () => {
  assert.equal(rewardStage({ ...reward, unlock_conditions_known: false, unlock_conditions: [quest] }), "unknown");
});
