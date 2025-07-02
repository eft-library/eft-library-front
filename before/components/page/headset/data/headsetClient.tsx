"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import type { HeadsetList } from "./headsetTypes";
import { useState } from "react";
import { filteringData, highlightMatchedText } from "@/lib/func/jsxfunction";
import { Input } from "@/components/ui/input";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { imageNameTableColumn } from "@/lib/consts/columnConsts";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { placeHolderText } from "@/lib/consts/i18nConsts";

export default function HeadsetClient({ headsetList }: HeadsetList) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [word, setWord] = useState<string>("");

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex gap-2 mb-2 justify-end">
        <Input
          className="text-base font-bold border-white placeholder:text-SilverGray w-[400px] border-2"
          value={word}
          placeholder={placeHolderText.search[localeKey]}
          onChange={(e) => setWord(e.currentTarget.value)}
        />
      </div>
      <TableColumn columnDesign={2} columnData={imageNameTableColumn} />
      {headsetList.map(
        (headset) =>
          filteringData(
            word,
            headset.name.en,
            headset.name.ko,
            headset.name.ja
          ) && (
            <DefineGrid
              cols="2"
              id={headset.id}
              key={headset.id}
              isDetail
              detailLink={`/item/${headset.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={headset.image}
                  alt={headset.name.en}
                  popWidth={headset.image_width * 128}
                  popHeight={headset.image_height * 128}
                  size={(headset.image_width * 64).toString()}
                  wrapWidth={headset.image_width * 64}
                  wrapHeight={headset.image_height * 64}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(headset.name[localeKey], word)}
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
