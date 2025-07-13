"use client";

import type { AmmoListTypes } from "./ammo.types";
import AmmoCardM from "./AmmoCardM/ammo-card-m";
import AmmoTable from "./AmmoTable/ammo-table";

export default function AmmoView({ ammoList }: AmmoListTypes) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-8 max-w-6xl">
        <AmmoTable ammoList={ammoList} />
        <AmmoCardM ammoList={ammoList} />
      </div>
    </div>
  );
}
