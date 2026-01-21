"use client";

import type { ItemPoolTypes, RngItemTypes } from "../../minigame-types";

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
    <div className="p-3 rounded-lg border bg-secondary/50">
      <div className="grid grid-cols-5 gap-2">
        {itemList.map((item) => (
          <div
            key={item.id}
            onMouseDown={() => startDragFromPool(item)}
            className="relative cursor-pointer select-none rounded border bg-white dark:bg-gray-800
                       hover:scale-105 transition"
            style={{
              width: item.width * 32,
              height: item.height * 32,
            }}
          >
            {/* 이미지 */}
            <img
              src={item.image}
              alt={item.name.ko}
              draggable={false}
              className="w-full h-full object-contain pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
