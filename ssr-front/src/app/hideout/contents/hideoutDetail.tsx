"use client";

import React from "react";
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
import Require from "./require";
import Bonus from "./bonus";

export default function HideoutDetail({ category }: HideoutDetail) {
  const { yellowShadow, blackWhite } = useColorValue();
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
    // let minutes = Math.floor((sec % 3600) / 60); // 분 계산
    // let remainingSeconds = sec % 60; // 남은 초 계산

    return hours + " 시간 ";
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
        columnDesign={[2, null, 5]}
        column={column.value_kr}
        isShadow
        isHideout
        shadowColor={yellowShadow}
      />
      {hideoutList.map((hideout) =>
        checkViewHideout(hideout.master_id)
          ? hideout.data.map((info) => (
              <React.Fragment key={info.level_id}>
                <Box display={"flex"} w={"95%"} mb={2} mt={2}>
                  <Text
                    fontWeight={600}
                    color={blackWhite}
                    textShadow={yellowShadow}
                    fontSize={"large"}
                  >
                    {hideout.master_name_kr} {info.level_info[0].level}
                  </Text>
                </Box>
                <GridContents
                  columnDesign={[2, null, 5]}
                  id={info.level_id}
                  isHideout
                >
                  <GridItem
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    colSpan={2}
                  >
                    <Require items={info.item_require} type="item" />
                    <Require items={info.skill_require} type="skill" />
                    <Require items={info.trader_require} type="trader" />
                    <Require items={info.station_require} type="station" />
                  </GridItem>
                  <GridItem
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    colSpan={2}
                  >
                    <Bonus bonuses={info.bonus} />
                    {info.crafts.length > 0 && (
                      <>
                        {info.crafts.map((craft, index) => (
                          <Text fontWeight={600} key={index}>
                            {craft.name_kr} 제작
                          </Text>
                        ))}
                      </>
                    )}
                  </GridItem>
                  <GridCenterText>
                    {changeTime(info.level_info[0].construction_time)}
                  </GridCenterText>
                </GridContents>
              </React.Fragment>
            ))
          : null
      )}
    </Box>
  );
}
