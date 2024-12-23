"use client";

import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import type { Key, Column, KeyGetData } from "@/types/types";
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

  return <KeyDetail category={category} column={column} keyList={keyList} />;
}
