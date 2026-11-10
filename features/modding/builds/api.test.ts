import { test } from "node:test";
import assert from "node:assert/strict";
import { BuildApiError, buildRequest, buildsApi } from "./api";
import type { CreateBuild } from "./types";

test("build API contract: auth, revision/version, no-store, stable request IDs and failures", async () => {
  const original = globalThis.fetch;
  const requests: Array<{ url: string; init: RequestInit }> = [];
  let response = () =>
    Response.json({ status: 200, msg: "OK", data: { id: "result" } });
  globalThis.fetch = async (input, init) => {
    requests.push({ url: String(input), init: init ?? {} });
    return response();
  };
  try {
    const signal = new AbortController().signal;
    await buildsApi.list(
      new URLSearchParams({ sort: "best", period: "week" }),
      signal,
    );
    assert.equal(
      new Headers(requests.at(-1)!.init.headers).has("Authorization"),
      false,
    );
    assert.equal(requests.at(-1)!.init.cache, "no-store");
    assert.equal(requests.at(-1)!.init.signal, signal);
    await buildsApi.comments("build", 7, 2, "token", signal);
    assert.ok(
      requests
        .at(-1)!
        .url.endsWith("/build/comments?revision=7&page=2&page_size=20"),
    );
    assert.equal(
      new Headers(requests.at(-1)!.init.headers).get("Authorization"),
      "Bearer token",
    );
    const input: CreateBuild = {
      weapon_item_id: "weapon",
      title: "Build",
      nodes: [{ node_id: "root", item_id: "weapon" }],
      request_id: "92d569d5-30fa-4cda-b030-7c2457b648f6",
    };
    response = () =>
      Response.json({ detail: "BUILD_STORAGE_UNAVAILABLE" }, { status: 503 });
    await assert.rejects(
      buildsApi.create(input, "token"),
      (e) => e instanceof BuildApiError && e.status === 503,
    );
    const firstBody = requests.at(-1)!.init.body;
    response = () =>
      Response.json({ status: 200, msg: "OK", data: { id: "result" } });
    await buildsApi.create(input, "token");
    assert.equal(requests.at(-1)!.init.body, firstBody);
    await buildsApi.delete("build", 12, "token");
    assert.ok(requests.at(-1)!.url.endsWith("?expected_version=12"));
    assert.equal(requests.at(-1)!.init.method, "DELETE");
    await buildsApi.vote("build", 8, true, "token");
    assert.ok(requests.at(-1)!.url.endsWith("/vote?revision=8"));
    response = () =>
      Response.json({ detail: "BUILD_REVISION_CONFLICT" }, { status: 409 });
    const count = requests.length;
    await assert.rejects(
      buildsApi.copy(
        "build",
        { revision: 7, request_id: input.request_id },
        "token",
      ),
      (e) => e instanceof BuildApiError && e.code === "BUILD_REVISION_CONFLICT",
    );
    assert.equal(
      requests.length,
      count + 1,
      "mutations must not automatically retry",
    );
    response = () =>
      Response.json({ detail: "INVALID_TOKEN" }, { status: 401 });
    const authCount = requests.length;
    await assert.rejects(
      buildsApi.create(input, "token"),
      (e) => e instanceof BuildApiError && e.status === 401,
    );
    assert.equal(requests.length, authCount + 1);
    response = () =>
      Response.json(
        { detail: "BUILD_COMMENT_RATE_LIMITED" },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    await assert.rejects(
      buildsApi.comment(
        "build",
        { revision: 1, request_id: input.request_id, content: "hello" },
        "token",
      ),
      (e) => e instanceof BuildApiError && e.retryAfterSeconds === 60,
    );
    response = () => Response.json({ detail: [] }, { status: 422 });
    await assert.rejects(
      buildRequest(""),
      (e) => e instanceof BuildApiError && e.code === "BUILD_INPUT_INVALID",
    );
    response = () => Response.json({ status: 200, msg: "OK", data: null });
    await assert.rejects(
      buildRequest(""),
      (e) => e instanceof BuildApiError && e.status === 502,
    );
  } finally {
    globalThis.fetch = original;
  }
});
