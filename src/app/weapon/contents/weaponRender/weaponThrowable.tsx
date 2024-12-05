"use client";

import { Box } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { WeaponThrowable, Column } from "@/types/types";
import WeaponSkeleton from "../skeleton/weaponSkeleton";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/hooks/useScrollMove";

export default function WeaponThrowable({ throwableList }: WeaponThrowable) {
  const [column, setColumn] = useState<Column>();
  const param = useSearchParams();
  const detailThrowable = ["RGN", "RGO"];

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.throwable}`,
      setColumn
    );
  }, []);

  useScrollMove(param.get("id"), throwableList, "WEAPON");

  if (!column) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={column.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {throwableList.map((item) => (
        <GridContents columnDesign={[2, null, 5]} key={item.id} id={item.id}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom
              originalImg={item.image}
              thumbnail={item.image}
              name={item.short_name}
            />
          </Box>
          <GridCenterText>{item.short_name}</GridCenterText>
          <Box
            w={"100%"}
            h={"100%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            {detailThrowable.includes(item.short_name) ? (
              <>
                <GridCenterText mb={2}>
                  충격시 {item.min_fuse} 초
                </GridCenterText>
                <GridCenterText>
                  (충격 신관이 발동되지 않은 경우 {item.fuse} 초)
                </GridCenterText>
              </>
            ) : (
              <GridCenterText>{item.fuse} 초</GridCenterText>
            )}
          </Box>
          <Box
            w={"100%"}
            h={"100%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <GridCenterText>
              {item.min_explosion_distance} ~&nbsp;
              {item.max_explosion_distance} m
            </GridCenterText>
          </Box>
          <Box
            w={"100%"}
            h={"100%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <GridCenterText>{item.fragments} m</GridCenterText>
          </Box>
        </GridContents>
      ))}
    </>
  );
}
