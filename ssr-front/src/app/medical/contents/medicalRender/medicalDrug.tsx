import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column, MedicalList } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";
import ImageZoom from "@/components/imageZoom/imageZoom";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { Text, Box, GridItem } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import React from "react";

export default function MedicalDrug({ medicalList }: MedicalList) {
  const { blackWhite, yellowShadow } = useColorValue();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.drug}`,
      setColumn
    );
  }, []);

  if (!column) return <WeaponSkeleton />;
  console.log(medicalList);
  return (
    <>
      <GridTitle
        columnDesign={[2, null, 6]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {medicalList.map(
        (item) =>
          item.category === "Drug" && (
            <GridContents columnDesign={[2, null, 6]} key={item.id}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <ImageZoom originalImg={item.image} thumbnail={item.image} />
              </Box>
              <GridCenterText value={item.name_kr} />
              <GridItem
                display="flex"
                justifyContent="center"
                alignItems={"center"}
                flexDirection={"column"}
              >
                <Text color={ALL_COLOR.LIGHT_YELLO} mt={4} fontWeight={600}>
                  {item.painkiller_duration}초 지속
                </Text>
                <Box display={"flex"} mb={4}>
                  <Text>-&nbsp;</Text>
                  <Text color={ALL_COLOR.LIGHT_BLUE}>진통제</Text>
                </Box>
                {item.hydration_impact > 0 && (
                  <Box display={"flex"} mb={4}>
                    <Text>수분 :&nbsp;</Text>
                    <Text color={ALL_COLOR.LIGHT_BLUE}>
                      {item.hydration_impact}
                    </Text>
                  </Box>
                )}
                {item.energy_impact > 0 && (
                  <Box display={"flex"} mb={4}>
                    <Text>에너지 :&nbsp;</Text>
                    <Text color={ALL_COLOR.LIGHT_BLUE}>
                      {item.energy_impact}
                    </Text>
                  </Box>
                )}
              </GridItem>
              <GridItem
                display="flex"
                justifyContent="center"
                alignItems={"center"}
                flexDirection={"column"}
              >
                {item.hydration_impact < 0 && (
                  <Box display={"flex"} mb={4}>
                    <Text>수분 :&nbsp;</Text>
                    <Text color={ALL_COLOR.RED}>{item.hydration_impact}</Text>
                  </Box>
                )}
                {item.energy_impact < 0 && (
                  <Box display={"flex"} mb={4}>
                    <Text>에너지 :&nbsp;</Text>
                    <Text color={ALL_COLOR.RED}>{item.energy_impact}</Text>
                  </Box>
                )}
              </GridItem>
              <GridCenterText value={item.uses} />
              <Box
                w={"100%"}
                h={"100%"}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection={"column"}
              >
                <Text color={blackWhite} textAlign="center">
                  {item.use_time} 초
                </Text>
              </Box>
            </GridContents>
          )
      )}
    </>
  );
}
