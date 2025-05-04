"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { RigClient } from "./rigTypes";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { useState } from "react";
import {
  filteringData,
  hasMatchInList,
  highlightMatchedText,
} from "@/lib/func/jsxfunction";
import { Input } from "@/components/ui/input";
import {
  rigClassTableColumn,
  rigNoClassTableColumn,
} from "@/lib/consts/columnConsts";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";

export default function RigClient({ rig_data }: RigClient) {
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
      {hasMatchInList(rig_data.class_rig, word) && (
        <TableColumn
          columnDesign={6}
          columnData={rigClassTableColumn}
          isNameLarge
        />
      )}
      {rig_data.class_rig.map(
        (rig) =>
          filteringData(word, rig.name.en, rig.name.ko, rig.name.ja) && (
            <DefineGrid
              id={rig.id}
              gap="8px"
              key={rig.id}
              isDetail
              detailLink={`/item/${rig.url_mapping}`}
              cols="6"
            >
              <CenterContents>
                <ImageView
                  src={rig.image}
                  alt={rig.name.en}
                  popWidth={rig.image_width * 96}
                  popHeight={rig.image_height * 96}
                  size={(rig.image_width * 48).toString()}
                  wrapWidth={rig.image_width * 48}
                  wrapHeight={rig.image_height * 48}
                />
              </CenterContents>
              <CenterContents colSpan="3">
                {highlightMatchedText(rig.name[localeKey], word)}
              </CenterContents>
              <CenterContents>
                <TextSpan>{rig.info.durability}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{rig.info.class_value}</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}

      {hasMatchInList(rig_data.no_class_rig, word) && (
        <TableColumn columnDesign={2} columnData={rigNoClassTableColumn} />
      )}
      {rig_data.no_class_rig.map(
        (rig) =>
          filteringData(word, rig.name.en, rig.name.ko, rig.name.ja) && (
            <DefineGrid
              id={rig.id}
              gap="8px"
              key={rig.id}
              isDetail
              detailLink={`/item/${rig.url_mapping}`}
              cols="2"
            >
              <CenterContents>
                <ImageView
                  src={rig.image}
                  alt={rig.name.en}
                  popWidth={rig.image_width * 96}
                  popHeight={rig.image_height * 96}
                  size={(rig.image_width * 48).toString()}
                  wrapWidth={rig.image_width * 48}
                  wrapHeight={rig.image_height * 48}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(rig.name[localeKey], word)}
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
