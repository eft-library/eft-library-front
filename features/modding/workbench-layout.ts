import type { BuildSlot } from "./build";

type Zone = "front" | "frontLow" | "top" | "rearTop" | "rearHigh" | "rear" | "bottom";
const kinds: Record<string, [Zone, number]> = {
  mod_reciever: ["front", 1], mod_receiver: ["front", 1], mod_handguard: ["front", 2],
  mod_barrel: ["front", 3], mod_sight_front: ["front", 4], mod_muzzle: ["front", 5],
  mod_gas_block: ["frontLow", 1], mod_foregrip: ["frontLow", 2], mod_tactical: ["frontLow", 3],
  mod_flashlight: ["frontLow", 3], mod_scope: ["top", 1], mod_sight_rear: ["rearTop", 1],
  mod_charge: ["rearHigh", 1], mod_stock: ["rear", 2], mod_magazine: ["bottom", 1],
  mod_pistol_grip: ["bottom", 2], mod_pistolgrip: ["bottom", 2],
};
const zones: Record<Zone, [number, number, number]> = {
  front: [4, 1, -1], frontLow: [4, 2, -1], top: [6, 0, -1], rearTop: [7, 0, 1],
  rearHigh: [8, 0, 1], rear: [8, 1, 1], bottom: [6, 3, 1],
};
export interface PositionedSlot { entry: BuildSlot; col: number; row: number; x: number; y: number }
export function layoutSlots(slots: BuildSlot[]): { slots: PositionedSlot[]; height: number } {
  const assigned = new Map<string, [Zone, number]>();
  const entries = slots.map((entry, index) => {
    const parentKey = entry.key.slice(0, entry.key.lastIndexOf("/"));
    const parent = assigned.get(parentKey);
    const kind = entry.slot.name_id.replace(/_?\d+$/, "");
    const mapped = kinds[kind];
    const placement: [Zone, number] = mapped ?? (parent ? [parent[0], parent[1] + 0.01] : ["bottom", 3]);
    assigned.set(entry.key, placement);
    return { entry, zone: placement[0], order: placement[1], index };
  });
  // Reserve the central 3 × 2 weapon image area.
  const occupied = new Set(["5,1", "6,1", "7,1", "5,2", "6,2", "7,2"]);
  const result: PositionedSlot[] = [];
  let overflow = 0;
  for (const zone of Object.keys(zones) as Zone[]) {
    const [start, row, direction] = zones[zone];
    let offset = 0;
    for (const { entry } of entries.filter((entry) => entry.zone === zone).sort((a, b) => a.order - b.order || a.index - b.index)) {
      let col = start + offset++ * direction;
      let targetRow = row;
      if (col < 0 || col > 12 || occupied.has(`${col},${row}`)) {
        do { col = overflow % 13; targetRow = 4 + Math.floor(overflow++ / 13); } while (occupied.has(`${col},${targetRow}`));
      }
      occupied.add(`${col},${targetRow}`);
      result.push({ entry, col, row: targetRow, x: 20 + col * 100, y: 40 + targetRow * 126 });
    }
  }
  return { slots: result, height: Math.max(600, ...result.map(({ y }) => y + 140)) };
}
