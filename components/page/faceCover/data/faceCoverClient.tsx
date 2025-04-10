"use client";

import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { FaceCoverClient } from "./faceCoverTypes";

export default function FaceCoverClient({
  face_cover_data,
  isClass,
}: FaceCoverClient) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, face_cover_data);

  return (
    <div className="w-full">
      {isClass &&
        face_cover_data.class_face_cover.map((faceCover) => (
          <DefineGrid
            id={faceCover.id}
            pageId={pageId}
            cols="7"
            key={faceCover.id}
          >
            <CenterContents>
              <ImageView
                src={faceCover.image}
                alt={faceCover.name_en}
                popWidth={faceCover.image_width * 128}
                popHeight={faceCover.image_height * 128}
                size={(faceCover.image_width * 64).toString()}
                wrapWidth={faceCover.image_width * 64}
                wrapHeight={faceCover.image_height * 64}
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{faceCover.name_kr}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{faceCover.info.class_value}</TextSpan>
            </CenterContents>
            <CenterContents isCol>
              <TextSpan>
                {faceCover.info.areas_kr.map((area, index) => (
                  <TextSpan key={`${index}-area-${faceCover.id}`}>
                    {area}
                  </TextSpan>
                ))}
              </TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{faceCover.info.durability}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{faceCover.info.ricochet_str_kr}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{faceCover.info.weight} kg</TextSpan>
            </CenterContents>
          </DefineGrid>
        ))}

      {!isClass &&
        face_cover_data.no_class_face_cover.map((faceCover) => (
          <DefineGrid
            id={faceCover.id}
            pageId={pageId}
            cols="2"
            key={faceCover.id}
          >
            <CenterContents>
              <ImageView
                src={faceCover.image}
                alt={faceCover.name_en}
                popWidth={faceCover.image_width * 128}
                popHeight={faceCover.image_height * 128}
                size={(faceCover.image_width * 64).toString()}
                wrapWidth={faceCover.image_width * 64}
                wrapHeight={faceCover.image_height * 64}
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{faceCover.name_kr}</TextSpan>
            </CenterContents>
          </DefineGrid>
        ))}
    </div>
  );
}
