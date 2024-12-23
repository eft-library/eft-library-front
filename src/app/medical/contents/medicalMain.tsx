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
import MedicalDetail from "./medicalDetail";
import AdBanner from "@/components/adsense/adBanner";
import { Box } from "@chakra-ui/react";

export default function MedicalMain() {
  const { medicalCategory, setMedicalCategory } = useAppStore((state) => state);
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.medicalType}`,
      setColumn
    );
  }, []);

  const onClickCategory = (category: string) => {
    setMedicalCategory(category);
  };

  if (!column) return null;

  return (
    <PageParent>
      <SubHeader title="의료품" />
      <Box mb={10} />
      <AdBanner
        dataAdFormat={"fluid"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />
      <ContentsSelector
        onClickEvent={onClickCategory}
        itemList={column.json_value}
        currentId={medicalCategory}
        selectorId="value"
        itemDesc="desc_kr"
      />
      <MedicalDetail category={medicalCategory} />
    </PageParent>
  );
}
