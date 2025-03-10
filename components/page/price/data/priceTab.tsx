"use client";

import { cn } from "@/lib/utils";
import type { PriceTab } from "./priceTypes";

export default function PriceTab({ tabState, setTabState }: PriceTab) {
  return (
    <div className="flex w-full justify-around flex-wrap rounded-lg border-solid border-2 border-white gap-1 p-1">
      <div
        className={cn(
          "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
          { "bg-CloudGray": tabState === "priceRank" },
          { "text-Background": tabState === "priceRank" }
        )}
        onClick={() => setTabState("priceRank")}
      >
        <span className="text-center font-bold">아이템 등급표</span>
      </div>
      <div
        className={cn(
          "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
          { "bg-CloudGray": tabState === "priceList" },
          { "text-Background": tabState === "priceList" }
        )}
        onClick={() => setTabState("priceList")}
      >
        <span className="text-center font-bold">아이템 시세</span>
      </div>
    </div>
  );
}
