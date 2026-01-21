"use client";

import type { ItemPoolTypes, RngItemTypes } from "../../minigame-types";
import { CELL_SIZE, POOL_WIDTH } from "@/lib/consts/libraryConsts";

export default function ItemPool({ itemList, setDragState }: ItemPoolTypes) {
  const startDragFromPool = (item: RngItemTypes) => {
    setDragState({
      item,
      from: "pool",
      rotated: false,
      hoverX: -1,
      hoverY: -1,
      canPlace: false,
    });
  };

  return (
    <div className="flex-1 min-w-[900px] min-h-0 overflow-y-auto overflow-x-hidden">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${CELL_SIZE * 2}px, 1fr))`,
        }}
      >
        {itemList.map((item) => (
          <div
            key={item.id}
            onMouseDown={() => startDragFromPool(item)}
            className="relative rounded border bg-white dark:bg-gray-800
                   flex items-center justify-center cursor-grab
                   hover:ring-2 hover:ring-blue-400 transition"
            style={{
              width: CELL_SIZE * 2,
              height: CELL_SIZE * 2,
              justifySelf: "start",
            }}
          >
            <img
              src={item.image}
              draggable={false}
              className="max-w-full max-h-full object-contain pointer-events-none"
            />

            <div
              className="absolute bottom-0 right-0 text-xs
                        bg-black/60 text-white px-1 rounded-tl font-bold"
            >
              {item.width}×{item.height}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
