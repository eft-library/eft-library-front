"use client";

import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import "@xyflow/react/dist/style.css";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import API_ENDPOINTS from "@/config/endPoints";
import RoadMapNode from "./roadmapNode";
import { nodePosition, edgeType, edgeStyle } from "@/util/consts/flowConsts";

export default function RoadMapDetail() {
  const [userQuest, setUserQuest] = useState([]);
  const [allQuest, setAllQuest] = useState({});

  const initialNodes = [
    {
      id: "1",
      type: "questNode",
      data: { title_en: "input", title_kr: "input", id: "1" },
      nodePosition,
    },
    {
      id: "2",
      type: "questNode",
      data: { title_en: "node 2", title_kr: "2", id: "2" },
      nodePosition,
    },
    {
      id: "2a",
      type: "questNode",
      data: { title_en: "node 2a", title_kr: "2a", id: "3" },
      nodePosition,
    },
    {
      id: "2b",
      type: "questNode",
      data: { title_en: "node 2b", title_kr: "2b", id: "4" },
      nodePosition,
    },
    {
      id: "2c",
      type: "questNode",
      data: { title_en: "node 2c", title_kr: "2c", id: "5" },
      nodePosition,
    },
    {
      id: "2d",
      type: "questNode",
      data: { title_en: "node 2d", title_kr: "2d", id: "6" },
      nodePosition,
    },
    {
      id: "3",
      type: "questNode",
      data: { title_en: "node 3", title_kr: "3", id: "7" },
      nodePosition,
    },
  ];

  const initialEdges = [
    {
      id: "e12",
      source: "1",
      target: "2",
      type: edgeType,
      animated: true,
      style: edgeStyle,
    },
    {
      id: "e13",
      source: "1",
      target: "3",
      type: edgeType,
      animated: true,
      style: edgeStyle,
    },
    {
      id: "e22a",
      source: "2",
      target: "2a",
      type: edgeType,
      animated: true,
      style: edgeStyle,
    },
    {
      id: "e22b",
      source: "2",
      target: "2b",
      type: edgeType,
      animated: true,
      style: edgeStyle,
    },
    {
      id: "e22c",
      source: "2",
      target: "2c",
      type: edgeType,
      animated: true,
      style: edgeStyle,
    },
    {
      id: "e2c2d",
      source: "2c",
      target: "2d",
      type: edgeType,
      animated: true,
      style: edgeStyle,
    },
    {
      id: "e45",
      source: "4",
      target: "5",
      type: edgeType,
      animated: true,
      style: edgeStyle,
    },
    {
      id: "e56",
      source: "5",
      target: "6",
      type: edgeType,
      animated: true,
      style: edgeStyle,
    },
    {
      id: "e57",
      source: "5",
      target: "7",
      type: edgeType,
      animated: true,
      style: edgeStyle,
    },
  ];

  const nodeTypes = { questNode: RoadMapNode };

  const { data: session } = useSession();

  const getAllQuest = async (email: string) => {
    try {
      const res = await fetch(API_ENDPOINTS.GET_QUEST_LOADMAP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_email: email }),
      });

      const response = await res.json();

      setUserQuest(response.data.quest_list);
      setAllQuest(response.data.quest_info);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 로그인 안한 사람들
    getAllQuest("");
    // 로그인 한 사람들
    if (session && session.accessToken) {
      getAllQuest(session.email);
    }
  }, [session]);

  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 172;
  const nodeHeight = 36;

  const getLayoutedElements = (nodes, edges, direction = "TB") => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction, ranksep: 100, nodesep: 80 });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      const newNode = {
        ...node,
        targetPosition: isHorizontal ? "left" : "top",
        sourcePosition: isHorizontal ? "right" : "bottom",
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };

      return newNode;
    });

    return { nodes: newNodes, edges };
  };

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
      colorMode="dark"
    >
      <Controls />
      <MiniMap />
      <Panel position="top-right">
        <ButtonGroup>
          <Button
            fontWeight={600}
            color={ALL_COLOR.WHITE}
            bg={ALL_COLOR.BLACK}
            border={"1px solid"}
            borderRadius={"lg"}
            _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
            onClick={() => onLayout("TB")}
          >
            Vertical
          </Button>
          <Button
            fontWeight={600}
            color={ALL_COLOR.WHITE}
            bg={ALL_COLOR.BLACK}
            border={"1px solid"}
            borderRadius={"lg"}
            _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
            onClick={() => onLayout("LR")}
          >
            Horizontal
          </Button>
          <Button
            fontWeight={600}
            color={ALL_COLOR.WHITE}
            bg={ALL_COLOR.BLACK}
            border={"1px solid"}
            borderRadius={"lg"}
            _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
          >
            저장
          </Button>
        </ButtonGroup>
      </Panel>
      <Background />
    </ReactFlow>
  );
}
