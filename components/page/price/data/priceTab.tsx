"use client";

import TextSpan from "@/components/custom/gridContents/textSpan";
import { cn } from "@/lib/utils";
import type { PriceTab } from "./priceTypes";

export default function PriceTab({ tabState, setTabState }: PriceTab) {
  return (
    <div className="flex gap-4 w-full  justify-center items-center mb-4">
      <div
        className={cn(
          "cursor-pointer p-2 border-white boder-solid border-2 rounded-full w-60 justify-center items-center hover:bg-NeutralGray flex",
          {
            "bg-NeutralGray": tabState === "priceList",
          }
        )}
        onClick={() => setTabState("priceList")}
      >
        <TextSpan size="2xl">아이템 시세</TextSpan>
      </div>
      <div
        className={cn(
          "cursor-pointer p-2 border-white boder-solid border-2 rounded-full w-60 justify-center items-center hover:bg-NeutralGray flex",
          {
            "bg-NeutralGray": tabState === "priceGrade",
          }
        )}
        onClick={() => setTabState("priceGrade")}
      >
        <TextSpan size="2xl">아이템 등급표 (개발중)</TextSpan>
      </div>
    </div>
  );
}
