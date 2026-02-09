"use client";

import CustomNode from "./custom-node";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from "@xyflow/react";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useEffect } from "react";
import { NodeData } from "../story-types";

const nodeTypes = {
  base: CustomNode,
  timegate: CustomNode,
  craft: CustomNode,
  branch: CustomNode,
  payment: CustomNode,
  achievement: CustomNode,
  penalty: CustomNode,
  ending: CustomNode,
};

export default function StoryRoadmap() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    const getStoryRoadmap = async () => {
      const data = await requestData(API_ENDPOINTS.GET_STORY_ROADMAP);
      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch story roadmap data:",
          data?.msg || "Unknown error",
        );
        return;
      }
      processNode(data.data);
      processEdge(data.data);
    };

    getStoryRoadmap();
  }, []);

  const processEdge = (nodeData: NodeData[]) => {
    const edgeList: Edge[] = nodeData.flatMap((node) => node.edge ?? []);
    setEdges(edgeList);
  };

  const processNode = (nodeData: NodeData[]) => {
    const nodeList: Node[] = nodeData.map((node) => {
      return {
        id: node.id,
        position: {
          x: node.x_coordinate,
          y: node.y_coordinate,
        },
        type: node.node_type,
        // draggable: false,
        data: {
          title: node.title,
          contents: node.contents,
          nodeType: node.node_type,
          storyId: node.story_id,
          image: node.image,
          //   nodeMeta: node.node_meta
        },
      };
    });
    setNodes(nodeList);
  };

  return (
    <div className="w-full h-300 rounded-lg overflow-hidden border border-border/50 shadow-xl bg-white/80 dark:bg-white/2 dark:border-transparent dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.45)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={(_, node) => {
          console.log("node id:", node.id);
          console.log("x:", node.position.x);
          console.log("y:", node.position.y);
        }}
        nodeTypes={nodeTypes}
        className="bg-slate-50 dark:bg-[#1a1a1a]"
        minZoom={0.05}
        maxZoom={2}
        fitView
        zoomOnDoubleClick={false}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          className="opacity-100 dark:opacity-30"
        />
        <Controls className="bg-white border-slate-300 dark:bg-white/10 dark:border-white/10" />

        <MiniMap
          className="bg-white border-slate-300 dark:bg-white/5 dark:border-white/10"
          maskColor="rgba(29, 15, 15, 0.6)"
        />
      </ReactFlow>
    </div>
  );
}
