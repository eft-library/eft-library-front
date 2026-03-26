"use client";

import {
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createRoadmapNodes,
  enhanceNodes,
  generateEdges,
  getNpcIdList,
  getNpcList,
  updateNodeCheckStatus,
} from "@/lib/func/roadmapGraphFunction";
import {
  checkAllNodes,
  getUncheckUpdater,
  onClickKappaFilter,
} from "@/lib/func/roadmapStatsFunction";
import { useRoadmapActions } from "@/lib/hooks/useRoadmapActions";
import type {
  RoadmapConnection,
  RoadmapDataTypes,
  RoadmapFlowEdge,
  RoadmapFlowNode,
  RoadmapNodeData,
} from "@/app/roadmap/_components/roadmap.types";

export function useRoadmapView(roadmapInfo: RoadmapDataTypes) {
  const { fitView } = useReactFlow();
  const reactFlowInstance = useReactFlow();

  const [onlyKappa, setOnlyKappa] = useState<boolean>(false);
  const [questList, setQuestList] = useState<string[]>([]);
  const [tabState, setTabState] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);

  const npcList = useMemo(
    () => getNpcList(roadmapInfo.node_info),
    [roadmapInfo.node_info],
  );

  const npcIdList = useMemo(
    () => getNpcIdList(roadmapInfo.node_info),
    [roadmapInfo.node_info],
  );

  const questIdSet = useMemo(() => new Set(questList), [questList]);

  const generateNodes = useCallback(() => {
    return createRoadmapNodes(
      roadmapInfo.node_info,
      tabState,
      onlyKappa,
      npcIdList,
      questIdSet,
    );
  }, [roadmapInfo.node_info, tabState, onlyKappa, npcIdList, questIdSet]);

  const [nodes, setNodes, onNodesChange] =
    useNodesState<RoadmapFlowNode>(generateNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState<RoadmapFlowEdge>(
    generateEdges(roadmapInfo.edge_info),
  );

  useEffect(() => {
    if (roadmapInfo.quest_list && roadmapInfo.quest_list.length > 0) {
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
    (params: RoadmapConnection) => setEdges((els) => addEdge(params, els)),
    [setEdges],
  );

  const onNodeChange = useCallback(
    (data: RoadmapNodeData, isCheck: boolean) => {
      setNodes((nds) => updateNodeCheckStatus(data.id, isCheck, nds, setQuestList));
    },
    [setNodes],
  );

  const enhancedNodes = useMemo(
    () => enhanceNodes(nodes, onNodeChange),
    [nodes, onNodeChange],
  );

  const {
    alertDesc,
    alertStatus,
    handleSearch,
    onClickSave,
    setAlertStatus,
  } = useRoadmapActions({
    nodes,
    questList,
    searchQuery,
    searchIndex,
    setQuestList,
    setSearchIndex,
    fitBounds: reactFlowInstance.fitBounds,
  });

  const onChangeNpcTab = (tab: string) => {
    setTabState(tab);
    requestAnimationFrame(() => {
      fitView();
    });
  };

  const handleCheckAllNodes = () =>
    checkAllNodes(roadmapInfo.node_info, tabState, setQuestList);

  const handleUncheckAllNodes = () =>
    setQuestList(getUncheckUpdater(roadmapInfo.node_info, tabState));

  const handleClickKappaFilter = () =>
    onClickKappaFilter(onlyKappa, setOnlyKappa, fitView);

  return {
    alertDesc,
    alertStatus,
    edges,
    enhancedNodes,
    handleCheckAllNodes,
    handleClickKappaFilter,
    handleSearch,
    handleUncheckAllNodes,
    npcList,
    onChangeNpcTab,
    onClickSave,
    onConnect,
    onEdgesChange,
    onNodesChange,
    onlyKappa,
    questList,
    searchQuery,
    setAlertStatus,
    setSearchQuery,
    tabState,
    nodes,
  };
}
