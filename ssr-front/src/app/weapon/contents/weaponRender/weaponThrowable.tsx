"use client";

import { Text, Box } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { WeaponThrowable, Column } from "@/types/types";
import WeaponSkeleton from "../skeleton/weaponSkeleton";
import useColorValue from "@/hooks/useColorValue";
import ImageZoom from "@/components/imageZoom/imageZoom";

export default function WeaponThrowable({ throwableList }: WeaponThrowable) {
  const { blackWhite, yellowShadow } = useColorValue();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.throwable}`,
      setColumn
    );
  }, []);

  const detailThrowable = ["RGN", "RGO"];

  if (!column) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {throwableList.map((item) => (
        <GridContents columnDesign={[2, null, 5]} key={item.id}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom originalImg={item.image} thumbnail={item.image} />
          </Box>
          <GridCenterText value={item.short_name} />
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
                <Text color={blackWhite} textAlign="center" mb={2}>
                  충격시 {item.min_fuse} 초
                </Text>
                <Text color={blackWhite} textAlign="center">
                  (충격 신관이 발동되지 않은 경우 {item.fuse} 초)
                </Text>
              </>
            ) : (
              <Text color={blackWhite} textAlign="center">
                {item.fuse} 초
              </Text>
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
            <Text color={blackWhite} textAlign="center">
              {item.min_explosion_distance} ~&nbsp;
              {item.max_explosion_distance} m
            </Text>
          </Box>
          <Box
            w={"100%"}
            h={"100%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <Text color={blackWhite} textAlign="center">
              {item.fragments} m
            </Text>
          </Box>
        </GridContents>
      ))}
    </>
  );
}
