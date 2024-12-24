import { Box, Skeleton } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { WeaponKnife, Column } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/hooks/useScrollMove";

export default function WeaponKnife({ knifeList }: WeaponKnife) {
  const [column, setColumn] = useState<Column>();
  const param = useSearchParams();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.knife}`,
      setColumn
    );
  }, []);

  useScrollMove(param.get("id"), knifeList, "WEAPON");

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={column}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {knifeList.length < 1
        ? Array(10)
            .fill(null)
            .map((_, index) => (
              <GridContents
                key={index}
                columnDesign={[2, null, 5]}
                id={`armband-null-${index}`}
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
              </GridContents>
            ))
        : knifeList.map((item) => (
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
                  name={item.name}
                />
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
