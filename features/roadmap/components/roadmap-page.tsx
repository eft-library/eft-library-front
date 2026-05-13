"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Eye,
  RotateCcw,
  Save,
  Search,
  Square,
  Zap,
} from "lucide-react";

import { HorizontalAdBanner } from "@/components/shared/ad-banner";
import type { Locale } from "@/i18n/config";
import { getProgressItems, saveProgressItems } from "@/features/progress/api";
import { getUserRoadmap, saveRoadmap } from "@/features/roadmap/api";
import { cn } from "@/lib/utils/class-name";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { ProgressItemResponse, ProgressTrackedItem } from "@/types/api/minigame";
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
  kappaQuestRate: number;
  completeRate: number;
  kappaCompleteRate: number;
  overallProgressRate: number;
}

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
    saveLoginRequired: "로그인 사용자만 진행 상황을 저장할 수 있습니다.",
    loadFailed: "저장된 로드맵을 불러오지 못했습니다.",
    progressLoadFailed: "아이템 진행 목록을 불러오지 못했습니다.",
    progressLoginRequired: "로그인 사용자만 아이템 목록을 저장할 수 있습니다.",
    notFound: "검색 결과가 없습니다.",
    inputWord: "검색어를 입력해주세요.",
    itemProgressTitle: "아이템 체크리스트",
    itemProgressKappa: "수집가 (Collector)",
    itemProgressRebirth: "환생 (New Beginning)",
    reset: "초기화",
    complete: "완료",
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
    saveLoginRequired: "Sign in to save progress.",
    loadFailed: "Failed to load saved roadmap.",
    progressLoadFailed: "Failed to load item progress.",
    progressLoginRequired: "Sign in to save item progress.",
    notFound: "No quest found.",
    inputWord: "Enter a search word.",
    itemProgressTitle: "Item Checklist",
    itemProgressKappa: "Collector",
    itemProgressRebirth: "New Beginning",
    reset: "Reset",
    complete: "Complete",
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
    saveLoginRequired: "進行状況の保存にはログインが必要です。",
    loadFailed: "保存済みロードマップを読み込めませんでした。",
    progressLoadFailed: "アイテム進行リストを読み込めませんでした。",
    progressLoginRequired: "ログインユーザーのみアイテムリストを保存できます。",
    notFound: "検索結果がありません。",
    inputWord: "検索語を入力してください。",
    itemProgressTitle: "アイテムチェックリスト",
    itemProgressKappa: "Collector",
    itemProgressRebirth: "New Beginning",
    reset: "リセット",
    complete: "完了",
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

const traderColorMap: Record<string, string> = {
  "5935c25fb3acc3127c3d8cd9": "from-amber-400 to-orange-500 dark:from-yellow-800 dark:to-orange-900",
  "579dc571d53a0658a154fbec": "from-green-400 to-emerald-500 dark:from-green-800 dark:to-emerald-900",
  "638f541a29ffd1183d187f57": "from-blue-400 to-indigo-500 dark:from-blue-800 dark:to-indigo-900",
  "6617beeaa9cfa777ca915b7c": "from-pink-400 to-rose-500 dark:from-pink-800 dark:to-rose-900",
  "5ac3b934156ae10c4430e83c": "from-purple-400 to-violet-500 dark:from-purple-800 dark:to-violet-900",
  "5c0647fdd443bc2504c2d371": "from-cyan-400 to-sky-500 dark:from-cyan-800 dark:to-sky-900",
  "656f0f98d80a697f855d34b1": "from-teal-400 to-green-500 dark:from-teal-800 dark:to-green-900",
  "54cb50c76803fa8b248b4571": "from-lime-400 to-green-500 dark:from-lime-800 dark:to-green-900",
  "54cb57776803fa99248b456e": "from-red-400 to-orange-500 dark:from-red-800 dark:to-orange-900",
  "5a7c2eca46aef81a7ca2145d": "from-fuchsia-400 to-pink-500 dark:from-fuchsia-800 dark:to-pink-900",
};

function getNodeColor(traderId: string) {
  return traderColorMap[traderId] ?? "from-gray-300 to-gray-400 dark:from-slate-700 dark:to-slate-900";
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
  locale,
  onToggle,
}: {
  roadmap: RoadmapResponse;
  tabState: string;
  onlyKappa: boolean;
  locale: Locale;
  onToggle: (node: RoadmapNodeData, checked: boolean) => void;
}) {
  return roadmap.node_info.flatMap((trader) => {
    if (tabState !== "all" && trader.id !== tabState) {
      return [];
    }

    return trader.quests.map<RoadmapFlowNode>((quest) => {
      const isTraderStartNode = quest.id === trader.id || quest.id === quest.trader_id;

      return {
        id: quest.id,
        type: isTraderStartNode ? "traderNode" : "questNode",
        position: getQuestPosition(quest, tabState, onlyKappa),
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        data: {
          id: quest.id,
          normalizedName: isTraderStartNode ? trader.normalized_name : quest.normalized_name,
          name_en: isTraderStartNode ? trader.name_en : quest.name_en,
          name_ko: isTraderStartNode ? trader.name_ko : quest.name_ko,
          name_ja: isTraderStartNode ? trader.name_ja : quest.name_ja,
          image: trader.image,
          traderId: trader.id,
          kappaRequired: isTraderStartNode ? false : quest.kappa_required,
          minPlayerLevel: quest.min_player_level,
          requirements: quest.task_requirements,
          next: quest.task_next,
          completed: false,
          hiddenByKappa: onlyKappa && !quest.kappa_required && !isTraderStartNode,
          locale,
          onToggle,
        },
      };
    });
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

function getStats(nodes: RoadmapFlowNode[], completed: string[], traderIds: Set<string>) {
  const completedSet = new Set(completed);
  const getRate = (numerator: number, denominator: number) => {
    if (denominator <= 0 || numerator <= 0) {
      return 0;
    }

    return (numerator / denominator) * 100;
  };
  const allCount = nodes.filter((node) => !traderIds.has(node.id)).length;
  const kappaCount = nodes.filter((node) => node.data.kappaRequired).length;
  const completeCount = nodes.filter((node) => completedSet.has(node.id)).length;
  const kappaCompleteCount = nodes.filter(
    (node) => node.data.kappaRequired && completedSet.has(node.id),
  ).length;

  return {
    allCount,
    kappaCount,
    completeCount,
    kappaCompleteCount,
    kappaQuestRate: getRate(kappaCount, allCount),
    completeRate: getRate(completeCount, allCount),
    kappaCompleteRate: getRate(kappaCompleteCount, kappaCount),
    overallProgressRate: getRate(completeCount, allCount),
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
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const { fitView, fitBounds } = useReactFlow();
  const [tabState, setTabState] = useState("all");
  const [onlyKappa, setOnlyKappa] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const [notice, setNotice] = useState("");
  const [progressData, setProgressData] = useState<ProgressItemResponse | null>(null);
  const [selectedKappaItems, setSelectedKappaItems] = useState<string[]>([]);
  const [selectedRebirthItems, setSelectedRebirthItems] = useState<string[]>([]);
  const completedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;

    if (!accessToken) {
      setCompleted([]);
      return;
    }

    getUserRoadmap(accessToken)
      .then((questList) => {
        if (!cancelled) {
          setCompleted(questList.filter((value): value is string => typeof value === "string"));
        }
      })
      .catch(() => {
        if (!cancelled) {
          showNotice(copy.loadFailed);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [accessToken, copy.loadFailed]);

  useEffect(() => {
    let cancelled = false;

    getProgressItems(accessToken)
      .then((data) => {
        if (cancelled) {
          return;
        }

        setProgressData(data);
        setSelectedKappaItems(data.userKappaList);
        setSelectedRebirthItems(data.userRebirthList);
      })
      .catch(() => {
        if (!cancelled) {
          showNotice(copy.progressLoadFailed);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [accessToken, copy.progressLoadFailed]);

  const completedSet = useMemo(() => new Set(completed), [completed]);
  completedRef.current = completedSet;
  const traderIds = useMemo(
    () => new Set(roadmap.node_info.map((trader) => trader.id)),
    [roadmap.node_info],
  );
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
        locale,
        onToggle: handleToggleNode,
      }),
    [roadmap, tabState, onlyKappa, locale, handleToggleNode],
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
  const stats = useMemo(() => getStats(nodes, completed, traderIds), [nodes, completed, traderIds]);

  useEffect(() => {
    const currentCompleted = completedRef.current;
    setFlowNodes(
      nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          completed: currentCompleted.has(node.id),
        },
      })),
    );
    setFlowEdges(edges);
    requestAnimationFrame(() => fitView());
  }, [nodes, edges, fitView, setFlowEdges, setFlowNodes]);

  useEffect(() => {
    setFlowNodes((currentNodes) =>
      currentNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          completed: completedSet.has(node.id),
        },
      })),
    );
  }, [completedSet, setFlowNodes]);

  useEffect(() => {
    setSearchIndex(0);
  }, [searchQuery]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  async function handleSave() {
    if (!accessToken) {
      showNotice(copy.saveLoginRequired);
      return;
    }

    try {
      const savedQuestList = await saveRoadmap(completed, accessToken);
      setCompleted(savedQuestList.filter((value): value is string => typeof value === "string"));
      showNotice(copy.saved);
    } catch {
      showNotice(copy.saveLoginRequired);
    }
  }

  async function handleSaveProgressItems() {
    if (!accessToken) {
      showNotice(copy.progressLoginRequired);
      return;
    }

    try {
      const savedProgress = await saveProgressItems(
        {
          userKappa: selectedKappaItems,
          userRebirth: selectedRebirthItems,
        },
        accessToken,
      );
      setProgressData(savedProgress);
      setSelectedKappaItems(savedProgress.userKappaList);
      setSelectedRebirthItems(savedProgress.userRebirthList);
      showNotice(copy.saved);
    } catch {
      showNotice(copy.progressLoginRequired);
    }
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
      .filter((node) => !node.data.hiddenByKappa && !traderIds.has(node.id))
      .map((node) => node.id);
    setCompleted(questIds);
  }

  function handleUnselectAll() {
    const questIds = new Set(
      nodes
        .filter((node) => !node.data.hiddenByKappa)
        .map((node) => node.id),
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

        <HorizontalAdBanner className="my-0" />

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
            <Controls className="border border-gray-200 bg-white text-gray-900 dark:border-[#2a3038] dark:bg-[#181c21] dark:text-gray-200 [&_.react-flow__controls-button]:border-gray-200 [&_.react-flow__controls-button]:bg-white [&_.react-flow__controls-button]:text-gray-700 dark:[&_.react-flow__controls-button]:border-[#2a3038] dark:[&_.react-flow__controls-button]:bg-[#181c21] dark:[&_.react-flow__controls-button]:text-gray-300 dark:[&_.react-flow__controls-button:hover]:bg-[#242a32]" />
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="var(--roadmap-grid)"
            />
          </ReactFlow>
        </section>

        <ProgressTrackerPanel
          copy={copy}
          locale={locale}
          progress={progressData}
          selectedKappaItems={selectedKappaItems}
          selectedRebirthItems={selectedRebirthItems}
          onReset={(type) => {
            if (type === "Kappa") {
              setSelectedKappaItems([]);
              return;
            }

            setSelectedRebirthItems([]);
          }}
          onSave={handleSaveProgressItems}
          onToggleItem={(type, itemId) => {
            const update = (current: string[]) =>
              current.includes(itemId)
                ? current.filter((id) => id !== itemId)
                : [...current, itemId];

            if (type === "Kappa") {
              setSelectedKappaItems(update);
              return;
            }

            setSelectedRebirthItems(update);
          }}
        />

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

type ProgressTab = "Kappa" | "Rebirth";

function ProgressTrackerPanel({
  copy,
  locale,
  progress,
  selectedKappaItems,
  selectedRebirthItems,
  onReset,
  onSave,
  onToggleItem,
}: {
  copy: (typeof roadmapCopy)[Locale];
  locale: Locale;
  progress: ProgressItemResponse | null;
  selectedKappaItems: string[];
  selectedRebirthItems: string[];
  onReset: (type: ProgressTab) => void;
  onSave: () => void;
  onToggleItem: (type: ProgressTab, itemId: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<ProgressTab>("Kappa");
  const currentItems =
    activeTab === "Kappa"
      ? progress?.allKappaItemList ?? []
      : progress?.allRebirthList ?? [];
  const currentSelected =
    activeTab === "Kappa" ? selectedKappaItems : selectedRebirthItems;
  const currentTitle =
    activeTab === "Kappa" ? copy.itemProgressKappa : copy.itemProgressRebirth;
  const currentIcon =
    activeTab === "Kappa"
      ? "https://assets.tarkov.dev/5c093ca986f7740a1867ab12-8x.webp"
      : "https://assets.tarkov.dev/prestige-1-image.webp";
  const currentCompleteRate =
    currentItems.length > 0 ? (currentSelected.length / currentItems.length) * 100 : 0;

  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
          className="flex min-w-0 flex-1 items-center gap-4 text-left"
        >
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-2 dark:border-[#2a3038] dark:bg-[#20242b]">
            <Image
              src={currentIcon}
              alt={currentTitle}
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
              {copy.itemProgressTitle}
            </span>
            <span className="mt-1 block truncate text-xl font-black">
              {currentTitle}
            </span>
          </span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-gray-50 px-3 py-2 text-sm font-black text-gray-700 dark:bg-[#20242b] dark:text-gray-200">
            {currentSelected.length}/{currentItems.length}
          </span>
          <ActionButton
            icon={<RotateCcw className="h-4 w-4" />}
            label={copy.reset}
            onClick={() => onReset(activeTab)}
          />
          <ActionButton
            icon={<Save className="h-4 w-4" />}
            label={copy.save}
            onClick={onSave}
          />
          <button
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
            aria-label={isExpanded ? "Collapse item checklist" : "Expand item checklist"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-[#2a3038] dark:bg-[#20242b] dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-300"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 px-5 py-4 dark:border-[#2a3038]">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-bold text-gray-600 dark:text-gray-300">
            {copy.complete}
          </span>
          <span className="font-black text-orange-500">
            {Math.round(currentCompleteRate)}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-[#20242b]">
          <div
            className="h-full rounded-full bg-orange-500 transition-all duration-500"
            style={{ width: `${currentCompleteRate}%` }}
          />
        </div>
      </div>

      {isExpanded ? (
        <div className="border-t border-gray-200 dark:border-[#2a3038]">
          <div className="flex flex-wrap gap-2 px-5 pt-4">
            <ProgressTabButton
              active={activeTab === "Kappa"}
              image="https://assets.tarkov.dev/5c093ca986f7740a1867ab12-8x.webp"
              label={copy.itemProgressKappa}
              onClick={() => setActiveTab("Kappa")}
            />
            <ProgressTabButton
              active={activeTab === "Rebirth"}
              image="https://assets.tarkov.dev/prestige-1-image.webp"
              label={copy.itemProgressRebirth}
              onClick={() => setActiveTab("Rebirth")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8">
            {currentItems.map((item) => (
              <ProgressItemCard
                key={item.id}
                item={item}
                locale={locale}
                selected={currentSelected.includes(item.id)}
                onToggle={() => onToggleItem(activeTab, item.id)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ProgressTabButton({
  active,
  image,
  label,
  onClick,
}: {
  active: boolean;
  image: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-bold transition",
        active
          ? "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-500/40 dark:bg-orange-500/10 dark:text-orange-300"
          : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-[#2a3038] dark:bg-[#20242b] dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-300",
      )}
    >
      <Image src={image} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
      <span>{label}</span>
    </button>
  );
}

function ProgressItemCard({
  item,
  locale,
  selected,
  onToggle,
}: {
  item: ProgressTrackedItem;
  locale: Locale;
  selected: boolean;
  onToggle: () => void;
}) {
  const itemName = getLocalizedName(item.item, locale);

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "group relative flex min-h-40 flex-col overflow-hidden rounded-lg border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md",
        selected
          ? "border-emerald-400 bg-emerald-50 dark:border-emerald-500/60 dark:bg-emerald-500/10"
          : "border-gray-200 bg-gray-50 hover:border-orange-300 dark:border-[#2a3038] dark:bg-[#20242b] dark:hover:border-orange-500",
      )}
    >
      <span className="relative flex aspect-square w-full items-center justify-center rounded-md bg-white p-2 dark:bg-[#181c21]">
        <Image
          src={item.item.image}
          alt={itemName}
          width={128}
          height={128}
          className={cn(
            "h-full w-full object-contain transition duration-200 group-hover:scale-105",
            selected ? "brightness-75" : "",
          )}
        />
        {selected ? (
          <span className="absolute inset-0 flex items-center justify-center rounded-md bg-black/15">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
              <Check className="h-6 w-6" />
            </span>
          </span>
        ) : null}
      </span>
      <span className="mt-3 line-clamp-2 text-center text-xs font-bold text-gray-800 dark:text-gray-100">
        {itemName}
      </span>
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
  const progress = onlyKappa ? stats.kappaCompleteRate : stats.overallProgressRate;

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-orange-500" />
        <h2 className="text-sm font-black">{copy.dashboard}</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard color="bg-blue-500" label={copy.allQuest} rate={100} value={stats.allCount} />
        <StatsCard
          color="bg-orange-500"
          label={copy.kappaQuest}
          rate={stats.kappaQuestRate}
          value={stats.kappaCount}
        />
        <StatsCard
          color="bg-emerald-500"
          label={copy.completedKappa}
          rate={stats.kappaCompleteRate}
          value={stats.kappaCompleteCount}
        />
        {!onlyKappa ? (
          <StatsCard
            color="bg-purple-500"
            label={copy.completedQuest}
            rate={stats.completeRate}
            value={stats.completeCount}
          />
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
  rate,
  value,
}: {
  color: string;
  label: string;
  rate: number;
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
        <div className={cn("h-full rounded-full transition-all duration-500", color)} style={{ width: `${rate}%` }} />
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
          <div className="relative mt-2 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
            <span>Lv.{props.data.minPlayerLevel}</span>
            <ExternalLink className="absolute left-1/2 h-3.5 w-3.5 translate-x-8 opacity-0 transition group-hover:opacity-100" />
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

  function openTraderQuestList() {
    window.open(`/quest/${props.data.normalizedName}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openTraderQuestList}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openTraderQuestList();
        }
      }}
      className="group relative min-h-56 min-w-52 cursor-pointer rounded-2xl text-left transition hover:scale-105 hover:shadow-2xl"
    >
      <div className={cn("h-full rounded-2xl bg-linear-to-br p-1 shadow-lg", getNodeColor(props.data.traderId))}>
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
