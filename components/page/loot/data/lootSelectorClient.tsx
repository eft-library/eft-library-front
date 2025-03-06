"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";
import type { LootSelectorClient } from "./lootTypes";

export default function LootSelectorClient({ lootType }: LootSelectorClient) {
  const { setLootCategory, lootCategory } = useAppStore((state) => state);

  return (
    <div className="flex w-full flex-wrap rounded-lg border-solid border-2 border-white gap-1 p-1">
      {lootType.json_value.map((loot) => (
        <div
          key={loot.value}
          className={cn(
            "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
            { "bg-CloudGray": lootCategory === loot.value },
            { "text-Background": lootCategory === loot.value }
          )}
          onClick={() => setLootCategory(loot.value)}
        >
          <span className="text-center font-bold">{loot.desc_kr}</span>
        </div>
      ))}
    </div>
  );
}
