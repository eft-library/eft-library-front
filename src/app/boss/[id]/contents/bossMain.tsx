"use client";

import SubHeader from "@/components/subHeader/subHeader";
import LinkSelector from "@/components/linkSelector/linkSelector";
import PageParent from "@/components/pageParent/pageParent";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { Box } from "@chakra-ui/react";
import BossContents from "./bossContents";
import BossDetail from "./bossDetail";
import API_ENDPOINTS from "@/config/endPoints";
import type { Boss, Column } from "@/types/types";
import { useParams } from "next/navigation";
import ContentsSkeleton from "./skeleton/contentsSkeleton";
import DetailSkeleton from "./skeleton/detailSkeleton";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import BossBox from "./bossBox";

export default function BossMain() {
  const [boss, setBoss] = useState<Boss>();
  const [column, setColumn] = useState<Column>();
  const param = useParams<{ id: string }>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.bossType}`,
      setColumn
    );
  }, []);

  useEffect(() => {
    fetchDataWithNone(`${API_ENDPOINTS.GET_BOSS}/${param.id}`, setBoss);
  }, [param.id]);

  const sortList = () => {
    const result = column.json_value.sort((a, b) => {
      return a.order - b.order;
    });
    return result;
  };

  if (!boss || !column) {
    return (
      <PageParent>
        <SubHeader title="보스" />
        <DetailSkeleton />
        <ContentsSkeleton />
      </PageParent>
    );
  }

  return (
    <PageParent>
      <SubHeader title="보스" />
      <LinkSelector
        itemList={sortList()}
        itemDesc="name_kr"
        itemLink="link"
        mt={6}
      />
      <Box mb={10} />
      <Box w={"95%"}>
        <BossDetail>
          <BossBox boss={boss} />
        </BossDetail>
      </Box>
      <BossContents boss={boss} />
    </PageParent>
  );
}
