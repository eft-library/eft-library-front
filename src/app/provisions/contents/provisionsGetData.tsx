"use client";

import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import type { Provisions, Column } from "@/types/types";
import React, { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import ProvisionsDetail from "./provisionsDetail";

export default function ProvisionsGetData() {
  const [provisionList, setProvisionList] = useState<Provisions[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.provisions}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_PROVISIONS, setProvisionList);
  }, []);

  if (!provisionList) return <WeaponSkeleton />;

  return <ProvisionsDetail provisionList={provisionList} column={column} />;
}
