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
const zoneOrder: Zone[] = ["front", "frontLow", "top", "rearTop", "rearHigh", "rear", "bottom"];
export interface PositionedSlot { entry: BuildSlot; col: number; row: number; x: number; y: number }
export interface WorkbenchLayout { slots: PositionedSlot[]; height: number; weaponCol: number }
type Cell = { col: number; row: number };
function zoneCells(zone: Zone, rows: number): Cell[] {
  const cells: Cell[] = [];
  const add = (row: number, cols: number[]) => cols.forEach((col) => cells.push({ col, row }));
  const left = [4, 3, 2, 1, 0], right = [8, 9, 10, 11, 12], center = [6, 7, 5];
  if (zone === "front") add(1, left);
  else if (zone === "frontLow") add(2, left);
  else if (zone === "top") add(0, [6, 5, 4, 3, 2, 1, 0]);
  else if (zone === "rearTop") add(0, [7, ...right]);
  else if (zone === "rearHigh") add(0, right);
  else if (zone === "rear") { add(1, right); add(2, right); }
  for (let row = 3; row < rows; row++) add(row,
    zone === "front" || zone === "frontLow" ? left : zone === "top" || zone === "bottom" ? center : right);
  return cells;
}

export function layoutSlots(slots: BuildSlot[], previous?: WorkbenchLayout): WorkbenchLayout {
  const assigned = new Map<string, [Zone, number]>();
  const entries = slots.map((entry, index) => {
    const parent = assigned.get(entry.key.slice(0, entry.key.lastIndexOf("/")));
    const kind = entry.slot.name_id.replace(/_?\d+$/, "");
    const placement: [Zone, number] = kinds[kind] ?? (parent ? [parent[0], parent[1] + 0.01] : ["bottom", 3]);
    assigned.set(entry.key, placement);
    return { entry, zone: placement[0], order: placement[1], index };
  });
  const occupied = new Set(["5,1", "6,1", "7,1", "5,2", "6,2", "7,2"]);
  const placed = new Map<string, Cell>();
  const active = new Set(slots.map((entry) => entry.key));
  // Reserve surviving slots before allocating anything new. Removed children
  // leave holes; other slots never compact into those holes during an edit.
  for (const old of previous?.slots ?? []) {
    const cell = `${old.col},${old.row}`;
    if (active.has(old.entry.key) && !occupied.has(cell)) {
      placed.set(old.entry.key, { col: old.col, row: old.row }); occupied.add(cell);
    }
  }
  const rows = Math.max(slots.length + 4, ...(previous?.slots.map((slot) => slot.row + slots.length + 4) ?? []));
  for (const zone of zoneOrder) {
    for (const { entry } of entries.filter((entry) => entry.zone === zone).sort((a, b) => a.order - b.order || a.index - b.index)) {
      if (placed.has(entry.key)) continue;
      const parent = placed.get(entry.key.slice(0, entry.key.lastIndexOf("/")));
      const cells = zoneCells(zone, rows).filter((cell) => !occupied.has(`${cell.col},${cell.row}`));
      if (parent) cells.sort((a, b) =>
        (Math.abs(a.col - parent.col) + Math.abs(a.row - parent.row) * 2) -
        (Math.abs(b.col - parent.col) + Math.abs(b.row - parent.row) * 2));
      const cell = cells[0];
      if (!cell) throw new Error("No free workbench cell");
      occupied.add(`${cell.col},${cell.row}`); placed.set(entry.key, cell);
    }
  }
  const result = slots.map((entry) => {
    const cell = placed.get(entry.key)!;
    return { entry, ...cell, x: 20 + cell.col * 100, y: 40 + cell.row * 126 };
  });
  return { slots: result, weaponCol: 5, height: Math.max(600, previous?.height ?? 600, ...result.map(({ y }) => y + 140)) };
}
