"use client";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useTheme } from "next-themes";
import { Background, BaseEdge, Controls, Handle, Panel, Position, ReactFlow, ReactFlowProvider, useNodesInitialized, useReactFlow, useStore, type Edge, type EdgeProps, type Node, type NodeProps } from "@xyflow/react";
import { ChevronDown } from "lucide-react";
import { itemName } from "../build";
import { attachmentRoute, slotKind, TILE_HEIGHT, TILE_WIDTH, WEAPON_WIDTH, type SlotArea, type WorkbenchLayout } from "../workbench-layout";
import { weaponPreviewImage } from "../default-preset";
import type { ItemSummary, WeaponSnapshot } from "../types";
import type { Locale } from "@/i18n/config";
import { PartChips, PartImage } from "./workbench-tile";

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const fitOptions = { padding: 0.08, minZoom: 0.05, maxZoom: 1.75 };
const zoneTint: Record<SlotArea, string> = {
  axis: "bg-orange-500/10", rearAxis: "bg-orange-500/10", top: "bg-sky-500/10",
  rail: "bg-emerald-500/10", rear: "bg-violet-500/10", bottom: "bg-amber-500/10",
};
const handle: CSSProperties = { opacity: 0, width: 1, height: 1, minWidth: 0, minHeight: 0, border: 0, pointerEvents: "none" };
type TileData = { area: SlotArea; showZones: boolean; item?: ItemSummary; name: string; slotName: string; parent: string; ariaParent: string; domId: string; active: boolean; pending: boolean; related: boolean; added: boolean; count: number; total: number; label: string; onToggle: () => void; onHighlight: (on: boolean) => void };
type WeaponData = { item: ItemSummary; image: string | null; related: boolean };
type TileNode = Node<TileData, "tile">;
type WeaponNode = Node<WeaponData, "weapon">;
type FlowNode = TileNode | WeaponNode;
type RouteData = { path: string; end: { x: number; y: number }; color: string; width: number; dashed: boolean };
type FlowEdge = Edge<RouteData, "route">;
function SlotTile({ data }: NodeProps<TileNode>) {
  return <div className="relative" style={{ width: TILE_WIDTH, height: TILE_HEIGHT }}>
    {data.item && data.total > 0 && <span title={data.label} className={`absolute -top-[13px] left-1 z-10 rounded border px-1 font-mono text-[9px] leading-4 ${data.count > 0 ? "border-sky-600 bg-sky-600 text-white dark:border-sky-500 dark:bg-sky-500 dark:text-black" : "border-line bg-surface text-foreground"}`}>+{data.count}/{data.total}</span>}
    <button type="button" data-workbench-slot="" id={data.domId} disabled={data.pending} aria-expanded={data.active} aria-controls={data.active ? "modding-parts-popup" : undefined} aria-haspopup="dialog" aria-label={`${data.slotName}: ${data.name} · ${data.ariaParent}`} title={`${data.slotName}: ${data.name}${data.parent ? ` · ${data.parent}` : ""}`} onClick={data.onToggle} onFocus={() => data.onHighlight(true)} onBlur={() => data.onHighlight(false)}
      className={`nodrag nopan group relative flex h-full w-full flex-col items-center justify-center rounded border p-1 text-center ${focus} disabled:opacity-60 ${data.active ? "border-accent bg-orange-50 ring-1 ring-accent dark:bg-orange-950/30" : "border-gray-400/60 bg-white hover:border-accent dark:border-gray-600 dark:bg-[#23262b]"} ${data.item ? "" : "border-dashed"} ${data.related ? "ring-2 ring-orange-400" : ""} ${data.added ? "animate-pulse ring-2 ring-sky-500" : ""}`}>
      {data.showZones && <span aria-hidden="true" className={`pointer-events-none absolute inset-0 rounded ${zoneTint[data.area]}`} />}
      {data.item ? <><span className="line-clamp-2 h-[26px] w-full break-words px-1 text-[11px] font-bold leading-[13px]">{data.name}</span><div className="flex min-h-0 flex-1 items-center"><PartImage item={data.item} /></div><PartChips item={data.item} /></> : <><span className="text-xs">{data.slotName}</span>{data.parent && <span className="mt-1 line-clamp-2 text-[10px] text-gray-600 dark:text-gray-400">{data.parent}</span>}</>}
      <span aria-hidden="true" className={`absolute right-0 top-0 flex size-[18px] items-center justify-center rounded-bl border-b border-l border-line bg-surface-elevated group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100 ${data.active ? "opacity-100" : "opacity-0"}`}><ChevronDown className="size-3" /></span>
    </button>
    <Handle type="target" position={Position.Top} style={handle} isConnectable={false} /><Handle type="source" position={Position.Bottom} style={handle} isConnectable={false} />
  </div>;
}
function WeaponTile({ data }: NodeProps<WeaponNode>) {
  return <div className={`flex items-center justify-center overflow-hidden rounded border border-line bg-white/70 dark:bg-[#23262b] ${data.related ? "ring-2 ring-orange-400" : ""}`} style={{ width: WEAPON_WIDTH, height: TILE_HEIGHT }}><PartImage item={data.item} image={data.image} large /><Handle type="source" position={Position.Bottom} style={handle} isConnectable={false} /></div>;
}
function RouteEdge({ data }: EdgeProps<FlowEdge>) {
  if (!data) return null;
  return <g aria-hidden="true"><BaseEdge path={data.path} interactionWidth={0} style={{ stroke: data.color, strokeWidth: data.width, strokeDasharray: data.dashed ? "3 3" : undefined, strokeLinejoin: "round", strokeLinecap: "round", vectorEffect: "non-scaling-stroke" }} /><circle cx={data.end.x} cy={data.end.y} r={data.width + 1} fill={data.color} /></g>;
}
const nodeTypes = { tile: SlotTile, weapon: WeaponTile };
const edgeTypes = { route: RouteEdge };
function FlowOptions({ locale, links, setLinks, zones, setZones }: { locale: Locale; links: boolean; setLinks: (value: boolean) => void; zones: boolean; setZones: (value: boolean) => void }) {
  const t = (ko: string, en: string, ja: string) => locale === "ko" ? ko : locale === "ja" ? ja : en;
  return <Panel position="bottom-left"><div className="max-w-[calc(100vw-5rem)] rounded-lg border border-line bg-surface/95 px-2.5 py-2 text-xs shadow-sm">
    <div className="flex flex-wrap items-center gap-3">
      <label className="flex items-center gap-1.5"><input type="checkbox" checked={links} onChange={(event) => setLinks(event.target.checked)} className="accent-orange-600 focus-visible:outline-2 focus-visible:outline-accent" />{t("연결선", "Connections", "接続線")}</label>
      <label className="flex items-center gap-1.5"><input type="checkbox" checked={zones} onChange={(event) => setZones(event.target.checked)} className="accent-orange-600 focus-visible:outline-2 focus-visible:outline-accent" />{t("영역 표시", "Regions", "領域表示")}</label>
    </div>
    {zones && <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-700 dark:text-gray-300">{[
      ["bg-orange-500", t("축", "Axis", "軸")], ["bg-sky-500", t("위", "Upper", "上部")],
      ["bg-emerald-500", t("레일", "Rail", "レール")], ["bg-violet-500", t("후방", "Rear", "後部")],
      ["bg-amber-500", t("하단", "Lower", "下部")],
    ].map(([color, label]) => <span key={color} className="inline-flex items-center gap-1"><span aria-hidden="true" className={`size-2 rounded-sm ${color}`} />{label}</span>)}</div>}
  </div></Panel>;
}
export function WorkbenchFlowCanvas(props: { layout: WorkbenchLayout; snapshot: WeaponSnapshot; activeKey: string | null; pending: boolean; locale: Locale; onToggle: (key: string) => void; onViewportChange: () => void; onDismiss: () => void }) {
  return <ReactFlowProvider><Canvas {...props} /></ReactFlowProvider>;
}
function Canvas({ layout, snapshot, activeKey, pending, locale, onToggle, onViewportChange, onDismiss }: Parameters<typeof WorkbenchFlowCanvas>[0]) {
  const { fitView } = useReactFlow<FlowNode, FlowEdge>();
  const initialized = useNodesInitialized();
  const width = useStore((state) => state.width);
  const height = useStore((state) => state.height);
  // Refit geometry changes, not hover, highlighting or popup state. Wait for
  // controlled nodes and their measured bounds to reach the React Flow store.
  const geometry = JSON.stringify([snapshot.weapon.item.id, layout.slots.map((slot) => [slot.entry.key, slot.x, slot.y])]);
  useEffect(() => {
    if (!initialized || !width || !height) return;
    let secondFrame: number | undefined;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => { void fitView(fitOptions); });
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      if (secondFrame !== undefined) cancelAnimationFrame(secondFrame);
    };
  }, [geometry, initialized, width, height, fitView]);
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const [highlight, setHighlight] = useState<string | null>(null);
  const [links, setLinks] = useState(true);
  const [zones, setZones] = useState(true);
  const [added, setAdded] = useState<Set<string>>(new Set());
  const previous = useRef<Set<string> | null>(null);
  useEffect(() => {
    const keys = new Set(layout.slots.map((slot) => slot.entry.key));
    const newKeys = previous.current ? new Set([...keys].filter((key) => !previous.current?.has(key))) : new Set<string>();
    previous.current = keys; setAdded(newKeys);
    const timer = setTimeout(() => setAdded(new Set()), 2400);
    return () => clearTimeout(timer);
  }, [layout]);
  const graph = useMemo(() => {
    const byKey = new Map(layout.slots.map((slot) => [slot.entry.key, slot]));
    const highlightedEdges = new Set<string>();
    const emphasis = highlight ?? activeKey;
    let key = emphasis;
    while (key && byKey.has(key)) { highlightedEdges.add(key); key = byKey.get(key)?.parentKey ?? null; }
    for (const slot of layout.slots) if ((slot.parentKey ?? "weapon") === emphasis && emphasis) highlightedEdges.add(slot.entry.key);
    const related = new Set<string>();
    for (const key of highlightedEdges) { related.add(key); related.add(byKey.get(key)?.parentKey ?? "weapon"); }
    const nodes: FlowNode[] = [{ id: "weapon", type: "weapon", position: { x: 0, y: 0 }, width: WEAPON_WIDTH, height: TILE_HEIGHT, focusable: false, data: { item: snapshot.weapon.item, image: weaponPreviewImage(snapshot.weapon), related: related.has("weapon") } }];
    const edges: FlowEdge[] = [];
    for (const slot of layout.slots) {
      const entry = slot.entry;
      const parent = slot.parentKey ? byKey.get(slot.parentKey) : undefined;
      const ownName = itemName(entry.slot, locale);
      let parentLabel = parent ? itemName(parent.entry.slot, locale) : itemName(snapshot.weapon.item, locale);
      if (parent && parentLabel === ownName && parent.entry.selected) parentLabel = itemName(parent.entry.selected, locale);
      const repeated = !entry.selected && !["mount", "tactical", "flashlight"].includes(slotKind(entry.slot.name_id)) && layout.slots.some((other) => other.entry.key !== entry.key && other.parentKey !== slot.parentKey && itemName(other.entry.slot, locale) === ownName);
      const children = layout.slots.filter((child) => child.parentKey === entry.key);
      const total = entry.selected ? snapshot.items[entry.selected.id]?.slots.length ?? children.length : 0;
      const count = children.filter((child) => child.entry.selected).length;
      nodes.push({ id: entry.key, type: "tile", position: { x: slot.x, y: slot.y }, width: TILE_WIDTH, height: TILE_HEIGHT, data: {
        area: slot.area, showZones: zones, item: entry.selected, name: entry.selected ? itemName(entry.selected, locale) : ownName, slotName: ownName,
        parent: repeated ? parentLabel : "", ariaParent: parentLabel, domId: `workbench-slot-${entry.key}`, active: activeKey === entry.key, pending, related: related.has(entry.key), added: added.has(entry.key), total, count,
        label: locale === "ko" ? `이 부품에 달 수 있는 슬롯 ${total}개 중 ${count}개 장착` : locale === "ja" ? `${total}個中${count}個装着` : `${count} of ${total} attachment slots filled`,
        onToggle: () => onToggle(entry.key), onHighlight: (on) => setHighlight(on ? entry.key : null),
      } });
      if (links) {
        const route = attachmentRoute(parent ? { x: parent.x, y: parent.y, width: TILE_WIDTH, height: TILE_HEIGHT } : { x: 0, y: 0, width: WEAPON_WIDTH, height: TILE_HEIGHT }, { x: slot.x, y: slot.y, width: TILE_WIDTH, height: TILE_HEIGHT });
        const emphasized = highlightedEdges.has(entry.key);
        edges.push({ id: `edge:${entry.key}`, type: "route", source: slot.parentKey ?? "weapon", target: entry.key, zIndex: emphasized ? 1000 : 0, focusable: false, domAttributes: { "aria-hidden": true }, data: { ...route, color: emphasized ? dark ? "#fb923c" : "#f97316" : dark ? "#8babbc" : "#638398", width: emphasized ? 3 : 2, dashed: !entry.selected } });
      }
    }
    return { nodes, edges };
  }, [layout, snapshot, activeKey, pending, locale, onToggle, highlight, added, links, zones, dark]);
  return <ReactFlow<FlowNode, FlowEdge> nodes={graph.nodes} edges={graph.edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} colorMode={dark ? "dark" : "light"}
    fitView fitViewOptions={fitOptions} minZoom={fitOptions.minZoom} maxZoom={fitOptions.maxZoom} nodesDraggable={false} nodesConnectable={false} elementsSelectable={false} nodesFocusable edgesFocusable={false}
    zoomOnScroll panOnDrag preventScrolling zoomOnDoubleClick={false} onMove={onViewportChange} onMoveEnd={onViewportChange} onPaneClick={onDismiss}
    onNodeMouseEnter={(_, node) => setHighlight(node.type === "tile" ? node.id : null)} onNodeMouseLeave={() => setHighlight(null)} style={{ background: "transparent" }}>
    <Background gap={22} size={1} color={dark ? "#2b2f36" : "#cfd3d9"} />
    <Controls fitViewOptions={fitOptions} showInteractive={false} position="bottom-right" className="border border-line bg-surface text-foreground shadow-sm [&_.react-flow__controls-button]:border-line [&_.react-flow__controls-button]:bg-surface [&_.react-flow__controls-button]:text-foreground [&_.react-flow__controls-button:hover]:bg-surface-elevated" />
    <FlowOptions locale={locale} links={links} setLinks={setLinks} zones={zones} setZones={setZones} />
  </ReactFlow>;
}
