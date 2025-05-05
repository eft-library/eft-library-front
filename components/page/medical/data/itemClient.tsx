"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { ItemClient } from "./medicalTypes";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { medicalItemTableColumn } from "@/lib/consts/columnConsts";
import {
  filteringData,
  highlightMatchedText,
  hasMatchInList,
} from "@/lib/func/jsxfunction";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function ItemClient({ medicalList, searchWord }: ItemClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <>
      {hasMatchInList(medicalList, searchWord) && (
        <TableColumn columnDesign={5} columnData={medicalItemTableColumn} />
      )}

      <div className="w-full">
        {medicalList.map(
          (item) =>
            filteringData(
              searchWord,
              item.name.en,
              item.name.ko,
              item.name.ja
            ) && (
              <DefineGrid
                cols="5"
                id={item.id}
                key={item.id}
                isDetail
                detailLink={`/item/${item.url_mapping}`}
              >
                <CenterContents>
                  <ImageView
                    src={item.image}
                    alt={item.name.en}
                    popWidth={item.image_width * 128}
                    popHeight={item.image_height * 128}
                    size={(item.image_width * 64).toString()}
                    wrapWidth={item.image_width * 64}
                    wrapHeight={item.image_height * 64}
                  />
                </CenterContents>

                <CenterContents>
                  {highlightMatchedText(item.name[localeKey], searchWord)}
                </CenterContents>

                <CenterContents isCol>
                  {item.info.cures &&
                    item.info.cures[localeKey] &&
                    item.info.cures[localeKey].map((cures, index) => (
                      <TextSpan key={`${index}-cures`} isCenter={false}>
                        {cures}
                      </TextSpan>
                    ))}
                </CenterContents>

                <CenterContents>
                  <TextSpan>{item.info.uses}</TextSpan>
                </CenterContents>

                <CenterContents>
                  <TextSpan>{item.info.use_time} 초</TextSpan>
                </CenterContents>
              </DefineGrid>
            )
        )}
      </div>
    </>
  );
}
