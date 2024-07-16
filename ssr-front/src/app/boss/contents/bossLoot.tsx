"use client";

import { Box, Link } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ContentsSelector = dynamic(
  () => import("@/components/contentsSelector/contentsSelector"),
  {
    ssr: false,
  }
);
const GridContents = dynamic(
  () => import("@/components/gridContents/gridContents"),
  { ssr: false }
);
const GridCenterText = dynamic(
  () => import("@/components/gridText/gridCenterText"),
  { ssr: false }
);
const GridTitle = dynamic(() => import("@/components/gridTitle/gridTitle"), {
  ssr: false,
});
const DividerContents = dynamic(
  () => import("@/components/dividerContents/dividerContents"),
  {
    ssr: false,
  }
);
const ImageZoom = dynamic(() => import("@/components/imageZoom/imageZoom"), {
  ssr: false,
});

export default function BossLoot({ lootList, column, title }) {
  const [lootId, setLootId] = useState<string>();

  useEffect(() => {
    if (lootList.length > 0) {
      setLootId(lootList[0].item_type);
    }
  }, [lootList]);

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
              itemList={lootList}
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
              {lootList.map((loot) => (
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
                    <Link href={loot.link + loot.item_id}>
                      {loot.item_name}
                    </Link>
                  </GridCenterText>
                </GridContents>
              ))}
            </Box>
          </Box>
        </DividerContents>
      )}
    </>
  );
}
