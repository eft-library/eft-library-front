"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import { Box, Image, GridItem, Text } from "@chakra-ui/react";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import type { Provisions, Column } from "@/types/types";
import React, { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import useColorValue from "@/hooks/useColorValue";
import ImageZoom from "@/components/imageZoom/imageZoom";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";

export default function ProvisionsDetail() {
  const { yellowShadow, blackWhite } = useColorValue();
  const [provisionList, setProvisionList] = useState<Provisions[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.food_drink}`,
      setColumn
    );
  }, []);

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_FOOD_DRINK, setProvisionList);
  }, []);

  // delay, duration이 이미 있으면 제거
  function filterStimEffects(effects) {
    const seen = new Set();
    for (const effect of effects) {
      const key = `${effect.delay}-${effect.duration}`;
      if (!seen.has(key)) {
        seen.add(key);
      } else if (effect.skillName === "Painkiller") {
        // pass
      } else {
        delete effect.delay;
        delete effect.duration;
      }
    }
    console.log(effects);
    return effects;
  }

  const checkPlus = (effect: number | string) => {
    if (typeof effect === "number") {
      if (effect == 0) {
        return blackWhite;
      } else if (effect > 0) {
        return ALL_COLOR.LIGHT_BLUE;
      } else {
        return ALL_COLOR.RED;
      }
    }

    if (typeof effect === "string") {
      if (effect === "손 떨림") {
        return ALL_COLOR.RED;
      } else if (effect === "진통제") {
        return ALL_COLOR.LIGHT_BLUE;
      } else {
        return blackWhite;
      }
    }
  };

  const fixStr = (value: string) => {
    const fixList = ["손 떨림", "진통제"];
    if (fixList.includes(value)) {
      return `${value}`;
    }

    return `${value} :`;
  };

  const addPlusMinus = (text: number | string) => {
    if (typeof text === "number") {
      // 진통제, 손 떨림 경우
      if (text === 0) {
        return "";
      } else if (text > 0) {
        return `+${text}`;
      } else {
        return `${text}`;
      }
    }
  };

  if (!column || !provisionList) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {provisionList.map((item, index) => (
        <GridContents columnDesign={[2, null, 5]} key={index}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <ImageZoom originalImg={item.image} thumbnail={item.image} />
          </Box>
          <GridCenterText value={item.name_kr} />
          <GridCenterText value={item.energy} isEffect />
          <GridCenterText value={item.hydration} isEffect />
          <GridItem
            display="flex"
            justifyContent="center"
            flexDirection={"column"}
          >
            {item.stim_effects.length > 0 ? (
              filterStimEffects(item.stim_effects).map((text, index) => (
                <React.Fragment key={index}>
                  {text["delay"] && text["duration"] ? (
                    <Text color={ALL_COLOR.LIGHT_YELLO} mt={4} fontWeight={600}>
                      {text["skillName"] === "Painkiller"
                        ? `${text["duration"]}초 지속`
                        : `${text["delay"]}초 지연 / ${text["duration"]}초 지속`}
                    </Text>
                  ) : null}
                  <Box display={"flex"}>
                    <Text>-&nbsp;</Text>
                    <Text
                      color={checkPlus(text["krSkill"])}
                      fontWeight={600}
                      textAlign="center"
                    >
                      {fixStr(text["krSkill"])}
                    </Text>
                    <Text
                      color={checkPlus(text["value"])}
                      fontWeight={600}
                      textAlign="center"
                    >
                      {text["skillName"] === "Painkiller"
                        ? ``
                        : ` ${addPlusMinus(text["value"])}`}
                    </Text>
                  </Box>
                </React.Fragment>
              ))
            ) : (
              <Text color={blackWhite}>-</Text>
            )}
          </GridItem>
        </GridContents>
      ))}
    </>
  );
}
