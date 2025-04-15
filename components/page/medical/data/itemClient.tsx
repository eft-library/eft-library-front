"use client";

import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { checkViewMedical } from "@/lib/func/jsxfunction";
import type { ItemClient } from "./medicalTypes";

export default function ItemClient({ medicalList }: ItemClient) {
  const { medicalCategory } = useAppStore((state) => state);
  const param = useSearchParams();
  const pageId = param.get("id") || "";

  if (medicalCategory !== "ALL" && medicalCategory !== "Medical item")
    return null;

  return (
    <div className="w-full">
      {medicalList.map(
        (item) =>
          checkViewMedical(
            medicalCategory,
            item.info.medical_category,
            "Medical item"
          ) && (
            <DefineGrid
              cols="10"
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

              <CenterContents colSpan="2">
                <TextSpan size="sm">{item.name_kr}</TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan>-</TextSpan>
              </CenterContents>

              <CenterContents isCol colSpan="2">
                {item.info.cures_kr.map((cures, index) => (
                  <TextSpan key={`${index}-cures`} isCenter={false}>
                    {cures}
                  </TextSpan>
                ))}
              </CenterContents>

              <CenterContents colSpan="2">
                <TextSpan>-</TextSpan>
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
  );
}
