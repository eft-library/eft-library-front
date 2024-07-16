"use client";

import { formatImage } from "@/lib/formatImage";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ContentsSelector = dynamic(
  () => import("@/components/contentsSelector/contentsSelector"),
  {
    ssr: false,
  }
);
const DividerContents = dynamic(
  () => import("@/components/dividerContents/dividerContents"),
  {
    ssr: false,
  }
);
const ImageZoom = dynamic(() => import("@/components/imageZoom/imageZoom"), {
  ssr: false,
});

export default function BossHealth({ healthList }) {
  const [healthId, setHealthId] = useState<string>();

  const clickHealth = (health: string) => {
    setHealthId(health);
  };

  useEffect(() => {
    if (healthList.length > 0) {
      setHealthId(healthList[0].name_kr);
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
              selectorId="name_kr"
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
                  health.name_kr === healthId && (
                    <ImageZoom
                      key={health.name_en}
                      isBoss
                      originalImg={formatImage(health.image)}
                      thumbnail={formatImage(health.image)}
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
