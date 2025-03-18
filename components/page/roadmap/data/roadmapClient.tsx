/* eslint-disable react-hooks/exhaustive-deps */
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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "@xyflow/react/dist/style.css";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { RoadmapClient, Quest } from "./roadmapTypes";
import RoadmapTab from "./roadmapTab";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import DefaultAlert from "@/components/custom/alert/defaultAlert";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import QuestNode from "./questNode";
import NpcNode from "./npcNode";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TextSpan from "@/components/custom/gridContents/textSpan";

export default function RoadmapClient({ roadmapInfo }: RoadmapClient) {
  const { data: session } = useSession();
  const [questList, setQuestList] = useState<string[]>([]);
  const [tabState, setTabState] = useState<string>("all");
  const [alertDesc, setAlertDesc] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);
  const { fitView } = useReactFlow();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const reactFlowWrapper = useRef(null);
  const reactFlowInstance = useReactFlow();

  const nodeTypes = useMemo(
    () => ({
      questNode: QuestNode,
      npcNode: NpcNode,
    }),
    []
  );

  const processNode = useCallback(() => {
    const npcIdList = roadmapInfo.node_info.map((npc) => npc.id);
    return roadmapInfo.node_info.flatMap((npc) => {
      if (tabState !== "all" && npc.id !== tabState) {
        return [];
      }

      return npc.all_quest.map((quest) => ({
        id: quest.id,
        type: npcIdList.includes(quest.id) ? "npcNode" : "questNode",
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
          npc_value: quest.npc_value,
          node_color: quest.node_color,
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
        draggable: false,
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

  useEffect(() => {
    setSearchIndex(0);
  }, [searchQuery]);

  const onConnect = useCallback(
    (params: any) => setEdges((els) => addEdge(params, els)),
    []
  );

  const onNodeChange = (data: Quest, isCheck: boolean) => {
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

      const nodesCheckList = Array.from(updatedNodes.values())
        .filter((node) => node.data.isCheck)
        .map((node) => node.data.id);

      setQuestList((prevQuestList) => {
        // enhancedNodes에 존재하지 않는 ID만 유지 (즉, 있는 애들은 제거)
        const filteredQuestList = prevQuestList.filter(
          (id) => !enhancedNodes.some((node) => node.data.id === id)
        );

        // 새로운 체크된 리스트와 합치면서 중복 제거
        const newQuestList = [
          ...new Set([...filteredQuestList, ...nodesCheckList]),
        ];

        return newQuestList;
      });

      return Array.from(updatedNodes.values());
    };

    setNodes((nds) => {
      return updateNodeCheckStatus(data.id, isCheck, nds);
    });
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

  const handleSearch = () => {
    if (searchQuery.length < 1) {
      setAlertDesc("검색어를 입력해주세요.");
      setTimeout(() => {
        setAlertStatus(true);
      }, 500);
      return;
    }

    const matchingNodes = nodes.filter((node) =>
      node.data.title_kr.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchingNodes.length > 0) {
      const nextIndex = searchIndex % matchingNodes.length;
      const targetNode = matchingNodes[nextIndex];
      setSearchIndex(nextIndex + 1);

      const { x, y } = targetNode.position;
      const bounds = {
        x: x,
        y: y,
        width: 300,
        height: 300,
      };

      reactFlowInstance.fitBounds(bounds);
    } else {
      setAlertDesc("일치하는 노드를 찾을 수 없습니다.");
      setTimeout(() => {
        setAlertStatus(true);
      }, 500);
    }
  };

  const getAllKappaCount = () => {
    return nodes.filter((item) => item.data.iskappa === true).length;
  };

  const getKappaCompleteCount = () => {
    return nodes.filter(
      (item) => questList.includes(item.id) && item.data.iskappa === true
    ).length;
  };

  const getCompleteCount = () => {
    return nodes.filter((node) => questList.includes(node.id)).length;
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
        ref={reactFlowWrapper}
      >
        <ReactFlow
          nodes={enhancedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          minZoom={0.03}
          maxZoom={2}
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

        <div className="absolute top-2 left-2 flex-col gap-2 min-w-[260px] max-w-[260px] border-white border-solid border-2 rounded-lg p-2 bg-NodeBackground">
          <div className="p-2">
            <TextSpan size="lg">퀘스트 현황판</TextSpan>
          </div>

          <div className="grid grid-cols-3 p-1 border-b border-NeutralGray">
            <span className="text-sm font-bold col-span-2">전체 퀘스트:</span>
            <span className="text-sm font-bold">{nodes.length}</span>
          </div>

          <div className="grid grid-cols-3 p-1 border-b border-NeutralGray">
            <span className="text-sm font-bold col-span-2">카파 퀘스트:</span>

            <span className="text-sm font-bold text-SoftPink">
              {getAllKappaCount()}
            </span>
          </div>

          <div className="grid grid-cols-3 p-1 border-b border-NeutralGray">
            <span className="text-sm font-bold col-span-2">
              카파 완료 퀘스트:
            </span>
            <span className="text-sm font-bold text-SunsetYellow">
              {getKappaCompleteCount()}
            </span>
          </div>

          <div className="grid grid-col3-4 p-1">
            <span className="text-sm font-bold col-span-2">완료 퀘스트:</span>
            <span className="text-sm font-bold text-LimeGreen">
              {getCompleteCount()}
            </span>
          </div>
        </div>

        <div className="absolute top-2 right-2 flex gap-2">
          <div className="flex gap-2 items-center justify-center flex-end">
            <Input
              id="name"
              className="col-span-3 text-base font-bold border-white border-2 border-solid placeholder:text-SilverGray"
              placeholder="퀘스트 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button
              onClick={handleSearch}
              className="border-2 border-white border-solid bg-Background text-white text-sm rounded-lg hover:bg-NeutralGray font-bold"
            >
              <Search />
            </Button>
          </div>
          <Button
            className="border-2 border-white border-solid bg-Background text-white text-sm rounded-lg hover:bg-NeutralGray font-bold"
            onClick={checkAllNodes}
          >
            전체 선택
          </Button>
          <Button
            className="border-2 border-white border-solid bg-Background text-white text-sm rounded-lg hover:bg-NeutralGray font-bold"
            onClick={uncheckAllNodes}
          >
            전체 해제
          </Button>
          <Button
            className="border-2 border-white border-solid bg-Background text-white text-sm rounded-lg hover:bg-NeutralGray font-bold"
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
