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
import AmmoDetail from "./ammoDetail";
import AdBanner from "@/components/adsense/adBanner";
import { Box } from "@chakra-ui/react";

export default function AmmoMain() {
  const { ammoCategory, setAmmoCategory } = useAppStore((state) => state);
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.ammoType}`,
      setColumn
    );
  }, []);

  const onClickCategory = (category: string) => {
    setAmmoCategory(category);
  };

  return (
    <PageParent>
      <SubHeader title="탄약" />
      <Box mb={10} />
      <AdBanner
        dataAdFormat={"fluid"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />
      <ContentsSelector
        onClickEvent={onClickCategory}
        itemList={column}
        currentId={ammoCategory}
        selectorId="value"
        isSpace={false}
        itemDesc="desc_kr"
        isAmmo
      />
      <AmmoDetail category={ammoCategory} />
    </PageParent>
  );
}
