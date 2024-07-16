"use client";

import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { useAppStore } from "@/store/provider";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column } from "@/types/types";
import dynamic from "next/dynamic";

const KeyDetail = dynamic(() => import("./contents/keyDetail"), {
  ssr: false,
});
const ContentsSelector = dynamic(
  () => import("@/components/contentsSelector/contentsSelector"),
  {
    ssr: false,
  }
);

export default function Key() {
  const { keyCategory, setKeyCategory } = useAppStore((state) => state);
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.keyType}`,
      setColumn
    );
  }, []);

  const onClickCategory = (category: string) => {
    setKeyCategory(category);
  };

  if (!column) return null;

  return (
    <PageParent>
      <SubHeader title="열쇠" />
      <ContentsSelector
        onClickEvent={onClickCategory}
        itemList={column.json_value}
        currentId={keyCategory}
        selectorId="value"
        itemDesc="desc_kr"
      />
      <KeyDetail category={keyCategory} />
    </PageParent>
  );
}
