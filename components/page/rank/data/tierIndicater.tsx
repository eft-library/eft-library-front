"use client";

import type { TierIndicator } from "./rankTypes";
import TextSpan from "@/components/custom/gridContents/textSpan";

export default function TierIndicator({
  tier,
  min,
  max,
  viewType,
}: TierIndicator) {
  return (
    <div className="flex flex-col w-full bg-Background justify-center items-center p-6 gap-1">
      <TextSpan size="4xl">{tier} 티어</TextSpan>
      <div className="flex items-center">
        <TextSpan
          size="xl"
          textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}
        >
          {max.toLocaleString()}&nbsp;₽&nbsp;~&nbsp;
        </TextSpan>
        <TextSpan
          size="xl"
          textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}
        >
          {min.toLocaleString()}&nbsp;₽
        </TextSpan>
      </div>
    </div>
  );
}
