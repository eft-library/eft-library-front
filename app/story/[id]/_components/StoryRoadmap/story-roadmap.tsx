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
  default: CustomNode,
  image: CustomNode,
  craft: CustomNode,
  condition: CustomNode,
  pay: CustomNode,
  achievement: CustomNode,
  penalty: CustomNode,
  end: CustomNode,
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
    <div className="w-full h-300 rounded-lg overflow-hidden border border-border/50 shadow-xl dark:bg-white/2 dark:border-transparent dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.4)]">
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
        className="dark:bg-[#1a1a1a] bg-gray-900"
        minZoom={0.5}
        maxZoom={1.5}
        fitView
        zoomOnDoubleClick={false}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          className="dark:opacity-30 opacity-20"
        />
        <Controls className="dark:bg-white/10 bg-gray-800 dark:border-white/10 border-gray-700" />
        <MiniMap
          className="dark:bg-white/5 bg-gray-800 dark:border-white/10 border-gray-700"
          maskColor="rgba(0, 0, 0, 0.6)"
        />
      </ReactFlow>
    </div>
  );
}
