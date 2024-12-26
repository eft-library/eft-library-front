"use client";

import PageParent from "@/components/pageParent/pageParent";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import {
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import "@xyflow/react/dist/style.css";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useCallback } from "react";
import SubHeader from "@/components/subHeader/subHeader";
import AdBanner from "@/components/adsense/adBanner";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "input" },
    position,
  },
  {
    id: "2",
    data: { label: "node 2" },
    position,
  },
  {
    id: "2a",
    data: { label: "node 2a" },
    position,
  },
  {
    id: "2b",
    data: { label: "node 2b" },
    position,
  },
  {
    id: "2c",
    data: { label: "node 2c" },
    position,
  },
  {
    id: "2d",
    data: { label: "node 2d" },
    position,
  },
  {
    id: "3",
    data: { label: "node 3" },
    position,
  },
  {
    id: "4",
    data: { label: "node 4" },
    position,
  },
  {
    id: "5",
    data: { label: "node 5" },
    position,
  },
  {
    id: "6",
    type: "output",
    data: { label: "output" },
    position,
  },
  { id: "7", type: "output", data: { label: "output" }, position },
];

const initialEdges = [
  { id: "e12", source: "1", target: "2", type: edgeType, animated: true },
  { id: "e13", source: "1", target: "3", type: edgeType, animated: true },
  { id: "e22a", source: "2", target: "2a", type: edgeType, animated: true },
  { id: "e22b", source: "2", target: "2b", type: edgeType, animated: true },
  { id: "e22c", source: "2", target: "2c", type: edgeType, animated: true },
  { id: "e2c2d", source: "2c", target: "2d", type: edgeType, animated: true },
  { id: "e45", source: "4", target: "5", type: edgeType, animated: true },
  { id: "e56", source: "5", target: "6", type: edgeType, animated: true },
  { id: "e57", source: "5", target: "7", type: edgeType, animated: true },
];

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

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

const Flow = () => {
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
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
      colorMode="dark"
    >
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
};

export default function RoadMap() {
  return (
    <PageParent>
      <SubHeader title="퀘스트 로드맵" />
      <AdBanner
        dataAdFormat={"fluid"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />
      <Box mb={10} />
      <Box w={"100%"} h={"80vh"} border={"1px solid white"}>
        <Flow />
      </Box>
    </PageParent>
  );
}
