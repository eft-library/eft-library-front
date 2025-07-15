"use client";

import type { RoadmapViewTypes } from "./roadmap.types";
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
import TraderTab from "./TraderTab/trader-tab";
import { signOut, useSession } from "next-auth/react";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import QuestNode from "./QuestNode/quest-node";
import TraderNode from "./TraderNode/trader-node";

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
  const reactFlowWrapper = useRef(null);
  const reactFlowInstance = useReactFlow();

  const nodeTypes = useMemo(
    () => ({
      questNode: QuestNode,
      npcNode: TraderNode,
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

  return null;
}
