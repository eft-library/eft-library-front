/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Edge, NPCData } from "./roadmap.types";

export const getAllKappaCount = (nodes: any[]) => {
  return nodes.filter((item) => item.data.kappa_required === true).length;
};

export const getKappaCompleteCount = (nodes: any[], questList: string[]) => {
  return nodes.filter(
    (item) => questList.includes(item.id) && item.data.kappa_required === true
  ).length;
};

export const getCompleteCount = (nodes: any[], questList: string[]) => {
  return nodes.filter((node) => questList.includes(node.id)).length;
};

export const getAllCount = (nodes: any[], nodeInfo: NPCData[]) => {
  const roadmapIds = new Set(nodeInfo.map((npc) => npc.id));
  return nodes.filter((node) => !roadmapIds.has(node.id)).length;
};

export const checkAllNodes = (
  nodeInfo: NPCData[],
  tabState: string,
  setQuestList: (val: string[]) => void
) => {
  const allQuestIds = nodeInfo.flatMap((npc) => {
    if (tabState !== "all" && npc.id !== tabState) return [];

    return npc.quests
      .filter((quest) => !nodeInfo.some((node) => node.id === quest.id))
      .map((quest) => quest.id);
  });

  setQuestList(allQuestIds);
};

export const getUncheckUpdater = (
  nodeInfo: NPCData[],
  tabState: string
): ((prev: string[]) => string[]) => {
  const allQuestIds = nodeInfo.flatMap((npc) => {
    if (tabState !== "all" && npc.id !== tabState) return [];
    return npc.quests.map((quest) => quest.id);
  });

  return (prev) => prev.filter((id) => !allQuestIds.includes(id));
};

export const onClickKappaFilter = (
  onlyKappa: boolean,
  setOnlyKappa: (val: boolean) => void,
  fitView: () => void
) => {
  setOnlyKappa(!onlyKappa);

  requestAnimationFrame(() => {
    fitView();
  });
};

export const generateEdges = (edgeInfo: Edge[]) =>
  edgeInfo.map((edge) => ({
    id: edge.id,
    source: edge.source_id,
    target: edge.target_id,
    type: "smoothstep",
    animated: false,
    style: { stroke: "skyblue", strokeWidth: 2 },
  }));
