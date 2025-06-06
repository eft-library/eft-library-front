"use client";

import ImageView from "../../../custom/imageView/imageView";
import TextSpan from "../../../custom/gridContents/textSpan";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import type { KeyClient } from "./keyTypes";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { keyTableColumn } from "@/lib/consts/columnConsts";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { filteringData, highlightMatchedText } from "@/lib/func/jsxfunction";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { placeHolderText } from "@/lib/consts/i18nConsts";

export default function KeyClient({ keyList }: KeyClient) {
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
      <TableColumn columnDesign={6} columnData={keyTableColumn} isNameLarge />
      {keyList.map(
        (key) =>
          filteringData(word, key.name.en, key.name.ko, key.name.ja) && (
            <DefineGrid
              cols="6"
              id={key.id}
              key={key.id}
              isDetail
              detailLink={`/item/${key.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={key.image}
                  alt={key.name.en}
                  popWidth={key.image_width * 128}
                  popHeight={key.image_height * 128}
                  size={(key.image_width * 64).toString()}
                  wrapWidth={key.image_width * 64}
                  wrapHeight={key.image_height * 64}
                />
              </CenterContents>
              <CenterContents colSpan="3">
                {highlightMatchedText(key.name[localeKey], word)}
              </CenterContents>
              <CenterContents isCol>
                {key.info.use_map.en &&
                  key.info.use_map[getLocaleKey(locale)].map((area, index) => (
                    <TextSpan key={`${index}-area-${key.id}`}>{area}</TextSpan>
                  ))}
              </CenterContents>
              <CenterContents>
                <TextSpan>{key.info.uses}</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
