"use client";

import Image from "next/image";
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";

import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/class-name";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import { storyNodeTypeMeta } from "@/features/story/config";
import type { StoryRoadmapNode } from "@/types/api/story";

type StoryFlowNodeData = Record<string, unknown> & StoryRoadmapNode & {
  locale: Locale;
};

function getLocalizedNodeText(
  node: StoryRoadmapNode,
  locale: Locale,
  field: "title" | "contents" | "desc",
) {
  return String(
    pickLocalizedField(node as unknown as Record<string, unknown>, locale, field) ??
      "",
  );
}

function getNodeWidth(node: StoryRoadmapNode, locale: Locale) {
  const title = getLocalizedNodeText(node, locale, "title");
  const contents = getLocalizedNodeText(node, locale, "contents");
  const textLength = title.length + Math.round(contents.length * 0.35);
  const extraWidth =
    textLength > 110 ? 110 : textLength > 72 ? 76 : textLength > 44 ? 42 : 0;

  if (node.node_type === "ending") {
    return 270 + extraWidth;
  }

  if (node.node_type === "achievement") {
    return 190 + Math.min(extraWidth, 54);
  }

  return 230 + extraWidth;
}

function getNodeWidthClass(nodeType: StoryRoadmapNode["node_type"], width: number) {
  if (nodeType === "ending") {
    return width >= 350 ? "min-w-80 max-w-96" : "min-w-64 max-w-80";
  }

  if (nodeType === "achievement") {
    return width >= 230 ? "min-w-56 max-w-64" : "min-w-48 max-w-56";
  }

  return width >= 320
    ? "min-w-72 max-w-90"
    : width >= 270
      ? "min-w-64 max-w-80"
      : "min-w-52 max-w-64";
}

function getEndingColorClasses(dataId: string) {
  switch (dataId) {
    case "survivor-ending":
      return {
        node:
          "border-yellow-500 bg-yellow-50/80 shadow-[0_0_20px_rgba(234,179,8,0.45)] dark:bg-yellow-950/30 dark:shadow-[0_0_20px_rgba(234,179,8,0.65)]",
        title: "text-yellow-700 dark:text-yellow-400",
      };
    case "debtor-ending":
      return {
        node:
          "border-purple-500 bg-purple-50/80 shadow-[0_0_15px_rgba(168,85,247,0.45)] dark:bg-purple-950/30 dark:shadow-[0_0_15px_rgba(168,85,247,0.55)]",
        title: "text-purple-700 dark:text-purple-400",
      };
    case "savior-ending":
      return {
        node:
          "border-emerald-500 bg-emerald-50/80 shadow-[0_0_15px_rgba(16,185,129,0.45)] dark:bg-emerald-950/30 dark:shadow-[0_0_15px_rgba(16,185,129,0.55)]",
        title: "text-emerald-700 dark:text-emerald-400",
      };
    case "fallen-ending":
      return {
        node:
          "border-red-800 bg-red-100/80 shadow-[0_0_20px_rgba(153,27,27,0.45)] dark:border-red-900 dark:bg-red-950/50 dark:shadow-[0_0_20px_rgba(127,29,29,0.85)]",
        title: "text-red-800 dark:text-red-600",
      };
    default:
      return null;
  }
}

function StoryFlowNode({ data }: NodeProps<Node<StoryFlowNodeData>>) {
  const title = getLocalizedNodeText(data, data.locale, "title") || data.title_en;
  const contents = getLocalizedNodeText(data, data.locale, "contents");
  const desc = getLocalizedNodeText(data, data.locale, "desc");
  const meta = storyNodeTypeMeta[data.node_type];
  const isEnding = data.node_type === "ending";
  const nodeWidth = getNodeWidth(data, data.locale);
  const endingColorClasses = isEnding ? getEndingColorClasses(data.id) : null;

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="h-3 w-3 border-2 border-slate-500 bg-slate-100 dark:border-slate-200 dark:bg-slate-50"
      />
      <article
        className={cn(
          "rounded-xl border-2 px-5 py-4 text-center shadow-xl backdrop-blur transition hover:scale-[1.02] dark:shadow-black/35",
          "px-3.5 py-3",
          meta.accentClass,
          endingColorClasses?.node,
          getNodeWidthClass(data.node_type, nodeWidth),
        )}
      >
        <div className="flex justify-center">
          <span
            className={cn(
              "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]",
              meta.badgeClass,
            )}
          >
            {desc || data.node_type}
            {data.value_text ? `: ${data.value_text}` : ""}
          </span>
        </div>

        {data.image ? (
          <div className="mt-3 flex justify-center">
            <Image
              src={data.image}
              alt={title}
              width={isEnding ? 128 : 56}
              height={isEnding ? 128 : 56}
              className="rounded-lg object-contain"
            />
          </div>
        ) : null}

        <h3
          className={cn(
            "mt-2 font-black leading-tight text-gray-950 dark:text-slate-50",
            isEnding ? "text-lg" : "text-sm",
            endingColorClasses?.title,
          )}
        >
          {title}
        </h3>
        {contents ? (
          <p className="mt-1.5 line-clamp-3 text-[11px] leading-4 text-gray-600 dark:text-slate-200">
            {contents}
          </p>
        ) : null}
      </article>
      <Handle
        type="source"
        position={Position.Bottom}
        className="h-3 w-3 border-2 border-slate-500 bg-slate-100 dark:border-slate-200 dark:bg-slate-50"
      />
    </>
  );
}

const nodeTypes = {
  achievement: StoryFlowNode,
  base: StoryFlowNode,
  branch: StoryFlowNode,
  craft: StoryFlowNode,
  ending: StoryFlowNode,
  payment: StoryFlowNode,
  penalty: StoryFlowNode,
  timegate: StoryFlowNode,
};

export function StoryRoadmapFlow({
  nodes,
  locale,
}: {
  nodes: StoryRoadmapNode[];
  locale: Locale;
}) {
  const nodeIds = new Set(nodes.map((node) => node.id));
  const flowNodes: Node<StoryFlowNodeData>[] = nodes
    .filter((node) => node.x_coordinate !== null && node.y_coordinate !== null)
    .map((node) => ({
      id: node.id,
      type: node.node_type,
      position: {
        x: node.x_coordinate ?? 0,
        y: node.y_coordinate ?? 0,
      },
      data: {
        ...node,
        locale,
      },
      draggable: false,
      width: getNodeWidth(node, locale),
    }));
  const flowEdges: Edge[] = nodes.flatMap((node) =>
    (node.edge ?? [])
      .filter((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target))
      .map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: edge.animated,
        style: edge.style ?? undefined,
        markerEnd: edge.markerEnd?.type
          ? {
              type: edge.markerEnd.type as "arrow" | "arrowclosed",
              color: edge.markerEnd.color,
            }
          : undefined,
      })),
  );

  return (
    <div className="h-[720px] w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl dark:border-slate-600/70 dark:bg-slate-900">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        minZoom={0.08}
        maxZoom={1.4}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        nodesDraggable={false}
        zoomOnDoubleClick={false}
        className="bg-white dark:bg-slate-900 [--story-roadmap-grid:rgba(100,116,139,0.32)] dark:[--story-roadmap-grid:rgba(203,213,225,0.34)] dark:[&_.react-flow__edge-path]:stroke-slate-300"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1}
          color="var(--story-roadmap-grid)"
        />
        <Controls className="border border-gray-200 bg-white text-gray-900 shadow-lg dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 [&_.react-flow__controls-button]:border-gray-200 [&_.react-flow__controls-button]:bg-white [&_.react-flow__controls-button]:text-gray-700 dark:[&_.react-flow__controls-button]:border-slate-600 dark:[&_.react-flow__controls-button]:bg-slate-800 dark:[&_.react-flow__controls-button]:text-slate-100 dark:[&_.react-flow__controls-button:hover]:bg-slate-700" />
        <MiniMap
          className="border border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-800 dark:[&_.react-flow__minimap-mask]:fill-slate-900/60 dark:[&_.react-flow__minimap-node]:stroke-slate-300"
          maskColor="rgba(15, 23, 42, 0.58)"
          nodeColor="#334155"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
}
