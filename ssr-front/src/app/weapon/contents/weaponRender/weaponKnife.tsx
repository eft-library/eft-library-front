import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { WeaponKnife, Column } from "@/types/types";
import WeaponSkeleton from "../skeleton/weaponSkeleton";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/hooks/useScrollMove";
import dynamic from "next/dynamic";

const GridContents = dynamic(
  () => import("@/components/gridContents/gridContents"),
  { ssr: false }
);
const GridCenterText = dynamic(
  () => import("@/components/gridText/gridCenterText"),
  { ssr: false }
);
const GridTitle = dynamic(() => import("@/components/gridTitle/gridTitle"), {
  ssr: false,
});
const ImageZoom = dynamic(() => import("@/components/imageZoom/imageZoom"), {
  ssr: false,
});

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

  if (!column) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={column.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {knifeList.map((item) => (
        <GridContents columnDesign={[2, null, 5]} key={item.id} id={item.id}>
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
