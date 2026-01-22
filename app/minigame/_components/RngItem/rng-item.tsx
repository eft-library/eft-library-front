"use client";

import Image from "next/image";
import { useInvalidateRngItemsAt20, useRngItemList } from "./get-rng-item";
import RngItemNav from "./RngItemNav/rng-item-nav";
import { useEffect, useRef, useState } from "react";
import {
  BACKPACK_HEIGHT,
  BACKPACK_WIDTH,
  CELL_SIZE,
  DEFAULT_PLAY_TIME,
} from "@/lib/consts/libraryConsts";
import type { PlacedItem, DragState, RngItemTypes } from "../minigame-types";
import { checkCanPlace, getRandomItems } from "@/lib/func/rngItemFunction";
import { cn } from "@/lib/utils";

export default function RngItem() {
  const [score, setScore] = useState<number>(0);
  const [playItemList, setPlayItemList] = useState<RngItemTypes[]>([]);
  const [playTime, setPlayTime] = useState<number>(DEFAULT_PLAY_TIME);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const backpackRef = useRef<HTMLDivElement>(null);

  useInvalidateRngItemsAt20();
  const { data: res, isLoading } = useRngItemList();

  // 게임 시간 감소
  useEffect(() => {
    if (!isStart) return;
    const interval = setInterval(() => {
      setPlayTime((t) => (t <= 1 ? 0 : t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isStart]);

  // 아이템 풀 초기화
  useEffect(() => {
    if (!res?.data) return;
    setPlayItemList(getRandomItems(res.data, 50));
  }, [res]);

  // 드래그 이벤트
  useEffect(() => {
    if (!dragState) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = backpackRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
      const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);

      setDragState((prev) =>
        prev
          ? {
              ...prev,
              hoverX: x,
              hoverY: y,
              canPlace: checkCanPlace(
                prev.item,
                x,
                y,
                prev.rotated,
                placedItems,
              ),
            }
          : null,
      );
    };

    const handleMouseUp = () => {
      if (!dragState) return;

      const x = dragState.hoverX;
      const y = dragState.hoverY;

      const inBackpackArea =
        x >= 0 && y >= 0 && x < BACKPACK_WIDTH && y < BACKPACK_HEIGHT;

      if (dragState.from === "pool") {
        if (dragState.canPlace && inBackpackArea) {
          // Pool → Backpack
          setPlacedItems((prev) => [
            ...prev,
            { ...dragState.item, x, y, rotated: dragState.rotated },
          ]);
          setPlayItemList((prev) =>
            prev.filter((i) => i.id !== dragState.item.id),
          );
          setScore((prev) => prev + dragState.item.flea_market_price);
        }
      } else if (dragState.from === "backpack") {
        if (dragState.canPlace && inBackpackArea) {
          // Backpack → Backpack (위치 이동)
          setPlacedItems((prev) => [
            ...prev,
            { ...dragState.item, x, y, rotated: dragState.rotated },
          ]);
        } else {
          // Backpack → Pool (박스 영역 밖으로 이동)
          setPlayItemList((prev) => [...prev, dragState.item]);
          setScore((prev) => prev - dragState.item.flea_market_price);
        }
      }

      setDragState(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragState, placedItems]);

  // R 키 회전
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!dragState) return;

      // e.code는 키보드 물리 키를 나타내므로 한글 모드에서도 R키를 감지 가능
      if (e.code === "KeyR") {
        setDragState((prev) =>
          prev
            ? {
                ...prev,
                rotated: !prev.rotated,
                canPlace: checkCanPlace(
                  prev.item,
                  prev.hoverX,
                  prev.hoverY,
                  !prev.rotated,
                  placedItems,
                ),
              }
            : prev,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dragState, placedItems]);

  if (isLoading || !res) return null;

  const onClickReset = () => {
    setIsStart(false);
    setPlayTime(DEFAULT_PLAY_TIME);
    setScore(0);
    setPlacedItems([]);
    setPlayItemList(getRandomItems(res.data, 50));
    setDragState(null);
  };

  /** Pool에서 드래그 시작 */
  const startDragFromPool = (item: RngItemTypes, e: React.MouseEvent) => {
    e.preventDefault();
    setDragState({
      item,
      from: "pool",
      rotated: false,
      hoverX: -1,
      hoverY: -1,
      canPlace: false,
    });
  };

  /** Backpack에서 아이템 이동 시작 */
  const startMoveItem = (item: PlacedItem) => {
    setPlacedItems((prev) => prev.filter((i) => i.id !== item.id));
    setDragState({
      item,
      from: "backpack",
      rotated: item.rotated,
      hoverX: item.x,
      hoverY: item.y,
      canPlace: true,
    });
  };

  /** Backpack에서 우클릭 제거 → Pool 복귀 + 점수 차감 */
  const removeItem = (itemId: string) => {
    const removedItem = placedItems.find((i) => i.id === itemId);
    if (!removedItem) return;

    // Pool 복귀
    setPlayItemList((prev) => [...prev, removedItem]);

    // 점수 차감
    setScore((s) => s - removedItem.flea_market_price);

    // Backpack에서 제거
    setPlacedItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  /** Backpack 렌더링 */
  const renderBackpack = () => (
    <div
      ref={backpackRef}
      className="relative border rounded-lg"
      style={{
        width: BACKPACK_WIDTH * CELL_SIZE,
        height: BACKPACK_HEIGHT * CELL_SIZE,
      }}
    >
      {/* Grid */}
      <div
        className="grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${BACKPACK_WIDTH}, ${CELL_SIZE}px)`,
        }}
      >
        {Array.from({ length: BACKPACK_HEIGHT }).map((_, y) =>
          Array.from({ length: BACKPACK_WIDTH }).map((_, x) => {
            const isHover =
              dragState &&
              dragState.hoverX >= 0 &&
              dragState.hoverY >= 0 &&
              x >= dragState.hoverX &&
              x <
                dragState.hoverX +
                  (dragState.rotated
                    ? dragState.item.height
                    : dragState.item.width) &&
              y >= dragState.hoverY &&
              y <
                dragState.hoverY +
                  (dragState.rotated
                    ? dragState.item.width
                    : dragState.item.height);
            return (
              <div
                key={`${x},${y}`}
                className={cn(
                  "border box-border",
                  isHover
                    ? dragState.canPlace
                      ? "bg-green-300/50"
                      : "bg-red-300/50"
                    : "",
                )}
                style={{ width: CELL_SIZE, height: CELL_SIZE }}
              />
            );
          }),
        )}
      </div>

      {/* Placed Items */}
      {placedItems.map((item) => {
        const w = item.rotated ? item.height : item.width;
        const h = item.rotated ? item.width : item.height;

        return (
          <div
            key={item.id}
            onMouseDown={() => startMoveItem(item)}
            onContextMenu={(e) => {
              e.preventDefault();
              removeItem(item.id);
            }}
            className="absolute cursor-pointer rounded border border-gray-400 overflow-hidden"
            style={{
              left: item.x * CELL_SIZE,
              top: item.y * CELL_SIZE,
              width: w * CELL_SIZE,
              height: h * CELL_SIZE,
              backgroundColor: "rgba(59, 130, 246, 0.3)", // 빈 공간 색상
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={item.image}
                alt={item.name.ko}
                fill
                sizes={`${w * CELL_SIZE}px`}
                style={{
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
              />
              {/* 오른쪽 아래 가격 표시 */}
              <div className="absolute bottom-1 right-1 text-xs font-bold text-white bg-black/70 rounded px-1">
                {item.flea_market_price.toLocaleString()}
              </div>
            </div>
          </div>
        );
      })}

      {/* 드래그 미리보기 */}
      {dragState?.item && dragState.hoverX >= 0 && dragState.hoverY >= 0 && (
        <div
          className={cn(
            "absolute pointer-events-none rounded",
            dragState.canPlace ? "bg-green-300/50" : "bg-red-300/50",
          )}
          style={{
            left: dragState.hoverX * CELL_SIZE,
            top: dragState.hoverY * CELL_SIZE,
            width:
              (dragState.rotated
                ? dragState.item.height
                : dragState.item.width) * CELL_SIZE,
            height:
              (dragState.rotated
                ? dragState.item.width
                : dragState.item.height) * CELL_SIZE,
            zIndex: 1000,
          }}
        />
      )}
    </div>
  );

  /** Pool 렌더링 */
  const renderPool = () => (
    <div
      className="overflow-y-auto border rounded-lg p-2 flex flex-wrap gap-2"
      style={{
        maxHeight: BACKPACK_HEIGHT * CELL_SIZE,
        minWidth: BACKPACK_WIDTH * CELL_SIZE * 1.5,
      }}
    >
      {playItemList.map((item) => (
        <div
          key={item.id}
          onMouseDown={(e) => startDragFromPool(item, e)}
          onDragStart={(e) => e.preventDefault()}
          className="relative cursor-pointer select-none rounded border bg-white dark:bg-gray-800 hover:scale-105 transition"
          style={{
            width: item.width * CELL_SIZE,
            height: item.height * CELL_SIZE,
          }}
        >
          <Image
            src={item.image}
            alt={item.name.ko}
            width={item.width * CELL_SIZE}
            height={item.height * CELL_SIZE}
            draggable={false}
            style={{ objectFit: "contain", pointerEvents: "none" }}
          />
          <div className="absolute bottom-1 right-1 text-xs font-bold text-white bg-black/70 rounded px-1">
            {item.flea_market_price.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col">
      <RngItemNav
        playTime={playTime}
        score={score}
        onClickReset={onClickReset}
      />
      <div className="flex gap-4 p-4 items-start">
        {renderBackpack()}
        {renderPool()}
      </div>
    </div>
  );
}
