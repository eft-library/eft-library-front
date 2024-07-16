import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column, MedicalList } from "@/types/types";
import ImageZoom from "@/components/imageZoom/imageZoom";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { Text, Box, GridItem } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import React from "react";
import { useSearchParams } from "next/navigation";
import DrugText from "./drugText";
import { useScrollMove } from "@/hooks/useScrollMove";

export default function MedicalDrug({ medicalList }: MedicalList) {
  const param = useSearchParams();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.drug}`,
      setColumn
    );
  }, []);

  useScrollMove(param.get("id"), medicalList, "MEDICAL");

  if (!column) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 6]}
        column={column.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {medicalList.map(
        (item) =>
          item.category === "Drug" && (
            <GridContents
              columnDesign={[2, null, 6]}
              key={item.id}
              id={item.id}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <ImageZoom originalImg={item.image} thumbnail={item.image} />
              </Box>
              <GridCenterText>{item.name_kr}</GridCenterText>
              <GridItem
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Text color={ALL_COLOR.LIGHT_YELLO} mt={4} fontWeight={600}>
                  {item.painkiller_duration}초 지속
                </Text>
                <Box display="flex" mb={4}>
                  <Text>-&nbsp;</Text>
                  <Text color={ALL_COLOR.LIGHT_BLUE}>진통제</Text>
                </Box>
                {item.hydration_impact > 0 && (
                  <DrugText
                    label="수분"
                    value={item.hydration_impact}
                    positive
                  />
                )}
                {item.energy_impact > 0 && (
                  <DrugText
                    label="에너지"
                    value={item.energy_impact}
                    positive
                  />
                )}
              </GridItem>
              <GridItem
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                {item.hydration_impact < 0 && (
                  <DrugText
                    label="수분"
                    value={item.hydration_impact}
                    positive={false}
                  />
                )}
                {item.energy_impact < 0 && (
                  <DrugText
                    label="에너지"
                    value={item.energy_impact}
                    positive={false}
                  />
                )}
              </GridItem>
              <GridCenterText>{item.uses} </GridCenterText>
              <GridCenterText>{item.use_time} 초 </GridCenterText>
            </GridContents>
          )
      )}
    </>
  );
}
