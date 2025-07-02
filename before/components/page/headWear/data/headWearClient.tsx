"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { HeadWearClient } from "./headwearTypes";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { useState } from "react";
import {
  filteringData,
  hasMatchInList,
  highlightMatchedText,
} from "@/lib/func/jsxfunction";
import { Input } from "@/components/ui/input";
import {
  headwearClassTableColumn,
  imageNameTableColumn,
} from "@/lib/consts/columnConsts";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { placeHolderText } from "@/lib/consts/i18nConsts";

export default function HeadWearClient({ headWearData }: HeadWearClient) {
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
      {hasMatchInList(headWearData.class_headwear, word) && (
        <TableColumn
          columnDesign={6}
          columnData={headwearClassTableColumn}
          isNameLarge
        />
      )}
      {headWearData.class_headwear.map(
        (headWear) =>
          filteringData(
            word,
            headWear.name.en,
            headWear.name.ko,
            headWear.name.ja
          ) && (
            <DefineGrid
              id={headWear.id}
              cols="6"
              key={headWear.id}
              isDetail
              detailLink={`/item/${headWear.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={headWear.image}
                  alt={headWear.name.en}
                  popWidth={headWear.image_width * 128}
                  popHeight={headWear.image_height * 128}
                  size={(headWear.image_width * 64).toString()}
                  wrapWidth={headWear.image_width * 64}
                  wrapHeight={headWear.image_height * 64}
                />
              </CenterContents>
              <CenterContents colSpan="3">
                {highlightMatchedText(headWear.name[localeKey], word)}
              </CenterContents>
              <CenterContents>
                <TextSpan>{headWear.info.class_value}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{headWear.info.durability}</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}

      {hasMatchInList(headWearData.no_class_headwear, word) && (
        <TableColumn columnDesign={2} columnData={imageNameTableColumn} />
      )}
      {headWearData.no_class_headwear.map(
        (headWear) =>
          filteringData(
            word,
            headWear.name.en,
            headWear.name.ko,
            headWear.name.ja
          ) && (
            <DefineGrid
              id={headWear.id}
              cols="2"
              key={headWear.id}
              isDetail
              detailLink={`/item/${headWear.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={headWear.image}
                  alt={headWear.name.en}
                  popWidth={headWear.image_width * 128}
                  popHeight={headWear.image_height * 128}
                  size={(headWear.image_width * 64).toString()}
                  wrapWidth={headWear.image_width * 64}
                  wrapHeight={headWear.image_height * 64}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(headWear.name[localeKey], word)}
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
