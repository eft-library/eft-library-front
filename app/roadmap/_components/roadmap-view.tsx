/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type { RoadmapViewTypes } from "./roadmap.types";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import TraderTab from "./TraderTab/trader-tab";
import { signOut, useSession } from "next-auth/react";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import QuestNode from "./QuestNode/quest-node";
import TraderNode from "./TraderNode/trader-node";
import ControlPanel from "./ControlPanel/control-panel";
import { Card, CardContent } from "@/components/ui/card";
import StatsPanel from "./StatsPanel/stats-panel";
import TraderTabM from "./TraderTab/trader-tab-m";
import { roadmapI18N } from "@/lib/consts/i18nConsts";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function RoadmapView({ roadmapInfo }: RoadmapViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { data: session } = useSession();
  const [onlyKappa, setOnlyKappa] = useState<boolean>(false);
  const [questList, setQuestList] = useState<string[]>([]);
  const [tabState, setTabState] = useState<string>("all");
  const { fitView } = useReactFlow();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const reactFlowInstance = useReactFlow();
  const npcList = roadmapInfo.node_info.map((npc) => ({
    id: npc.id,
    name: npc.name,
    image: npc.image,
    color: npc.quests[0].node_color,
  }));
  const nodeTypes = useMemo(
    () => ({
      questNode: QuestNode,
      npcNode: TraderNode,
    }),
    []
  );

  const npcIdList = useMemo(
    () => roadmapInfo.node_info.map((npc) => npc.id),
    [roadmapInfo.node_info]
  );

  const questIdSet = useMemo(() => new Set(questList), [questList]);

  const generateNodes = useCallback(() => {
    return roadmapInfo.node_info.flatMap((npc) => {
      if (tabState !== "all" && npc.id !== tabState) return [];

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
          isCheck: questIdSet.has(quest.id),
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
  }, [roadmapInfo.node_info, tabState, onlyKappa, npcIdList, questIdSet]);

  const generateEdges = () =>
    roadmapInfo.edge_info.map((edge) => ({
      id: edge.id,
      source: edge.source_id,
      target: edge.target_id,
      type: "smoothstep",
      animated: false,
      style: { stroke: "skyblue", strokeWidth: 2 },
    }));

  const [nodes, setNodes, onNodesChange] = useNodesState(generateNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(generateEdges());

  useEffect(() => {
    if (roadmapInfo.quest_list.length > 0) {
      setQuestList(roadmapInfo.quest_list);
    }
  }, [roadmapInfo.quest_list]);

  useEffect(() => {
    setNodes(generateNodes());
  }, [generateNodes, setNodes]);

  useEffect(() => {
    setSearchIndex(0);
  }, [searchQuery]);

  const onConnect = useCallback(
    (params: any) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const onClickKappaFilter = () => {
    setOnlyKappa((prev) => !prev);

    requestAnimationFrame(() => {
      fitView();
    });
  };

  const onNodeChange = useCallback(
    (data: any, isCheck: boolean) => {
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
          const filteredQuestList = prevQuestList.filter(
            (id) => !nodes.some((node) => node.data.id === id)
          );

          return [...new Set([...filteredQuestList, ...nodesCheckList])];
        });

        return Array.from(updatedNodes.values());
      };

      setNodes((nds) => updateNodeCheckStatus(data.id, isCheck, nds));
    },
    [setNodes, setQuestList]
  );

  const checkAllNodes = () => {
    const allQuestIds = roadmapInfo.node_info.flatMap((npc) => {
      if (tabState !== "all" && npc.id !== tabState) return [];

      return npc.quests
        .filter(
          (quest) => !roadmapInfo.node_info.some((node) => node.id === quest.id)
        )
        .map((quest) => quest.id);
    });

    setQuestList(allQuestIds);
  };

  const uncheckAllNodes = () => {
    const allQuestIds = roadmapInfo.node_info.flatMap((npc) => {
      if (tabState !== "all" && npc.id !== tabState) return [];

      return npc.quests.map((quest) => quest.id);
    });

    setQuestList((prev) => prev.filter((id) => !allQuestIds.includes(id)));
  };

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
        // setAlertDesc(alertMessageI18N.save[localeKey]);

        setTimeout(() => {
          //   setAlertStatus(true);
        }, 500);
      } else {
        // setAlertDesc(alertMessageI18N.reLogin[localeKey]);

        setTimeout(() => {
          //   setAlertStatus(true);
        }, 500);
        signOut();
        window.location.reload();
      }
    } else {
      //   setAlertDesc(alertMessageI18N.onlyUser[localeKey]);
      setTimeout(() => {
        // setAlertStatus(true);
      }, 500);
    }
  };

  const handleSearch = () => {
    if (searchQuery.length < 1) {
      //   setAlertDesc(alertMessageI18N.inputWord[localeKey]);
      setTimeout(() => {
        // setAlertStatus(true);
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
      //   setAlertDesc(alertMessageI18N.notFound[localeKey]);
      setTimeout(() => {
        // setAlertStatus(true);
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {roadmapI18N.title[localeKey]}
            </h1>
          </div>

          {/* Merchant Selection - Desktop */}
          <div className="hidden lg:block">
            <TraderTab
              npcList={npcList}
              setTabState={onChangeNpcTab}
              tabState={tabState}
            />
          </div>

          {/* Merchant Selection - Mobile */}
          <TraderTabM
            npcList={npcList}
            setTabState={onChangeNpcTab}
            tabState={tabState}
          />

          <ControlPanel
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            checkAllNodes={checkAllNodes}
            uncheckAllNodes={uncheckAllNodes}
            onClickSave={onClickSave}
            onClickKappaFilter={onClickKappaFilter}
            onlyKappa={onlyKappa}
          />
        </div>

        {/* Main Content */}
        <div className="w-full space-y-6">
          {/* 현황판을 ReactFlow 위에 배치 */}
          <StatsPanel
            getAllCount={getAllCount()}
            getAllKappaCount={getAllKappaCount()}
            getKappaCompleteCount={getKappaCompleteCount()}
            onlyKappa={onlyKappa}
            getCompleteCount={getCompleteCount()}
          />

          {/* Quest Flow */}
          <Card className="h-[500px] sm:h-[600px] lg:h-[700px]">
            <CardContent className="p-0 h-full relative">
              <ReactFlow
                nodes={enhancedNodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                className="quest-flow"
                fitView
                onConnect={onConnect}
                minZoom={0.03}
                maxZoom={2}
                zoomOnDoubleClick={false}
                nodeTypes={nodeTypes}
              >
                <Controls className="bg-background border border-border" />
                <Background
                  variant={BackgroundVariant.Dots}
                  gap={20}
                  size={1}
                  className="opacity-30"
                />
              </ReactFlow>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
