"use client";

import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { floatToPercent } from "@/lib/func/jsxfunction";
import type { GlassesClient } from "./glassesTypes";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  filteringData,
  hasMatchInList,
  highlightMatchedText,
} from "@/lib/func/jsxfunction";
import {
  glassesClassColumn,
  glassesNoClassColumn,
} from "@/lib/consts/columnConsts";

export default function GlassesClient({ glassesData }: GlassesClient) {
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

      {hasMatchInList(glassesData.class_glasses, word) && (
        <TableColumn columnDesign={5} columnData={glassesClassColumn} />
      )}
      {glassesData.class_glasses.map(
        (glasses) =>
          filteringData(
            word,
            glasses.name_en,
            glasses.name_kr,
            glasses.name_kr
          ) && (
            <DefineGrid
              id={glasses.id}
              pageId={pageId}
              cols="5"
              key={glasses.id}
              isDetail
              detailLink={`/item/${glasses.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={glasses.image}
                  alt={glasses.name_en}
                  popWidth={glasses.image_width * 128}
                  popHeight={glasses.image_height * 128}
                  wrapWidth={glasses.image_width * 64}
                  wrapHeight={glasses.image_height * 64}
                  size={(glasses.image_width * 64).toString()}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(glasses.name_kr, word)}
              </CenterContents>
              <CenterContents>
                <TextSpan>{glasses.info.class_value}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{glasses.info.durability}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>
                  {floatToPercent(glasses.info.blindness_protection)} %
                </TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}

      {hasMatchInList(glassesData.no_class_glasses, word) && (
        <TableColumn columnDesign={3} columnData={glassesNoClassColumn} />
      )}
      {glassesData.no_class_glasses.map(
        (glasses) =>
          filteringData(
            word,
            glasses.name_en,
            glasses.name_kr,
            glasses.name_kr
          ) && (
            <DefineGrid
              id={glasses.id}
              pageId={pageId}
              cols="3"
              key={glasses.id}
              isDetail
              detailLink={`/item/${glasses.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={glasses.image}
                  alt={glasses.name_en}
                  popWidth={glasses.image_width * 128}
                  popHeight={glasses.image_height * 128}
                  wrapWidth={glasses.image_width * 64}
                  wrapHeight={glasses.image_height * 64}
                  size={(glasses.image_width * 64).toString()}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(glasses.name_kr, word)}
              </CenterContents>
              <CenterContents>
                <TextSpan>
                  {floatToPercent(glasses.info.blindness_protection)} %
                </TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
