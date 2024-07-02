"use client";

import { Box, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import type { HideoutDetail, Hideout, Column } from "@/types/types";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import GridTitle from "@/components/gridTitle/gridTitle";
import useColorValue from "@/hooks/useColorValue";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import GridContents from "@/components/gridContents/gridContents";
import GridCenterText from "@/components/gridText/gridCenterText";

export default function HideoutDetail({ category }: HideoutDetail) {
  const { yellowShadow, blackWhite, beige } = useColorValue();
  const [hideoutList, setHideoutList] = useState<Hideout[]>(null);
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.hideout}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_HIDEOUT, setHideoutList);
  }, []);

  const checkViewHideout = (hideoutCategory: string) => {
    return category === hideoutCategory;
  };

  const changeTime = (sec: number) => {
    let hours = Math.floor(sec / 3600); // 시간 계산
    let minutes = Math.floor((sec % 3600) / 60); // 분 계산
    let remainingSeconds = sec % 60; // 남은 초 계산

    if (minutes === 0 && remainingSeconds === 0) {
      return hours + "시간";
    } else if (remainingSeconds === 0 && minutes !== 0) {
      return hours + "시간 " + minutes + "분 ";
    }
    return hours + "시간 " + minutes + "분 " + remainingSeconds + "초";
  };

  if (!hideoutList || !column) return <WeaponSkeleton />;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={"center"}
      width={"100%"}
      flexDirection={"column"}
    >
      <GridTitle
        columnDesign={[2, null, 3]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {hideoutList.map((hideout) =>
        checkViewHideout(hideout.master_id)
          ? hideout.data.map((info) => (
              <GridContents
                columnDesign={[2, null, 3]}
                key={info.level_id}
                id={info.level_id}
              >
                <GridItem
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                ></GridItem>
                <GridItem
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {info.bonus.map((bonus) => (
                    <Text fontWeight={600} key={bonus.name_en}>
                      {bonus.name_en} / {bonus.value} / {bonus.skill_name_en}
                    </Text>
                  ))}
                </GridItem>
                <GridCenterText>
                  {changeTime(info.level_info[0].construction_time)} /{" "}
                  {info.level_info[0].level}
                </GridCenterText>
              </GridContents>
            ))
          : null
      )}
    </Box>
  );
}
