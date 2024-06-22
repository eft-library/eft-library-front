import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import RenderArrayText from "@/components/gridText/renderArrayText";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column, MedicalList } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";
import ImageZoom from "@/components/imageZoom/imageZoom";
import WeaponSkeleton from "@/app/weapon/contents/skeleton/weaponSkeleton";
import { Text, Box, GridItem } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import React from "react";

export default function MedicalStimulant({ medicalList }: MedicalList) {
  const { blackWhite, yellowShadow } = useColorValue();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.stimulant}`,
      setColumn
    );
  }, []);

  // delay, duration이 이미 있으면 제거
  const filterStimEffects = (effects) => {
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
    return effects;
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

  if (!column) return <WeaponSkeleton />;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 4]}
        column={column.value_kr}
        isShadow
        shadowColor={yellowShadow}
      />
      {medicalList.map(
        (item) =>
          item.category === "Stimulant" && (
            <GridContents columnDesign={[2, null, 4]} key={item.id}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <ImageZoom originalImg={item.image} thumbnail={item.image} />
              </Box>
              <GridCenterText value={item.name_kr} />
              <GridItem
                display="flex"
                justifyContent="center"
                flexDirection={"column"}
              >
                {item.buff.length > 0 ? (
                  filterStimEffects(item.buff).map((buff) => (
                    <React.Fragment key={buff.krSkill}>
                      {buff["delay"] != null && buff["duration"] != null ? (
                        <Text
                          color={ALL_COLOR.LIGHT_YELLO}
                          mt={4}
                          fontWeight={600}
                        >
                          {item.id === "5ed5166ad380ab312177c100"
                            ? `25% 확률 / ${buff["delay"]}초 지연 / ${buff["duration"]}초 지속`
                            : buff.delay === 0
                            ? `${buff["duration"]}초 지속`
                            : `${buff["delay"]}초 지연 / ${buff["duration"]}초 지속`}
                        </Text>
                      ) : null}
                      <Box display="flex">
                        <Text color={blackWhite}>-&nbsp;</Text>
                        <Text>{buff.krSkill}</Text>
                        <Text color={ALL_COLOR.LIGHT_BLUE}>
                          &nbsp;{addPlusMinus(buff.value)}
                        </Text>
                      </Box>
                    </React.Fragment>
                  ))
                ) : (
                  <Text color={blackWhite}>-</Text>
                )}
              </GridItem>
              <GridItem
                display="flex"
                justifyContent="center"
                flexDirection={"column"}
              >
                {item.debuff.length > 0 ? (
                  filterStimEffects(item.debuff).map((debuff) => (
                    <React.Fragment key={debuff.krSkill}>
                      {debuff["delay"] != null && debuff["duration"] != null ? (
                        <Text
                          color={ALL_COLOR.LIGHT_YELLO}
                          mt={4}
                          fontWeight={600}
                        >
                          {debuff.delay === 0
                            ? `${debuff["duration"]}초 지속`
                            : `${debuff["delay"]}초 지연 / ${debuff["duration"]}초 지속`}
                        </Text>
                      ) : null}
                      <Box display="flex">
                        <Text color={blackWhite}>-&nbsp;</Text>
                        <Text>{debuff.krSkill}</Text>
                        <Text color={ALL_COLOR.RED}>
                          &nbsp;{addPlusMinus(debuff.value)}
                        </Text>
                      </Box>
                    </React.Fragment>
                  ))
                ) : (
                  <Text color={blackWhite}>-</Text>
                )}
              </GridItem>
            </GridContents>
          )
      )}
    </>
  );
}
