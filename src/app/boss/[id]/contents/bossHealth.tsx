"use client";

import ContentsSelector from "@/components/contentsSelector/contentsSelector";
import DividerContents from "@/components/dividerContents/dividerContents";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { formatImage } from "@/lib/formatImage";
import { Box } from "@chakra-ui/react";
import type { BossHealth } from "@/types/types";
import { useEffect, useState } from "react";

export default function BossHealth({ healthList }: BossHealth) {
  const [healthId, setHealthId] = useState<string>();

  const clickHealth = (health: string) => {
    setHealthId(health);
  };

  useEffect(() => {
    if (healthList.length > 0) {
      setHealthId(healthList[0].id);
    }
  }, [healthList]);

  return (
    <>
      {healthList && (
        <DividerContents headText="피통">
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
              onClickEvent={clickHealth}
              itemList={healthList}
              currentId={healthId}
              isUseColumnKey={false}
              selectorId="id"
              itemDesc="name_kr"
              isEng
            />
            <Box
              mt={-6}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {healthList.map(
                (health) =>
                  health.id === healthId && (
                    <ImageZoom
                      key={health.name_en}
                      isBoss
                      originalImg={formatImage(health.health_image)}
                      thumbnail={formatImage(health.health_image)}
                      name={health.name_kr}
                    />
                  )
              )}
            </Box>
          </Box>
        </DividerContents>
      )}
    </>
  );
}
