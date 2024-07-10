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
import ImageZoom from "@/components/imageZoom/imageZoom";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import EffectText from "./effectText";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useSearchParams } from "next/navigation";
import GridNotes from "@/components/gridText/gridNotes";

export default function ProvisionsDetail() {
  const param = useSearchParams();
  const [provisionList, setProvisionList] = useState<Provisions[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.provisions}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_PROVISIONS, setProvisionList);
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      provisionList &&
      provisionList.length > 0
    ) {
      setTimeout(() => {
        const targetId = param.get("id");
        const targetElement = document.getElementById(targetId);
        if (targetId && targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [param, provisionList]);

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
        return ALL_COLOR.WHITE;
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
        columnDesign={[2, null, 7]}
        column={column.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
        isNote
      />
      {provisionList.map((item) => (
        <GridContents
          columnDesign={[2, null, 7]}
          key={item.id}
          id={item.id}
          isHideout
        >
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
          <GridNotes notes={item.related_quests} />
        </GridContents>
      ))}
    </>
  );
}
