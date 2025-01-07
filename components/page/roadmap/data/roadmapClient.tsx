/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { initialNodes, initialEdges } from "./example";
import { useCallback } from "react";
import "@xyflow/react/dist/style.css";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { RoadmapClient } from "./roadmapTypes";
import RoadMapNode from "./roadmapNode";

export default function RoadMapClient({ roadmapInfo }: RoadmapClient) {
  const nodeTypes = {
    questNode: RoadMapNode,
  };
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: any) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (
    <div
      className="w-full border-white border-2 border-solid rounded-lg"
      style={{ height: "80vh" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        colorMode="dark"
        fitView
        attributionPosition="bottom-left"
        style={{ backgroundColor: ALL_COLOR.BACKGROUND }}
      >
        <Controls
          style={{ transform: "scale(1.5)", marginBottom: "50px" }}
          showInteractive={false}
        />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
}
