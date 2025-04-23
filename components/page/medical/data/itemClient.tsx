"use client";

import { useSearchParams } from "next/navigation";
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

export default function ItemClient({ medicalList, searchWord }: ItemClient) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";

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
              item.name_en,
              item.name_kr,
              item.name_kr
            ) && (
              <DefineGrid
                cols="5"
                id={item.id}
                pageId={pageId}
                key={item.id}
                isDetail
                detailLink={`/item/${item.url_mapping}`}
              >
                <CenterContents>
                  <ImageView
                    src={item.image}
                    alt={item.name_en}
                    popWidth={item.image_width * 128}
                    popHeight={item.image_height * 128}
                    size={(item.image_width * 64).toString()}
                    wrapWidth={item.image_width * 64}
                    wrapHeight={item.image_height * 64}
                  />
                </CenterContents>

                <CenterContents>
                  {highlightMatchedText(item.name_kr, searchWord)}
                </CenterContents>

                <CenterContents isCol>
                  {item.info.cures_kr.map((cures, index) => (
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
