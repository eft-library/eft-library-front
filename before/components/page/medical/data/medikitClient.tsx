"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { MediKitClient } from "./medicalTypes";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { medikitTableColumn } from "@/lib/consts/columnConsts";
import {
  filteringData,
  hasMatchInList,
  highlightMatchedText,
} from "@/lib/func/jsxfunction";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function MediKitClient({
  medicalList,
  searchWord,
}: MediKitClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <>
      {hasMatchInList(medicalList, searchWord) && (
        <TableColumn columnDesign={5} columnData={medikitTableColumn} />
      )}
      <div className="w-full">
        {medicalList.map(
          (medikit) =>
            filteringData(
              searchWord,
              medikit.name.en,
              medikit.name.ko,
              medikit.name.ja
            ) && (
              <DefineGrid
                key={medikit.id}
                id={medikit.id}
                cols="5"
                isDetail
                detailLink={`/item/${medikit.url_mapping}`}
              >
                <CenterContents>
                  <ImageView
                    src={medikit.image}
                    alt={medikit.name.en}
                    popWidth={medikit.image_width * 128}
                    popHeight={medikit.image_height * 128}
                    size={(medikit.image_width * 64).toString()}
                    wrapWidth={medikit.image_width * 64}
                    wrapHeight={medikit.image_height * 64}
                  />
                </CenterContents>
                <CenterContents>
                  {highlightMatchedText(medikit.name[localeKey], searchWord)}
                </CenterContents>
                <CenterContents>
                  <TextSpan>{medikit.info.hitpoints}</TextSpan>
                </CenterContents>
                <CenterContents isCol>
                  {medikit.info.cures &&
                  medikit.info.cures[localeKey] &&
                  medikit.info.cures[localeKey].length > 0 ? (
                    medikit.info.cures[localeKey].map((cures, index) => (
                      <TextSpan
                        key={`${medikit.id}-cures-${index}`}
                        isCenter={false}
                      >
                        {cures}
                      </TextSpan>
                    ))
                  ) : (
                    <TextSpan>-</TextSpan>
                  )}
                </CenterContents>
                <CenterContents>
                  <TextSpan>{medikit.info.use_time} 초</TextSpan>
                </CenterContents>
              </DefineGrid>
            )
        )}
      </div>
    </>
  );
}
