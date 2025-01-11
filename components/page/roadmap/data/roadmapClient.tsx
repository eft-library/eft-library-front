/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback, useMemo } from "react";
import "@xyflow/react/dist/style.css";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { RoadmapClient, Quest } from "./roadmapTypes";
import RoadmapNode from "./roadmapNode";
import { Button } from "@/components/ui/button";

export default function RoadmapClient({ roadmapInfo }: RoadmapClient) {
  // 여기서 user quest list에 있는 거는 true로 is_check를 바꿔야 함
  const processNode = () => {
    const initialNodes = roadmapInfo.node_info.flatMap((npc) => {
      if (["PRAPOR", "THERAPIST", "FENCE"].includes(npc.id)) {
        // 퀘스트 노드를 추가
        const questNodes = npc.all_quest.map((quest) => ({
          id: quest.id,
          type: "questNode",
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          data: {
            title_en: quest.title_en,
            title_kr: quest.title_kr,
            id: quest.id,
            type: "quest",
            isCheck: true,
            prev_list: quest.prev_list || [],
            next_list: quest.next_list || [],
          },
          position: {
            x: quest.total_x_coordinate,
            y: quest.total_y_coordinate,
          },
          draggable: false,
        }));
        return [...questNodes];
      } else {
        return [];
      }
    });
    return initialNodes;
  };

  const processEdge = () => {
    const initialEdges = roadmapInfo.edge_info.map((edge) => ({
      id: edge.id,
      source: edge.source_id,
      target: edge.target_id,
      type: "smoothstep",
      animated: true,
      style: { stroke: "white", strokeWidth: 2 },
    }));
    return [...initialEdges];
  };

  const nodeTypes = {
    questNode: RoadmapNode,
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(processNode());
  const [edges, setEdges, onEdgesChange] = useEdgesState(processEdge());

  const onConnect = useCallback(
    (params: any) => setEdges((els) => addEdge(params, els)),
    []
  );

  // 저장 통신 함수 만들기
  // nodes에서 true인 것들을 전부 저장하면 될 듯

  // tab 별 대응 만들기
  // userQuest 관련 로직 추가
  const onNodeChange = useCallback(
    (data: Quest, isCheck: boolean) => {
      // 모든 노드에 대해 isCheck 값을 업데이트하는 재귀 함수
      const updateNodeCheckStatus = (
        nodeId: string,
        checkStatus: boolean,
        nodes: any[]
      ): any[] => {
        let updatedNodes = nodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, isCheck: checkStatus } }
            : node
        );

        const currentNode = nodes.find((n) => n.id === nodeId);

        if (!currentNode) return updatedNodes;

        // 만약 isCheck가 false라면 next_list의 모든 노드도 false로 변경
        if (!checkStatus && currentNode.data.next_list) {
          currentNode.data.next_list.forEach((nextNodeId: string) => {
            updatedNodes = updateNodeCheckStatus(
              nextNodeId,
              checkStatus,
              updatedNodes
            );
          });
        }

        // 만약 isCheck가 true일 때, prev_list의 모든 노드도 true로 변경
        if (checkStatus && currentNode.data.prev_list) {
          currentNode.data.prev_list.forEach((prevNodeId: string) => {
            updatedNodes = updateNodeCheckStatus(
              prevNodeId,
              checkStatus,
              updatedNodes
            );
          });
        }

        return updatedNodes;
      };

      setNodes((nds) => {
        let updatedNodes = [...nds];
        // 해당 노드의 isCheck 상태만 업데이트
        updatedNodes = updateNodeCheckStatus(data.id, isCheck, updatedNodes);
        return updatedNodes;
      });
    },
    [setNodes]
  );

  const checkAllNodes = useCallback(() => {
    // userQuest 전체 추가하는 로직 넣기
    // tab이 변경 되면 해당 npc만 전체 추가
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, isCheck: true },
      }))
    );
  }, [setNodes]);

  const uncheckAllNodes = useCallback(() => {
    // userQuest 비우는 로직 넣기
    // tab이 변경 되면 해당 npc만 전체 제거
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, isCheck: false },
      }))
    );
  }, [setNodes]);

  const enhancedNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        data: { ...node.data, onChange: onNodeChange },
      })),
    [nodes, onNodeChange]
  );

  return (
    <div
      className="w-full border-white border-2 border-solid rounded-lg relative"
      style={{ height: "80vh" }}
    >
      <ReactFlow
        nodes={enhancedNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        minZoom={0.05}
        maxZoom={5}
        zoomOnDoubleClick={false}
        nodeTypes={nodeTypes}
        colorMode="dark"
        fitView
        attributionPosition="bottom-left"
        style={{ backgroundColor: ALL_COLOR.BACKGROUND }}
      >
        <Controls
          style={{
            transform: "scale(1.5)",
            marginBottom: "50px",
          }}
          showInteractive={false}
        />
        <MiniMap />
        <Background />
      </ReactFlow>

      <div className="absolute top-2 right-2 flex gap-2">
        <Button
          className="border-2 border-white border-solid bg-Background text-white text-lg rounded-lg hover:bg-NeutralGray"
          onClick={checkAllNodes}
        >
          전체 선택
        </Button>
        <Button
          className="border-2 border-white border-solid bg-Background text-white text-lg rounded-lg hover:bg-NeutralGray"
          onClick={uncheckAllNodes}
        >
          전체 해제
        </Button>
      </div>
    </div>
  );
}
