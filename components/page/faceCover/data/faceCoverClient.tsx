"use client";

import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { FaceCoverClient } from "./faceCoverTypes";
import {
  faceCoverClassTableColumn,
  faceCoverNoClassTableColumn,
} from "@/lib/consts/columnConsts";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { useState } from "react";
import {
  filteringData,
  hasMatchInList,
  highlightMatchedText,
} from "@/lib/func/jsxfunction";
import { Input } from "@/components/ui/input";

export default function FaceCoverClient({ face_cover_data }: FaceCoverClient) {
  const [word, setWord] = useState<string>("");
  const param = useSearchParams();
  const pageId = param.get("id") || "";

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex gap-2 mb-2 justify-end">
        <Input
          className="text-base font-bold border-white placeholder:text-SilverGray w-[400px] border-2"
          value={word}
          placeholder="이름을 최소 2글자 입력하세요"
          onChange={(e) => setWord(e.currentTarget.value)}
        />
      </div>
      {hasMatchInList(face_cover_data.class_face_cover, word) && (
        <TableColumn
          columnDesign={10}
          columnData={faceCoverClassTableColumn}
          isFaceCover
        />
      )}

      {face_cover_data.class_face_cover.map(
        (faceCover) =>
          filteringData(
            word,
            faceCover.name_en,
            faceCover.name_kr,
            faceCover.name_kr
          ) && (
            <DefineGrid
              id={faceCover.id}
              pageId={pageId}
              cols="10"
              key={faceCover.id}
              isDetail
              detailLink={`/item/${faceCover.url_mapping}`}
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
              <CenterContents colSpan="4">
                {highlightMatchedText(faceCover.name_kr, word)}
              </CenterContents>
              <CenterContents>
                <TextSpan>{faceCover.info.class_value}</TextSpan>
              </CenterContents>
              <CenterContents isCol>
                {faceCover.info.areas_kr.map((area, index) => (
                  <TextSpan key={`${index}-area-${faceCover.id}`}>
                    {area}
                  </TextSpan>
                ))}
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
          )
      )}

      {hasMatchInList(face_cover_data.no_class_face_cover, word) && (
        <TableColumn
          columnDesign={2}
          columnData={faceCoverNoClassTableColumn}
        />
      )}
      {face_cover_data.no_class_face_cover.map(
        (faceCover) =>
          filteringData(
            word,
            faceCover.name_en,
            faceCover.name_kr,
            faceCover.name_kr
          ) && (
            <DefineGrid
              id={faceCover.id}
              pageId={pageId}
              cols="2"
              key={faceCover.id}
              isDetail
              detailLink={`/item/${faceCover.url_mapping}`}
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
                {highlightMatchedText(faceCover.name_kr, word)}
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
