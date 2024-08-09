"use client";

import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import type { Key, Column, KeyGetData } from "@/types/types";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import KeyDetail from "./keyDetail";

export default function KeyGetData({ category }: KeyGetData) {
  const [keyList, setKeyList] = useState<Key[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.key}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_KEY, setKeyList);
  }, []);

  if (!column || !keyList) return <WeaponSkeleton />;

  return <KeyDetail category={category} column={column} keyList={keyList} />;
}
