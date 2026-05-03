"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Check,
  Coins,
  MousePointer2,
  RotateCcw,
  Send,
  Timer,
  TrendingUp,
  Trophy,
  X,
} from "lucide-react";

import {
  getMinigameAllRank,
  getMinigameMyRank,
  saveMinigameScore,
} from "@/features/minigame/api";
import type { Locale } from "@/i18n/config";
import { formatIsoDateTime } from "@/lib/utils/date-time";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { RngItemEntry, RngRankEntry } from "@/types/api/price";

const BACKPACK_WIDTH = 8;
const BACKPACK_HEIGHT = 10;
const CELL_SIZE = 56;
const PLAY_TIME = 30;
const ITEM_POOL_SIZE = 100;

interface PlacedItem extends RngItemEntry {
  x: number;
  y: number;
  rotated: boolean;
}

interface DragState {
  item: RngItemEntry | PlacedItem;
  from: "pool" | "backpack";
  rotated: boolean;
  hoverX: number;
  hoverY: number;
  canPlace: boolean;
}

const copyByLocale = {
  ko: {
    title: "RNG 아이템",
    description: "제한 시간 안에 랜덤 아이템을 가방에 배치해서 가장 높은 루블 가치를 만들어보세요.",
    start: "시작",
    reset: "초기화",
    score: "점수",
    time: "남은 시간",
    pool: "아이템 풀",
    backpack: "가방",
    gameOver: "게임 종료",
    retry: "다시 하기",
    tabComingSoon: "준비 중",
    readyTitle: "준비되셨나요?",
    readyDescription: "버튼을 눌러 게임을 시작하세요.",
    help: "아이템을 드래그해서 가방에 넣고, R 키로 회전합니다. 우클릭하면 배치한 아이템을 제거합니다.",
    ranking: "랭킹",
    noRanking: "아직 랭킹 데이터가 없습니다.",
    finalScore: "최종 점수",
    nicknameHelp: "랭킹에 등록할 닉네임을 입력하세요.",
    nicknamePlaceholder: "닉네임",
    register: "등록",
    registering: "등록 중",
    registered: "랭킹 등록이 완료되었습니다.",
    registerFailed: "랭킹 등록에 실패했습니다.",
    viewRanking: "랭킹 확인",
    close: "닫기",
    myRank: "내 랭킹",
    myScore: "내 점수",
    rankTitle: "RNG 아이템 TOP 10",
    me: "ME",
  },
  en: {
    title: "RNG Item",
    description: "Place random items into the backpack before time runs out and chase the highest rouble value.",
    start: "Start",
    reset: "Reset",
    score: "Score",
    time: "Time",
    pool: "Item pool",
    backpack: "Backpack",
    gameOver: "Game over",
    retry: "Retry",
    tabComingSoon: "Coming soon",
    readyTitle: "Ready?",
    readyDescription: "Press the button to start the game.",
    help: "Drag items into the backpack, press R to rotate, and right-click placed items to remove them.",
    ranking: "Ranking",
    noRanking: "No ranking data yet.",
    finalScore: "Final score",
    nicknameHelp: "Enter a nickname to register your ranking.",
    nicknamePlaceholder: "Nickname",
    register: "Register",
    registering: "Registering",
    registered: "Ranking registered.",
    registerFailed: "Failed to register ranking.",
    viewRanking: "View ranking",
    close: "Close",
    myRank: "My rank",
    myScore: "My score",
    rankTitle: "RNG Item TOP 10",
    me: "ME",
  },
  ja: {
    title: "RNGアイテム",
    description: "制限時間内にランダムアイテムをバッグへ配置し、最高ルーブル価値を狙います。",
    start: "開始",
    reset: "リセット",
    score: "スコア",
    time: "残り時間",
    pool: "アイテムプール",
    backpack: "バッグ",
    gameOver: "ゲーム終了",
    retry: "もう一度",
    tabComingSoon: "準備中",
    readyTitle: "準備はいいですか？",
    readyDescription: "ボタンを押してゲームを開始してください。",
    help: "アイテムをドラッグしてバッグに入れ、Rキーで回転します。右クリックで配置済みアイテムを外します。",
    ranking: "ランキング",
    noRanking: "ランキングデータはまだありません。",
    finalScore: "最終スコア",
    nicknameHelp: "ランキングに登録するニックネームを入力してください。",
    nicknamePlaceholder: "ニックネーム",
    register: "登録",
    registering: "登録中",
    registered: "ランキング登録が完了しました。",
    registerFailed: "ランキング登録に失敗しました。",
    viewRanking: "ランキング確認",
    close: "閉じる",
    myRank: "自分の順位",
    myScore: "自分のスコア",
    rankTitle: "RNGアイテム TOP 10",
    me: "ME",
  },
} as const;

type MinigameCopy = (typeof copyByLocale)[Locale];

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

function formatPrice(value: number | null, locale: Locale) {
  if (value === null) {
    return "-";
  }

  const formattedValue = new Intl.NumberFormat(locale === "ko" ? "ko-KR" : locale === "ja" ? "ja-JP" : "en-US").format(
    value,
  );

  return `${formattedValue}\u00a0₽`;
}

function getRandomItems(items: RngItemEntry[], count: number) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled.slice(0, count);
}

function getItemWidth(item: RngItemEntry | PlacedItem, rotated: boolean) {
  return rotated ? item.height : item.width;
}

function getItemHeight(item: RngItemEntry | PlacedItem, rotated: boolean) {
  return rotated ? item.width : item.height;
}

function canPlaceItem(
  item: RngItemEntry | PlacedItem,
  x: number,
  y: number,
  rotated: boolean,
  placedItems: PlacedItem[],
) {
  const width = getItemWidth(item, rotated);
  const height = getItemHeight(item, rotated);

  if (x < 0 || y < 0 || x + width > BACKPACK_WIDTH || y + height > BACKPACK_HEIGHT) {
    return false;
  }

  return !placedItems.some((placed) => {
    const placedWidth = getItemWidth(placed, placed.rotated);
    const placedHeight = getItemHeight(placed, placed.rotated);

    return !(
      x + width <= placed.x ||
      x >= placed.x + placedWidth ||
      y + height <= placed.y ||
      y >= placed.y + placedHeight
    );
  });
}

function getPriceValue(item: RngItemEntry | PlacedItem) {
  return item.flea_market_price ?? 0;
}

function formatRank(rank: number) {
  return rank > 0 ? `#${rank}` : "-";
}

export function MinigamePage({
  items,
  rankEntries,
  locale,
}: {
  items: RngItemEntry[];
  rankEntries: RngRankEntry[];
  locale: Locale;
}) {
  const copy = copyByLocale[locale];
  const boardRef = useRef<HTMLDivElement>(null);
  const playableItems = useMemo(
    () => items.filter((item) => item.width <= BACKPACK_WIDTH && item.height <= BACKPACK_HEIGHT),
    [items],
  );
  const [poolItems, setPoolItems] = useState<RngItemEntry[]>([]);
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [playTime, setPlayTime] = useState(PLAY_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [rankOpen, setRankOpen] = useState(false);
  const [rankDialogEntries, setRankDialogEntries] = useState<RngRankEntry[]>(rankEntries);
  const [isRankLoading, setIsRankLoading] = useState(false);

  const score = placedItems.reduce((sum, item) => sum + getPriceValue(item), 0);
  const progressPercent = (playTime / PLAY_TIME) * 100;

  useEffect(() => {
    setPoolItems(getRandomItems(playableItems, ITEM_POOL_SIZE));
  }, [playableItems]);

  useEffect(() => {
    if (!isStarted || playTime === 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setPlayTime((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isStarted, playTime]);

  useEffect(() => {
    if (!dragState) {
      return;
    }

    function handlePointerMove(event: MouseEvent) {
      const rect = boardRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }

      const x = Math.floor((event.clientX - rect.left) / CELL_SIZE);
      const y = Math.floor((event.clientY - rect.top) / CELL_SIZE);

      setDragState((current) =>
        current
          ? {
              ...current,
              hoverX: x,
              hoverY: y,
              canPlace: canPlaceItem(current.item, x, y, current.rotated, placedItems),
            }
          : null,
      );
    }

    function handlePointerUp() {
      setDragState((current) => {
        if (!current) {
          return null;
        }

        const inBoard =
          current.hoverX >= 0 &&
          current.hoverY >= 0 &&
          current.hoverX < BACKPACK_WIDTH &&
          current.hoverY < BACKPACK_HEIGHT;

        if (current.canPlace && inBoard) {
          const placedItem = {
            ...current.item,
            x: current.hoverX,
            y: current.hoverY,
            rotated: current.rotated,
          };

          setPlacedItems((existing) => [...existing, placedItem]);

          if (current.from === "pool") {
            setPoolItems((existing) => existing.filter((item) => item.id !== current.item.id));
          }
        } else if (current.from === "backpack") {
          setPoolItems((existing) => [...existing, current.item]);
        }

        return null;
      });
    }

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, [dragState, placedItems]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code !== "KeyR") {
        return;
      }

      setDragState((current) => {
        if (!current) {
          return null;
        }

        const nextRotated = !current.rotated;

        return {
          ...current,
          rotated: nextRotated,
          canPlace: canPlaceItem(
            current.item,
            current.hoverX,
            current.hoverY,
            nextRotated,
            placedItems,
          ),
        };
      });
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [placedItems]);

  function resetGame() {
    setIsStarted(false);
    setPlayTime(PLAY_TIME);
    setPlacedItems([]);
    setDragState(null);
    setPoolItems(getRandomItems(playableItems, ITEM_POOL_SIZE));
  }

  function startGame() {
    setIsStarted(true);
    setPlayTime(PLAY_TIME);
    setPlacedItems([]);
    setDragState(null);
  }

  function restartGame() {
    setIsStarted(true);
    setPlayTime(PLAY_TIME);
    setPlacedItems([]);
    setDragState(null);
    setPoolItems(getRandomItems(playableItems, ITEM_POOL_SIZE));
  }

  async function openRanking() {
    setRankOpen(true);
    setIsRankLoading(true);
    try {
      setRankDialogEntries(await getMinigameAllRank());
    } finally {
      setIsRankLoading(false);
    }
  }

  function startDragFromPool(item: RngItemEntry, event: React.MouseEvent) {
    if (!isStarted || playTime === 0) {
      return;
    }

    event.preventDefault();
    setDragState({
      item,
      from: "pool",
      rotated: false,
      hoverX: -1,
      hoverY: -1,
      canPlace: false,
    });
  }

  function startMovePlacedItem(item: PlacedItem) {
    if (!isStarted || playTime === 0) {
      return;
    }

    setPlacedItems((existing) => existing.filter((placed) => placed.id !== item.id));
    setDragState({
      item,
      from: "backpack",
      rotated: item.rotated,
      hoverX: item.x,
      hoverY: item.y,
      canPlace: true,
    });
  }

  function removePlacedItem(item: PlacedItem) {
    if (!isStarted || playTime === 0) {
      return;
    }

    setPlacedItems((existing) => existing.filter((placed) => placed.id !== item.id));
    setPoolItems((existing) => [...existing, item]);
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#111418] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
            Minigame
          </p>
          <h1 className="mt-2 text-3xl font-black">{copy.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-400">
            {copy.description}
          </p>
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900 dark:border-orange-400/20 dark:bg-orange-400/10 dark:text-orange-100">
            <MousePointer2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{copy.help}</span>
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21] sm:flex-row sm:items-center">
          <div
            role="tablist"
            aria-label="Minigame"
            className="inline-flex w-full rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-[#2a3038] dark:bg-[#20242b] sm:w-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected="true"
              className="h-10 flex-1 rounded-md bg-orange-500 px-5 text-sm font-black text-white shadow-sm sm:flex-none"
            >
              {copy.title}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="false"
              disabled
              className="h-10 flex-1 rounded-md px-5 text-sm font-bold text-gray-400 disabled:cursor-not-allowed dark:text-gray-500 sm:flex-none"
            >
              {copy.tabComingSoon}
            </button>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex min-w-56 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-orange-500 dark:bg-orange-500/15 dark:text-orange-300">
                <Coins className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
                  {copy.score}
                </div>
                <div className="font-mono text-xl font-black">
                  {formatPrice(score, locale)}
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Timer className="h-5 w-5 shrink-0 text-gray-400" />
              <div className="h-3 min-w-0 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-[#20242b]">
                <div
                  className={`h-full rounded-full transition-all ${
                    playTime <= 5 ? "bg-red-500" : "bg-orange-500"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="w-14 rounded-lg bg-gray-100 px-2 py-1 text-center font-mono text-sm font-black dark:bg-[#20242b]">
                {playTime}s
              </div>
            </div>

            <button
              type="button"
              onClick={resetGame}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-bold transition hover:border-orange-300 hover:text-orange-500 dark:border-[#2a3038] dark:hover:border-orange-500 dark:hover:text-orange-300"
            >
              <RotateCcw className="h-4 w-4" />
              {copy.reset}
            </button>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[auto_minmax(0,1fr)]">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
            <h2 className="mb-3 text-sm font-black">{copy.backpack}</h2>
            <div className="overflow-x-auto pb-2">
              <div
                ref={boardRef}
                className="relative overflow-hidden rounded-lg border border-gray-300 bg-gray-100 dark:border-[#2a3038] dark:bg-[#20242b]"
                style={{
                  width: BACKPACK_WIDTH * CELL_SIZE,
                  height: BACKPACK_HEIGHT * CELL_SIZE,
                }}
              >
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: `repeat(${BACKPACK_WIDTH}, ${CELL_SIZE}px)`,
                  }}
                >
                  {Array.from({ length: BACKPACK_HEIGHT }).map((_, y) =>
                    Array.from({ length: BACKPACK_WIDTH }).map((__, x) => {
                      const isHover =
                        dragState &&
                        x >= dragState.hoverX &&
                        y >= dragState.hoverY &&
                        x < dragState.hoverX + getItemWidth(dragState.item, dragState.rotated) &&
                        y < dragState.hoverY + getItemHeight(dragState.item, dragState.rotated);

                      return (
                        <div
                          key={`${x}-${y}`}
                          className={`border border-gray-200 dark:border-[#313946] ${
                            isHover
                              ? dragState.canPlace
                                ? "bg-emerald-400/35"
                                : "bg-red-400/35"
                              : ""
                          }`}
                          style={{ width: CELL_SIZE, height: CELL_SIZE }}
                        />
                      );
                    }),
                  )}
                </div>

                {!isStarted ? (
                  <GameStartOverlay
                    copy={copy}
                    onStart={startGame}
                    onOpenRanking={openRanking}
                  />
                ) : null}
                {isStarted && playTime === 0 ? (
                  <GameEndOverlay
                    copy={copy}
                    score={score}
                    initialEntries={rankEntries}
                    locale={locale}
                    onRestart={restartGame}
                  />
                ) : null}

                {placedItems.map((item) => {
                  const width = getItemWidth(item, item.rotated);
                  const height = getItemHeight(item, item.rotated);
                  const itemName = getLocalizedName(item, locale);

                  return (
                    <div
                      key={item.id}
                      onMouseDown={() => startMovePlacedItem(item)}
                      onContextMenu={(event) => {
                        event.preventDefault();
                        removePlacedItem(item);
                      }}
                      className="absolute cursor-grab overflow-hidden rounded-md border border-orange-300 bg-orange-50 shadow-sm active:cursor-grabbing dark:border-orange-400/50 dark:bg-orange-400/10"
                      style={{
                        left: item.x * CELL_SIZE,
                        top: item.y * CELL_SIZE,
                        width: width * CELL_SIZE,
                        height: height * CELL_SIZE,
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={itemName}
                        fill
                        sizes={`${width * CELL_SIZE}px`}
                        className="object-contain p-1"
                      />
                      <div className="absolute bottom-1 right-1 whitespace-nowrap rounded bg-black/80 px-1.5 text-[9px] font-medium leading-4 text-white shadow-sm">
                        {formatPrice(getPriceValue(item), locale)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-sm font-black">{copy.pool}</h2>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {poolItems.length}
              </span>
            </div>
            <div
              className="grid gap-1.5 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-2 dark:border-[#2a3038] dark:bg-[#20242b]"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(${CELL_SIZE}px, 1fr))`,
                gridAutoRows: `${CELL_SIZE}px`,
                gridAutoFlow: "dense",
                maxHeight: BACKPACK_HEIGHT * CELL_SIZE,
              }}
            >
              {poolItems.map((item) => {
                const itemName = getLocalizedName(item, locale);

                return (
                  <div
                    key={item.id}
                    onMouseDown={(event) => startDragFromPool(item, event)}
                    className="relative min-h-0 cursor-grab overflow-hidden rounded-md border border-gray-200 bg-white transition hover:scale-[1.02] active:cursor-grabbing dark:border-[#2a3038] dark:bg-[#181c21]"
                    style={{
                      gridColumn: `span ${item.width}`,
                      gridRow: `span ${item.height}`,
                    }}
                    title={itemName}
                  >
                    <Image
                      src={item.image}
                      alt={itemName}
                      fill
                      sizes={`${CELL_SIZE * Math.max(item.width, 1)}px`}
                      className="pointer-events-none object-contain"
                    />
                    <span className="absolute bottom-1 right-1 whitespace-nowrap rounded bg-black/80 px-1.5 text-[9px] font-medium leading-4 text-white shadow-sm">
                      {formatPrice(item.flea_market_price, locale)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {rankOpen
          ? createPortal(
              <RankingDialog
                copy={copy}
                entries={rankDialogEntries}
                isLoading={isRankLoading}
                locale={locale}
                myRank={0}
                score={0}
                currentNickname=""
                onClose={() => setRankOpen(false)}
              />,
              document.body,
            )
          : null}
      </div>
    </main>
  );
}

function GameStartOverlay({
  copy,
  onStart,
  onOpenRanking,
}: {
  copy: MinigameCopy;
  onStart: () => void;
  onOpenRanking: () => void;
}) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-white/88 p-6 text-center backdrop-blur-sm dark:bg-[#111418]/88">
      <div>
        <h3 className="text-2xl font-black text-gray-900 dark:text-white">
          {copy.readyTitle}
        </h3>
        <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {copy.readyDescription}
        </p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="inline-flex h-11 min-w-32 items-center justify-center rounded-lg bg-orange-500 px-6 text-sm font-black text-white transition hover:bg-orange-400"
      >
        {copy.start}
      </button>
      <button
        type="button"
        onClick={onOpenRanking}
        className="inline-flex h-11 min-w-32 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 text-sm font-black transition hover:border-orange-300 hover:text-orange-500 dark:border-[#2a3038] dark:bg-[#181c21] dark:hover:border-orange-500 dark:hover:text-orange-300"
      >
        <Trophy className="h-4 w-4 text-amber-500" />
        {copy.viewRanking}
      </button>
    </div>
  );
}

function GameEndOverlay({
  copy,
  score,
  initialEntries,
  locale,
  onRestart,
}: {
  copy: MinigameCopy;
  score: number;
  initialEntries: RngRankEntry[];
  locale: Locale;
  onRestart: () => void;
}) {
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [rankOpen, setRankOpen] = useState(false);
  const [isRankLoading, setIsRankLoading] = useState(false);
  const [rankEntries, setRankEntries] = useState<RngRankEntry[]>(initialEntries);
  const [myRank, setMyRank] = useState(0);

  const currentNickname = nickname.trim() || "unknown";

  function buildRankEntries(entries: RngRankEntry[]) {
    const existing = entries.find(
      (entry) => entry.score === score && entry.nickname === currentNickname,
    );

    if (existing) {
      setMyRank(existing.rank);
      return entries;
    }

    const insertIndex = entries.findIndex((entry) => entry.score < score);
    const rank =
      entries.length === 0
        ? 1
        : insertIndex === -1
          ? entries[entries.length - 1].rank + 1
          : entries[insertIndex].rank;
    const currentEntry: RngRankEntry = {
      rank,
      nickname: currentNickname,
      score,
      create_time: new Date().toISOString(),
    };

    setMyRank(rank);

    if (insertIndex === -1) {
      return [...entries, currentEntry].slice(0, 10);
    }

    return [
      ...entries.slice(0, insertIndex),
      currentEntry,
      ...entries.slice(insertIndex).map((entry) => ({
        ...entry,
        rank: entry.rank + 1,
      })),
    ].slice(0, 10);
  }

  async function refreshRanking() {
    setIsRankLoading(true);
    try {
      const [myRankEntries, allRankEntries] = await Promise.all([
        getMinigameMyRank(score),
        getMinigameAllRank(),
      ]);
      const baseEntries = allRankEntries.length ? allRankEntries : myRankEntries;
      setRankEntries(buildRankEntries(baseEntries));
    } finally {
      setIsRankLoading(false);
    }
  }

  async function handleSubmit() {
    const trimmedNickname = nickname.trim();

    if (!trimmedNickname || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await saveMinigameScore({
        nickname: trimmedNickname,
        score,
        game_type: "RNG-ITEM",
      });
      setIsSubmitted(true);
      const allRankEntries = await getMinigameAllRank();
      setRankEntries(buildRankEntries(allRankEntries));
    } catch {
      setSubmitError(copy.registerFailed);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function openRanking() {
    setRankOpen(true);
    await refreshRanking();
  }

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/88 p-3 text-center backdrop-blur-sm dark:bg-[#111418]/88">
      <div className="w-full max-w-[320px] rounded-lg border border-gray-200 bg-white p-4 shadow-xl dark:border-[#2a3038] dark:bg-[#181c21]">
        <h3 className="text-2xl font-black text-rose-500">{copy.gameOver}</h3>
        <div className="mt-3 rounded-lg bg-gray-50 px-3 py-2 dark:bg-[#20242b]">
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
            {copy.finalScore}
          </p>
          <p className="mt-1 font-mono text-xl font-black text-orange-500">
            {formatPrice(score, locale)}
          </p>
        </div>

        <div className="mt-4 text-left">
          <label
            htmlFor="rng-rank-nickname"
            className="text-xs font-semibold text-gray-600 dark:text-gray-300"
          >
            {copy.nicknameHelp}
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="rng-rank-nickname"
              value={nickname}
              onChange={(event) => {
                setNickname(event.target.value);
                setSubmitError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmit();
                }
              }}
              placeholder={copy.nicknamePlaceholder}
              maxLength={12}
              disabled={isSubmitting || isSubmitted}
              className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-400 dark:border-[#2a3038] dark:bg-[#20242b] dark:text-white"
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!nickname.trim() || isSubmitting || isSubmitted}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-45"
              title={isSubmitting ? copy.registering : copy.register}
            >
              {isSubmitted ? (
                <Check className="h-4 w-4" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
          {isSubmitted ? (
            <p className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {copy.registered}
            </p>
          ) : null}
          {submitError ? (
            <p className="mt-2 text-xs font-semibold text-rose-500">{submitError}</p>
          ) : null}
        </div>

        <div className="mt-4 grid gap-2">
          <button
            type="button"
            onClick={openRanking}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm font-black transition hover:border-orange-300 hover:text-orange-500 dark:border-[#2a3038] dark:hover:border-orange-500 dark:hover:text-orange-300"
          >
            <Trophy className="h-4 w-4 text-amber-500" />
            {copy.viewRanking}
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-500 text-sm font-black text-white transition hover:bg-emerald-400"
          >
            <RotateCcw className="h-4 w-4" />
            {copy.retry}
          </button>
        </div>
      </div>

      {rankOpen
        ? createPortal(
            <RankingDialog
              copy={copy}
              entries={rankEntries}
              isLoading={isRankLoading}
              locale={locale}
              myRank={myRank}
              score={score}
              currentNickname={currentNickname}
              onClose={() => setRankOpen(false)}
            />,
            document.body,
          )
        : null}
    </div>
  );
}

function RankingDialog({
  copy,
  entries,
  isLoading,
  locale,
  myRank,
  score,
  currentNickname,
  onClose,
}: {
  copy: MinigameCopy;
  entries: RngRankEntry[];
  isLoading: boolean;
  locale: Locale;
  myRank: number;
  score: number;
  currentNickname: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-2xl dark:border-[#2a3038] dark:bg-[#181c21]">
        <div className="relative bg-emerald-500 px-6 py-7 text-center text-white">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 transition hover:bg-white/25"
            title={copy.close}
          >
            <X className="h-4 w-4" />
          </button>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
            <Trophy className="h-7 w-7" />
          </div>
          <h3 className="mt-3 text-2xl font-black">{copy.ranking}</h3>
          <p className="mt-1 text-sm text-emerald-50">{copy.rankTitle}</p>
        </div>

        <div className="flex items-center justify-between gap-4 border-b border-emerald-100 bg-emerald-50 px-5 py-4 dark:border-emerald-500/10 dark:bg-emerald-500/10">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white">
              <TrendingUp className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                {copy.myRank}
              </p>
              <p className="font-black text-gray-900 dark:text-white">{formatRank(myRank)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
              {copy.myScore}
            </p>
            <p className="font-mono font-black text-emerald-700 dark:text-emerald-300">
              {formatPrice(score, locale)}
            </p>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto p-4">
          {isLoading ? (
            <div className="grid gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-14 animate-pulse rounded-lg bg-gray-100 dark:bg-[#20242b]"
                />
              ))}
            </div>
          ) : entries.length ? (
            <div className="grid gap-2">
              {entries.map((entry) => {
                const isMine =
                  entry.rank === myRank &&
                  entry.score === score &&
                  entry.nickname === currentNickname;

                return (
                  <div
                    key={`${entry.rank}-${entry.nickname}-${entry.score}`}
                    className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 ${
                      isMine
                        ? "border-emerald-400 bg-emerald-50 dark:border-emerald-400/50 dark:bg-emerald-400/10"
                        : "border-gray-200 bg-gray-50 dark:border-[#2a3038] dark:bg-[#20242b]"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-black text-gray-900 dark:text-white">
                        {formatRank(entry.rank)} {entry.nickname || "unknown"}
                        {isMine ? (
                          <span className="ml-2 rounded bg-emerald-500 px-1.5 py-0.5 text-[10px] text-white">
                            {copy.me}
                          </span>
                        ) : null}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                        {formatIsoDateTime(entry.create_time, locale)}
                      </p>
                    </div>
                    <p className="shrink-0 font-mono text-sm font-black text-emerald-700 dark:text-emerald-300">
                      {formatPrice(entry.score, locale)}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              {copy.noRanking}
            </p>
          )}
        </div>

        <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-[#2a3038] dark:bg-[#111418]">
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-full rounded-lg bg-emerald-500 text-sm font-black text-white transition hover:bg-emerald-400"
          >
            {copy.close}
          </button>
        </div>
      </div>
    </div>
  );
}
