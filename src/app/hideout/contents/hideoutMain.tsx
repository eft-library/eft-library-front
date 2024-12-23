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
import HideoutDetail from "./hideoutDetail";
import AdBanner from "@/components/adsense/adBanner";
import { Box } from "@chakra-ui/react";

export default function HideoutMain() {
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

  return (
    <PageParent>
      <SubHeader title="은신처" />
      <Box mb={10} />
      <AdBanner
        dataAdFormat={"fluid"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />
      <ContentsSelector
        onClickEvent={onClickCategory}
        itemList={column}
        skeletonCount={24}
        currentId={hideoutCategory}
        selectorId="value"
        itemDesc="desc_kr"
        isImage
      />
      <HideoutDetail category={hideoutCategory} />
    </PageParent>
  );
}
