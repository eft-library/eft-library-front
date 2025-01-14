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
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import "@xyflow/react/dist/style.css";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { RoadmapClient, Quest } from "./roadmapTypes";
import RoadmapNode from "./roadmapNode";
import RoadmapTab from "./roadmapTab";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import DefaultAlert from "@/components/custom/alert/defaultAlert";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";

export default function RoadmapClient({ roadmapInfo }: RoadmapClient) {
  const { data: session } = useSession();
  const [questList, setQuestList] = useState<string[]>([]);
  const [tabState, setTabState] = useState<string>("all");
  const [alertDesc, setAlertDesc] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);
  const { fitView } = useReactFlow();

  const processNode = useCallback(() => {
    const npcIdList = roadmapInfo.node_info.map((npc) => npc.id);
    return roadmapInfo.node_info.flatMap((npc) => {
      if (tabState !== "all" && npc.id !== tabState) {
        return [];
      }

      return npc.all_quest.map((quest) => ({
        id: quest.id,
        type: "questNode",
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          title_en: quest.title_en,
          title_kr: quest.title_kr,
          id: quest.id,
          type: npcIdList.includes(quest.id) ? "npc" : "quest",
          iskappa: quest.is_kappa,
          urlMapping: quest.url_mapping,
          isCheck: questList.includes(quest.id),
          prev_list: quest.prev_list || [],
          next_list: quest.next_list || [],
        },
        position: {
          x:
            tabState === "all"
              ? quest.total_x_coordinate
              : quest.single_x_coordinate,
          y:
            tabState === "all"
              ? quest.total_y_coordinate
              : quest.single_y_coordinate,
        },
        // draggable: false,
      }));
    });
  }, [roadmapInfo, questList, tabState]);

  const processEdge = useCallback(() => {
    return roadmapInfo.edge_info.map((edge) => ({
      id: edge.id,
      source: edge.source_id,
      target: edge.target_id,
      type: "smoothstep",
      animated: false,
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

  const onNodeDragStop = (event: any, node: any) => {
    const roundedPosition = {
      x: Math.round(node.position.x),
      y: Math.round(node.position.y),
    };
    console.log(roundedPosition); // 소수점을 제거한 노드의 위치 출력
  };

  const checkAllNodes = useCallback(() => {
    const allQuestIds = roadmapInfo.node_info.flatMap((npc) => {
      if (tabState !== "all" && npc.id !== tabState) {
        return [];
      }
      return npc.all_quest.map((quest) => quest.id);
    });
    setQuestList(allQuestIds);
  }, [roadmapInfo.node_info, tabState]);

  const uncheckAllNodes = useCallback(() => {
    const allQuestIds = roadmapInfo.node_info.flatMap((npc) => {
      if (tabState !== "all" && npc.id !== tabState) {
        return [];
      }
      return npc.all_quest.map((quest) => quest.id);
    });

    setQuestList((prevQuestList) =>
      prevQuestList.filter((id) => !allQuestIds.includes(id))
    );
  }, [roadmapInfo.node_info, tabState]);

  const enhancedNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        data: { ...node.data, onChange: onNodeChange },
      })),
    [nodes, onNodeChange]
  );

  const onChangeNpcTab = (tab: string) => {
    setTabState(tab);
    setTimeout(() => {
      fitView();
    }, 500);
  };

  const onClickSave = async () => {
    if (session && session.email) {
      const response = await requestUserData(
        USER_API_ENDPOINTS.UPDATE_ROADMAP,
        { questList: questList },
        session
      );

      if (!response) return;

      if (response.status === 200) {
        setQuestList(response.data);
        setAlertDesc("저장 되었습니다.");

        setTimeout(() => {
          setAlertStatus(true);
        }, 500);
      } else {
        setAlertDesc("로그인을 다시 해주세요.");

        setTimeout(() => {
          setAlertStatus(true);
        }, 500);
        signOut();
        window.location.reload();
      }
    } else {
      setAlertDesc("퀘스트 로드맵은 로그인 사용자만 저장 가능합니다.");
      setTimeout(() => {
        setAlertStatus(true);
      }, 500);
    }
  };

  return (
    <>
      <RoadmapTab
        npcList={roadmapInfo.node_info.map((npc) => ({
          id: npc.id,
          name_kr: npc.name_kr,
          name_en: npc.name_en,
        }))}
        setTabState={onChangeNpcTab}
        tabState={tabState}
      />

      <div
        className="w-full border-white border-2 border-solid rounded-lg relative"
        style={{ height: "80vh" }}
      >
        <ReactFlow
          nodes={enhancedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDragStop={onNodeDragStop}
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
            onClick={() => onClickSave()}
          >
            저장
          </Button>
        </div>
      </div>

      <DefaultAlert
        open={alertStatus}
        setOpen={setAlertStatus}
        title="알림"
        description={alertDesc}
      />
    </>
  );
}
