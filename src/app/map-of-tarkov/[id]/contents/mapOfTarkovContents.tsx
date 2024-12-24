import { Box, GridItem, Skeleton } from "@chakra-ui/react";
import DividerContents from "@/components/dividerContents/dividerContents";
import MapOfTarkovExtraction from "./mapOfTarkovExtraction";
import ImageSlider from "@/components/imageSlider/imageSlider";
import BossDetail from "@/app/boss/[id]/contents/bossDetail";
import { MOT_IMAGE_SLIDER_OPTION } from "@/util/consts/libraryConsts";
import type { MapOfTarkovContents } from "@/types/types";
import BossBox from "@/app/boss/[id]/contents/bossBox";
import AdBanner from "@/components/adsense/adBanner";
import GridContents from "@/components/gridContents/gridContents";
import GridCenterText from "@/components/gridText/gridCenterText";

export default function MapOfTarkovContents({
  mapOfTarkov,
}: MapOfTarkovContents) {
  const sortSubList = () => {
    if (!mapOfTarkov) return null;

    mapOfTarkov.map_info.sub.sort((a, b) => {
      return a.order - b.order;
    });
    return mapOfTarkov.map_info.sub;
  };

  return (
    <Box w={"100%"} mt={10}>
      {!mapOfTarkov ? (
        <DividerContents headText={"지도"}>
          <Box display={"flex"} alignItems={"center"}>
            <Skeleton height="600px" width="100%" mb={4} />
          </Box>
        </DividerContents>
      ) : (
        <DividerContents headText={mapOfTarkov.map_info.name_kr}>
          <Box display={"flex"} alignItems={"center"}>
            <ImageSlider
              mapList={sortSubList()}
              imagePath="mot_image"
              sliderOption={MOT_IMAGE_SLIDER_OPTION}
              useZoom
            />
          </Box>
        </DividerContents>
      )}

      <AdBanner
        dataAdFormat={"fluid"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />
      {!mapOfTarkov ? (
        <DividerContents headText="보스">
          <BossDetail>
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <Skeleton height="120px" width="100%" key={index} mb={4} />
              ))}
          </BossDetail>
        </DividerContents>
      ) : (
        mapOfTarkov.boss_list.length > 0 && (
          <DividerContents headText="보스">
            <BossDetail>
              {mapOfTarkov.boss_list.map((boss) => (
                <BossBox boss={boss} key={boss.id} />
              ))}
            </BossDetail>
          </DividerContents>
        )
      )}
      {!mapOfTarkov
        ? Array(10)
            .fill(null)
            .map((_, index) => (
              <DividerContents headText={"탈출구"}>
                <GridContents
                  key={index}
                  columnDesign={[2, null, 10]}
                  id={`armband-null-${index}`}
                >
                  <GridItem colSpan={2}>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Skeleton height="110px" width="100%" />
                    </Box>
                  </GridItem>
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
                  <GridItem colSpan={2}>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Skeleton height="110px" width="100%" />
                    </Box>
                  </GridItem>
                  <GridCenterText>
                    <Skeleton height="20px" width="120px" />
                  </GridCenterText>
                </GridContents>
              </DividerContents>
            ))
        : mapOfTarkov.extraction_info.length > 0 && (
            <MapOfTarkovExtraction
              extractionList={mapOfTarkov.extraction_info}
              headerText="탈출구"
            />
          )}
      {!mapOfTarkov
        ? Array(3)
            .fill(null)
            .map((_, index) => (
              <DividerContents headText={"Transits"}>
                <GridContents
                  key={index}
                  columnDesign={[2, null, 10]}
                  id={`armband-null-${index}`}
                >
                  <GridItem colSpan={2}>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Skeleton height="110px" width="100%" />
                    </Box>
                  </GridItem>
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
                  <GridItem colSpan={2}>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Skeleton height="110px" width="100%" />
                    </Box>
                  </GridItem>
                  <GridCenterText>
                    <Skeleton height="20px" width="120px" />
                  </GridCenterText>
                </GridContents>
              </DividerContents>
            ))
        : mapOfTarkov.transits_info.length > 0 && (
            <MapOfTarkovExtraction
              extractionList={mapOfTarkov.transits_info}
              headerText="Transits"
            />
          )}
    </Box>
  );
}
