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
import LootGetData from "./lootGetData";
import AdBanner from "@/components/adsense/adBanner";
import { Box } from "@chakra-ui/react";

export default function LootMain() {
  const { lootCategory, setLootCategory } = useAppStore((state) => state);
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.lootType}`,
      setColumn
    );
  }, []);

  const onClickCategory = (category: string) => {
    setLootCategory(category);
  };

  if (!column) return null;

  return (
    <PageParent>
      <SubHeader title="전리품" />
      <Box mb={10} />
      <AdBanner
        dataAdFormat={"fluid"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />
      <ContentsSelector
        onClickEvent={onClickCategory}
        itemList={column.json_value}
        currentId={lootCategory}
        selectorId="value"
        itemDesc="desc_kr"
      />
      <LootGetData category={lootCategory} />
    </PageParent>
  );
}
