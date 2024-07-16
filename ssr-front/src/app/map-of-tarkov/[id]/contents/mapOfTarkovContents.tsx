import { Box } from "@chakra-ui/react";
import { MOT_IMAGE_SLIDER_OPTION } from "@/util/consts/libraryConsts";
import type { MapOfTarkovContents, SubMap } from "@/types/types";
import dynamic from "next/dynamic";

const DividerContents = dynamic(
  () => import("@/components/dividerContents/dividerContents"),
  {
    ssr: false,
  }
);
const MapOfTarkovExtraction = dynamic(() => import("./mapOfTarkovExtraction"), {
  ssr: false,
});
const ImageSlider = dynamic(
  () => import("@/components/imageSlider/imageSlider"),
  {
    ssr: false,
  }
);
const BossDetail = dynamic(() => import("@/app/boss/contents/bossDetail"), {
  ssr: false,
});

export default function MapOfTarkovContents({
  mapOfTarkov,
}: MapOfTarkovContents) {
  const sortSubList = (subMapList: SubMap[]) => {
    subMapList.sort((a, b) => {
      return a.order - b.order;
    });
    return subMapList;
  };

  return (
    <Box w={"95%"} mt={10}>
      <DividerContents
        headText={sortSubList(mapOfTarkov.map_info.sub)[0].name_kr}
      >
        <Box display={"flex"} alignItems={"center"}>
          <ImageSlider
            mapList={sortSubList(mapOfTarkov.map_info.sub)}
            imagePath="mot_image"
            sliderOption={MOT_IMAGE_SLIDER_OPTION}
            useZoom
          />
        </Box>
      </DividerContents>
      {mapOfTarkov.boss_list.length > 0 && (
        <DividerContents headText="보스">
          <BossDetail bossList={mapOfTarkov.boss_list} bossId={true} />
        </DividerContents>
      )}
      <MapOfTarkovExtraction extractionList={mapOfTarkov.extraction_info} />
    </Box>
  );
}
