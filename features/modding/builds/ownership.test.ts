import { test } from "node:test";
import assert from "node:assert/strict";
import { buildsApi } from "./api";
import { getOwnedBuildSummaries } from "./ownership";
import type { OwnBuildSummary } from "./types";
function summary(id: string): OwnBuildSummary {
  return { id, title: "Same nickname/title cannot identify ownership", weapon_item_id: "weapon", version: 7, is_public: true, published_revision: 2, created_at: "", updated_at: "" };
}
test("ownership uses every authenticated page and preserves workspace versions, not public revisions", async () => {
  const original = buildsApi.mine;
  const signal = new AbortController().signal;
  const rows = Array.from({ length: 21 }, (_, index) => summary(`own-${index}`));
  const calls: number[] = [];
  buildsApi.mine = async (page, token, receivedSignal) => {
    calls.push(page); assert.equal(token, "owner-token"); assert.equal(receivedSignal, signal);
    return { total: 21, page, page_size: 20, builds: rows.slice((page - 1) * 20, page * 20) };
  };
  try {
    const result = await getOwnedBuildSummaries("owner-token", signal);
    assert.deepEqual(calls, [1, 2]);
    assert.equal(result.at(-1)?.id, "own-20");
    assert.equal(result.at(-1)?.version, 7);
    assert.equal(result.some((build) => build.id === "someone-else"), false);
  } finally { buildsApi.mine = original; }
});
test("empty ownership is successful; incomplete, duplicate and failed pages do not grant partial ownership", async () => {
  const original = buildsApi.mine;
  const signal = new AbortController().signal;
  try {
    buildsApi.mine = async () => ({ total: 0, page: 1, page_size: 20, builds: [] });
    assert.deepEqual(await getOwnedBuildSummaries("token", signal), []);
    buildsApi.mine = async () => ({ total: 2, page: 1, page_size: 20, builds: [summary("one")] });
    await assert.rejects(getOwnedBuildSummaries("token", signal), /BUILD_RESPONSE_INVALID/);
    buildsApi.mine = async () => ({ total: 2, page: 1, page_size: 20, builds: [summary("one"), summary("one")] });
    await assert.rejects(getOwnedBuildSummaries("token", signal), /BUILD_RESPONSE_INVALID/);
    buildsApi.mine = async () => { throw new Error("AUTH_SERVICE_UNAVAILABLE"); };
    await assert.rejects(getOwnedBuildSummaries("token", signal), /AUTH_SERVICE_UNAVAILABLE/);
  } finally { buildsApi.mine = original; }
});
