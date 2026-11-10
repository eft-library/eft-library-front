import type { ItemSummary, Slot, WeaponSnapshot } from "./types";
import type { Locale } from "@/i18n/config";

export function itemName(
  item: Pick<ItemSummary, "name_en" | "name_ko" | "name_ja"> & {
    id?: string;
    normalized_name?: string | null;
    name_key?: string | null;
    name_id?: string;
  },
  locale: Locale,
) {
  return (
    item[`name_${locale}`] ||
    item.name_en ||
    item.normalized_name ||
    item.name_key ||
    item.name_id ||
    item.id ||
    "—"
  );
}
export type Selections = Record<string, string>;
export interface BuildSlot {
  key: string;
  slot: Slot;
  depth: number;
  selected?: ItemSummary;
  blocked: boolean;
}
export function buildSlots(
  snapshot: WeaponSnapshot,
  selections: Selections,
  storedItems: ItemSummary[] = [],
): BuildSlot[] {
  const result: BuildSlot[] = [];
  const savedItems = new Map(storedItems.map((item) => [item.id, item]));
  function visit(id: string, path: string, ancestors: string[], depth: number) {
    for (const slot of snapshot.items[id]?.slots ?? []) {
      const key = `${path}/${slot.slot_id}`;
      const selectedId = selections[key];
      const selected = selectedId
        ? (snapshot.items[selectedId]?.item ?? savedItems.get(selectedId))
        : undefined;
      const blocked =
        !!selected && (ancestors.includes(selected.id) || depth >= 7);
      result.push({ key, slot, depth, selected, blocked });
      if (selected && !blocked)
        visit(selected.id, key, [...ancestors, selected.id], depth + 1);
    }
  }
  const id = snapshot.weapon.item.id;
  visit(id, id, [id], 0);
  return result;
}
export function changePart(
  selections: Selections,
  key: string,
  itemId?: string,
): Selections {
  const next = Object.fromEntries(
    Object.entries(selections).filter(
      ([path]) => path !== key && !path.startsWith(`${key}/`),
    ),
  );
  if (itemId) next[key] = itemId;
  return next;
}
