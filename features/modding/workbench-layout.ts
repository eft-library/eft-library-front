import type { BuildSlot } from "./build";
import type { WeaponSnapshot } from "./types";

export const TILE_WIDTH = 96;
export const TILE_HEIGHT = 104;
export const COLUMN_PITCH = 110;
export const ROW_PITCH = 118;
export const WEAPON_WIDTH = 296;
export const slotKind = (name: string) => name.replace(/^mod_/, "").replace(/_?\d+$/, "").replace("receiver", "reciever");
export type SlotArea = "axis" | "rearAxis" | "top" | "rail" | "bottom" | "rear";
export interface PositionedSlot {
  entry: BuildSlot; col: number; row: number; x: number; y: number;
  parentKey: string | null; area: SlotArea;
}
export interface WorkbenchLayout { slots: PositionedSlot[]; height: number; weaponCol: number }
const topKinds = new Set(["scope", "sight_rear", "sight_front", "charge"]);
const railKinds = new Set(["tactical", "flashlight", "foregrip", "bipod"]);

export function layoutSlots(slots: BuildSlot[], previous?: WorkbenchLayout, snapshot?: Pick<WeaponSnapshot, "items" | "slot_candidates">): WorkbenchLayout {
  const byKey = new Map(slots.map((entry) => [entry.key, entry]));
  const parentKey = (entry: BuildSlot) => {
    const key = entry.key.slice(0, entry.key.lastIndexOf("/"));
    return byKey.has(key) ? key : null;
  };
  const children = (entry: BuildSlot) => slots.filter((slot) => parentKey(slot) === entry.key);
  const kind = (entry: BuildSlot) => slotKind(entry.slot.name_id);
  const filledFirst = (entries: BuildSlot[]) => entries.find((entry) => entry.selected) ?? entries[0];
  const front: BuildSlot[] = [];
  for (const name of ["reciever", "barrel", "handguard", "gas_block", "muzzle"]) {
    const entry = filledFirst(slots.filter((entry) => kind(entry) === name && !front.includes(entry)));
    if (!entry) continue;
    front.push(entry);
    if (name === "muzzle") {
      let child = filledFirst(children(entry).filter((slot) => kind(slot) === "muzzle"));
      while (child && !front.includes(child)) {
        front.push(child); child = filledFirst(children(child).filter((slot) => kind(slot) === "muzzle"));
      }
    }
  }
  const rear: BuildSlot[] = [];
  let stock = filledFirst(slots.filter((entry) => !parentKey(entry) && kind(entry) === "stock"));
  while (stock && !rear.includes(stock)) {
    rear.push(stock); stock = filledFirst(children(stock).filter((entry) => kind(entry) === "stock"));
  }
  const axisAreas = new Map<string, SlotArea>([...front.map((entry) => [entry.key, "axis"] as const), ...rear.map((entry) => [entry.key, "rearAxis"] as const)]);
  const occupied = new Set(["0,0", "1,0", "2,0"]);
  const placed = new Map<string, PositionedSlot>();
  const take = (entry: BuildSlot, col: number, row: number, area: SlotArea) => {
    occupied.add(`${col},${row}`);
    placed.set(entry.key, { entry, col, row, x: col * COLUMN_PITCH, y: row * ROW_PITCH, parentKey: parentKey(entry), area });
  };
  // Preserve surviving positions before placing new branches, including axis
  // positions when the slot still belongs to the same axis.
  for (const old of previous?.slots ?? []) {
    const entry = byKey.get(old.entry.key);
    const axis = axisAreas.get(old.entry.key);
    if (entry && (axis ? old.row === 0 && old.area === axis : old.row !== 0) && !occupied.has(`${old.col},${old.row}`))
      take(entry, old.col, old.row, axis ?? old.area);
  }
  for (const [entries, start, direction, area] of [[front, -1, -1, "axis"], [rear, 3, 1, "rearAxis"]] as const) {
    let col = start;
    for (const entry of entries) {
      if (placed.has(entry.key)) continue;
      while (occupied.has(`${col},0`)) col += direction;
      take(entry, col, 0, area); col += direction;
    }
  }
  function mountIsTop(entry: BuildSlot) {
    const itemKinds = (id: string) => snapshot?.items[id]?.slots.map((slot) => slotKind(slot.name_id)) ?? [];
    if (entry.selected) return itemKinds(entry.selected.id).includes("scope");
    const candidates = snapshot?.slot_candidates[entry.slot.item_id]?.[entry.slot.slot_id]?.candidates ?? [];
    const top = candidates.filter(({ item }) => itemKinds(item.id).includes("scope")).length;
    const rail = candidates.filter(({ item }) => itemKinds(item.id).some((name) => railKinds.has(name))).length;
    return top > rail;
  }
  const rootAnchors: Record<string, number> = { scope: 1, sight_rear: 2, sight_front: 0, charge: 2, magazine: 1, pistol_grip: 2, pistolgrip: 2 };
  for (const entry of slots) {
    if (placed.has(entry.key)) continue;
    const name = kind(entry), parent = placed.get(parentKey(entry) ?? "");
    let area: SlotArea;
    if (name === "mount") area = mountIsTop(entry) ? "top" : parent?.area === "rear" || parent?.area === "rearAxis" ? "rear" : "rail";
    // Document's recommended exception: optics-mounted tactical accessories
    // stay above with their optic instead of appearing to belong to the body.
    else if (railKinds.has(name)) area = parent?.area === "top" && ["tactical", "flashlight"].includes(name) ? "top" : "rail";
    else if (topKinds.has(name)) area = "top";
    else if (["magazine", "pistol_grip", "pistolgrip"].includes(name)) area = "bottom";
    else if (name === "stock" || parent?.area === "rear" || parent?.area === "rearAxis") area = "rear";
    else area = parent?.area === "top" ? "top" : "rail";
    const up = area === "top";
    let row = parent?.area === area ? parent.row + (up ? -1 : 1) : up ? -1 : 1;
    const col = parent?.col ?? rootAnchors[name] ?? -1;
    const side = area === "rear" || name === "charge" || name === "sight_rear" ? 1 : -1;
    let found = false;
    while (!found) {
      for (const candidate of [col, ...[1, 2, 3, 4, 5, 6].map((step) => col + side * step), ...[1, 2, 3].map((step) => col - side * step)]) {
        if (row !== 0 && !occupied.has(`${candidate},${row}`)) { take(entry, candidate, row, area); found = true; break; }
      }
      if (!found) row += up ? -1 : 1;
    }
  }
  const result = slots.map((entry) => placed.get(entry.key)!);
  const ys = [0, ...result.map((entry) => entry.y)];
  return { slots: result, weaponCol: 0, height: Math.max(...ys) - Math.min(...ys) + TILE_HEIGHT };
}

export interface FlowBox { x: number; y: number; width: number; height: number }
export function attachmentRoute(parent: FlowBox, child: FlowBox) {
  const cx = child.x + child.width / 2, cy = child.y + child.height / 2;
  const px = Math.max(parent.x + 14, Math.min(cx, parent.x + parent.width - 14));
  if (Math.abs(parent.y + parent.height / 2 - cy) < 1) {
    const left = child.x + child.width <= parent.x;
    const gap = left ? parent.x - child.x - child.width : child.x - parent.x - parent.width;
    if (gap <= 15) return { path: `M${left ? parent.x : parent.x + parent.width},${cy} H${left ? child.x + child.width : child.x}`, end: { x: left ? child.x + child.width : child.x, y: cy } };
    return { path: `M${px},${parent.y} V${parent.y - 7} H${cx} V${child.y}`, end: { x: cx, y: child.y } };
  }
  const up = cy < parent.y;
  const y = up ? parent.y - 7 : parent.y + parent.height + 7;
  const endY = up ? child.y + child.height : child.y;
  return { path: `M${px},${up ? parent.y : parent.y + parent.height} V${y} H${cx} V${endY}`, end: { x: cx, y: endY } };
}
