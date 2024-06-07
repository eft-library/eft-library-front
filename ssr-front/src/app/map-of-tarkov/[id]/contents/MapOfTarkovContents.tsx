import { Box } from "@chakra-ui/react";
import DividerContents from "@/components/dividerContents/dividerContents";
import MapOfTarkovExtraction from "./MapOfTarkovExtraction";
import ImageSlider from "@/components/imageSlider/imageSlider";
import BossDetail from "@/app/boss/contents/bossDetail";
import { MOT_IMAGE_SLIDER_OPTION } from "@/util/consts/libraryConsts";

export default function MapOfTarkovContents({
  mapOfTarkov,
}: MapOfTarkovContentsType) {
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
            imagePath="jpg_image"
            sliderOption={MOT_IMAGE_SLIDER_OPTION}
            useZoom
          />
        </Box>
      </DividerContents>
      <DividerContents headText="보스">
        <BossDetail bossList={mapOfTarkov.boss_list} bossId={true} />
      </DividerContents>
      <MapOfTarkovExtraction extractionList={mapOfTarkov.extraction_info} />
    </Box>
  );
}

interface Boss {
  location_spawn_chance_en: SpawnChance[];
  id: string;
  name_kr: string;
  followers_en: string[];
  image: string;
  health_total: number;
  loot: string[];
  spawn: string[];
  faction: string;
  name_en: string;
  location_spawn_chance_kr: SpawnChance[];
  followers_kr: string[];
  health_image: string[];
  location_guide: string;
  update_time: string;
}

interface SpawnChance {
  order: number;
  chance: number;
  location: string;
}

interface MapInfo {
  name_en: string;
  three_image: string;
  jpg_image: string;
  depth: number;
  link: string;
  update_time: string;
  name_kr: string;
  id: string;
  three_item_path: ThreeItemPath[];
  jpg_item_path: JpgItemPath[];
  order: number;
  main_image: string;
  sub: SubMap[];
}

interface ThreeItemPath {
  boxArgs: number[];
  position: number[];
  childValue: string;
}

interface JpgItemPath {
  x: number;
  y: number;
  childValue: string;
  motherValue: string;
}

interface SubMap {
  name_en: string;
  three_image: string;
  three_item_path: ThreeItemPath[];
  jpg_item_path: JpgItemPath[];
  order: number;
  parent_value: string;
  update_time: string;
  name_kr: string;
  id: string;
  jpg_image: string;
  depth: number;
  link: string;
  main_image: string;
}

interface Requirement {
  desc: string;
  image: string;
}

interface ExtractionInfo {
  name: string;
  faction: string;
  single_use: boolean;
  tip: string[];
  update_time: string;
  image: string;
  id: string;
  always_available: boolean;
  requirements: Requirement[];
  map: string;
}

interface MapOfTarkovData {
  boss_list: Boss[];
  map_info: MapInfo;
  extraction_info: ExtractionInfo[];
}

interface MapOfTarkovContentsType {
  mapOfTarkov: MapOfTarkovData;
}
