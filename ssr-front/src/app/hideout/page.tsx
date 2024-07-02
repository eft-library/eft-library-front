"use client";

import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { useAppStore } from "@/store/provider";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import ContentsSelector from "@/components/contentsSelector/contentsSelector";
import type { Column } from "@/types/types";
import HideoutDetail from "./contents/hideoutDetail";

export default function Hideout() {
  const { hideoutCategory, setHideoutCategory } = useAppStore((state) => state);
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.hideoutType}`,
      setColumn
    );
  }, []);

  const onClickCategory = (category: string) => {
    setHideoutCategory(category);
  };

  if (!column) return null;

  return (
    <PageParent>
      <SubHeader title="하이드아웃" />
      <ContentsSelector
        onClickEvent={onClickCategory}
        itemList={column.json_value}
        currentId={hideoutCategory}
        selectorId="value"
        itemDesc="desc_kr"
        isImage
      />
      <HideoutDetail category={hideoutCategory} />
    </PageParent>
  );
}
