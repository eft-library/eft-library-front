"use client";

import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { useAppStore } from "@/store/provider";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import ContentsSelector from "@/components/contentsSelector/contentsSelector";
import WeaponDetail from "./weaponDetail";
import type { Column } from "@/types/types";

export default function WeaponMain() {
  const { weaponCategory, setWeaponCategory } = useAppStore((state) => state);
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.weaponType}`,
      setColumn
    );
  }, []);

  const onClickCategory = (category: string) => {
    setWeaponCategory(category);
  };

  if (!column) return null;

  return (
    <PageParent>
      <SubHeader title="무기" />
      <ContentsSelector
        onClickEvent={onClickCategory}
        itemList={column.json_value}
        currentId={weaponCategory}
        selectorId="value"
        itemDesc="desc_kr"
      />
      <WeaponDetail category={weaponCategory} />
    </PageParent>
  );
}
