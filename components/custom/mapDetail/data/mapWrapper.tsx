"use client";
import JpgViewDetail from "@/components/custom/mapDetail/data/jpgView/jpgViewDetail";
import ItemSelector from "@/components/custom/mapDetail/data/itemSelector";
import SubMapSelector from "@/components/custom/mapDetail/data/subMapSelector";
import ThreeViewDetail from "@/components/custom/mapDetail/data/threeView/threeViewDetail";
import { useItemFilter } from "@/lib/hooks/useItemFilter";
import type { MapWrapper } from "@/components/custom/mapDetail/data/mapType";
import AdBanner from "../../adsense/adBanner";
import TextSpan from "../../gridContents/textSpan";

export default function MapWrapper({ mapData, onClickMapAction }: MapWrapper) {
  const { viewItemList, onClickItem, onClickAllItem } = useItemFilter(
    mapData.jpg_item_path
  );

  return (
    <div className={"rounded-lg p-[20px] m-[5px] w-full h-full"}>
      <ItemSelector
        originItemList={mapData.jpg_item_path}
        viewItemList={viewItemList}
        onClickItemAction={onClickItem}
        onClickAllItemAction={onClickAllItem}
      />
      <SubMapSelector onClickMapAction={onClickMapAction} mapId={mapData.id} />
      <div className={"flex flex-col gap-4"}>
        <TextSpan isCenter={false} size="xl">
          2D Map
        </TextSpan>
        <JpgViewDetail map={mapData} viewItemList={viewItemList} />
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
        <TextSpan isCenter={false} size="xl">
          3D Map
        </TextSpan>
        <ThreeViewDetail
          key={mapData.id}
          mapData={mapData}
          viewItemList={viewItemList}
        />
      </div>
    </div>
  );
}
