"use client";

import type { KeyDetail } from "@/types/types";
import { Box, Skeleton } from "@chakra-ui/react";
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
        column={column}
        isShadow
        isNote
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {!keyList
        ? Array(10)
            .fill(null)
            .map((_, index) => (
              <GridContents
                key={index}
                columnDesign={[2, null, 6]}
                id={`key-null-${index}`}
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
              </GridContents>
            ))
        : keyList.map((item) =>
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
                  <ImageZoom
                    originalImg={item.image}
                    thumbnail={item.image}
                    name={item.name}
                  />
                </Box>
                <GridCenterText>{item.name} </GridCenterText>
                <GridArrayText arrayText={item.use_map_kr} />
                <GridCenterText>{item.uses}</GridCenterText>
                <GridNotes isKey questsNotes={item.notes} />
              </GridContents>
            ) : null
          )}
    </Box>
  );
}
