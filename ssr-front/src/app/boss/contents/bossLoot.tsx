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

export default function BossLoot({ lootList, column, title }) {
  const [lootId, setLootId] = useState<string>();

  useEffect(() => {
    if (lootList.length > 0) {
      setLootId(lootList[0].item_type);
    }
  }, [lootList]);

  const updateSelector = (colList) => {
    const map = new Map();

    colList.forEach((item) => {
      const key = `${item.item_type}|${item.item_type_kr}|${item.item_type_en}`;
      if (!map.has(key)) {
        map.set(key, item);
      }
    });

    return Array.from(map.values());
  };

  const clickBossLoot = (id: string) => {
    setLootId(id);
  };
  return (
    <>
      {lootList.length > 0 && (
        <DividerContents headText={title}>
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
              onClickEvent={clickBossLoot}
              itemList={updateSelector(lootList)}
              currentId={lootId}
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
              {lootList.map(
                (loot) =>
                  lootId === loot.item_type && (
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
                          {loot.item_name}
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
