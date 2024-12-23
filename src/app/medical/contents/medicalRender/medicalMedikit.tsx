import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import GridArrayText from "@/components/gridText/gridArrayText";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column, MedicalList } from "@/types/types";
import ImageZoom from "@/components/imageZoom/imageZoom";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { Box } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/hooks/useScrollMove";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function MedicalMedikit({ medicalList }: MedicalList) {
  const [column, setColumn] = useState<Column>();
  const param = useSearchParams();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.medikit}`,
      setColumn
    );
  }, []);

  useScrollMove(param.get("id"), medicalList, "MEDICAL");

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={column}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {medicalList.map(
        (item) =>
          item.category === "Medikit" && (
            <GridContents
              columnDesign={[2, null, 5]}
              key={item.id}
              id={item.id}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <ImageZoom
                  originalImg={item.image}
                  thumbnail={item.image}
                  name={item.name_kr}
                />
              </Box>
              <GridCenterText>{item.name_kr}</GridCenterText>
              <GridCenterText>{item.hitpoints}</GridCenterText>
              {item.cures_kr.length > 0 ? (
                <GridArrayText arrayText={item.cures_kr} />
              ) : (
                <GridCenterText>-</GridCenterText>
              )}
              <GridCenterText>{item.use_time} 초</GridCenterText>
            </GridContents>
          )
      )}
    </>
  );
}
