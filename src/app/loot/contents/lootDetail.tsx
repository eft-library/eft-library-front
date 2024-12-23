"use client";

import { Box, Skeleton } from "@chakra-ui/react";
import type { LootDetail } from "@/types/types";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/hooks/useScrollMove";
import GridContents from "@/components/gridContents/gridContents";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridNotes from "@/components/gridText/gridNotes";
import GridTitle from "@/components/gridTitle/gridTitle";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function LootDetail({ category, lootList, column }: LootDetail) {
  const param = useSearchParams();

  useScrollMove(param.get("id"), lootList, "LOOT");

  const checkViewLoot = (lootCategory: string) => {
    return category === "ALL" || category === lootCategory;
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
        columnDesign={[2, null, 4]}
        column={column}
        isShadow
        isNote
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {!lootList
        ? Array(10)
            .fill(null)
            .map((_, index) => (
              <GridContents
                key={index}
                columnDesign={[2, null, 4]}
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
              </GridContents>
            ))
        : lootList.map((item) =>
            checkViewLoot(item.category) ? (
              <GridContents
                columnDesign={[2, null, 4]}
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
                    name={item.name_kr}
                  />
                </Box>
                <GridCenterText>{item.name_kr} </GridCenterText>
                <GridNotes
                  questsNotes={item.quest_notes}
                  hideoutNotes={item.hideout_notes}
                />
              </GridContents>
            ) : null
          )}
    </Box>
  );
}
