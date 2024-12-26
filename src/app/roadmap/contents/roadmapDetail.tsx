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
import { getLayoutedElements } from "@/lib/getLayoutedElements";

export default function RoadMapDetail() {
  const [userQuest, setUserQuest] = useState([]);
  const [allQuest, setAllQuest] = useState([]);
  const [afterNode, setAfterNode] = useState([]);
  const [afterEdge, setAfterEdge] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(afterNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState(afterEdge);

  const nodeTypes = { questNode: RoadMapNode };
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

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

  const processNode = () => {
    const initialNodes = allQuest.flatMap((npc) => {
      // 각 NPC마다 시작 노드를 먼저 추가
      const npcNode = {
        id: npc.id, // NPC 고유 ID
        type: "input",
        data: {
          title_en: npc.name_en,
          title_kr: npc.name_kr,
          id: npc.id,
          type: "npc",
          label: npc.name_kr,
        },
        nodePosition,
      };

      // 그 후 퀘스트 노드를 추가
      const questNodes = npc.all_quest.map((quest) => ({
        id: quest.id,
        type: "questNode",
        data: {
          title_en: quest.title_en,
          title_kr: quest.title_kr,
          id: quest.id,
          type: "quest",
        },
        nodePosition,
      }));
      // NPC 노드와 퀘스트 노드를 결합하여 반환
      return [npcNode, ...questNodes];
    });

    return initialNodes;
  };

  const processEdge = () => {
    let edges = [];
    allQuest.forEach((npc) => {
      const firstQuest = npc.all_quest[0];
      edges.push({
        id: `npc-to-${firstQuest.id}`,
        source: npc.id,
        target: firstQuest.id,
        type: edgeType,
        animated: true,
        style: edgeStyle,
      });

      npc.all_quest.forEach((quest) => {
        if (!quest.requires || quest.requires.length < 1) {
          edges.push({
            id: `npc-to-${quest.id}`,
            source: npc.id,
            target: quest.id,
            type: edgeType,
            animated: true,
            style: edgeStyle,
          });
        }

        if (quest.next && quest.next.length > 0) {
          quest.next.forEach((nextQuest) => {
            // 엣지 생성: source는 현재 퀘스트 id, target은 next 퀘스트 id
            const edge = {
              id: `e${quest.id}-${nextQuest.id}`, // 엣지 고유 id 생성
              source: quest.id, // 현재 퀘스트 id
              target: nextQuest.id, // next 퀘스트 id
              type: edgeType,
              animated: true,
              style: edgeStyle,
            };
            edges.push(edge);
          });
        }
      });
    });
    return edges;
  };

  useEffect(() => {
    const allNodeList = processNode();
    const allEdgeList = processEdge();
    if (allNodeList.length > 0) {
      getLayoutedElements(
        dagreGraph,
        dagre,
        allNodeList,
        allEdgeList,
        setAfterNode,
        setAfterEdge
      );
    }
  }, [allQuest]);

  useEffect(() => {
    setNodes(afterNode); // 노드 상태를 업데이트
    setEdges(afterEdge); // 엣지 상태를 업데이트
  }, [afterNode, afterEdge, setNodes, setEdges]);

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
      getLayoutedElements(
        dagreGraph,
        dagre,
        afterNode,
        afterEdge,
        setAfterNode,
        setAfterEdge,
        direction
      );
      setNodes([...afterNode]); // 노드 상태를 업데이트
      setEdges([...afterEdge]); // 엣지 상태를 업데이트
    },
    [nodes, edges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      minZoom={0.05}
      maxZoom={5}
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
