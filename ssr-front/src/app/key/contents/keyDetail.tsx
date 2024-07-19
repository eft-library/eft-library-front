"use client";

import type { KeyDetail } from "@/types/types";
import { Box } from "@chakra-ui/react";
import GridContents from "@/components/gridContents/gridContents";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridArrayText from "@/components/gridText/gridArrayText";
import GridNotes from "@/components/gridText/gridNotes";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/hooks/useScrollMove";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function KeyDetail({ category, keyList, column }: KeyDetail) {
  const param = useSearchParams();

  useScrollMove(param.get("id"), keyList, "KEY");

  const checkViewKey = (mapValue: Array<string>, keyCategory: string) => {
    return keyCategory === "ALL" || mapValue.includes(keyCategory);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={"center"}
      width={"100%"}
      flexDirection={"column"}
    >
      <GridTitle
        columnDesign={[2, null, 6]}
        column={column.value_kr}
        isShadow
        isNote
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {keyList.map((item) =>
        checkViewKey(item.map_value, category) ? (
          <GridContents
            columnDesign={[2, null, 6]}
            key={item.id}
            id={item.id}
            isHideout
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <ImageZoom originalImg={item.image} thumbnail={item.image} />
            </Box>
            <GridCenterText>{item.name} </GridCenterText>
            <GridArrayText arrayText={item.use_map_kr} />
            <GridCenterText>{item.uses}</GridCenterText>
            <GridNotes isKey notes={item.related_quests} />
          </GridContents>
        ) : null
      )}
    </Box>
  );
}
