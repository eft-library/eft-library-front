"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import { Box, Image, Text } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Container, Column } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";

export default function ContainerDetail() {
  const { yellowShadow, blackWhite } = useColorValue();
  const [containerList, setContainerList] = useState<Container[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.container}`,
      setColumn
    );
  }, []);

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_CONTAINER, setContainerList);
  }, []);

  if (!containerList || !column) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 4]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {containerList.map((item, index) => (
        <GridContents columnDesign={[2, null, 4]} key={index}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Image src={item.image} maxH={"200px"} alt={item.name} />
          </Box>
          <GridCenterText value={item.name} />
          <GridCenterText value={item.capacity} />
          <Box
            w={"100%"}
            h={"100%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <Text color={blackWhite} textAlign="center">
              {item.grids[0].width} x {item.grids[0].height}
            </Text>
          </Box>
        </GridContents>
      ))}
    </>
  );
}
