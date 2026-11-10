import type { ItemSummary, WeaponSummary } from "../types";
import type { BuildNodeInput, StoredContent, StoredNode } from "./types";

export function newContent(weapon: WeaponSummary): StoredContent {
  return {
    weapon_item_id: weapon.item.id,
    title: "",
    description: "",
    nodes: [
      {
        node_id: "root",
        item_id: weapon.item.id,
        parent_node_id: null,
        slot_id: null,
        attributes: null,
        item: weapon.item,
      },
    ],
  };
}

export function nodePaths(
  nodes: StoredNode[],
  weaponId: string,
): Map<string, StoredNode> {
  const byId = new Map(nodes.map((node) => [node.node_id, node]));
  const paths = new Map<string, StoredNode>();
  function path(node: StoredNode, seen = new Set<string>()): string {
    if (seen.has(node.node_id)) throw new Error("Invalid build cycle");
    seen.add(node.node_id);
    if (!node.parent_node_id) return weaponId;
    const parent = byId.get(node.parent_node_id);
    if (!parent || !node.slot_id) throw new Error("Invalid build parent");
    return `${path(parent, seen)}/${node.slot_id}`;
  }
  for (const node of nodes) paths.set(path(node), node);
  return paths;
}
export function selectionsFromNodes(
  content: StoredContent,
): Record<string, string> {
  return Object.fromEntries(
    [...nodePaths(content.nodes, content.weapon_item_id)]
      .filter(([, node]) => node.parent_node_id)
      .map(([path, node]) => [path, node.item_id]),
  );
}
export function removeNode(nodes: StoredNode[], id: string): StoredNode[] {
  const removed = new Set([id]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const node of nodes)
      if (
        node.parent_node_id &&
        removed.has(node.parent_node_id) &&
        !removed.has(node.node_id)
      ) {
        removed.add(node.node_id);
        changed = true;
      }
  }
  return nodes.filter((node) => !removed.has(node.node_id));
}
export function mountPart(
  content: StoredContent,
  slotPath: string,
  item?: ItemSummary,
  makeId: () => string = () => crypto.randomUUID(),
): StoredContent {
  const paths = nodePaths(content.nodes, content.weapon_item_id);
  const split = slotPath.lastIndexOf("/");
  const parent = paths.get(slotPath.slice(0, split));
  if (!parent) throw new Error("Missing parent node");
  const old = paths.get(slotPath);
  if (old?.item_id === item?.id) return content;
  const nodes = old
    ? removeNode(content.nodes, old.node_id)
    : [...content.nodes];
  if (item)
    nodes.push({
      node_id: makeId(),
      parent_node_id: parent.node_id,
      slot_id: slotPath.slice(split + 1),
      item_id: item.id,
      attributes: null,
      item,
    });
  return { ...content, nodes };
}
export function buildInput(content: StoredContent): {
  weapon_item_id: string;
  title: string;
  description: string;
  nodes: BuildNodeInput[];
} {
  const title = content.title.trim();
  const nodes = content.nodes.map(
    ({ node_id, parent_node_id, slot_id, item_id, attributes }) => ({
      node_id,
      parent_node_id: parent_node_id ?? null,
      slot_id: slot_id ?? null,
      item_id,
      attributes: attributes ?? null,
    }),
  );
  if (
    !title ||
    [...title].length > 120 ||
    [...content.description].length > 5000 ||
    !nodes.length ||
    nodes.length > 200
  )
    throw new Error("BUILD_INPUT_INVALID");
  const input = {
    weapon_item_id: content.weapon_item_id,
    title,
    description: content.description,
    nodes,
  };
  if (new TextEncoder().encode(JSON.stringify(input)).length > 256 * 1024)
    throw new Error("BUILD_INPUT_INVALID");
  return input;
}
