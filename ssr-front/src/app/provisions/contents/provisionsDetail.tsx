"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import { Box, GridItem, Text } from "@chakra-ui/react";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import type { Provisions, Column } from "@/types/types";
import React, { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import useColorValue from "@/hooks/useColorValue";
import ImageZoom from "@/components/imageZoom/imageZoom";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import EffectText from "./effectText";
import { ALL_COLOR } from "@/util/consts/colorConsts";

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

  const filterStimEffects = (effects) => {
    const seen = new Set();
    return effects.filter((effect) => {
      const key = `${effect.delay}-${effect.duration}`;
      if (!seen.has(key)) {
        seen.add(key);
        return true;
      } else if (effect.skillName !== "Painkiller") {
        delete effect.delay;
        delete effect.duration;
        return true;
      }
      return false;
    });
  };

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
  };

  const addPlusMinus = (text: number | string) => {
    if (typeof text === "number") {
      if (text > 0) {
        return `+${text}`;
      } else {
        return text;
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
      {provisionList.map((item) => (
        <GridContents columnDesign={[2, null, 5]} key={item.id}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <ImageZoom originalImg={item.image} thumbnail={item.image} />
          </Box>
          <GridCenterText>{item.name_kr} </GridCenterText>
          <GridCenterText otherColor={checkPlus(item.energy)}>
            {addPlusMinus(item.energy)}
          </GridCenterText>
          <GridCenterText otherColor={checkPlus(item.hydration)}>
            {addPlusMinus(item.hydration)}
          </GridCenterText>
          <GridItem
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            {item.stim_effects.length > 0 ? (
              filterStimEffects(item.stim_effects).map((text) => (
                <EffectText key={text.krSkill} text={text} />
              ))
            ) : (
              <GridCenterText>-</GridCenterText>
            )}
          </GridItem>
        </GridContents>
      ))}
    </>
  );
}
