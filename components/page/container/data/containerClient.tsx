"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { ContainerList } from "./containerTypes";
import { useState } from "react";
import { filteringData, highlightMatchedText } from "@/lib/func/jsxfunction";
import { Input } from "@/components/ui/input";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { containerTableColumn } from "@/lib/consts/columnConsts";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function ContainerClient({ containerList }: ContainerList) {
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
      <TableColumn
        columnDesign={6}
        columnData={containerTableColumn}
        isNameLarge
      />
      {containerList.map(
        (container) =>
          filteringData(
            word,
            container.name.en,
            container.name.ko,
            container.name.ja
          ) && (
            <DefineGrid
              id={container.id}
              cols="6"
              key={container.id}
              isDetail
              detailLink={`/item/${container.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={container.image}
                  alt={container.name.en}
                  popWidth={container.image_width * 128}
                  popHeight={container.image_height * 128}
                  wrapWidth={container.image_width * 64}
                  wrapHeight={container.image_height * 64}
                  size={(container.image_width * 64).toString()}
                />
              </CenterContents>
              <CenterContents colSpan="3">
                {highlightMatchedText(container.name[localeKey], word)}
              </CenterContents>
              <CenterContents>
                <TextSpan>{container.info.capacity}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>
                  {container.info.grids[0].width} X
                  {container.info.grids[0].height}
                </TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
