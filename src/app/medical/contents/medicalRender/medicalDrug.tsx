import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column, MedicalList } from "@/types/types";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { Text, Box, GridItem, Skeleton } from "@chakra-ui/react";
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

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 6]}
        column={column}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {!medicalList
        ? Array(5)
            .fill(null)
            .map((_, index) => (
              <GridContents
                key={index}
                columnDesign={[2, null, 6]}
                id={`medical-drud-null-${index}`}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Skeleton height="110px" width="110px" />
                </Box>
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
              </GridContents>
            ))
        : medicalList.map(
            (item) =>
              item.category === "Drug" && (
                <GridContents
                  columnDesign={[2, null, 6]}
                  key={item.id}
                  id={item.id}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <ImageZoom
                      originalImg={item.image}
                      thumbnail={item.image}
                      name={item.name_kr}
                    />
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
