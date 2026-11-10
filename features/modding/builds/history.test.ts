import { test } from "node:test";
import assert from "node:assert/strict";
import {
  BUILD_HISTORY_LIMIT,
  buildHistoryReducer as reduce,
  buildHistoryShortcut,
  emptyBuildHistory,
} from "./history";
import { removeNode } from "./tree";
import type { StoredContent, StoredNode } from "./types";
function node(id: string, parent: string | null): StoredNode {
  return {
    node_id: id,
    item_id: id,
    parent_node_id: parent,
    slot_id: parent ? `${id}-slot` : null,
    attributes: { nested: [0, false, { x: "keep" }] },
    item: {
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
    },
  };
}
function content(): StoredContent {
  return {
    weapon_item_id: "root",
    title: "Build",
    description: "",
    nodes: [
      node("root", null),
      node("receiver", "root"),
      node("sight", "receiver"),
      node("grip", "root"),
    ],
  };
}
test("undo restores a removed subtree with exact instance IDs, order and attributes", () => {
  const original = content();
  let state = reduce(emptyBuildHistory, { type: "load", content: original });
  state = reduce(state, {
    type: "edit",
    content: { ...original, nodes: removeNode(original.nodes, "receiver") },
  });
  assert.deepEqual(
    state.content?.nodes.map((n) => n.node_id),
    ["root", "grip"],
  );
  state = reduce(state, { type: "undo" });
  assert.deepEqual(state.content, original);
  state = reduce(state, { type: "redo" });
  assert.deepEqual(
    state.content?.nodes.map((n) => n.node_id),
    ["root", "grip"],
  );
});
test("new attachment edit after undo discards redo, but title input keeps native undo", () => {
  const original = content();
  let state = reduce(emptyBuildHistory, { type: "load", content: original });
  state = reduce(state, {
    type: "edit",
    content: { ...original, nodes: removeNode(original.nodes, "receiver") },
  });
  state = reduce(state, { type: "undo" });
  state = reduce(state, {
    type: "edit",
    content: { ...state.content!, title: "New title" },
  });
  assert.equal(state.future.length, 1);
  assert.equal(state.past.length, 0);
  state = reduce(state, { type: "redo" });
  assert.equal(state.content?.title, "New title");
  state = reduce(state, { type: "undo" });
  state = reduce(state, {
    type: "edit",
    content: { ...state.content!, nodes: removeNode(original.nodes, "grip") },
  });
  assert.equal(state.future.length, 0);
  assert.equal(state.past.length, 1);
});
test("reset is one reversible step and save synchronization preserves history", () => {
  const original = content();
  let state = reduce(emptyBuildHistory, { type: "load", content: original });
  state = reduce(state, {
    type: "edit",
    content: { ...original, nodes: [original.nodes[0]] },
  });
  state = reduce(state, {
    type: "sync",
    content: { ...state.content!, title: "Saved title" },
  });
  state = reduce(state, { type: "undo" });
  assert.deepEqual(state.content?.nodes, original.nodes);
  assert.equal(state.content?.title, "Saved title");
});
test("loading another workspace clears history and no-op edits do not add steps", () => {
  const original = content();
  let state = reduce(emptyBuildHistory, { type: "load", content: original });
  state = reduce(state, { type: "edit", content: structuredClone(original) });
  assert.equal(state.past.length, 0);
  state = reduce(state, {
    type: "edit",
    content: { ...original, nodes: [original.nodes[0]] },
  });
  state = reduce(state, { type: "load", content: original });
  assert.equal(state.past.length, 0);
  assert.equal(state.future.length, 0);
  state = reduce(state, { type: "load", content: null });
  assert.equal(reduce(state, { type: "undo" }), state);
});
test("history is bounded and undo/redo stop at boundaries", () => {
  let state = reduce(emptyBuildHistory, { type: "load", content: content() });
  for (let i = 0; i < 60; i++)
    state = reduce(state, {
      type: "edit",
      content: {
        ...state.content!,
        nodes: [node("root", null), node(`part${i}`, "root")],
      },
    });
  assert.equal(state.past.length, BUILD_HISTORY_LIMIT);
  for (let i = 0; i < BUILD_HISTORY_LIMIT; i++)
    state = reduce(state, { type: "undo" });
  assert.equal(reduce(state, { type: "undo" }), state);
  for (let i = 0; i < BUILD_HISTORY_LIMIT; i++)
    state = reduce(state, { type: "redo" });
  assert.equal(state.content?.nodes[1].node_id, "part59");
  assert.equal(reduce(state, { type: "redo" }), state);
});
test("keyboard shortcuts support Mac/Windows and ignore text, composition and repeats", () => {
  const key = {
    key: "z",
    ctrlKey: true,
    metaKey: false,
    altKey: false,
    shiftKey: false,
    repeat: false,
    isComposing: false,
    defaultPrevented: false,
  };
  assert.equal(buildHistoryShortcut(key, false), "undo");
  assert.equal(
    buildHistoryShortcut({ ...key, ctrlKey: false, metaKey: true }, false),
    "undo",
  );
  assert.equal(buildHistoryShortcut({ ...key, shiftKey: true }, false), "redo");
  assert.equal(buildHistoryShortcut({ ...key, key: "y" }, false), "redo");
  assert.equal(buildHistoryShortcut(key, true), null);
  for (const option of [
    "altKey",
    "repeat",
    "isComposing",
    "defaultPrevented",
  ] as const)
    assert.equal(buildHistoryShortcut({ ...key, [option]: true }, false), null);
});
