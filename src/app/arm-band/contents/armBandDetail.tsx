"use client";

import type { Column, ArmBand } from "@/types/types";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import { Box } from "@chakra-ui/react";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchDataWithNone } from "@/lib/api";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useScrollMove } from "@/hooks/useScrollMove";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function ArmBandDetail() {
  const param = useSearchParams();
  const [armBandList, setArmBandList] = useState<ArmBand[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.arm_band}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_ARM_BAND, setArmBandList);
  }, []);

  useScrollMove(param.get("id"), armBandList);

  if (!armBandList) return null;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 2]}
        column={column}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {armBandList.map((item) => (
        <GridContents columnDesign={[2, null, 2]} key={item.id} id={item.id}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom
              originalImg={item.image}
              thumbnail={item.image}
              name={item.name}
            />
          </Box>
          <GridCenterText>{item.name}</GridCenterText>
        </GridContents>
      ))}
    </>
  );
}
