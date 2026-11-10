/** Read-only validation of locally generated static reconstruction candidates. */
import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import path from "node:path";
import {
  reconstructedNodes,
  supportedReconstruction,
} from "../features/modding/builds/preset-import";
import type {
  ModdingManifest,
  WeaponSnapshot,
} from "../features/modding/types";
async function main() {
  const root = path.resolve("public");
  async function data<T>(file: string): Promise<T> {
    const target = path.resolve(root, `.${file}`);
    assert.ok(target.startsWith(root + path.sep));
    return JSON.parse(await readFile(target, "utf8")).data;
  }
  const manifest = await data<ModdingManifest>("/static/modding/v3/index.json");
  const seen = new Set<string>();
  const counts: Record<string, number> = {};
  let imported = 0,
    candidates = 0,
    legacy = 0;
  for (const file of Object.values(manifest.weapons)) {
    const bundle = await data<WeaponSnapshot>(file);
    for (const [id, detail] of Object.entries(bundle.presets)) {
      if (seen.has(id)) continue;
      seen.add(id);
      const r = detail.reconstruction;
      if (!r) {
        legacy++;
        continue;
      }
      assert.ok(supportedReconstruction(detail));
      counts[r.status] = (counts[r.status] ?? 0) + 1;
      if (r.can_import) {
        assert.ok(r.candidate_trees.length);
        assert.equal(r.unplaced_components.length, 0);
        for (const tree of r.candidate_trees) {
          reconstructedNodes(detail, tree);
          candidates++;
        }
        imported++;
      }
    }
  }
  console.log(
    JSON.stringify(
      {
        presets: seen.size,
        importable: imported,
        candidates,
        legacy,
        statuses: counts,
      },
      null,
      2,
    ),
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
