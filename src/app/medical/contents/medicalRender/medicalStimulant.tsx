import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column, MedicalList } from "@/types/types";
import ImageZoom from "@/components/imageZoom/imageZoom";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { Box, GridItem } from "@chakra-ui/react";
import React from "react";
import StimulantText from "./stimulantText";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/hooks/useScrollMove";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function MedicalStimulant({ medicalList }: MedicalList) {
  const [column, setColumn] = useState<Column>();
  const param = useSearchParams();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.stimulant}`,
      setColumn
    );
  }, []);

  useScrollMove(param.get("id"), medicalList, "MEDICAL");

  const filterStimEffects = (effects) => {
    const seen = new Set();
    for (const effect of effects) {
      const key = `${effect.delay}-${effect.duration}`;
      if (!seen.has(key)) {
        seen.add(key);
      } else if (effect.skillName !== "Painkiller") {
        delete effect.delay;
        delete effect.duration;
      }
    }
    return effects;
  };

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 4]}
        column={column}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {medicalList.map(
        (item) =>
          item.category === "Stimulant" && (
            <GridContents
              columnDesign={[2, null, 4]}
              key={item.id}
              id={item.id}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <ImageZoom
                  originalImg={item.image}
                  thumbnail={item.image}
                  name={item.name_kr}
                />
              </Box>
              <GridCenterText>{item.name_kr}</GridCenterText>
              <GridItem
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                {item.buff.length > 0 ? (
                  filterStimEffects(item.buff).map((buff) => (
                    <StimulantText
                      key={buff.krSkill}
                      effect={buff}
                      itemID={item.id}
                      type="buff"
                    />
                  ))
                ) : (
                  <GridCenterText>-</GridCenterText>
                )}
              </GridItem>
              <GridItem
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                {item.debuff.length > 0 ? (
                  filterStimEffects(item.debuff).map((debuff) => (
                    <StimulantText
                      key={debuff.krSkill}
                      effect={debuff}
                      itemID={item.id}
                      type="debuff"
                    />
                  ))
                ) : (
                  <GridCenterText>-</GridCenterText>
                )}
              </GridItem>
            </GridContents>
          )
      )}
    </>
  );
}
