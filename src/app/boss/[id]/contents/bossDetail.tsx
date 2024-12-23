"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column, BossDetail } from "@/types/types";
import DetailSkeleton from "./skeleton/detailSkeleton";
import GridTitle from "@/components/gridTitle/gridTitle";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function BossDetail({ children }: BossDetail) {
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.boss}`,
      setColumn
    );
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={"center"}
      width={"100%"}
      flexDirection={"column"}
    >
      <GridTitle
        columnDesign={[2, null, 7]}
        column={column}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
        titleWidth="100%"
      />
      {children}
    </Box>
  );
}
