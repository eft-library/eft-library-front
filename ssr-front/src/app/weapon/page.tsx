"use client";

import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { useAppStore } from "@/store/provider";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import ContentsSelector from "@/components/contentsSelector/contentsSelector";
import WeaponDetail from "./contents/weaponDetail/weaponDetail";

interface ColumnType {
  id: string;
  type: string;
  update_time: string;
  value_kr: string[] | null;
  value_en: string[] | null;
  json_value: JsonValueType[] | null;
}

// JsonValueType 인터페이스 정의
interface JsonValueType {
  value: string;
  desc_en: string;
  desc_kr: string;
  order: number;
}

export default function Weapon() {
  const { weaponCategory, setWeaponCategory } = useAppStore((state) => state);
  const [column, setColumn] = useState<ColumnType>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.weaponType}`,
      setColumn
    );
  }, []);

  const onClickCategory = (weaponCategory: string) => {
    setWeaponCategory(weaponCategory);
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
