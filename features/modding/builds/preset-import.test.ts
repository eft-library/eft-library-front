import { test } from "node:test";
import assert from "node:assert/strict";
import type {
  PresetDetail,
  PresetReconstruction,
  ReconstructedTree,
} from "../types";
import type { StoredContent } from "./types";
import { importPresetContent, reconstructedNodes } from "./preset-import";
import { buildInput } from "./tree";
import { buildHistoryReducer, emptyBuildHistory } from "./history";
function fixture(): PresetDetail {
  const item = (id: string) => ({
    id,
    name_en: id,
    name_ko: null,
    name_ja: null,
    normalized_name: null,
    image: null,
    weight: 0,
    width: 1,
    height: 1,
    slot_count: 0,
    mod_properties: null,
  });
  const nodes = [
    {
      node_id: "root",
      item_id: "weapon",
      parent_node_id: null,
      slot_id: null,
      attributes: {},
      source_component_index: 0,
      source_unit_index: 0,
    },
    {
      node_id: "part1",
      item_id: "part",
      parent_node_id: "root",
      slot_id: "left",
      attributes: { zero: 0, nested: [false, {}] },
      source_component_index: 1,
      source_unit_index: 0,
    },
    {
      node_id: "part2",
      item_id: "part",
      parent_node_id: "root",
      slot_id: "right",
      attributes: { zero: 0, nested: [false, {}] },
      source_component_index: 1,
      source_unit_index: 1,
    },
  ];
  return {
    preset: {
      item: item("Preset title"),
      base_item_id: "weapon",
      is_default: true,
      ergonomics: 0,
      recoil_vertical: 0,
      recoil_horizontal: 0,
      moa: 0,
      collected_at: "",
      update_time: "",
    },
    components: [
      { component_index: 0, quantity: 1, attributes: {}, item: item("weapon") },
      {
        component_index: 1,
        quantity: 2,
        attributes: { zero: 0, nested: [false, {}] },
        item: item("part"),
      },
    ],
    weapon_links: [],
    composition_type: "flat_source_list",
    reconstruction: {
      method: "inferred",
      algorithm_version: 1,
      is_source_tree: false,
      validation_scope: "stored_slot_constraints",
      status: "unique",
      can_import: true,
      requires_confirmation: true,
      is_unique: true,
      search_complete: true,
      solution_count_lower_bound: 1,
      states_examined: 3,
      candidate_trees: [{ nodes }],
      partial_tree: null,
      unplaced_components: [],
      issues: [],
      issues_truncated: false,
    },
  };
}
function current(detail: PresetDetail): StoredContent {
  return {
    weapon_item_id: "weapon",
    title: "My title",
    description: "keep",
    nodes: [
      {
        node_id: "previous-root",
        parent_node_id: null,
        slot_id: null,
        item_id: "weapon",
        attributes: null,
        item: detail.components[0].item,
      },
    ],
  };
}
test("imports exact instances and attributes, preserves title and strips tracking fields on save", () => {
  const detail = fixture();
  const result = importPresetContent(detail, 0, current(detail), "ko");
  assert.equal(result.title, "My title");
  assert.equal(result.description, "keep");
  assert.equal(result.nodes.length, 3);
  assert.notEqual(result.nodes[1].node_id, result.nodes[2].node_id);
  assert.deepEqual(result.nodes[1].attributes, detail.components[1].attributes);
  const payload = buildInput(result);
  assert.ok(
    payload.nodes.every(
      (node) =>
        !("source_component_index" in node) &&
        !("source_unit_index" in node) &&
        !("item" in node),
    ),
  );
  assert.equal(
    importPresetContent(detail, 0, { ...current(detail), title: "" }, "en")
      .title,
    "Preset title",
  );
});
test("preset replacement is one attachment undo/redo step", () => {
  const detail = fixture();
  const before = current(detail);
  let state = buildHistoryReducer(emptyBuildHistory, {
    type: "load",
    content: before,
  });
  state = buildHistoryReducer(state, {
    type: "edit",
    content: importPresetContent(detail, 0, before, "en"),
  });
  state = buildHistoryReducer(state, { type: "undo" });
  assert.deepEqual(state.content?.nodes, before.nodes);
  state = buildHistoryReducer(state, { type: "redo" });
  assert.equal(state.content?.nodes.length, 3);
});
test("legacy, unknown algorithm, partial and unavailable results cannot import", () => {
  const source = fixture();
  for (const reconstruction of [
    undefined,
    { ...source.reconstruction!, algorithm_version: 2 },
    { ...source.reconstruction!, can_import: false, status: "incomplete" },
    { ...source.reconstruction!, status: "unavailable" },
    {
      ...source.reconstruction!,
      unplaced_components: [
        { component_index: 1, item_id: "part", quantity: 1, attributes: null },
      ],
    },
  ]) {
    const detail = {
      ...source,
      reconstruction: reconstruction as PresetReconstruction | undefined,
    };
    assert.throws(
      () => importPresetContent(detail, 0, current(source), "en"),
      /UNAVAILABLE/,
    );
  }
});
test("ambiguous/search-limited import uses the explicitly selected candidate", () => {
  for (const status of ["ambiguous", "search_limited"] as const) {
    const detail = fixture();
    const r = detail.reconstruction!;
    r.status = status;
    r.is_unique = status === "ambiguous" ? false : null;
    r.search_complete = false;
    const other = structuredClone(r.candidate_trees[0]);
    other.nodes[1].slot_id = "alternate";
    r.candidate_trees.push(other);
    assert.equal(
      importPresetContent(detail, 1, current(detail), "en").nodes[1].slot_id,
      "alternate",
    );
    assert.throws(
      () => importPresetContent(detail, -1, current(detail), "en"),
      /UNAVAILABLE/,
    );
  }
});
test("rejects missing components, repeated source units, lost attributes and invalid parent graphs", () => {
  const detail = fixture();
  const base = detail.reconstruction!.candidate_trees[0];
  const changes: Array<(tree: ReconstructedTree) => void> = [
    (tree) => {
      tree.nodes.pop();
    },
    (tree) => {
      tree.nodes[2].source_unit_index = 0;
    },
    (tree) => {
      tree.nodes[1].attributes = null;
    },
    (tree) => {
      tree.nodes[1].parent_node_id = "missing";
    },
    (tree) => {
      tree.nodes[1].parent_node_id = "part2";
      tree.nodes[2].parent_node_id = "part1";
    },
    (tree) => {
      tree.nodes[2].slot_id = "left";
    },
    (tree) => {
      tree.nodes[2].node_id = "part1";
    },
  ];
  for (const change of changes) {
    const tree = structuredClone(base);
    change(tree);
    assert.throws(() => reconstructedNodes(detail, tree), /INVALID/);
  }
  assert.throws(
    () =>
      importPresetContent(
        detail,
        0,
        { ...current(detail), weapon_item_id: "another-weapon" },
        "en",
      ),
    /UNAVAILABLE/,
  );
});
