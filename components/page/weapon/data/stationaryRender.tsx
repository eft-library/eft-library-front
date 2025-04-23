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

export default function StationaryRender({
  stationaryList,
  searchWord,
}: StationaryRender) {
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
            stationary.name_en,
            stationary.name_kr,
            stationary.name_kr
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
                  alt={stationary.name_en}
                  popWidth={1200}
                  popHeight={800}
                  size="240px"
                  wrapWidth={240}
                  wrapHeight={140}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(stationary.name_kr, searchWord)}
              </CenterContents>
              <CenterContents>
                <TextSpan>{stationary.info.carliber}</TextSpan>
              </CenterContents>
              <CenterContents isCol>
                {stationary.info.modes_kr.map((mode, index) => (
                  <TextSpan key={`mode-${mode}-${index}`} isCenter={false}>
                    {mode}
                  </TextSpan>
                ))}
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
