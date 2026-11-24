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
export interface WorkbenchLayout {
  slots: PositionedSlot[];
  height: number;
  weaponCol: number;
  hidden: Map<string, BuildSlot[]>;
  folded: Map<string, BuildSlot[]>;
}
interface LayoutOptions {
  expanded?: ReadonlySet<string>;
  showAllEmpty?: boolean;
  forced?: ReadonlySet<string>;
}
export const WEAPON_KEY = "weapon";
const topKinds = new Set(["scope", "sight_rear", "sight_front", "charge"]);
const COLLAPSIBLE = new Set(["mount", "tactical", "flashlight"]);
const BOTTOM = new Set(["magazine", "pistol_grip", "pistolgrip"]);
const RAIL_KINDS = new Set(["tactical", "flashlight", "foregrip", "bipod", "launcher"]);
const UNDER = new Set(["foregrip", "bipod", "launcher"]);
const GRIP = new Set(["foregrip"]);
const LIGHT = new Set(["tactical", "flashlight"]);
const EMPTY_ORDER: Record<string, number> = { scope: 0, sight_front: 1, sight_rear: 1, foregrip: 2, charge: 3, magazine: 3, pistol_grip: 3, stock: 3, bipod: 5, tactical: 6, flashlight: 6, mount: 7 };

function axisChains(slots: BuildSlot[], parentKey: (entry: BuildSlot) => string | null, children: (entry: BuildSlot) => BuildSlot[], kind: (entry: BuildSlot) => string) {
  const filledFirst = (entries: BuildSlot[]) => entries.find((e) => e.selected) ?? entries[0];
  const front: BuildSlot[] = [];
  for (const name of ["reciever", "barrel", "handguard", "gas_block", "muzzle"]) {
    const entry = filledFirst(slots.filter((e) => kind(e) === name && !front.includes(e)));
    if (!entry) continue;
    front.push(entry);
    if (name === "muzzle") {
      let child = filledFirst(children(entry).filter((s) => kind(s) === "muzzle"));
      while (child && !front.includes(child)) { front.push(child); child = filledFirst(children(child).filter((s) => kind(s) === "muzzle")); }
    }
  }
  const rear: BuildSlot[] = [];
  let stock = filledFirst(slots.filter((e) => !parentKey(e) && kind(e) === "stock"));
  while (stock && !rear.includes(stock)) { rear.push(stock); stock = filledFirst(children(stock).filter((e) => kind(e) === "stock")); }
  return { front, rear };
}

export function layoutSlots(slots: BuildSlot[], previous?: WorkbenchLayout, snapshot?: Pick<WeaponSnapshot, "items" | "slot_candidates">, opts: LayoutOptions = {}): WorkbenchLayout {
  const { expanded = new Set(), showAllEmpty = false, forced = new Set() } = opts;
  const byKey = new Map(slots.map((e) => [e.key, e]));
  const index = new Map(slots.map((e, i) => [e.key, i]));
  const parentKey = (e: BuildSlot) => { const k = e.key.slice(0, e.key.lastIndexOf("/")); return byKey.has(k) ? k : null; };
  const kind = (e: BuildSlot) => slotKind(e.slot.name_id);
  const hidden = new Map<string, BuildSlot[]>();
  const folded = new Map<string, BuildSlot[]>();
  const visible = slots.filter((entry) => {
    if (entry.selected || entry.slot.required || forced.has(entry.key) || !COLLAPSIBLE.has(kind(entry))) return true;
    const owner = parentKey(entry) ?? WEAPON_KEY;
    const fold = !showAllEmpty && !expanded.has(owner);
    const accessories = folded.get(owner) ?? [];
    accessories.push(entry);
    folded.set(owner, accessories);
    if (fold) hidden.set(owner, accessories);
    return !fold;
  });
  const kids = new Map<string, BuildSlot[]>();
  for (const entry of visible) {
    const owner = parentKey(entry) ?? WEAPON_KEY;
    const siblings = kids.get(owner) ?? [];
    siblings.push(entry);
    kids.set(owner, siblings);
  }
  const childrenOf = (e: BuildSlot) => kids.get(e.key) ?? [];
  const size = new Map<string, number>();
  function sizeOf(entry: BuildSlot): number {
    const existing = size.get(entry.key);
    if (existing !== undefined) return existing;
    const total = 1 + childrenOf(entry).reduce((sum, child) => sum + sizeOf(child), 0);
    size.set(entry.key, total);
    return total;
  }
  // Rail branches are placed from the parent column toward the muzzle.
  const branchHas = (e: BuildSlot, kinds: ReadonlySet<string>): boolean => kinds.has(kind(e)) || childrenOf(e).some((c) => branchHas(c, kinds));
  const railRank = (e: BuildSlot) => branchHas(e, GRIP) ? 0 : branchHas(e, LIGHT) ? 2 : kind(e) === "bipod" ? 3 : 1;
  const order = (list: BuildSlot[]) => [...list].sort((a, b) => {
    if (area.get(a.key) === "rail" && area.get(b.key) === "rail") { const r = railRank(a) - railRank(b); if (r) return r; }
    if (!!a.selected !== !!b.selected) return a.selected ? -1 : 1;
    if (a.selected) return sizeOf(b) - sizeOf(a) || (index.get(a.key) ?? 0) - (index.get(b.key) ?? 0);
    return (EMPTY_ORDER[kind(a)] ?? 4) - (EMPTY_ORDER[kind(b)] ?? 4) || (index.get(a.key) ?? 0) - (index.get(b.key) ?? 0);
  });
  const { front, rear } = axisChains(visible, parentKey, childrenOf, kind);
  const axisArea = new Map<string, SlotArea>([...front.map((e) => [e.key, "axis"] as const), ...rear.map((e) => [e.key, "rearAxis"] as const)]);
  function mountIsTop(e: BuildSlot) {
    const itemKinds = (id: string) => snapshot?.items[id]?.slots.map((s) => slotKind(s.name_id)) ?? [];
    if (e.selected) return itemKinds(e.selected.id).includes("scope") || (snapshot?.items[e.selected.id]?.categories ?? []).some(({ category }) => category.normalized_name === "sights"); // 조준경 슬롯이 있거나 그 자체가 조준기(NSPU-M 등)
    const cands = snapshot?.slot_candidates?.[e.slot.item_id]?.[e.slot.slot_id]?.candidates ?? [];
    const top = cands.filter(({ item }) => itemKinds(item.id).includes("scope")).length;
    const rail = cands.filter(({ item }) => itemKinds(item.id).some((n) => RAIL_KINDS.has(n))).length;
    return top > rail;
  }
  // 3) 영역 (부모 → 자식 순서로)
  const area = new Map<string, SlotArea>();
  const areaOf = (e: BuildSlot): SlotArea => {
    const axis = axisArea.get(e.key);
    if (axis) return axis;
    const name = kind(e), pa = area.get(parentKey(e) ?? "");
    if (UNDER.has(name) && pa !== "rear" && pa !== "rearAxis") return "rail";
    // 반대로 조준경·가늠쇠·가늠자는 부모가 어디든 항상 위 (SVDS 기본: 트러니언에 단 가늠자)
    if (topKinds.has(name) && name !== "charge") return "top";
    if (pa === "top" || pa === "rail" || pa === "bottom") return pa;
    if (pa === "rear") return BOTTOM.has(name) ? "bottom" : "rear";
    // 부모가 총 줄(축·후방 축·무기)이면 종류로 정함 (후방 축 부품에 달린 레일 부품은 후방)
    const rearAxis = pa === "rearAxis";
    if (name === "mount") return mountIsTop(e) ? "top" : rearAxis ? "rear" : "rail";
    if (topKinds.has(name)) return "top";
    if (BOTTOM.has(name)) return "bottom";
    if (name === "stock" || rearAxis) return "rear";
    return "rail";
  };
  const dfs: BuildSlot[] = [];
  function walk(list: BuildSlot[]) {
    for (const entry of list) area.set(entry.key, areaOf(entry));
    for (const entry of order(list)) {
      dfs.push(entry);
      walk(childrenOf(entry));
    }
  }
  walk(kids.get(WEAPON_KEY) ?? []);
  const occupied = new Set(["0,0", "1,0", "2,0"]);
  const placed = new Map<string, PositionedSlot>();
  const take = (e: BuildSlot, col: number, row: number) => { occupied.add(`${col},${row}`); placed.set(e.key, { entry: e, col, row, x: col * COLUMN_PITCH, y: row * ROW_PITCH, parentKey: parentKey(e), area: area.get(e.key) ?? "rail" }); };
  // 축: 편집 중이면 남은 축 슬롯은 자리 유지, 나머지는 무기에서 바깥쪽으로
  const oldPos = new Map((previous?.slots ?? []).map((p) => [p.entry.key, p]));
  for (const e of [...front, ...rear]) {
    const o = oldPos.get(e.key);
    if (o && o.row === 0 && o.area === area.get(e.key) && !occupied.has(`${o.col},0`)) take(e, o.col, 0);
  }
  for (const [entries, start, dir] of [[front, -1, -1], [rear, 3, 1]] as const) {
    let col = start;
    for (const e of entries) { if (placed.has(e.key)) continue; while (occupied.has(`${col},0`)) col += dir; take(e, col, 0); col += dir; }
  }
  // 5) 편집 중 자리 유지: 영역이 같고, 부모도 제자리인 슬롯만 (부모 → 자식 순서로 확인)
  if (previous) {
    const kept = new Set([WEAPON_KEY]);
    for (const e of dfs) {
      const o = oldPos.get(e.key), pk = parentKey(e) ?? WEAPON_KEY;
      if (placed.has(e.key)) { if (o && o.col === placed.get(e.key)?.col && o.row === 0) kept.add(e.key); continue; }
      if (o && o.area === area.get(e.key) && kept.has(pk) && o.row !== 0 && !occupied.has(`${o.col},${o.row}`)) { take(e, o.col, o.row); kept.add(e.key); }
    }
  }
  const rootAnchors: Record<string, number> = { scope: 1, sight_rear: 2, sight_front: 0, charge: 2, magazine: 1, pistol_grip: 2, pistolgrip: 2 };
  // 4) 빈칸 찾기 — 장착된 부품(과 빈 전방 손잡이)을 먼저 전부 놓고, 빈 슬롯은 남은 칸에
  const first = (x: BuildSlot) => x.selected || kind(x) === "foregrip";
  for (const e of [...dfs.filter(first), ...dfs.filter((x) => !first(x))]) {
    if (placed.has(e.key)) continue;
    const name = kind(e), a = area.get(e.key), parent = placed.get(parentKey(e) ?? "");
    const up = a === "top";
    // 총 줄 밖 부모면 그 바로 다음 줄(같은 쪽), 아니면 첫 줄
    const row = parent && parent.row !== 0 && (parent.row < 0) === up ? parent.row + (up ? -1 : 1) : up ? -1 : 1;
    const col = parent?.col ?? rootAnchors[name] ?? -1;
    // 오른쪽(뒤)으로 미는 것: 후방 영역, 총에 바로 달린 가늠자·장전 손잡이만. 레일 위 가늠자는 다른 부품처럼 앞으로
    const side = a === "rear" || (!parent && (name === "charge" || name === "sight_rear")) ? 1 : -1;
    let done = false;
    for (let r = row; !done; r += up ? -1 : 1) {
      for (let d = 0; d <= 40 && !done; d++) {
        // 레일은 앞쪽(왼쪽)으로만 먼저 채움 → 먼저 놓인 손잡이가 항상 뒤
        for (const c of a === "rail" && parent ? (d === 0 ? [col] : [col - d]) : d ? [col + side * d, col - side * d] : [col]) {
          if (r !== 0 && !occupied.has(`${c},${r}`)) { take(e, c, r); done = true; break; }
        }
      }
    }
  }
  const positioned = visible.map((entry) => placed.get(entry.key)!);
  const rows = [0, ...positioned.map((entry) => entry.y)];
  return { slots: positioned, hidden, folded, weaponCol: 0, height: Math.max(...rows) - Math.min(...rows) + TILE_HEIGHT };
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
