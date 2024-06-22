import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import GridArrayText from "@/components/gridText/gridArrayText";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column, MedicalList } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";
import ImageZoom from "@/components/imageZoom/imageZoom";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { Box } from "@chakra-ui/react";

export default function MedicalItem({ medicalList }: MedicalList) {
  const { yellowShadow } = useColorValue();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.medicalItem}`,
      setColumn
    );
  }, []);

  if (!column) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {medicalList.map(
        (item) =>
          item.category === "Medical item" && (
            <GridContents columnDesign={[2, null, 5]} key={item.id}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <ImageZoom originalImg={item.image} thumbnail={item.image} />
              </Box>
              <GridCenterText>{item.name_kr}</GridCenterText>
              <GridArrayText arrayText={item.cures_kr} />
              <GridCenterText>{item.uses}</GridCenterText>
              <GridCenterText>{item.use_time} 초</GridCenterText>
            </GridContents>
          )
      )}
    </>
  );
}
