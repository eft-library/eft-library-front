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
          checkViewMedical(medicalCategory, medikit.category, "Medikit") && (
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
                  popWidth={220}
                  popHeight={180}
                  size="240px"
                  wrapWidth={240}
                  wrapHeight={100}
                />
              </CenterContents>
              <CenterContents colSpan="2">
                <TextSpan size="sm">{medikit.name_kr}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{medikit.hitpoints}</TextSpan>
              </CenterContents>
              <CenterContents isCol colSpan="2">
                {medikit.cures_kr && medikit.cures_kr.length > 0 ? (
                  medikit.cures_kr.map((cures, index) => (
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
                <TextSpan>{medikit.use_time} 초</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
