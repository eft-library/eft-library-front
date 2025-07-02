"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import { imageNameTableColumn } from "@/lib/consts/columnConsts";
import type { ThrowableRender } from "./weaponTypes";
import {
  filteringData,
  hasMatchInList,
  highlightMatchedText,
} from "@/lib/func/jsxfunction";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function ThrowableRender({
  throwableList,
  searchWord,
}: ThrowableRender) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="flex flex-col gap-4 w-full">
      {hasMatchInList(throwableList, searchWord) && (
        <TableColumn columnData={imageNameTableColumn} columnDesign={2} />
      )}
      {throwableList.map(
        (throwable) =>
          filteringData(
            searchWord,
            throwable.name.en,
            throwable.name.ko,
            throwable.name.ja
          ) && (
            <DefineGrid
              cols="2"
              id={throwable.id}
              key={throwable.id}
              isDetail
              detailLink={`/item/${throwable.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={throwable.image}
                  alt={throwable.name.en}
                  popWidth={throwable.image_width * 128}
                  popHeight={throwable.image_height * 128}
                  size={(throwable.image_width * 64).toString()}
                  wrapWidth={throwable.image_width * 64}
                  wrapHeight={throwable.image_height * 64}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(throwable.name[localeKey], searchWord)}
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
