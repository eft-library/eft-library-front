"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import { Box } from "@chakra-ui/react";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import type { HeadsetList, Column } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import useColorValue from "@/hooks/useColorValue";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useSearchParams } from "next/navigation";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";

export default function HeadsetDetail() {
  const param = useSearchParams();
  const { yellowShadow } = useColorValue();
  const [headsetList, setHeadsetList] = useState<HeadsetList[]>();
  const [column, setColumn] = useState<Column>();
  const itemRef = useRef(null);

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.headset}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_HEADSET, setHeadsetList);
  }, []);

  useEffect(() => {
    itemRef.current = param.get("id");
    if (
      typeof window !== "undefined" &&
      headsetList &&
      headsetList.length > 0
    ) {
      setTimeout(() => {
        const targetId = param.get("id");
        const targetElement = document.getElementById(targetId);
        if (targetId && targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [param, headsetList]);

  if (!column || !headsetList) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 2]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {headsetList.map((item) => (
        <GridContents columnDesign={[2, null, 2]} key={item.id}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            id={item.id}
          >
            <ImageZoom originalImg={item.image} thumbnail={item.image} />
          </Box>
          <GridCenterText>{item.name}</GridCenterText>
        </GridContents>
      ))}
    </>
  );
}
