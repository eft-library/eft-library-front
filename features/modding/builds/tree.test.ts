import { test } from "node:test";
import assert from "node:assert/strict";
import type { ItemSummary } from "../types";
import type { StoredContent, StoredNode } from "./types";
import {
  buildInput,
  mountPart,
  nodePaths,
  removeNode,
  selectionsFromNodes,
} from "./tree";

function item(id: string): ItemSummary {
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
    slot_count: 0,
    mod_properties: null,
  };
}
function node(
  id: string,
  itemId: string,
  parent: string | null,
  slot: string | null,
): StoredNode {
  return {
    node_id: id,
    item_id: itemId,
    parent_node_id: parent,
    slot_id: slot,
    attributes: null,
    item: item(itemId),
  };
}
function fixture(): StoredContent {
  return {
    weapon_item_id: "weapon",
    title: " My build ",
    description: "notes",
    nodes: [
      node("receiver", "receiver-item", "root", "receiver-slot"),
      node("rear", "rear-item", "receiver", "rear-slot"),
      node("root", "weapon", null, null),
      {
        ...node("other", "receiver-item", "root", "other-slot"),
        attributes: { nested: { zero: 0, empty: [], flag: false } },
      },
    ],
  };
}

test("restores root-not-first trees and distinguishes identical part instances", () => {
  const content = fixture();
  const paths = nodePaths(content.nodes, content.weapon_item_id);
  assert.equal(paths.get("weapon/receiver-slot/rear-slot")?.node_id, "rear");
  assert.equal(paths.get("weapon/other-slot")?.node_id, "other");
  assert.deepEqual(selectionsFromNodes(content), {
    "weapon/receiver-slot": "receiver-item",
    "weapon/receiver-slot/rear-slot": "rear-item",
    "weapon/other-slot": "receiver-item",
  });
});
test("replacing a parent removes descendants and preserves unrelated IDs and attributes", () => {
  const content = fixture();
  const next = mountPart(
    content,
    "weapon/receiver-slot",
    item("replacement"),
    () => "new-instance",
  );
  assert.deepEqual(
    next.nodes.map((n) => n.node_id),
    ["root", "other", "new-instance"],
  );
  assert.deepEqual(
    next.nodes.find((n) => n.node_id === "other"),
    content.nodes.find((n) => n.node_id === "other"),
  );
  assert.equal(content.nodes.length, 4);
  assert.equal(next.nodes[2].parent_node_id, "root");
  assert.equal(next.nodes[2].slot_id, "receiver-slot");
});
test("saving does not depend on live source definitions or send item metadata", () => {
  const content = fixture();
  const result = buildInput(content);
  assert.equal(result.title, "My build");
  assert.equal(result.nodes.length, 4);
  assert.ok(result.nodes.every((n) => !("item" in n)));
  assert.deepEqual(
    result.nodes.find((n) => n.node_id === "other")?.attributes,
    { nested: { zero: 0, empty: [], flag: false } },
  );
  assert.equal(
    result.nodes.find((n) => n.node_id === "root")?.parent_node_id,
    null,
  );
  assert.equal(
    result.nodes.find((n) => n.node_id === "receiver")?.item_id,
    "receiver-item",
  );
});
test("explicit removal clears the whole subtree; same-item mount keeps node attributes", () => {
  const content = fixture();
  assert.deepEqual(
    removeNode(content.nodes, "receiver").map((n) => n.node_id),
    ["root", "other"],
  );
  assert.equal(
    mountPart(content, "weapon/other-slot", item("receiver-item")),
    content,
  );
});
test("rejects invalid text limits, oversized payloads and cycles", () => {
  const content = fixture();
  assert.throws(
    () => buildInput({ ...content, title: " " }),
    /BUILD_INPUT_INVALID/,
  );
  assert.throws(
    () => buildInput({ ...content, description: "x".repeat(5001) }),
    /BUILD_INPUT_INVALID/,
  );
  assert.throws(
    () =>
      buildInput({
        ...content,
        nodes: Array.from({ length: 201 }, (_, i) =>
          node(`n${i}`, "i", null, null),
        ),
      }),
    /BUILD_INPUT_INVALID/,
  );
  assert.throws(
    () =>
      buildInput({
        ...content,
        nodes: [
          {
            ...content.nodes[0],
            attributes: { large: "x".repeat(256 * 1024) },
          },
        ],
      }),
    /BUILD_INPUT_INVALID/,
  );
  assert.throws(
    () =>
      nodePaths([node("a", "i", "b", "s"), node("b", "i", "a", "s")], "weapon"),
    /cycle/,
  );
});
