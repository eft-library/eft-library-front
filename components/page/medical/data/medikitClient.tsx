"use client";

import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { checkViewMedical } from "@/lib/func/jsxfunction";
import type { MediKitClient } from "./medicalTypes";

export default function MediKitClient({ medicalList }: MediKitClient) {
  const { medicalCategory } = useAppStore((state) => state);
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, medicalList, "MEDICAL");

  if (medicalCategory !== "ALL" && medicalCategory !== "Medikit") return null;

  return (
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
              cols="10"
              pageId={pageId}
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
              <CenterContents colSpan="2">
                <TextSpan size="sm">{medikit.name_kr}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{medikit.info.hitpoints}</TextSpan>
              </CenterContents>
              <CenterContents isCol colSpan="2">
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
              <CenterContents colSpan="2">
                <TextSpan>-</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>-</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{medikit.info.use_time} 초</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
