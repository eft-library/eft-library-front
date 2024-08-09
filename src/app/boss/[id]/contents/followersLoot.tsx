"use client";

import ContentsSelector from "@/components/contentsSelector/contentsSelector";
import DividerContents from "@/components/dividerContents/dividerContents";
import GridContents from "@/components/gridContents/gridContents";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useEffect, useState } from "react";
import type { FollowersDetail, FollowersLoot } from "@/types/types";

export default function FollowersLoot({ follower, column }: FollowersDetail) {
  const [lootType, setLootType] = useState<string>();

  useEffect(() => {
    if (follower && follower.loot.length > 0) {
      setLootType(follower.loot[0].item_type);
    }
  }, [follower]);

  const updateSelector = (colList: FollowersLoot[]) => {
    const map = new Map();

    colList.forEach((item) => {
      const key = `${item.item_type}|${item.item_type_kr}|${item.item_type_en}`;
      if (!map.has(key)) {
        map.set(key, item);
      }
    });

    return Array.from(map.values());
  };

  const clickFollowerLoot = (type: string) => {
    setLootType(type);
  };

  return (
    <>
      {follower.loot.length > 0 && (
        <DividerContents
          headText={`${follower.name_kr} 전리품`}
          key={follower.id}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            w={"100%"}
            h={"100%"}
            mt={-6}
          >
            <ContentsSelector
              onClickEvent={clickFollowerLoot}
              itemList={updateSelector(follower.loot)}
              currentId={lootType}
              selectorId="item_type"
              itemDesc="item_type_kr"
              isEng
            />
            <Box
              mt={-6}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              w={"100%"}
            >
              <GridTitle
                columnDesign={[2, null, 2]}
                column={column.value_kr}
                isShadow
                shadowColor={ALL_COLOR.YELLOW_SHADOW}
                titleWidth="100%"
              />
              {follower.loot.map(
                (loot) =>
                  lootType === loot.item_type && (
                    <GridContents
                      columnDesign={[2, null, 2]}
                      contentsWidth="100%"
                      id={loot.item_id}
                      key={loot.item_id}
                    >
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <ImageZoom
                          originalImg={loot.item_image}
                          thumbnail={loot.item_image}
                        />
                      </Box>
                      <GridCenterText isHover>
                        <Link href={loot.link + loot.item_id} scroll={false}>
                          {loot.item_name_kr}
                        </Link>
                      </GridCenterText>
                    </GridContents>
                  )
              )}
            </Box>
          </Box>
        </DividerContents>
      )}
    </>
  );
}
