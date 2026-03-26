import type {
  NPCData,
  RoadmapFlowNode,
  RoadmapStatsSummary,
} from "@/app/roadmap/_components/roadmap.types";

const getRate = (numerator: number, denominator: number) => {
  if (denominator <= 0 || numerator <= 0) return 0;
  return (numerator / denominator) * 100;
};

export const getAllKappaCount = (nodes: RoadmapFlowNode[]) => {
  return nodes.filter((item) => item.data.kappa_required === true).length;
};

export const getKappaCompleteCount = (
  nodes: RoadmapFlowNode[],
  questList: string[],
) => {
  return nodes.filter(
    (item) => questList.includes(item.id) && item.data.kappa_required === true,
  ).length;
};

export const getCompleteCount = (
  nodes: RoadmapFlowNode[],
  questList: string[],
) => {
  return nodes.filter((node) => questList.includes(node.id)).length;
};

export const getAllCount = (nodes: RoadmapFlowNode[], nodeInfo: NPCData[]) => {
  const roadmapIds = new Set(nodeInfo.map((npc) => npc.id));
  return nodes.filter((node) => !roadmapIds.has(node.id)).length;
};

export const checkAllNodes = (
  nodeInfo: NPCData[],
  tabState: string,
  setQuestList: (val: string[]) => void,
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
  tabState: string,
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
  fitView: () => void,
) => {
  setOnlyKappa(!onlyKappa);

  requestAnimationFrame(() => {
    fitView();
  });
};

export const getRoadmapStats = (
  nodes: RoadmapFlowNode[],
  nodeInfo: NPCData[],
  questList: string[],
  onlyKappa: boolean,
): RoadmapStatsSummary => {
  const allCount = getAllCount(nodes, nodeInfo);
  const allKappaCount = getAllKappaCount(nodes);
  const kappaCompleteCount = getKappaCompleteCount(nodes, questList);
  const completeCount = getCompleteCount(nodes, questList);

  return {
    allCount,
    allKappaCount,
    kappaCompleteCount,
    completeCount,
    kappaQuestRate: getRate(allKappaCount, allCount),
    kappaCompleteRate: getRate(kappaCompleteCount, allKappaCount),
    completeRate: getRate(completeCount, allCount),
    overallProgressRate: onlyKappa
      ? getRate(kappaCompleteCount, allKappaCount)
      : getRate(completeCount, allCount),
  };
};
