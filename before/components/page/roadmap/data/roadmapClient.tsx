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
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { alertMessageI18N, roadmapI18N } from "@/lib/consts/i18nConsts";

export default function RoadmapClient({ roadmapInfo }: RoadmapClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { data: session } = useSession();
  const [onlyKappa, setOnlyKappa] = useState<boolean>(false);
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
      return npc.quests.map((quest) => ({
        id: quest.id,
        type: npcIdList.includes(quest.id) ? "npcNode" : "questNode",
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          name: quest.name,
          id: quest.id,
          type: npcIdList.includes(quest.id) ? "npc" : "quest",
          image: npcIdList.includes(quest.id) ? npc.image : "none",
          kappa_required: quest.kappa_required,
          url_mapping: quest.url_mapping,
          isCheck: questList.includes(quest.id),
          task_requirements: quest.task_requirements,
          task_next: quest.task_next,
          npc_id: quest.npc_id,
          node_color: quest.node_color,
          view_only_kappa: onlyKappa,
        },
        position: {
          x: onlyKappa
            ? tabState === "all"
              ? quest.total_kappa_x_coordinate
              : quest.single_kappa_x_coordinate
            : tabState === "all"
            ? quest.total_x_coordinate
            : quest.single_x_coordinate,
          y: onlyKappa
            ? tabState === "all"
              ? quest.total_kappa_y_coordinate
              : quest.single_kappa_y_coordinate
            : tabState === "all"
            ? quest.total_y_coordinate
            : quest.single_y_coordinate,
        },
        draggable: false,
      }));
    });
  }, [roadmapInfo, questList, tabState, onlyKappa]);

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

  const onClickKappaFilter = () => {
    setOnlyKappa(!onlyKappa);
    setTimeout(() => {
      fitView();
    }, 500);
  };

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

        if (checkStatus && node.data.task_requirements) {
          node.data.task_requirements.forEach(updateNode);
        } else if (!checkStatus && node.data.task_next) {
          node.data.task_next.forEach(updateNode);
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

      return npc.quests
        .filter(
          (quest) => !roadmapInfo.node_info.some((node) => node.id === quest.id)
        ) // 조건 추가
        .map((quest) => quest.id);
    });

    setQuestList(allQuestIds);
  }, [roadmapInfo.node_info, tabState]);

  const uncheckAllNodes = useCallback(() => {
    const allQuestIds = roadmapInfo.node_info.flatMap((npc) => {
      if (tabState !== "all" && npc.id !== tabState) {
        return [];
      }
      return npc.quests.map((quest) => quest.id);
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
        setAlertDesc(alertMessageI18N.save[localeKey]);

        setTimeout(() => {
          setAlertStatus(true);
        }, 500);
      } else {
        setAlertDesc(alertMessageI18N.reLogin[localeKey]);

        setTimeout(() => {
          setAlertStatus(true);
        }, 500);
        signOut();
        window.location.reload();
      }
    } else {
      setAlertDesc(alertMessageI18N.onlyUser[localeKey]);
      setTimeout(() => {
        setAlertStatus(true);
      }, 500);
    }
  };

  const handleSearch = () => {
    if (searchQuery.length < 1) {
      setAlertDesc(alertMessageI18N.inputWord[localeKey]);
      setTimeout(() => {
        setAlertStatus(true);
      }, 500);
      return;
    }

    const matchingNodes = nodes.filter(
      (node) =>
        node.data.name.ko.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.data.name.ja.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.data.name.en.toLowerCase().includes(searchQuery.toLowerCase())
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
      setAlertDesc(alertMessageI18N.notFound[localeKey]);
      setTimeout(() => {
        setAlertStatus(true);
      }, 500);
    }
  };

  const getAllKappaCount = () => {
    return nodes.filter((item) => item.data.kappa_required === true).length;
  };

  const getKappaCompleteCount = () => {
    return nodes.filter(
      (item) => questList.includes(item.id) && item.data.kappa_required === true
    ).length;
  };

  const getCompleteCount = () => {
    return nodes.filter((node) => questList.includes(node.id)).length;
  };

  const getAllCount = () => {
    const roadmapIds = new Set(roadmapInfo.node_info.map((npc) => npc.id));
    return nodes.filter((node) => !roadmapIds.has(node.id)).length;
  };

  return (
    <div className="flex flex-col gap-2">
      <RoadmapTab
        npcList={roadmapInfo.node_info.map((npc) => ({
          id: npc.id,
          name: npc.name,
          color: npc.quests[0].node_color,
        }))}
        setTabState={onChangeNpcTab}
        tabState={tabState}
      />
      <div className="flex justify-end gap-2">
        <div className="flex gap-2 items-center justify-center flex-end">
          <Input
            id="name"
            className="col-span-3 text-base font-bold border-white border-2 border-solid placeholder:text-SilverGray"
            placeholder={roadmapI18N.placeHolder[localeKey]}
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
          {roadmapI18N.selectAll[localeKey]}
        </Button>
        <Button
          className="border-2 border-white border-solid bg-Background text-white text-sm rounded-lg hover:bg-NeutralGray font-bold"
          onClick={uncheckAllNodes}
        >
          {roadmapI18N.unSelectAll[localeKey]}
        </Button>
        <Button
          className="border-2 border-white border-solid bg-Background text-white text-sm rounded-lg hover:bg-NeutralGray font-bold"
          onClick={() => onClickSave()}
        >
          {roadmapI18N.save[localeKey]}
        </Button>
      </div>
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
          style={{ backgroundColor: ALL_COLOR.VeryDarkGray }}
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

        <div className="absolute top-2 left-2 flex-col gap-2 min-w-[200px] max-w-[200px] border-white border-solid border-2 rounded-lg p-2 bg-NodeBackground">
          <div className="p-2">
            <TextSpan size="lg">{roadmapI18N.status[localeKey]}</TextSpan>
          </div>

          {!onlyKappa && (
            <div className="flex items-center justify-between p-1 border-b border-NeutralGray">
              <span className="text-sm font-bold">
                {roadmapI18N.allQuest[localeKey]}:
              </span>
              <span className="text-sm font-bold text-right">
                {getAllCount()}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between p-1 border-b border-NeutralGray">
            <span className="text-sm font-bold">
              {roadmapI18N.kappaQuest[localeKey]}:
            </span>
            <span className="text-sm font-bold text-SoftPink text-right">
              {getAllKappaCount()}
            </span>
          </div>

          <div className="flex items-center justify-between p-1 border-b border-NeutralGray">
            <span className="text-sm font-bold">
              {roadmapI18N.kappaSuccessQuest[localeKey]}:
            </span>
            <span className="text-sm font-bold text-SunsetYellow text-right">
              {getKappaCompleteCount()}
            </span>
          </div>

          {!onlyKappa && (
            <div className="flex items-center justify-between p-1">
              <span className="text-sm font-bold">
                {roadmapI18N.allSuccessQuest[localeKey]}:
              </span>
              <span className="text-sm font-bold text-LimeGreen text-right">
                {getCompleteCount()}
              </span>
            </div>
          )}
        </div>

        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            className="border-2 border-white border-solid bg-Background text-white text-sm rounded-lg hover:bg-NeutralGray font-bold"
            onClick={() => onClickKappaFilter()}
          >
            {onlyKappa
              ? roadmapI18N.viewAllQuest[localeKey]
              : roadmapI18N.viewKappaQuest[localeKey]}
          </Button>
        </div>
      </div>
      <DefaultAlert
        open={alertStatus}
        setOpen={setAlertStatus}
        title="Notice"
        description={alertDesc}
      />
    </div>
  );
}
