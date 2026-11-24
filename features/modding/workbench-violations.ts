import { itemName } from "./build";
import type { BuildSlot } from "./build";
import { nodePaths } from "./builds/tree";
import type { StoredContent } from "./builds/types";
import type { CalculationIssue } from "./statistics-types";
import type { Locale } from "@/i18n/config";

export interface ViolationPart {
  key: string;
  name: string;
}

export function violationParts(content: StoredContent | null, slots: BuildSlot[], issues: CalculationIssue[], locale: Locale) {
  const result = new Map<CalculationIssue, ViolationPart[]>();
  if (!content) return result;
  const paths = new Map([...nodePaths(content.nodes, content.weapon_item_id)]
    .map(([path, node]) => [node.node_id, path]));
  const byKey = new Map(slots.map((slot) => [slot.key, slot]));

  for (const issue of issues) {
    const keys = new Set<string>();
    const own = issue.node_id ? paths.get(issue.node_id) : undefined;
    if (own && issue.slot_id && issue.code === "REQUIRED_SLOT_UNFILLED") {
      keys.add(`${own}/${issue.slot_id}`);
    } else {
      if (own) keys.add(own);
      for (const slot of slots) {
        if ((issue.item_id && slot.selected?.id === issue.item_id) ||
            (!own && issue.slot_id && slot.slot.slot_id === issue.slot_id)) keys.add(slot.key);
      }
    }
    result.set(issue, [...keys].flatMap((key) => {
      const slot = byKey.get(key);
      return slot ? [{ key, name: itemName(slot.selected ?? slot.slot, locale) }] : [];
    }));
  }
  return result;
}

export function violationLabels(parts: ReadonlyMap<CalculationIssue, ViolationPart[]>, reasonFor: (code: string) => string) {
  const labels = new Map<string, string[]>();
  for (const [issue, targets] of parts) {
    const reason = reasonFor(issue.code);
    for (const { key } of targets) {
      const others = targets.filter((part) => part.key !== key).map((part) => part.name);
      const label = others.length ? `${reason} (${others.join(", ")})` : reason;
      labels.set(key, [...(labels.get(key) ?? []), label]);
    }
  }
  return labels;
}
