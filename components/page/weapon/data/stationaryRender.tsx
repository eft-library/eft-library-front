"use client";

import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { StationaryRender } from "./weaponTypes";
import {
  filteringData,
  hasMatchInList,
  highlightMatchedText,
} from "@/lib/func/jsxfunction";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { stationaryTableColumn } from "@/lib/consts/columnConsts";
import { useLocale } from "next-intl";
import { getLocaleKey, getModesLocaleKey } from "@/lib/func/localeFunction";

export default function StationaryRender({
  stationaryList,
  searchWord,
}: StationaryRender) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const param = useSearchParams();
  const pageId = param.get("id") || "";

  return (
    <div className="flex flex-col gap-4 w-full">
      {hasMatchInList(stationaryList, searchWord) && (
        <TableColumn columnData={stationaryTableColumn} columnDesign={5} />
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
              cols="5"
              id={stationary.id}
              pageId={pageId}
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
              <CenterContents>
                <TextSpan>{stationary.info.carliber}</TextSpan>
              </CenterContents>
              <CenterContents isCol>
                {stationary.info.modes &&
                  stationary.info.modes[getModesLocaleKey(locale)].map(
                    (area, index) => (
                      <TextSpan key={`${index}-area-${stationary.id}`}>
                        {area}
                      </TextSpan>
                    )
                  )}
              </CenterContents>
              <CenterContents>
                <TextSpan>{stationary.info.fire_rate}</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
