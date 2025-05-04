"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import type { ArmBandList } from "./armBandType";
import { useState } from "react";
import { filteringData, highlightMatchedText } from "@/lib/func/jsxfunction";
import { Input } from "@/components/ui/input";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { imageNameTableColumn } from "@/lib/consts/columnConsts";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function ArmBandClient({ armBandList }: ArmBandList) {
  const [word, setWord] = useState<string>("");
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
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
      <TableColumn columnData={imageNameTableColumn} columnDesign={2} />
      {armBandList.map(
        (armBand) =>
          filteringData(
            word,
            armBand.name.en,
            armBand.name.ko,
            armBand.name.ja
          ) && (
            <DefineGrid
              id={armBand.id}
              cols="2"
              key={armBand.id}
              isDetail
              detailLink={`/item/${armBand.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={armBand.image}
                  alt={armBand.name.en}
                  popWidth={armBand.image_width * 128}
                  popHeight={armBand.image_height * 128}
                  wrapWidth={armBand.image_width * 64}
                  wrapHeight={armBand.image_height * 64}
                  size={(armBand.image_width * 64).toString()}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(armBand.name[localeKey], word)}
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
