"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import { Box, Image } from "@chakra-ui/react";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import type { HeadsetList, Column } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import useColorValue from "@/hooks/useColorValue";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";

export default function HeadsetDetail() {
  const { yellowShadow } = useColorValue();
  const [headsetList, setHeadsetList] = useState<HeadsetList[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.headset}`,
      setColumn
    );
  }, []);

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_HEADSET, setHeadsetList);
  }, []);

  if (!column || !headsetList) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 2]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {headsetList.map((item, index) => (
        <GridContents columnDesign={[2, null, 2]} key={index}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Image src={item.image} maxH={"200px"} alt={item.name} />
          </Box>
          <GridCenterText value={item.name} />
        </GridContents>
      ))}
    </>
  );
}
