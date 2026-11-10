import { test } from "node:test";
import assert from "node:assert/strict";
import { BuildApiError } from "./api";
import { savePublicBuild } from "./publication";
import type { Workspace } from "./types";
function workspace(version = 1, published: number | null = null): Workspace {
  return {
    id: "00000000-0000-0000-0000-000000000001",
    version,
    is_public: published !== null,
    published_revision: published,
    view: "draft",
    content: {
      weapon_item_id: "weapon",
      title: "Build",
      description: "",
      nodes: [
        {
          node_id: "root",
          item_id: "weapon",
          parent_node_id: null,
          slot_id: null,
          attributes: null,
          item: {
            id: "weapon",
            name_en: "Weapon",
            name_ko: null,
            name_ja: null,
            normalized_name: null,
            image: null,
            weight: 0,
            width: 1,
            height: 1,
            slot_count: 0,
            mod_properties: null,
          },
        },
      ],
    },
    copied_from: null,
    created_at: "",
    updated_at: "",
    validation_scope: "structure_only",
    warnings: [],
  };
}
test("save-and-share publication flow", async (t) => {
  const original = globalThis.fetch;
  try {
    await t.test(
      "new or updated saves publish the returned version",
      async () => {
        for (const saved of [workspace(), workspace(5, 2)]) {
          let retained: Workspace | undefined;
          let calls = 0;
          globalThis.fetch = async (input, init) => {
            calls++;
            assert.ok(String(input).endsWith(`/${saved.id}/publication`));
            assert.equal(init?.method, "POST");
            assert.deepEqual(JSON.parse(String(init?.body)), {
              expected_version: saved.version,
            });
            assert.equal(retained, saved);
            return Response.json({
              status: 200,
              msg: "OK",
              data: workspace(saved.version + 1, saved.version + 1),
            });
          };
          const result = await savePublicBuild(
            async () => saved,
            "token",
            (next) => {
              retained = next;
            },
          );
          assert.equal(calls, 1);
          assert.equal(result.is_public, true);
          assert.equal(result.published_revision, result.version);
        }
      },
    );
    await t.test(
      "publication failure keeps the saved ID and never reports success",
      async () => {
        const saved = workspace();
        let retained: Workspace | undefined;
        globalThis.fetch = async () =>
          Response.json(
            { detail: "BUILD_STORAGE_UNAVAILABLE" },
            { status: 503 },
          );
        await assert.rejects(
          savePublicBuild(
            async () => saved,
            "token",
            (next) => {
              retained = next;
            },
          ),
          (e) => e instanceof BuildApiError && e.status === 503,
        );
        assert.equal(retained?.id, saved.id);
        assert.equal(retained?.version, 1);
      },
    );
    await t.test(
      "already published revision is not republished on retry",
      async () => {
        const saved = workspace(2, 2);
        let calls = 0;
        globalThis.fetch = async () => {
          calls++;
          throw new Error("Unexpected publication");
        };
        assert.equal(
          await savePublicBuild(
            async () => saved,
            "token",
            () => {},
          ),
          saved,
        );
        assert.equal(calls, 0);
      },
    );
    await t.test("failed persistence cannot trigger publication", async () => {
      let calls = 0;
      globalThis.fetch = async () => {
        calls++;
        throw new Error("Unexpected publication");
      };
      await assert.rejects(
        savePublicBuild(
          async () => {
            throw new Error("save failed");
          },
          "token",
          () => assert.fail("Not saved"),
        ),
        /save failed/,
      );
      assert.equal(calls, 0);
    });
    await t.test(
      "publication conflicts are not automatically replayed",
      async () => {
        let calls = 0;
        globalThis.fetch = async () => {
          calls++;
          return Response.json(
            { detail: "BUILD_VERSION_CONFLICT" },
            { status: 409 },
          );
        };
        await assert.rejects(
          savePublicBuild(
            async () => workspace(),
            "token",
            () => {},
          ),
          (e) => e instanceof BuildApiError && e.status === 409,
        );
        assert.equal(calls, 1);
      },
    );
  } finally {
    globalThis.fetch = original;
  }
});
