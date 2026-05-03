"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react";
import {
  Check,
  CheckSquare,
  ExternalLink,
  Eye,
  Search,
  Square,
  Store,
  Zap,
} from "lucide-react";

import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/class-name";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type {
  RoadmapEdge,
  RoadmapQuestNode,
  RoadmapResponse,
  RoadmapTraderNode,
} from "@/types/api/roadmap";

type RoadmapNodeKind = "traderNode" | "questNode";

interface RoadmapNodeData extends Record<string, unknown> {
  id: string;
  normalizedName: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  image: string;
  traderId: string;
  kappaRequired: boolean;
  minPlayerLevel: number;
  requirements: string[];
  next: string[];
  completed: boolean;
  hiddenByKappa: boolean;
  locale: Locale;
  onToggle?: (node: RoadmapNodeData, checked: boolean) => void;
}

type RoadmapFlowNode = Node<RoadmapNodeData, RoadmapNodeKind>;
type RoadmapFlowEdge = Edge;

interface RoadmapStats {
  allCount: number;
  kappaCount: number;
  completeCount: number;
  kappaCompleteCount: number;
  completeRate: number;
  kappaCompleteRate: number;
}

const STORAGE_KEY = "eft-library-roadmap-quest-list";

const roadmapCopy = {
  ko: {
    title: "퀘스트 로드맵",
    eyebrow: "Roadmap",
    searchPlaceholder: "퀘스트 검색",
    all: "ALL",
    selectTrader: "상인 선택",
    dashboard: "현황판",
    allQuest: "전체 퀘스트",
    kappaQuest: "카파 퀘스트",
    completedQuest: "완료 퀘스트",
    completedKappa: "카파 완료 퀘스트",
    progress: "전체 진행률",
    selectAll: "전체 선택",
    unselectAll: "전체 해제",
    save: "저장",
    viewKappa: "카파 퀘스트 보기",
    viewAll: "전체 퀘스트 보기",
    kappa: "Kappa",
    level: "Lv.",
    saved: "진행 상황을 저장했습니다.",
    notFound: "검색 결과가 없습니다.",
    inputWord: "검색어를 입력해주세요.",
  },
  en: {
    title: "Quest Roadmap",
    eyebrow: "Roadmap",
    searchPlaceholder: "Quest Search",
    all: "ALL",
    selectTrader: "Select Trader",
    dashboard: "Dashboard",
    allQuest: "All Quests",
    kappaQuest: "Kappa Quest",
    completedQuest: "Completed Quests",
    completedKappa: "Kappa Success",
    progress: "Overall Progress",
    selectAll: "Select All",
    unselectAll: "Deselect All",
    save: "Save",
    viewKappa: "View Kappa Quest",
    viewAll: "View All Quests",
    kappa: "Kappa",
    level: "Lv.",
    saved: "Progress saved.",
    notFound: "No quest found.",
    inputWord: "Enter a search word.",
  },
  ja: {
    title: "Quest Roadmap",
    eyebrow: "Roadmap",
    searchPlaceholder: "クエスト検索",
    all: "ALL",
    selectTrader: "トレーダーを選択",
    dashboard: "ダッシュボード",
    allQuest: "すべてのクエスト",
    kappaQuest: "カッパクエスト",
    completedQuest: "完了したクエスト",
    completedKappa: "カッパ成功クエスト",
    progress: "全体の進行度",
    selectAll: "すべて選択",
    unselectAll: "すべて選択解除",
    save: "保存",
    viewKappa: "カッパクエストを見る",
    viewAll: "すべてのクエストを見る",
    kappa: "Kappa",
    level: "Lv.",
    saved: "進行状況を保存しました。",
    notFound: "検索結果がありません。",
    inputWord: "検索語を入力してください。",
  },
} as const;

const nodeTypes: NodeTypes = {
  questNode: QuestFlowNode,
  traderNode: TraderFlowNode,
};

function getLocalizedName(
  value: { name_en: string; name_ko: string; name_ja: string },
  locale: Locale,
) {
  const localized = pickLocalizedField(
    value as unknown as Record<string, unknown>,
    locale,
    "name",
  );

  return typeof localized === "string" && localized ? localized : value.name_en;
}

function getNodeColor(traderId: string) {
  const colorMap = [
    "from-sky-500 to-blue-600",
    "from-orange-500 to-red-600",
    "from-emerald-500 to-teal-600",
    "from-violet-500 to-purple-600",
    "from-yellow-500 to-amber-600",
    "from-pink-500 to-rose-600",
    "from-cyan-500 to-indigo-600",
    "from-lime-500 to-green-600",
    "from-fuchsia-500 to-pink-600",
    "from-slate-500 to-gray-700",
    "from-red-500 to-orange-600",
  ];
  const index = traderId
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);

  return colorMap[index % colorMap.length];
}

function getQuestPosition(
  quest: RoadmapQuestNode,
  tabState: string,
  onlyKappa: boolean,
) {
  if (onlyKappa) {
    return {
      x: tabState === "all" ? quest.total_kappa_x_coordinate : quest.single_kappa_x_coordinate,
      y: tabState === "all" ? quest.total_kappa_y_coordinate : quest.single_kappa_y_coordinate,
    };
  }

  return {
    x: tabState === "all" ? quest.total_x_coordinate : quest.single_x_coordinate,
    y: tabState === "all" ? quest.total_y_coordinate : quest.single_y_coordinate,
  };
}

function createNodes({
  roadmap,
  tabState,
  onlyKappa,
  completedSet,
  locale,
  onToggle,
}: {
  roadmap: RoadmapResponse;
  tabState: string;
  onlyKappa: boolean;
  completedSet: Set<string>;
  locale: Locale;
  onToggle: (node: RoadmapNodeData, checked: boolean) => void;
}) {
  return roadmap.node_info.flatMap((trader) => {
    if (tabState !== "all" && trader.id !== tabState) {
      return [];
    }

    return trader.quests.map<RoadmapFlowNode>((quest) => ({
      id: quest.id,
      type: "questNode",
      position: getQuestPosition(quest, tabState, onlyKappa),
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      draggable: false,
      data: {
        id: quest.id,
        normalizedName: quest.normalized_name,
        name_en: quest.name_en,
        name_ko: quest.name_ko,
        name_ja: quest.name_ja,
        image: trader.image,
        traderId: trader.id,
        kappaRequired: quest.kappa_required,
        minPlayerLevel: quest.min_player_level,
        requirements: quest.task_requirements,
        next: quest.task_next,
        completed: completedSet.has(quest.id),
        hiddenByKappa: onlyKappa && !quest.kappa_required,
        locale,
        onToggle,
      },
    }));
  });
}

function createEdges(edgeInfo: RoadmapEdge[], nodeIds: Set<string>) {
  return edgeInfo
    .filter((edge) => nodeIds.has(edge.source_id) && nodeIds.has(edge.target_id))
    .map<RoadmapFlowEdge>((edge) => ({
      id: edge.id,
      source: edge.source_id,
      target: edge.target_id,
      type: "smoothstep",
      animated: false,
      style: { stroke: "#38bdf8", strokeWidth: 2 },
    }));
}

function getStats(nodes: RoadmapFlowNode[], completed: string[]) {
  const visibleNodes = nodes.filter((node) => !node.data.hiddenByKappa);
  const completedSet = new Set(completed);
  const allCount = visibleNodes.length;
  const kappaCount = visibleNodes.filter((node) => node.data.kappaRequired).length;
  const completeCount = visibleNodes.filter((node) => completedSet.has(node.id)).length;
  const kappaCompleteCount = visibleNodes.filter(
    (node) => node.data.kappaRequired && completedSet.has(node.id),
  ).length;

  return {
    allCount,
    kappaCount,
    completeCount,
    kappaCompleteCount,
    completeRate: allCount > 0 ? (completeCount / allCount) * 100 : 0,
    kappaCompleteRate: kappaCount > 0 ? (kappaCompleteCount / kappaCount) * 100 : 0,
  };
}

export function RoadmapPage({
  roadmap,
  locale,
}: {
  roadmap: RoadmapResponse;
  locale: Locale;
}) {
  return (
    <ReactFlowProvider>
      <RoadmapCanvas roadmap={roadmap} locale={locale} />
    </ReactFlowProvider>
  );
}

function RoadmapCanvas({
  roadmap,
  locale,
}: {
  roadmap: RoadmapResponse;
  locale: Locale;
}) {
  const copy = roadmapCopy[locale];
  const { fitView, fitBounds } = useReactFlow();
  const [tabState, setTabState] = useState("all");
  const [onlyKappa, setOnlyKappa] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setCompleted(parsed.filter((value): value is string => typeof value === "string"));
      }
    } catch {
      setCompleted([]);
    }
  }, []);

  const completedSet = useMemo(() => new Set(completed), [completed]);
  const questById = useMemo(() => {
    const map = new Map<string, RoadmapQuestNode>();
    roadmap.node_info.forEach((trader) => {
      trader.quests.forEach((quest) => {
        map.set(quest.id, quest);
      });
    });
    return map;
  }, [roadmap.node_info]);

  const handleToggleNode = useCallback(
    (node: RoadmapNodeData, checked: boolean) => {
      setCompleted((current) => {
        const nextSet = new Set(current);
        const apply = (targetId: string, isChecked: boolean) => {
          if (isChecked) {
            nextSet.add(targetId);
            questById.get(targetId)?.task_requirements.forEach((id) => apply(id, true));
            return;
          }

          nextSet.delete(targetId);
          questById.get(targetId)?.task_next.forEach((id) => apply(id, false));
        };

        apply(node.id, checked);
        return [...nextSet];
      });
    },
    [questById],
  );

  const nodes = useMemo(
    () =>
      createNodes({
        roadmap,
        tabState,
        onlyKappa,
        completedSet,
        locale,
        onToggle: handleToggleNode,
      }),
    [roadmap, tabState, onlyKappa, completedSet, locale, handleToggleNode],
  );
  const visibleNodeIds = useMemo(
    () => new Set(nodes.filter((node) => !node.data.hiddenByKappa).map((node) => node.id)),
    [nodes],
  );
  const edges = useMemo(
    () => createEdges(roadmap.edge_info, visibleNodeIds),
    [roadmap.edge_info, visibleNodeIds],
  );
  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState<RoadmapFlowNode>(nodes);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState<RoadmapFlowEdge>(edges);
  const stats = useMemo(() => getStats(nodes, completed), [nodes, completed]);

  useEffect(() => {
    setFlowNodes(nodes);
    setFlowEdges(edges);
    requestAnimationFrame(() => fitView());
  }, [nodes, edges, fitView, setFlowEdges, setFlowNodes]);

  useEffect(() => {
    setSearchIndex(0);
  }, [searchQuery]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function handleSave() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    showNotice(copy.saved);
  }

  function handleSearch() {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      showNotice(copy.inputWord);
      return;
    }

    const matches = flowNodes.filter(
      (node) =>
        !node.data.hiddenByKappa &&
        [node.data.name_en, node.data.name_ko, node.data.name_ja].some((name) =>
          name.toLowerCase().includes(query),
        ),
    );

    if (!matches.length) {
      showNotice(copy.notFound);
      return;
    }

    const target = matches[searchIndex % matches.length];
    setSearchIndex((current) => current + 1);
    fitBounds({ x: target.position.x, y: target.position.y, width: 300, height: 220 });
  }

  function handleSelectAll() {
    const questIds = nodes
      .filter((node) => !node.data.hiddenByKappa)
      .map((node) => node.id);
    setCompleted((current) => [...new Set([...current, ...questIds])]);
  }

  function handleUnselectAll() {
    const questIds = new Set(
      nodes.filter((node) => !node.data.hiddenByKappa).map((node) => node.id),
    );
    setCompleted((current) => current.filter((id) => !questIds.has(id)));
  }

  function handleTraderChange(value: string) {
    setTabState(value);
    requestAnimationFrame(() => fitView());
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#111418] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
            {copy.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-black">{copy.title}</h1>
        </section>

        <TraderTabs
          traders={roadmap.node_info}
          locale={locale}
          activeTrader={tabState}
          copy={copy}
          onChange={handleTraderChange}
        />

        <ControlPanel
          copy={copy}
          onlyKappa={onlyKappa}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onSave={handleSave}
          onSelectAll={handleSelectAll}
          onToggleKappa={() => setOnlyKappa((current) => !current)}
          onUnselectAll={handleUnselectAll}
          setSearchQuery={setSearchQuery}
        />

        <StatsPanel copy={copy} onlyKappa={onlyKappa} stats={stats} />

        <section className="h-[500px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-[#2a3038] dark:bg-[#181c21] sm:h-[620px] lg:h-[720px]">
          <ReactFlow<RoadmapFlowNode, RoadmapFlowEdge>
            nodes={flowNodes}
            edges={flowEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={(connection: Connection) =>
              setFlowEdges((currentEdges) => addEdge(connection, currentEdges))
            }
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.03}
            maxZoom={2}
            zoomOnDoubleClick={false}
            className="bg-white dark:bg-[#111418] [--roadmap-grid:rgba(100,116,139,0.28)] dark:[--roadmap-grid:rgba(148,163,184,0.32)]"
          >
            <Controls className="border border-gray-200 bg-white text-gray-900 dark:border-[#2a3038] dark:bg-[#181c21] dark:text-white" />
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="var(--roadmap-grid)"
            />
          </ReactFlow>
        </section>

        {notice ? (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-gray-950 px-4 py-2 text-sm font-semibold text-white shadow-lg dark:bg-white dark:text-gray-950">
            {notice}
          </div>
        ) : null}
      </div>
    </main>
  );
}

function TraderTabs({
  traders,
  locale,
  activeTrader,
  copy,
  onChange,
}: {
  traders: RoadmapTraderNode[];
  locale: Locale;
  activeTrader: string;
  copy: (typeof roadmapCopy)[Locale];
  onChange: (value: string) => void;
}) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
      <div className="hidden grid-cols-6 gap-2 lg:grid xl:grid-cols-12">
        <TraderTabButton
          active={activeTrader === "all"}
          label={copy.all}
          onClick={() => onChange("all")}
        />
        {traders.map((trader) => (
          <TraderTabButton
            key={trader.id}
            active={activeTrader === trader.id}
            label={getLocalizedName(trader, locale)}
            onClick={() => onChange(trader.id)}
          />
        ))}
      </div>

      <label className="block lg:hidden">
        <span className="mb-2 block text-xs font-bold text-gray-500 dark:text-gray-400">
          {copy.selectTrader}
        </span>
        <select
          value={activeTrader}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold outline-none dark:border-[#2a3038] dark:bg-[#20242b]"
        >
          <option value="all">{copy.all}</option>
          {traders.map((trader) => (
            <option key={trader.id} value={trader.id}>
              {getLocalizedName(trader, locale)}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

function TraderTabButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 truncate rounded-lg px-3 text-xs font-bold transition",
        active
          ? "border border-gray-200 bg-white text-gray-950 shadow-sm dark:border-[#39414d] dark:bg-[#20242b] dark:text-white"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-[#20242b] dark:hover:text-white",
      )}
    >
      {label}
    </button>
  );
}

function ControlPanel({
  copy,
  onlyKappa,
  searchQuery,
  onSearch,
  onSave,
  onSelectAll,
  onToggleKappa,
  onUnselectAll,
  setSearchQuery,
}: {
  copy: (typeof roadmapCopy)[Locale];
  onlyKappa: boolean;
  searchQuery: string;
  onSearch: () => void;
  onSave: () => void;
  onSelectAll: () => void;
  onToggleKappa: () => void;
  onUnselectAll: () => void;
  setSearchQuery: (value: string) => void;
}) {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21] lg:flex-row lg:items-center lg:justify-end">
      <div className="relative min-w-0 flex-1 lg:max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSearch();
            }
          }}
          placeholder={copy.searchPlaceholder}
          className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-orange-400 dark:border-[#2a3038] dark:bg-[#20242b]"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <ActionButton icon={<Search className="h-4 w-4" />} label={copy.searchPlaceholder} onClick={onSearch} />
        <ActionButton icon={<CheckSquare className="h-4 w-4" />} label={copy.selectAll} onClick={onSelectAll} />
        <ActionButton icon={<Square className="h-4 w-4" />} label={copy.unselectAll} onClick={onUnselectAll} />
        <ActionButton icon={<Check className="h-4 w-4" />} label={copy.save} onClick={onSave} />
        <ActionButton
          icon={<Eye className="h-4 w-4" />}
          label={onlyKappa ? copy.viewAll : copy.viewKappa}
          onClick={onToggleKappa}
          active={onlyKappa}
        />
      </div>
    </section>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-bold transition",
        active
          ? "border-purple-300 bg-purple-50 text-purple-700 dark:border-purple-500/40 dark:bg-purple-500/10 dark:text-purple-300"
          : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-[#2a3038] dark:bg-[#20242b] dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-300",
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function StatsPanel({
  copy,
  onlyKappa,
  stats,
}: {
  copy: (typeof roadmapCopy)[Locale];
  onlyKappa: boolean;
  stats: RoadmapStats;
}) {
  const progress = onlyKappa ? stats.kappaCompleteRate : stats.completeRate;

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-orange-500" />
        <h2 className="text-sm font-black">{copy.dashboard}</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard color="bg-blue-500" label={copy.allQuest} value={stats.allCount} />
        <StatsCard color="bg-orange-500" label={copy.kappaQuest} value={stats.kappaCount} />
        <StatsCard color="bg-emerald-500" label={copy.completedKappa} value={stats.kappaCompleteCount} />
        {!onlyKappa ? (
          <StatsCard color="bg-purple-500" label={copy.completedQuest} value={stats.completeCount} />
        ) : null}
      </div>
      <div className="mt-5 border-t border-gray-200 pt-4 dark:border-[#2a3038]">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-bold text-gray-600 dark:text-gray-300">{copy.progress}</span>
          <span className="font-black text-orange-500">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-[#20242b]">
          <div className="h-full rounded-full bg-orange-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  );
}

function StatsCard({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg bg-gray-50 p-3 dark:bg-[#20242b]">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300">
          <span className={cn("h-3 w-3 shrink-0 rounded-full", color)} />
          <span className="truncate">{label}</span>
        </span>
        <span className="rounded bg-white px-2 py-0.5 text-xs font-black dark:bg-[#181c21]">
          {value}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-200 dark:bg-[#111418]">
        <div className={cn("h-full rounded-full", color)} />
      </div>
    </div>
  );
}

function QuestFlowNode(props: NodeProps<RoadmapFlowNode>) {
  const name = getLocalizedName(
    {
      name_en: props.data.name_en,
      name_ko: props.data.name_ko,
      name_ja: props.data.name_ja,
    },
    props.data.locale,
  );

  function openQuestDetail() {
    window.open(`/quest/detail/${props.data.normalizedName}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      className={cn(
        "group relative flex min-h-32 min-w-60 flex-col rounded-xl transition duration-200",
        "hover:scale-105 hover:shadow-2xl",
      )}
      style={{
        opacity: props.data.hiddenByKappa ? 0 : 1,
        pointerEvents: props.data.hiddenByKappa ? "none" : "auto",
      }}
    >
      <div className={cn("h-full rounded-xl bg-linear-to-br p-1 shadow-lg", getNodeColor(props.data.traderId))}>
        <div
          className={cn(
            "relative flex h-full min-h-30 flex-col justify-center rounded-lg border-2 bg-white p-4 pt-10 text-center dark:bg-[#181c21]",
            props.data.completed
              ? "border-emerald-400 dark:border-emerald-500"
              : "border-gray-200 dark:border-[#2a3038]",
          )}
        >
          <div className="absolute right-3 top-3">
            <input
              id={`roadmap-quest-${props.data.id}`}
              type="checkbox"
              checked={props.data.completed}
              onChange={(event) => props.data.onToggle?.(props.data, event.target.checked)}
              className="sr-only"
            />
            <label
              htmlFor={`roadmap-quest-${props.data.id}`}
              className={cn(
                "flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border-2 transition",
                props.data.completed
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-gray-300 bg-white hover:border-emerald-400 dark:border-gray-600 dark:bg-[#20242b]",
              )}
            >
              {props.data.completed ? <Check className="h-4 w-4" /> : null}
            </label>
          </div>

          <button
            type="button"
            onClick={openQuestDetail}
            className="mx-auto max-w-52 text-balance text-lg font-black leading-tight text-gray-800 transition hover:text-orange-500 dark:text-gray-100 dark:hover:text-orange-300"
          >
            {name}
          </button>
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Lv.{props.data.minPlayerLevel}</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
          </div>

          {props.data.kappaRequired ? (
            <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-orange-500 px-2 py-1 text-xs font-black text-white">
              <Zap className="h-3 w-3" />
              Kappa
            </div>
          ) : null}

          {props.data.completed ? (
            <div className="pointer-events-none absolute inset-0 rounded-lg bg-emerald-500/10" />
          ) : null}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="h-3 w-3 border-2 border-white bg-sky-500 dark:border-[#181c21]"
        isConnectable={props.isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="h-3 w-3 border-2 border-white bg-sky-500 dark:border-[#181c21]"
        isConnectable={props.isConnectable}
      />
    </div>
  );
}

function TraderFlowNode(props: NodeProps<RoadmapFlowNode>) {
  const name = getLocalizedName(
    {
      name_en: props.data.name_en,
      name_ko: props.data.name_ko,
      name_ja: props.data.name_ja,
    },
    props.data.locale,
  );

  return (
    <div className="group relative min-h-56 min-w-52 rounded-2xl transition hover:scale-105 hover:shadow-2xl">
      <div className={cn("h-full rounded-2xl bg-linear-to-br p-1 shadow-lg", getNodeColor(props.data.id))}>
        <div className="h-full overflow-hidden rounded-xl border-2 border-gray-200 bg-white dark:border-[#2a3038] dark:bg-[#181c21]">
          <div className="flex justify-center px-4 pb-4 pt-8">
            <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-white dark:ring-[#20242b]">
              <Image src={props.data.image} alt={name} fill sizes="112px" className="object-cover" />
            </div>
          </div>
          <h3 className="truncate px-4 pb-4 text-center text-lg font-black">{name}</h3>
        </div>
      </div>
      <Handle type="target" position={Position.Left} className="h-3 w-3 bg-sky-500" />
      <Handle type="source" position={Position.Right} className="h-3 w-3 bg-sky-500" />
    </div>
  );
}
