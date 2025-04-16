"use client";

import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { checkViewMedical } from "@/lib/func/jsxfunction";
import type { MediKitClient } from "./medicalTypes";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { medikitTableColumn } from "@/lib/consts/columnConsts";

export default function MediKitClient({ medicalList }: MediKitClient) {
  const { medicalCategory } = useAppStore((state) => state);
  const param = useSearchParams();
  const pageId = param.get("id") || "";

  if (medicalCategory !== "ALL" && medicalCategory !== "Medikit") return null;

  return (
    <>
      <TableColumn columnDesign={5} columnData={medikitTableColumn} />
      <div className="w-full">
        {medicalList.map(
          (medikit) =>
            checkViewMedical(
              medicalCategory,
              medikit.info.medical_category,
              "Medikit"
            ) && (
              <DefineGrid
                key={medikit.id}
                id={medikit.id}
                cols="5"
                pageId={pageId}
                isDetail
                detailLink={`/item/${medikit.url_mapping}`}
              >
                <CenterContents>
                  <ImageView
                    src={medikit.image}
                    alt={medikit.name_en}
                    popWidth={medikit.image_width * 128}
                    popHeight={medikit.image_height * 128}
                    size={(medikit.image_width * 64).toString()}
                    wrapWidth={medikit.image_width * 64}
                    wrapHeight={medikit.image_height * 64}
                  />
                </CenterContents>
                <CenterContents>
                  <TextSpan size="sm">{medikit.name_kr}</TextSpan>
                </CenterContents>
                <CenterContents>
                  <TextSpan>{medikit.info.hitpoints}</TextSpan>
                </CenterContents>
                <CenterContents isCol>
                  {medikit.info.cures_kr && medikit.info.cures_kr.length > 0 ? (
                    medikit.info.cures_kr.map((cures, index) => (
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
