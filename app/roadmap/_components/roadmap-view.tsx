"use client";

import type { RoadmapViewTypes } from "./roadmap.types";
import {
  Background,
  BackgroundVariant,
  Controls,
  type NodeTypes,
  ReactFlow,
} from "@xyflow/react";
import { useMemo } from "react";
import TraderTab from "./TraderTab/trader-tab";
import QuestNode from "./QuestNode/quest-node";
import TraderNode from "./TraderNode/trader-node";
import ControlPanel from "./ControlPanel/control-panel";
import { Card, CardContent } from "@/components/ui/card";
import StatsPanel from "./StatsPanel/stats-panel";
import TraderTabM from "./TraderTab/trader-tab-m";
import { roadmapI18N } from "@/lib/consts/i18nConsts";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import DefaultDialog from "@/components/custom/DefaultDialog/default-dialog";
import { getRoadmapStats } from "@/lib/func/roadmapStatsFunction";
import { useRoadmapView } from "@/lib/hooks/useRoadmapView";
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";
import AdBanner from "@/components/custom/Adsense/ad-banner";
import ProgressData from "@/components/custom/Progress/progress-data";
import type { RoadmapFlowEdge, RoadmapFlowNode } from "./roadmap.types";

export default function RoadmapView({ roadmapInfo }: RoadmapViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const {
    alertDesc,
    alertStatus,
    edges,
    enhancedNodes,
    handleCheckAllNodes,
    handleClickKappaFilter,
    handleSearch,
    handleUncheckAllNodes,
    npcList,
    nodes,
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
  } = useRoadmapView(roadmapInfo);

  const nodeTypes = useMemo<NodeTypes>(
    () => ({
      questNode: QuestNode,
      npcNode: TraderNode,
    }),
    [],
  );

  const stats = useMemo(
    () => getRoadmapStats(nodes, roadmapInfo.node_info, questList, onlyKappa),
    [nodes, roadmapInfo.node_info, questList, onlyKappa],
  );

  return (
    <ViewWrapper>
      <div className="min-h-screen dark:bg-[#1e2124] dark:text-white bg-gray-50 text-black">
        <div className="container mx-auto p-4 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-bold">
                {roadmapI18N.title[localeKey]}
              </h1>
            </div>

            <AdBanner
              dataAdFormat={"auto"}
              dataFullWidthResponsive={true}
              dataAdSlot="2690838054"
              maxWidth={1220}
            />
            {/* Merchant Selection - Desktop */}
            <div className="hidden lg:block mt-4">
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
              checkAllNodes={handleCheckAllNodes}
              uncheckAllNodes={handleUncheckAllNodes}
              onClickSave={onClickSave}
              onClickKappaFilter={handleClickKappaFilter}
              onlyKappa={onlyKappa}
            />
          </div>

          {/* Main Content */}
          <div className="w-full space-y-6">
            {/* 현황판을 ReactFlow 위에 배치 */}
            <StatsPanel stats={stats} onlyKappa={onlyKappa} />

            {/* Quest Flow */}
            <Card className="h-125 sm:h-150 lg:h-175">
              <CardContent className="p-0 h-full relative">
                <ReactFlow<RoadmapFlowNode, RoadmapFlowEdge>
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
          <ProgressData />
        </div>
        <DefaultDialog
          open={alertStatus}
          setOpen={setAlertStatus}
          title="Notice"
          description={alertDesc}
        />
      </div>
    </ViewWrapper>
  );
}
