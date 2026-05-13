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

function StoryFlowNode({ data }: NodeProps<Node<StoryFlowNodeData>>) {
  const title = getLocalizedNodeText(data, data.locale, "title") || data.title_en;
  const contents = getLocalizedNodeText(data, data.locale, "contents");
  const desc = getLocalizedNodeText(data, data.locale, "desc");
  const meta = storyNodeTypeMeta[data.node_type];
  const isEnding = data.node_type === "ending";
  const nodeWidth = getNodeWidth(data, data.locale);

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="h-3 w-3 border-2 border-slate-500 bg-slate-100 dark:border-gray-500 dark:bg-gray-200"
      />
      <article
        className={cn(
          "rounded-xl border-2 px-5 py-4 text-center shadow-xl backdrop-blur transition hover:scale-[1.02]",
          "px-3.5 py-3",
          meta.accentClass,
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

        <h3 className={cn("mt-2 font-black leading-tight text-gray-950 dark:text-white", isEnding ? "text-lg" : "text-sm")}>
          {title}
        </h3>
        {contents ? (
          <p className="mt-1.5 line-clamp-3 text-[11px] leading-4 text-gray-600 dark:text-slate-300">
            {contents}
          </p>
        ) : null}
      </article>
      <Handle
        type="source"
        position={Position.Bottom}
        className="h-3 w-3 border-2 border-slate-500 bg-slate-100 dark:border-gray-500 dark:bg-gray-200"
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
    <div className="h-[720px] w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl dark:border-[#2a3038] dark:bg-slate-950">
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
        className="bg-white dark:bg-[#111318] [--story-roadmap-grid:rgba(100,116,139,0.32)] dark:[--story-roadmap-grid:rgba(148,163,184,0.42)]"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1}
          color="var(--story-roadmap-grid)"
        />
        <Controls className="border border-gray-200 bg-white text-gray-900 shadow-lg dark:border-[#2a3038] dark:bg-[#181c21] dark:text-gray-200 [&_.react-flow__controls-button]:border-gray-200 [&_.react-flow__controls-button]:bg-white [&_.react-flow__controls-button]:text-gray-700 dark:[&_.react-flow__controls-button]:border-[#2a3038] dark:[&_.react-flow__controls-button]:bg-[#181c21] dark:[&_.react-flow__controls-button]:text-gray-300 dark:[&_.react-flow__controls-button:hover]:bg-[#242a32]" />
        <MiniMap
          className="border border-gray-200 bg-white dark:border-[#2a3038] dark:bg-[#181c21] dark:[&_.react-flow__minimap-mask]:fill-[#0f1318]/70 dark:[&_.react-flow__minimap-node]:stroke-[#475569]"
          maskColor="rgba(15, 19, 24, 0.68)"
          nodeColor="#334155"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
}
