import { test } from "node:test";
import assert from "node:assert/strict";
import { getWeapon, getWeapons } from "./api";
import {
  getApiCandidates,
  getApiItem,
  getApiPreset,
  ModdingApiError,
} from "./source-api";
import type {
  ItemDetail,
  ItemSummary,
  ModdingManifest,
  WeaponSnapshot,
  WeaponSummary,
} from "./types";
const rootId = "1".repeat(24);
const generation = "a".repeat(32);
const signal = () => new AbortController().signal;
function item(id = rootId): ItemSummary {
  return {
    id,
    name_en: id,
    name_ko: null,
    name_ja: null,
    normalized_name: null,
    image: null,
    weight: 0,
    width: 1,
    height: 1,
    slot_count: 1,
    mod_properties: null,
  };
}
const properties = {
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
function weapon(id = rootId): WeaponSummary {
  return { item: item(id), weapon_properties: properties, preset_count: 0 };
}
function detail(id = rootId): ItemDetail {
  return {
    item: item(id),
    weapon_properties: properties,
    categories: [],
    allowed_ammo: [],
    conflicts: { items: [], slots: [], categories: [] },
    slots: [
      {
        item_id: id,
        slot_id: "rear",
        name_id: "mod_rear",
        name_key: null,
        name_en: null,
        name_ko: null,
        name_ja: null,
        required: false,
        sort_order: 0,
        collected_at: "",
        update_time: "",
        filters: {
          allowed_items: [],
          excluded_items: [],
          allowed_categories: [],
          excluded_categories: [],
        },
      },
    ],
  };
}
function manifest(gen = generation): ModdingManifest {
  return {
    generation: gen,
    schema_version: 1,
    total: 1,
    weapons_list: `/static/modding/v3/snapshots/${gen}/weapons.json`,
    weapons: {
      [rootId]: `/static/modding/v3/snapshots/${gen}/weapons/${rootId}.json`,
    },
  };
}
function snapshot(): WeaponSnapshot {
  return {
    weapon: weapon(),
    items: { [rootId]: detail() },
    slot_candidates: {
      [rootId]: {
        rear: {
          item_id: rootId,
          slot_id: "rear",
          total: 0,
          validation_scope: "slot_filters_only",
          candidates: [],
        },
      },
    },
    presets: {},
    preset_references: { weapon_item_id: rootId, total: 0, presets: [] },
    validation_scope: "slot_filters_only",
    composition_type: "flat_source_list",
  };
}
const ok = (data: unknown) => Response.json({ status: 200, msg: "OK", data });
function presets() {
  return {
    weapon_item_id: rootId,
    total: 0,
    page: 1,
    page_size: 100,
    presets: [],
  };
}

test("modding static-first and lazy V3 fallback", async (t) => {
  const original = globalThis.fetch;
  try {
    await t.test(
      "valid static snapshot and empty list do not call API",
      async () => {
        const urls: string[] = [];
        globalThis.fetch = async (input) => {
          const url = String(input);
          urls.push(url);
          return url.includes("index.json")
            ? ok({ ...manifest(), total: 0, weapons: {} })
            : url.endsWith("weapons.json")
              ? ok({ total: 0, weapons: [] })
              : ok(snapshot());
        };
        assert.equal((await getWeapons(signal())).source, "static");
        assert.equal(
          (await getWeapon(manifest(), rootId, signal())).source,
          "static",
        );
        assert.ok(urls.every((url) => url.startsWith("/static/")));
      },
    );
    await t.test(
      "missing manifest falls back and collects all 100-row API pages",
      async () => {
        const calls: string[] = [];
        globalThis.fetch = async (input, init) => {
          const url = String(input);
          calls.push(url);
          if (url.startsWith("/static/"))
            return new Response(null, { status: 404 });
          assert.equal(init?.cache, "no-store");
          assert.ok(init?.signal);
          const page = Number(new URL(url).searchParams.get("page"));
          return ok({
            total: 101,
            page,
            page_size: 100,
            weapons: Array.from({ length: page === 1 ? 100 : 1 }, (_, i) =>
              weapon((page === 1 ? i : i + 100).toString(16).padStart(24, "0")),
            ),
          });
        };
        const result = await getWeapons(signal());
        assert.equal(result.source, "api");
        assert.equal(result.manifest, null);
        assert.equal(result.list.weapons.length, 101);
        assert.equal(calls.length, 3);
      },
    );
    await t.test(
      "503 or invalid JSON static responses also fall back",
      async () => {
        for (const failure of [
          () => new Response(null, { status: 503 }),
          () => new Response("not json"),
          () => ok({ wrong: "shape" }),
        ]) {
          globalThis.fetch = async (input) =>
            String(input).startsWith("/static/")
              ? failure()
              : ok({ total: 0, page: 1, page_size: 100, weapons: [] });
          assert.equal((await getWeapons(signal())).source, "api");
        }
      },
    );
    await t.test(
      "cleaned generation refreshes manifest once before fallback",
      async () => {
        const next = manifest("b".repeat(32));
        let apiCalls = 0;
        globalThis.fetch = async (input) => {
          const url = String(input);
          if (url === manifest().weapons[rootId])
            return new Response(null, { status: 404 });
          if (url.includes("index.json")) return ok(next);
          if (url === next.weapons[rootId]) return ok(snapshot());
          apiCalls++;
          throw new Error("Unexpected API request");
        };
        const result = await getWeapon(manifest(), rootId, signal());
        assert.equal(result.generation, next.generation);
        assert.equal(result.source, "static");
        assert.equal(apiCalls, 0);
      },
    );
    await t.test(
      "missing or incomplete snapshot loads only root and preset references",
      async () => {
        for (const incomplete of [false, true]) {
          const apiCalls: string[] = [];
          const broken = snapshot();
          broken.slot_candidates = {};
          globalThis.fetch = async (input) => {
            const url = String(input);
            if (url.includes("index.json")) return ok(manifest());
            if (url.startsWith("/static/"))
              return incomplete
                ? ok(broken)
                : new Response(null, { status: 404 });
            apiCalls.push(url);
            return url.includes(`/items/${rootId}`)
              ? ok(detail())
              : ok(presets());
          };
          const result = await getWeapon(manifest(), rootId, signal());
          assert.equal(result.source, "api");
          assert.equal(apiCalls.length, 2);
          assert.ok(apiCalls.every((url) => !url.includes("candidates")));
          assert.deepEqual(result.snapshot.slot_candidates, {});
          assert.deepEqual(result.snapshot.presets, {});
          assert.equal(result.snapshot.weapon.weapon_properties.ergonomics, 0);
        }
      },
    );
    await t.test(
      "candidates use owner and slot, preserve empty success and reject mixed pages",
      async () => {
        let calls = 0;
        globalThis.fetch = async (input) => {
          calls++;
          assert.ok(
            String(input).includes(
              `/items/${rootId}/slots/rear/candidates?page=1&page_size=100`,
            ),
          );
          return ok({
            item_id: rootId,
            slot_id: "rear",
            total: 0,
            page: 1,
            page_size: 100,
            validation_scope: "slot_filters_only",
            candidates: [],
          });
        };
        assert.equal(
          (await getApiCandidates(rootId, "rear", signal())).total,
          0,
        );
        assert.equal(calls, 1);
        globalThis.fetch = async () =>
          ok({
            item_id: "wrong-owner",
            slot_id: "rear",
            total: 0,
            page: 1,
            page_size: 100,
            validation_scope: "slot_filters_only",
            candidates: [],
          });
        await assert.rejects(
          getApiCandidates(rootId, "rear", signal()),
          /Mismatched/,
        );
      },
    );
    await t.test(
      "selected preset detail preserves flat components and attributes",
      async () => {
        const id = "2".repeat(24);
        globalThis.fetch = async (input) => {
          assert.ok(String(input).endsWith(`/api/modding/v3/presets/${id}`));
          return ok({
            preset: { item: item(id) },
            components: [
              {
                component_index: 0,
                quantity: 2,
                attributes: { nested: [0, false] },
                item: item(),
              },
            ],
            weapon_links: [],
            composition_type: "flat_source_list",
          });
        };
        const result = await getApiPreset(id, signal());
        assert.equal(result.composition_type, "flat_source_list");
        assert.equal(result.components[0].quantity, 2);
        assert.deepEqual(result.components[0].attributes, {
          nested: [0, false],
        });
      },
    );
    await t.test(
      "incomplete pagination and API outage remain errors",
      async () => {
        globalThis.fetch = async (input) =>
          String(input).startsWith("/static/")
            ? new Response(null, { status: 404 })
            : ok({ total: 1, page: 1, page_size: 100, weapons: [] });
        await assert.rejects(getWeapons(signal()), /Incomplete/);
        globalThis.fetch = async (input) =>
          String(input).startsWith("/static/")
            ? new Response(null, { status: 404 })
            : Response.json(
                { detail: "MODDING_LOOKUP_UNAVAILABLE" },
                { status: 503 },
              );
        await assert.rejects(
          getWeapons(signal()),
          (error) => error instanceof ModdingApiError && error.status === 503,
        );
      },
    );
    await t.test(
      "cancelled static request does not start API fallback",
      async () => {
        const controller = new AbortController();
        let calls = 0;
        globalThis.fetch = async () => {
          calls++;
          controller.abort();
          throw controller.signal.reason;
        };
        await assert.rejects(
          getWeapons(controller.signal),
          (error) => error instanceof Error && error.name === "AbortError",
        );
        assert.equal(calls, 1);
      },
    );
    await t.test(
      "mounted-detail reads are bounded at four and queued aborts do not fetch",
      async () => {
        const pending: Array<() => void> = [];
        let active = 0,
          max = 0,
          fetches = 0;
        globalThis.fetch = async () => {
          fetches++;
          active++;
          max = Math.max(max, active);
          await new Promise<void>((resolve) => pending.push(resolve));
          active--;
          return ok(detail());
        };
        const controllers = Array.from(
          { length: 6 },
          () => new AbortController(),
        );
        const requests = controllers.map((c) => getApiItem(rootId, c.signal));
        const settled = Promise.allSettled(requests);
        await new Promise(setImmediate);
        assert.equal(fetches, 4);
        controllers[4].abort();
        pending.splice(0).forEach((resolve) => resolve());
        await new Promise(setImmediate);
        assert.equal(fetches, 5);
        pending.splice(0).forEach((resolve) => resolve());
        const results = await settled;
        assert.equal(results.filter((r) => r.status === "fulfilled").length, 5);
        assert.equal(max, 4);
      },
    );
  } finally {
    globalThis.fetch = original;
  }
});
