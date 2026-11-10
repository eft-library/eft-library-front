import type { PresetDetail, ReconstructedTree } from "../types";
import type { StoredContent, StoredNode } from "./types";
import { itemName } from "../build";
import type { Locale } from "@/i18n/config";

function normalized(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(normalized).join(",")}]`;
  if (value && typeof value === "object")
    return `{${Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => `${JSON.stringify(key)}:${normalized(item)}`)
      .join(",")}}`;
  return JSON.stringify(value) ?? "undefined";
}
export function supportedReconstruction(detail: PresetDetail) {
  const r = detail.reconstruction;
  return (
    !!r &&
    r.method === "inferred" &&
    r.algorithm_version === 1 &&
    r.is_source_tree === false &&
    r.validation_scope === "stored_slot_constraints" &&
    r.requires_confirmation === true
  );
}
// Validate the supplied reconstruction; never infer or fill missing attachments.
export function reconstructedNodes(
  detail: PresetDetail,
  tree: ReconstructedTree,
): StoredNode[] {
  const fail = (): never => {
    throw new Error("PRESET_RECONSTRUCTION_INVALID");
  };
  const components = new Map(
    detail.components.map((component) => [
      component.component_index,
      component,
    ]),
  );
  const total = detail.components.reduce(
    (sum, component) => sum + component.quantity,
    0,
  );
  if (
    components.size !== detail.components.length ||
    detail.components.some(
      (component) =>
        !Number.isInteger(component.quantity) || component.quantity < 1,
    ) ||
    !tree.nodes.length ||
    tree.nodes.length > 200 ||
    tree.nodes.length !== total
  )
    fail();
  const ids = new Map(tree.nodes.map((node) => [node.node_id, node]));
  if (
    ids.size !== tree.nodes.length ||
    tree.nodes.some((node) => !/^[A-Za-z0-9_-]{1,80}$/.test(node.node_id))
  )
    fail();
  const roots = tree.nodes.filter((node) => node.parent_node_id === null);
  if (
    roots.length !== 1 ||
    roots[0].item_id !== detail.preset.base_item_id ||
    roots[0].slot_id !== null
  )
    fail();
  const units = new Set<string>(),
    slots = new Set<string>();
  return tree.nodes.map((node) => {
    const component = components.get(node.source_component_index);
    if (
      !component ||
      component.item.id !== node.item_id ||
      !Number.isInteger(node.source_unit_index) ||
      node.source_unit_index < 0 ||
      node.source_unit_index >= component.quantity ||
      normalized(node.attributes) !== normalized(component.attributes)
    )
      return fail();
    const unit = `${node.source_component_index}:${node.source_unit_index}`;
    if (units.has(unit)) fail();
    units.add(unit);
    if (node.parent_node_id !== null) {
      if (
        !ids.has(node.parent_node_id) ||
        !node.slot_id ||
        node.slot_id.length > 200
      )
        fail();
      const pair = JSON.stringify([node.parent_node_id, node.slot_id]);
      if (slots.has(pair)) fail();
      slots.add(pair);
    }
    let current = node;
    const visited = new Set<string>();
    while (current.parent_node_id !== null) {
      if (visited.has(current.node_id)) fail();
      visited.add(current.node_id);
      const parent = ids.get(current.parent_node_id);
      if (!parent) return fail();
      current = parent;
    }
    if (current.node_id !== roots[0].node_id) fail();
    return {
      node_id: node.node_id,
      parent_node_id: node.parent_node_id,
      slot_id: node.slot_id,
      item_id: node.item_id,
      attributes: node.attributes,
      item: component.item,
    };
  });
}
export function importPresetContent(
  detail: PresetDetail,
  index: number,
  current: StoredContent,
  locale: Locale,
): StoredContent {
  const r = detail.reconstruction;
  if (
    !supportedReconstruction(detail) ||
    !r ||
    !r.can_import ||
    !["unique", "ambiguous", "search_limited"].includes(r.status) ||
    r.unplaced_components.length ||
    current.weapon_item_id !== detail.preset.base_item_id ||
    !Number.isInteger(index) ||
    index < 0 ||
    !r.candidate_trees[index]
  )
    throw new Error("PRESET_IMPORT_UNAVAILABLE");
  const nodes = reconstructedNodes(detail, r.candidate_trees[index]);
  return {
    ...current,
    title: current.title.trim()
      ? current.title
      : [...itemName(detail.preset.item, locale).trim()]
          .slice(0, 120)
          .join("") || "Preset",
    nodes,
  };
}
