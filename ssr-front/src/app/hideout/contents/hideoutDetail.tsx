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
import { ALL_COLOR } from "@/util/consts/colorConsts";
import ImageZoom from "@/components/imageZoom/imageZoom";

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
    // let minutes = Math.floor((sec % 3600) / 60); // 분 계산
    // let remainingSeconds = sec % 60; // 남은 초 계산

    return hours + "시간 ";
  };

  const addPlusMinus = (text) => {
    if (typeof text === "number") {
      if (text === 0) return "0";
      return text > 0 ? `+${text}` : `${text}`;
    }
    return "";
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
              <GridContents
                columnDesign={[2, null, 5]}
                key={info.level_id}
                id={info.level_id}
              >
                <GridItem
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  colSpan={2}
                >
                  {info.item_require.length > 0 && (
                    <>
                      <Text color={ALL_COLOR.LIGHT_YELLO} fontWeight={600}>
                        Require Item
                      </Text>
                      {info.item_require.map((item) => (
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          key={item.id}
                        >
                          <Box
                            w={20}
                            h={20}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <ImageZoom
                              originalImg={item.image}
                              thumbnail={item.image}
                            />
                          </Box>
                          <Text fontWeight={600}>
                            {item.name_en} x {item.quantity}
                          </Text>
                        </Box>
                      ))}
                    </>
                  )}
                  {info.skill_require.length > 0 && (
                    <>
                      <Text color={ALL_COLOR.LIGHT_YELLO} fontWeight={600}>
                        Require Skill
                      </Text>
                      {info.skill_require.map((skill, index) => (
                        <Box key={index} display={"flex"} alignItems={"center"}>
                          <Text fontWeight={600}>
                            {skill.name_en} {skill.level} 이상
                          </Text>
                        </Box>
                      ))}
                    </>
                  )}
                  {info.trader_require.length > 0 && (
                    <>
                      <Text color={ALL_COLOR.LIGHT_YELLO} fontWeight={600}>
                        Require Trader
                      </Text>
                      {info.trader_require.map((trader, index) => (
                        <Box display={"flex"} alignItems={"center"} key={index}>
                          <Box
                            w={20}
                            h={20}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <ImageZoom
                              originalImg={trader.image}
                              thumbnail={trader.image}
                            />
                          </Box>
                          <Text fontWeight={600}>{trader.name_en}</Text>
                          <Text fontWeight={600}>{trader.value} 이상</Text>
                        </Box>
                      ))}
                    </>
                  )}
                  {info.station_require.length > 0 && (
                    <>
                      <Text color={ALL_COLOR.LIGHT_YELLO} fontWeight={600}>
                        Require Station
                      </Text>
                      {info.station_require.map((station, index) => (
                        <Box display={"flex"} alignItems={"center"} key={index}>
                          <Box
                            w={20}
                            h={20}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <ImageZoom
                              originalImg={station.image}
                              thumbnail={station.image}
                            />
                          </Box>
                          <Text fontWeight={600}>{station.name_en}</Text>
                          <Text fontWeight={600}>{station.level} 이상</Text>
                        </Box>
                      ))}
                    </>
                  )}
                </GridItem>
                <GridItem
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  colSpan={2}
                >
                  {info.bonus.length > 0 && (
                    <>
                      <Text color={ALL_COLOR.LIGHT_YELLO} fontWeight={600}>
                        Bonus
                      </Text>
                      {info.bonus.map((bonus, index) =>
                        bonus.skill_name_kr ? (
                          <Text fontWeight={600} key={index}>
                            {bonus.skill_name_kr} {addPlusMinus(bonus.value)}
                          </Text>
                        ) : (
                          <Text fontWeight={600} key={index}>
                            {bonus.name_en} {addPlusMinus(bonus.value)}
                          </Text>
                        )
                      )}
                    </>
                  )}
                  {info.crafts.length > 0 && (
                    <>
                      <Text
                        color={ALL_COLOR.LIGHT_YELLO}
                        fontWeight={600}
                        mt={2}
                      >
                        Crafts
                      </Text>
                      {info.crafts.map((craft, index) => (
                        <Text fontWeight={600} key={index}>
                          {craft.name_en}
                        </Text>
                      ))}
                    </>
                  )}
                </GridItem>
                <GridCenterText>
                  {changeTime(info.level_info[0].construction_time)}
                </GridCenterText>
              </GridContents>
            ))
          : null
      )}
    </Box>
  );
}
