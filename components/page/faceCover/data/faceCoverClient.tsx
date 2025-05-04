"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { FaceCoverClient } from "./faceCoverTypes";
import {
  faceCoverClassTableColumn,
  imageNameTableColumn,
} from "@/lib/consts/columnConsts";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { useState } from "react";
import {
  filteringData,
  hasMatchInList,
  highlightMatchedText,
} from "@/lib/func/jsxfunction";
import { Input } from "@/components/ui/input";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function FaceCoverClient({ face_cover_data }: FaceCoverClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [word, setWord] = useState<string>("");

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
          columnDesign={6}
          columnData={faceCoverClassTableColumn}
          isNameLarge
        />
      )}

      {face_cover_data.class_face_cover.map(
        (faceCover) =>
          filteringData(
            word,
            faceCover.name.en,
            faceCover.name.ko,
            faceCover.name.ja
          ) && (
            <DefineGrid
              id={faceCover.id}
              cols="6"
              key={faceCover.id}
              isDetail
              detailLink={`/item/${faceCover.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={faceCover.image}
                  alt={faceCover.name.en}
                  popWidth={faceCover.image_width * 128}
                  popHeight={faceCover.image_height * 128}
                  size={(faceCover.image_width * 64).toString()}
                  wrapWidth={faceCover.image_width * 64}
                  wrapHeight={faceCover.image_height * 64}
                />
              </CenterContents>
              <CenterContents colSpan="3">
                {highlightMatchedText(faceCover.name[localeKey], word)}
              </CenterContents>
              <CenterContents>
                <TextSpan>{faceCover.info.class_value}</TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan>{faceCover.info.durability}</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}

      {hasMatchInList(face_cover_data.no_class_face_cover, word) && (
        <TableColumn columnDesign={2} columnData={imageNameTableColumn} />
      )}
      {face_cover_data.no_class_face_cover.map(
        (faceCover) =>
          filteringData(
            word,
            faceCover.name.en,
            faceCover.name.ko,
            faceCover.name.ja
          ) && (
            <DefineGrid
              id={faceCover.id}
              cols="2"
              key={faceCover.id}
              isDetail
              detailLink={`/item/${faceCover.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={faceCover.image}
                  alt={faceCover.name.en}
                  popWidth={faceCover.image_width * 128}
                  popHeight={faceCover.image_height * 128}
                  size={(faceCover.image_width * 64).toString()}
                  wrapWidth={faceCover.image_width * 64}
                  wrapHeight={faceCover.image_height * 64}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(faceCover.name[localeKey], word)}
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
