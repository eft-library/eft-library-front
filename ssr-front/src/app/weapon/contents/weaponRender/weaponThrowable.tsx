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

interface ThrowableListType {
  [key: string]: any;
}

interface WeaponThrowableType {
  throwableList: ThrowableListType[];
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

export default function WeaponThrowable({
  throwableList,
}: WeaponThrowableType) {
  const [column, setColumn] = useState<ColumnType>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.throwable}`,
      setColumn
    );
  }, []);

  const detailThrowable = ["RGN", "RGO"];

  if (!column) return null;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={column.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {throwableList.map((item, index) => (
        <GridContents columnDesign={[2, null, 5]} key={index}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Image src={item.image} maxH={"200px"} alt={item.name} />
          </Box>
          <GridCenterText value={item.short_name} />
          <Box
            w={"100%"}
            h={"100%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            {detailThrowable.includes(item.short_name) ? (
              <>
                <Text color={ALL_COLOR.WHITE} textAlign="center" mb={2}>
                  충격시 {item.min_fuse} 초
                </Text>
                <Text color={ALL_COLOR.WHITE} textAlign="center">
                  (충격 신관이 발동되지 않은 경우 {item.fuse} 초)
                </Text>
              </>
            ) : (
              <Text color={ALL_COLOR.WHITE} textAlign="center">
                {item.fuse} 초
              </Text>
            )}
          </Box>
          <Box
            w={"100%"}
            h={"100%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <Text color={ALL_COLOR.WHITE} textAlign="center">
              {item.min_explosion_distance} ~&nbsp;
              {item.max_explosion_distance} m
            </Text>
          </Box>
          <Box
            w={"100%"}
            h={"100%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <Text color={ALL_COLOR.WHITE} textAlign="center">
              {item.fragments} m
            </Text>
          </Box>
        </GridContents>
      ))}
    </>
  );
}
