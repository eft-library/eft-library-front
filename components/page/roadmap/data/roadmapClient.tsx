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
import { useCallback, useEffect, useMemo, useState } from "react";
import "@xyflow/react/dist/style.css";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { RoadmapClient, Quest } from "./roadmapTypes";
import RoadmapNode from "./roadmapNode";
import { Button } from "@/components/ui/button";

export default function RoadmapClient({ roadmapInfo }: RoadmapClient) {
  const [questList, setQuestList] = useState<string[]>([]);

  const processNode = useCallback(() => {
    return roadmapInfo.node_info.flatMap((npc) => {
      if (["THERAPIST", "PRAPOR", "FENCE"].includes(npc.id)) {
        return npc.all_quest.map((quest) => ({
          id: quest.id,
          type: "questNode",
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          data: {
            title_en: quest.title_en,
            title_kr: quest.title_kr,
            id: quest.id,
            type: "quest",
            isCheck: questList.includes(quest.id),
            prev_list: quest.prev_list || [],
            next_list: quest.next_list || [],
          },
          position: {
            x: quest.total_x_coordinate,
            y: quest.total_y_coordinate,
          },
          draggable: false,
        }));
      }
      return [];
    });
  }, [roadmapInfo, questList]);

  const processEdge = useCallback(() => {
    return roadmapInfo.edge_info.map((edge) => ({
      id: edge.id,
      source: edge.source_id,
      target: edge.target_id,
      type: "smoothstep",
      animated: true,
      style: { stroke: "white", strokeWidth: 2 },
    }));
  }, [roadmapInfo]);

  const [nodes, setNodes, onNodesChange] = useNodesState(processNode());
  const [edges, setEdges, onEdgesChange] = useEdgesState(processEdge());

  useEffect(() => {
    if (roadmapInfo.quest_list.length > 0) {
      setQuestList(roadmapInfo.quest_list);
    }
  }, [roadmapInfo]);

  useEffect(() => {
    if (questList.length > 0) {
      setNodes(processNode());
    }
  }, [questList, processNode]);

  useEffect(() => {
    setNodes(processNode());
  }, [roadmapInfo.quest_list, processNode, questList]);

  const onConnect = useCallback(
    (params: any) => setEdges((els) => addEdge(params, els)),
    []
  );

  const nodeTypes = useMemo(
    () => ({
      questNode: RoadmapNode,
    }),
    []
  );

  // 저장 통신 함수 만들기

  // tab 별 대응 만들기
  const onNodeChange = useCallback(
    (data: Quest, isCheck: boolean) => {
      const updateNodeCheckStatus = (
        nodeId: string,
        checkStatus: boolean,
        nodes: any[]
      ): any[] => {
        const updatedNodes = new Map(nodes.map((node) => [node.id, node]));

        const updateNode = (nodeId: string) => {
          const node = updatedNodes.get(nodeId);
          if (!node) return;

          updatedNodes.set(nodeId, {
            ...node,
            data: { ...node.data, isCheck: checkStatus },
          });

          if (checkStatus && node.data.prev_list) {
            node.data.prev_list.forEach(updateNode);
          } else if (!checkStatus && node.data.next_list) {
            node.data.next_list.forEach(updateNode);
          }
        };

        updateNode(nodeId);

        return Array.from(updatedNodes.values());
      };

      setNodes((nds) => {
        const updatedNodes = updateNodeCheckStatus(data.id, isCheck, nds);
        const nodesCheckList = updatedNodes
          .filter((node) => node.data.isCheck)
          .map((node) => node.data.id);

        setQuestList(nodesCheckList);

        return updatedNodes;
      });
    },
    [setNodes, setQuestList]
  );

  const checkAllNodes = useCallback(() => {
    const allQuestIds = roadmapInfo.node_info.flatMap((npc) =>
      npc.all_quest.map((quest) => quest.id)
    );
    setQuestList(allQuestIds);
  }, [roadmapInfo.node_info]);

  const uncheckAllNodes = useCallback(() => {
    setQuestList([]);
  }, []);

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
        <Button
          className="border-2 border-white border-solid bg-Background text-white text-lg rounded-lg hover:bg-NeutralGray"
          onClick={() => console.log(questList)}
        >
          저장
        </Button>
      </div>
    </div>
  );
}
