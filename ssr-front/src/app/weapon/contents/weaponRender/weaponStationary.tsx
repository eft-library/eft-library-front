"use client";

import { Text, Image, Box } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import { formatImage } from "@/lib/formatImage";

interface StationaryListType {
  name: string;
  short_name: string;
  image: string;
  category: string;
  caliber: string;
  modes_kr: string[];
  fire_rate: number;
  carliber: string;
}

interface WeaponStationaryType {
  stationaryList: StationaryListType[];
  category: string;
}

interface ColumnType {
  id: string;
  type: string;
  update_time: string;
  value_kr: string[] | null;
  value_en: string[] | null;
  json_value: JsonValueType[] | null;
}

// JsonValueType 인터페이스 정의
interface JsonValueType {
  value: string;
  desc_en: string;
  desc_kr: string;
  order: number;
}

export default function WeaponStationary({
  stationaryList,
  category,
}: WeaponStationaryType) {
  const [column, setColumn] = useState<ColumnType>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.stationary}`,
      setColumn
    );
  }, []);

  // 무기 렌더링 조건 함수
  const shouldRenderWeapon = (itemCategory: string) => {
    const isGeneralCategory = itemCategory === "Stationary weapons";
    const isMatchingCategory =
      itemCategory === "Stationary weapons" || category === "ALL";
    return isGeneralCategory && isMatchingCategory;
  };

  if (!column) return null;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={column.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {stationaryList.map((item, index) =>
        shouldRenderWeapon(item.category) ? (
          <GridContents columnDesign={[2, null, 5]} key={index}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image
                src={formatImage(item.image)}
                maxH={"200px"}
                alt={item.name}
              />
            </Box>
            <GridCenterText value={item.short_name} />
            <GridCenterText value={item.carliber} />
            <Box
              w={"100%"}
              h={"100%"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection={"column"}
            >
              {item.modes_kr.map((mode, mIndex) => (
                <Text key={mIndex} color={ALL_COLOR.WHITE} textAlign="center">
                  {mode}
                </Text>
              ))}
            </Box>
            <GridCenterText value={item.fire_rate} />
          </GridContents>
        ) : null
      )}
    </>
  );
}
