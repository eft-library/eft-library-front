"use client";

import Information from "@/components/information/information";
import API_ENDPOINTS from "@/config/endPoints";
import { fetchDataWithNone } from "@/lib/api";
import { InformationInfoDetail } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PageParent from "@/components/pageParent/pageParent";
import SubHeader from "@/components/subHeader/subHeader";
import { Box, Skeleton } from "@chakra-ui/react";

export default function PatchNotesDetailMain() {
  const param = useParams<{ id: string }>();
  const [patchNotesDetail, setPatchNotesDetail] =
    useState<InformationInfoDetail>();
  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_PATCH_NOTES_BY_ID}/${param.id}`,
      setPatchNotesDetail
    );
  }, [param]);

  if (!patchNotesDetail)
    return (
      <PageParent>
        <SubHeader title="패치노트" />
        <Box mb={10} />
        <Box w={"100%"}>
          <Skeleton w={"100%"} h="1200px" />
        </Box>
      </PageParent>
    );

  return (
    <Information
      information={patchNotesDetail.information}
      information_group={patchNotesDetail.information_group}
      link="/patch-notes?id=1"
      detail_link="/patch-notes/detail"
      subTitle="패치노트"
    />
  );
}
