"use client";
import JpgViewDetail from "@/components/page/mapDetail/data/jpgView/jpgViewDetail";
import ItemSelector from "@/components/page/mapDetail/data/itemSelector";
import SubMapSelector from "@/components/page/mapDetail/data/subMapSelector";
import ThreeViewDetail from "@/components/page/mapDetail/data/threeView/threeViewDetail";
import { useItemFilter } from "@/lib/hooks/useItemFilter";
import type { MapWrapper } from "@/components/page/mapDetail/data/mapType";
import AdBanner from "../../../custom/adsense/adBanner";
import TextSpan from "../../../custom/gridContents/textSpan";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { interactiveMapI18N } from "@/lib/consts/i18nConsts";

export default function MapWrapper({
  mapData,
  mapSelector,
  onClickMapAction,
}: MapWrapper) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
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
      <SubMapSelector
        onClickMapAction={onClickMapAction}
        mapData={mapData}
        mapSelector={mapSelector}
      />
      <div className={"flex flex-col gap-4 items-center"}>
        <div className="w-full">
          <TextSpan isCenter={false} size="xl">
            2D Map
          </TextSpan>
        </div>
        <JpgViewDetail map={mapData} viewItemList={viewItemList} />
        <div className="w-[1200px]">
          <AdBanner
            dataAdFormat={"auto"}
            dataFullWidthResponsive={true}
            dataAdSlot="2690838054"
          />
        </div>
        <div className="w-full flex justify-between">
          <TextSpan isCenter={false} size="xl">
            3D Map
          </TextSpan>
          <TextSpan textColor="GoldenYellow">
            {interactiveMapI18N.control[localeKey]}
          </TextSpan>
        </div>
        <ThreeViewDetail
          key={mapData.id}
          mapData={mapData}
          viewItemList={viewItemList}
        />
      </div>
    </div>
  );
}
