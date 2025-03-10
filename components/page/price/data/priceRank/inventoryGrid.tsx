"use client";

import type { InventoryGrid } from "../priceTypes";

export default function InventoryGrid({ topList }: InventoryGrid) {
  console.log(topList);
  return (
    <div className="flex-1 bg-WalnutBrown p-1">
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-1"></div>
    </div>
  );
}
