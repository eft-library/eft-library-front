/** Read-only live V3 contract smoke check; never creates or changes server data. */
import assert from "node:assert/strict";
import { getWeapon, getWeapons } from "../features/modding/api";
import {
  getApiCandidates,
  getApiItem,
  getApiPreset,
} from "../features/modding/source-api";
import { buildsApi, BuildApiError } from "../features/modding/builds/api";

async function main() {
  const base = process.argv[2] ?? "https://back.eftlibrary.com";
  process.env.NEXT_PUBLIC_LOCAL_URL = base;
  const nativeFetch = globalThis.fetch;
  let apiRequests = 0;
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    // Force the real frontend's fallback path without changing local static files.
    if (url.startsWith("/static/modding/v3/"))
      return new Response(null, { status: 404 });
    assert.ok(url.startsWith(`${base}/api/modding/v3/`));
    assert.ok(
      !init?.method || init.method === "GET",
      "Read-only verification only",
    );
    assert.ok(
      !new Headers(init?.headers).has("Authorization"),
      "No user credentials",
    );
    apiRequests++;
    return nativeFetch(input, {
      ...init,
      signal: init?.signal ?? AbortSignal.timeout(20_000),
    });
  };
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 60_000);
    try {
      const weapons = await getWeapons(controller.signal);
      assert.equal(weapons.source, "api");
      assert.ok(weapons.list.total > 0);
      const weapon =
        weapons.list.weapons.find(
          (row) => row.item.id === "5447a9cd4bdc2dbd208b4567",
        ) ?? weapons.list.weapons[0];
      const loaded = await getWeapon(
        weapons.manifest,
        weapon.item.id,
        controller.signal,
      );
      assert.equal(loaded.source, "api");
      const root = loaded.snapshot.items[weapon.item.id];
      let testedSlots = 0;
      if (root.slots[0]) {
        const candidates = await getApiCandidates(
          root.item.id,
          root.slots[0].slot_id,
          controller.signal,
        );
        assert.equal(candidates.total, candidates.candidates.length);
        if (candidates.candidates[0])
          await getApiItem(candidates.candidates[0].item.id, controller.signal);
        testedSlots++;
      }
      if (weapon.item.id === "5447a9cd4bdc2dbd208b4567") {
        const receiver = await getApiItem(
          "55d355e64bdc2d962f8b4569",
          controller.signal,
        );
        const rear = receiver.slots.find(
          (slot) => slot.slot_id === "55d35e074bdc2d882f8b456c",
        );
        assert.ok(rear);
        const candidates = await getApiCandidates(
          receiver.item.id,
          rear.slot_id,
          controller.signal,
        );
        assert.equal(candidates.total, candidates.candidates.length);
        testedSlots++;
      }
      const refs = loaded.snapshot.preset_references;
      const preset =
        refs.presets.find((row) => row.link.is_default_reference) ??
        refs.presets[0];
      let componentCount = 0;
      if (preset) {
        const detail = await getApiPreset(preset.item.id, controller.signal);
        assert.equal(detail.composition_type, "flat_source_list");
        componentCount = detail.components.length;
      }
      const publicLatest = await buildsApi.list(
        new URLSearchParams({ sort: "latest", page_size: "20" }),
        controller.signal,
      );
      const publicBest = await buildsApi.list(
        new URLSearchParams({
          sort: "best",
          period: "week",
          page_size: "20",
          weapon_item_id: weapon.item.id,
        }),
        controller.signal,
      );
      assert.ok(Array.isArray(publicLatest.builds));
      assert.equal(publicBest.sort, "best");
      const published = publicLatest.builds[0];
      if (published) {
        const detail = await buildsApi.detail(
          published.id,
          "published",
          undefined,
          controller.signal,
        );
        assert.equal(detail.view, "published");
        if (detail.view === "published") {
          const comments = await buildsApi.comments(
            detail.id,
            detail.revision,
            1,
            undefined,
            controller.signal,
          );
          assert.equal(comments.revision, detail.revision);
        }
      }
      const absentId = "00000000-0000-0000-0000-000000000000";
      await assert.rejects(
        buildsApi.detail(absentId, "published", undefined, controller.signal),
        (error) =>
          error instanceof BuildApiError &&
          error.status === 404 &&
          error.code === "BUILD_NOT_FOUND",
      );
      await assert.rejects(
        buildsApi.comments(absentId, 1, 1, undefined, controller.signal),
        (error) => error instanceof BuildApiError && error.status === 404,
      );
      console.log(
        JSON.stringify(
          {
            base,
            apiRequests,
            weapons: weapons.list.total,
            weaponId: weapon.item.id,
            testedSlots,
            presets: refs.total,
            componentCount,
            publicBuilds: publicLatest.total,
            publicDetailTested: !!published,
            writes: 0,
          },
          null,
          2,
        ),
      );
    } finally {
      clearTimeout(timer);
    }
  } finally {
    globalThis.fetch = nativeFetch;
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
