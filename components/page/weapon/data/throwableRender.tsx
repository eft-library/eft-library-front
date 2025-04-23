"use client";

import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import {
  detailThrowable,
  throwableTableColumn,
} from "@/lib/consts/columnConsts";
import type { ThrowableRender } from "./weaponTypes";
import {
  filteringData,
  hasMatchInList,
  highlightMatchedText,
} from "@/lib/func/jsxfunction";
import TableColumn from "@/components/custom/tableColumn/tableColumn";

export default function ThrowableRender({
  throwableList,
  searchWord,
}: ThrowableRender) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";

  return (
    <div className="flex flex-col gap-4 w-full">
      {hasMatchInList(throwableList, searchWord) && (
        <TableColumn columnData={throwableTableColumn} columnDesign={5} />
      )}
      {throwableList.map(
        (throwable) =>
          filteringData(
            searchWord,
            throwable.name_en,
            throwable.name_kr,
            throwable.name_kr
          ) && (
            <DefineGrid
              cols="5"
              id={throwable.id}
              pageId={pageId}
              key={throwable.id}
              isDetail
              detailLink={`/item/${throwable.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={throwable.image}
                  alt={throwable.name_en}
                  popWidth={throwable.image_width * 128}
                  popHeight={throwable.image_height * 128}
                  size={(throwable.image_width * 64).toString()}
                  wrapWidth={throwable.image_width * 64}
                  wrapHeight={throwable.image_height * 64}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(throwable.name_kr, searchWord)}
              </CenterContents>
              <CenterContents>
                <TextSpan>
                  {detailThrowable.includes(throwable.name_kr) ? (
                    <div className="flex flex-col">
                      <TextSpan>충격시 {throwable.info.min_fuse} 초</TextSpan>
                      <TextSpan size="sm">
                        (충격 신관이 발동되지 않은 경우 {throwable.info.fuse}{" "}
                        초)
                      </TextSpan>
                    </div>
                  ) : (
                    <TextSpan>{throwable.info.fuse} 초</TextSpan>
                  )}
                </TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>
                  {throwable.info.min_explosion_distance} ~&nbsp;
                  {throwable.info.max_explosion_distance} m
                </TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{throwable.info.fragments} m</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
