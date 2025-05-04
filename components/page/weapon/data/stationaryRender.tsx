"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import type { StationaryRender } from "./weaponTypes";
import {
  filteringData,
  hasMatchInList,
  highlightMatchedText,
} from "@/lib/func/jsxfunction";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { stationaryTableColumn } from "@/lib/consts/columnConsts";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function StationaryRender({
  stationaryList,
  searchWord,
}: StationaryRender) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="flex flex-col gap-4 w-full">
      {hasMatchInList(stationaryList, searchWord) && (
        <TableColumn columnData={stationaryTableColumn} columnDesign={2} />
      )}
      {stationaryList.map(
        (stationary) =>
          filteringData(
            searchWord,
            stationary.name.en,
            stationary.name.ko,
            stationary.name.ja
          ) && (
            <DefineGrid
              cols="2"
              id={stationary.id}
              key={stationary.id}
              isDetail
              detailLink={`/item/${stationary.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={stationary.image}
                  alt={stationary.name.en}
                  popWidth={1200}
                  popHeight={800}
                  size="240px"
                  wrapWidth={240}
                  wrapHeight={140}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(stationary.name[localeKey], searchWord)}
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
