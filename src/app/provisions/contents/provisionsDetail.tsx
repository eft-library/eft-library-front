"use client";

import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import { Box, GridItem, Skeleton } from "@chakra-ui/react";
import type { ProvisionsDetail } from "@/types/types";
import ImageZoom from "@/components/imageZoom/imageZoom";
import EffectText from "./effectText";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useSearchParams } from "next/navigation";
import GridNotes from "@/components/gridText/gridNotes";
import { useScrollMove } from "@/hooks/useScrollMove";

export default function ProvisionsDetail({
  provisionList,
  column,
}: ProvisionsDetail) {
  const param = useSearchParams();

  useScrollMove(param.get("id"), provisionList);

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

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 7]}
        column={column}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
        isNote
      />
      {!provisionList
        ? Array(10)
            .fill(null)
            .map((_, index) => (
              <GridContents
                key={index}
                columnDesign={[2, null, 7]}
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
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="120px" />
                </GridCenterText>
              </GridContents>
            ))
        : provisionList.map((item) => (
            <GridContents
              columnDesign={[2, null, 7]}
              key={item.id}
              id={item.id}
              isHideout
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <ImageZoom
                  originalImg={item.image}
                  thumbnail={item.image}
                  name={item.name_kr}
                />
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
              <GridNotes questsNotes={item.notes} />
            </GridContents>
          ))}
    </>
  );
}
