import { Box } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { WeaponKnife, Column } from "@/types/types";
import WeaponSkeleton from "../skeleton/weaponSkeleton";
import useColorValue from "@/hooks/useColorValue";
import ImageZoom from "@/components/imageZoom/imageZoom";

export default function WeaponKnife({ knifeList }: WeaponKnife) {
  const { yellowShadow } = useColorValue();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.knife}`,
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
      {knifeList.map((item) => (
        <GridContents columnDesign={[2, null, 5]} key={item.id}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom originalImg={item.image} thumbnail={item.image} />
          </Box>
          <GridCenterText>{item.name}</GridCenterText>
          <GridCenterText>{item.slash_damage}</GridCenterText>
          <GridCenterText>{item.stab_damage}</GridCenterText>
          <GridCenterText>{item.hit_radius} m</GridCenterText>
        </GridContents>
      ))}
    </>
  );
}
