"use client";

import type { TierIndicator } from "../priceTypes";

export default function TierIndicator({ tier, min, max }: TierIndicator) {
  return (
    <div className="flex flex-col w-full bg-black justify-center items-center p-6 gap-4">
      <div className="text-5xl font-bold text-CloudGray">{tier} 티어</div>
      <div className="flex items-center">
        <span className="text-xl text-CloudGray font-bold">
          슬롯당 가격&nbsp;
        </span>
        <span className="text-xl text-CloudGray font-bold">
          {max.toLocaleString()}&nbsp;₽&nbsp;~&nbsp;
        </span>
        <span className="text-xl text-CloudGray font-bold">
          {min.toLocaleString()}&nbsp;₽
        </span>
      </div>
    </div>
  );
}
