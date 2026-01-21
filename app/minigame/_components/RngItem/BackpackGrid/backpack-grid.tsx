"use client";

import {
  BACKPACK_WIDTH,
  BACKPACK_HEIGHT,
  CELL_SIZE,
} from "@/lib/consts/libraryConsts";
import { cn } from "@/lib/utils";
import type { BackpackGridTypes, PlacedItem } from "../../minigame-types";
import { checkCanPlace } from "@/lib/func/rngItemFunction";

export default function BackpackGrid({
  dragState,
  setDragState,
  placedItems,
  setPlacedItems,
}: BackpackGridTypes) {
  /** 셀 hover */
  const onHoverCell = (x: number, y: number) => {
    if (!dragState) return;

    const canPlace = checkCanPlace(
      dragState.item,
      x,
      y,
      dragState.rotated,
      placedItems,
    );

    setDragState({
      ...dragState,
      hoverX: x,
      hoverY: y,
      canPlace,
    });
  };

  /** 드롭 */
  const onDrop = () => {
    if (!dragState || !dragState.canPlace) return;

    setPlacedItems((prev) => [
      ...prev,
      {
        ...dragState.item,
        x: dragState.hoverX,
        y: dragState.hoverY,
        rotated: dragState.rotated,
      },
    ]);

    setDragState(null);
  };

  /** 배낭 아이템 이동 시작 (6번) */
  const startMove = (item: PlacedItem) => {
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

  /** 배낭 아이템 제거 (5번) */
  const removeItem = (id: string) => {
    setPlacedItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div
      className="relative"
      onMouseUp={onDrop}
      style={{
        width: BACKPACK_WIDTH * CELL_SIZE,
        height: BACKPACK_HEIGHT * CELL_SIZE,
      }}
    >
      {/* Grid */}
      <div
        className="grid gap-0.5 p-2 bg-secondary/50 rounded-lg border"
        style={{
          gridTemplateColumns: `repeat(${BACKPACK_WIDTH}, ${CELL_SIZE}px)`,
        }}
      >
        {Array.from({ length: BACKPACK_HEIGHT }).map((_, y) =>
          Array.from({ length: BACKPACK_WIDTH }).map((_, x) => (
            <div
              key={`${x},${y}`}
              onMouseEnter={() => onHoverCell(x, y)}
              className={cn(
                "h-16 w-16 border rounded-sm relative",
                "bg-gray-100 dark:bg-gray-700/50",
                dragState &&
                  dragState.hoverX === x &&
                  dragState.hoverY === y &&
                  (dragState.canPlace ? "bg-green-300/50" : "bg-red-300/50"),
              )}
            />
          )),
        )}
      </div>

      {/* Placed Items */}
      {placedItems.map((item) => {
        const w = item.rotated ? item.height : item.width;
        const h = item.rotated ? item.width : item.height;

        return (
          <div
            key={item.id}
            onMouseDown={() => startMove(item)}
            onContextMenu={(e) => {
              e.preventDefault();
              removeItem(item.id);
            }}
            className="absolute bg-blue-500/80 rounded cursor-pointer"
            style={{
              left: item.x * CELL_SIZE,
              top: item.y * CELL_SIZE,
              width: w * CELL_SIZE,
              height: h * CELL_SIZE,
            }}
          />
        );
      })}
    </div>
  );
}
