import type { Dispatch, SetStateAction } from "react";
import { Position } from "@xyflow/react";
import type {
  Edge,
  NPCData,
  RoadmapFlowEdge,
  RoadmapFlowNode,
  RoadmapNodeData,
  TabNpc,
} from "@/app/roadmap/_components/roadmap.types";

export const getNpcList = (nodeInfo: NPCData[]): TabNpc[] =>
  nodeInfo.map((npc) => ({
    id: npc.id,
    name: npc.name,
    image: npc.image,
    color: npc.quests[0].node_color,
  }));

export const getNpcIdList = (nodeInfo: NPCData[]) =>
  nodeInfo.map((npc) => npc.id);

export const createRoadmapNodes = (
  nodeInfo: NPCData[],
  tabState: string,
  onlyKappa: boolean,
  npcIdList: string[],
  questIdSet: Set<string>,
): RoadmapFlowNode[] => {
  return nodeInfo.flatMap((npc) => {
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
};

export const updateNodeCheckStatus = (
  nodeId: string,
  checkStatus: boolean,
  nodes: RoadmapFlowNode[],
  setQuestList: Dispatch<SetStateAction<string[]>>,
): RoadmapFlowNode[] => {
  const updatedNodes = new Map(nodes.map((node) => [node.id, node]));

  const updateNode = (targetNodeId: string) => {
    const node = updatedNodes.get(targetNodeId);
    if (!node) return;

    updatedNodes.set(targetNodeId, {
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
      (id) => !nodes.some((node) => node.data.id === id),
    );

    return [...new Set([...filteredQuestList, ...nodesCheckList])];
  });

  return Array.from(updatedNodes.values());
};

export const enhanceNodes = (
  nodes: RoadmapFlowNode[],
  onNodeChange: (data: RoadmapNodeData, isCheck: boolean) => void,
): RoadmapFlowNode[] =>
  nodes.map((node) => ({
    ...node,
    data: { ...node.data, onChange: onNodeChange },
  }));

export const findMatchingNodes = (
  nodes: RoadmapFlowNode[],
  searchQuery: string,
): RoadmapFlowNode[] => {
  const normalizedQuery = searchQuery.toLowerCase();

  return nodes.filter(
    (node) =>
      node.data.name.ko.toLowerCase().includes(normalizedQuery) ||
      node.data.name.ja.toLowerCase().includes(normalizedQuery) ||
      node.data.name.en.toLowerCase().includes(normalizedQuery),
  );
};

export const getFitBoundsFromNode = (node: RoadmapFlowNode) => ({
  x: node.position.x,
  y: node.position.y,
  width: 300,
  height: 300,
});

export const generateEdges = (edgeInfo: Edge[]): RoadmapFlowEdge[] =>
  edgeInfo.map((edge) => ({
    id: edge.id,
    source: edge.source_id,
    target: edge.target_id,
    type: "smoothstep",
    animated: false,
    style: { stroke: "skyblue", strokeWidth: 2 },
  }));
