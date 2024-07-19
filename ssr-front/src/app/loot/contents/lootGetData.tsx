"use client";

import type { LootGetData, Loot, Column } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import LootDetail from "./lootDetail";

export default function LootGetData({ category }: LootGetData) {
  const [lootList, setLootList] = useState<Loot[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.loot}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_LOOT, setLootList);
  }, []);

  if (!lootList || !column) return <WeaponSkeleton />;

  return <LootDetail category={category} column={column} lootList={lootList} />;
}
