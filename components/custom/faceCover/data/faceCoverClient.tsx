"use client";

import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";
import DefineGrid from "../../gridContents/defineGrid";
import CenterContents from "../../gridContents/centerContents";
import TextSpan from "../../gridContents/textSpan";

interface FaceCoverClient {
  face_cover_data: FaceCoverData;
  isClass: boolean;
}

interface FaceCoverData {
  class_face_cover: DefenseData[];
  no_class_face_cover: DefenseData[];
}

interface DefenseData {
  id: string;
  durability: number;
  class_value: number;
  areas_kr: string[];
  weight: number;
  name: string;
  image: string;
  ricochet_str_kr: string;
}

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
                alt={faceCover.name}
                popWidth={220}
                popHeight={240}
                size="240px"
                wrapWidth={240}
                wrapHeight={100}
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{faceCover.name}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{faceCover.class_value}</TextSpan>
            </CenterContents>
            <CenterContents isCol>
              <TextSpan>
                {faceCover.areas_kr.map((area, index) => (
                  <TextSpan key={`${index}-area-${faceCover.id}`}>
                    {area}
                  </TextSpan>
                ))}
              </TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{faceCover.durability}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{faceCover.ricochet_str_kr}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{faceCover.weight} kg</TextSpan>
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
                alt={faceCover.name}
                popWidth={220}
                popHeight={240}
                size="240px"
                wrapWidth={240}
                wrapHeight={100}
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{faceCover.name}</TextSpan>
            </CenterContents>
          </DefineGrid>
        ))}
    </div>
  );
}
