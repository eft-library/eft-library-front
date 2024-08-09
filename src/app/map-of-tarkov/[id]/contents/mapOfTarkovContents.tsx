import { Box } from "@chakra-ui/react";
import DividerContents from "@/components/dividerContents/dividerContents";
import MapOfTarkovExtraction from "./mapOfTarkovExtraction";
import ImageSlider from "@/components/imageSlider/imageSlider";
import BossDetail from "@/app/boss/[id]/contents/bossDetail";
import { MOT_IMAGE_SLIDER_OPTION } from "@/util/consts/libraryConsts";
import type { MapOfTarkovContents, SubMap } from "@/types/types";
import BossBox from "@/app/boss/[id]/contents/bossBox";

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
          <BossDetail>
            {mapOfTarkov.boss_list.map((boss) => (
              <BossBox boss={boss} key={boss.id} />
            ))}
          </BossDetail>
        </DividerContents>
      )}
      <MapOfTarkovExtraction extractionList={mapOfTarkov.extraction_info} />
    </Box>
  );
}
