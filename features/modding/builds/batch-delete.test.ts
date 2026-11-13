import { test } from "node:test";
import assert from "node:assert/strict";
import { BuildApiError } from "./api";
import { deleteBuildBatch } from "./batch-delete";
const targets = [
  { id: "one", title: "One", version: 2 },
  { id: "two", title: "Two", version: 5 },
  { id: "three", title: "Three", version: 8 },
];
test("batch delete preserves reviewed versions, runs sequentially and retains individual conflicts", async () => {
  const calls: string[] = [];
  let running = 0;
  const result = await deleteBuildBatch(targets, async (target) => {
    assert.equal(running++, 0);
    calls.push(`${target.id}:${target.version}`);
    await Promise.resolve();
    running--;
    if (target.id === "two") throw new BuildApiError(409, "BUILD_VERSION_CONFLICT");
  });
  assert.deepEqual(calls, ["one:2", "two:5", "three:8"]);
  assert.deepEqual(result.deleted, ["one", "three"]);
  assert.deepEqual(result.failed.map(({ id, attempted }) => ({ id, attempted })), [{ id: "two", attempted: true }]);
});
test("authentication/service/network failures stop remaining deletes without replay", async () => {
  for (const error of [new BuildApiError(401, "INVALID_TOKEN"), new BuildApiError(503, "BUILD_STORAGE_UNAVAILABLE"), new Error("network")]) {
    const calls: string[] = [];
    const result = await deleteBuildBatch(targets, async (target) => {
      calls.push(target.id);
      if (target.id === "two") throw error;
    });
    assert.deepEqual(calls, ["one", "two"]);
    assert.deepEqual(result.deleted, ["one"]);
    assert.deepEqual(result.failed.map(({ id, attempted }) => ({ id, attempted })), [{ id: "two", attempted: true }, { id: "three", attempted: false }]);
  }
});
test("empty selection makes no delete requests", async () => {
  const result = await deleteBuildBatch([], async () => { assert.fail("Unexpected deletion"); });
  assert.deepEqual(result, { deleted: [], failed: [] });
});
