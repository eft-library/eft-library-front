"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { LootSelectorClient } from "./lootTypes";

export default function LootSelectorClient({ lootType }: LootSelectorClient) {
  const { setLootCategory, lootCategory } = useAppStore((state) => state);

  return (
    <div className="flex justify-center w-full flex-wrap gap-2">
      {lootType.json_value.map((loot) => (
        <div
          key={loot.value}
          className={cn(
            "rounded-lg flex justify-center items-center p-[8px] w-[120px] h-[40px] cursor-pointer hover:bg-NeutralGray border-solid border-[1px] border-white",
            { "bg-NeutralGray": lootCategory === loot.value }
          )}
          onClick={() => setLootCategory(loot.value)}
        >
          <TextSpan size="lg">{loot.desc_kr}</TextSpan>
        </div>
      ))}
    </div>
  );
}
