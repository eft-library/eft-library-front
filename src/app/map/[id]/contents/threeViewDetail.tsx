import { Box, Text, Stack } from "@chakra-ui/react";
import ItemSelector from "./itemSelector";
import SubMapSelector from "./subMapSelector";
import JPGView from "./jpgView";
import ThreeView from "./three/threeView";
import { useItemFilter } from "@/hooks/useItemFilter";
import type { MapDetail } from "@/types/types";
import JPGSkeleton from "../skeleton/jpgSkeleton";
import ThreeSkeleton from "../skeleton/threeSkeleton";
import ItemSelectorSkeleton from "../skeleton/itemSelectorSkeleton";
import PageParent from "@/components/pageParent/pageParent";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import AdBanner from "@/components/adsense/adBanner";

export default function ThreeViewDetail({ mapData, onClickMap }: MapDetail) {
  const { viewItemList, onClickItem, onClickAllItem } = useItemFilter(
    mapData.jpg_item_path
  );

  if (!viewItemList)
    return (
      <PageParent>
        <ItemSelectorSkeleton />
        <JPGSkeleton />
        <ThreeSkeleton />
      </PageParent>
    );

  return (
    <Box
      className="CenterBox"
      borderRadius="lg"
      padding="20px"
      margin="5px"
      width="100%"
      height="100%"
    >
      <ItemSelector
        originItemList={mapData.jpg_item_path}
        viewItemList={viewItemList}
        onClickItem={onClickItem}
        onClickAllItem={onClickAllItem}
      />
      <SubMapSelector onClickMap={onClickMap} mapId={mapData.id} />
      <Stack spacing={4}>
        <Text as={"b"} color={ALL_COLOR.WHITE}>
          2D MAP
        </Text>
        <JPGView map={mapData} viewItemList={viewItemList} />
        <br />
        <AdBanner
          dataAdFormat={"fluid"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
        <br />
        <Text as={"b"} color={ALL_COLOR.WHITE}>
          3D MAP
        </Text>
        <ThreeView key={mapData.id} map={mapData} viewItemList={viewItemList} />
      </Stack>
    </Box>
  );
}
