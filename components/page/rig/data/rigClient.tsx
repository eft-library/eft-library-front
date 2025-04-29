"use client";

import { useSearchParams } from "next/navigation";
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
import { getLocaleKey, getZonesLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";

export default function RigClient({ rig_data }: RigClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
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
      {hasMatchInList(rig_data.class_rig, word) && (
        <TableColumn
          columnDesign={10}
          columnData={rigClassTableColumn}
          isFaceCover
        />
      )}
      {rig_data.class_rig.map(
        (rig) =>
          filteringData(word, rig.name.en, rig.name.ko, rig.name.ja) && (
            <DefineGrid
              id={rig.id}
              gap="8px"
              pageId={pageId}
              key={rig.id}
              isDetail
              detailLink={`/item/${rig.url_mapping}`}
              cols="10"
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
              <CenterContents colSpan="4">
                {highlightMatchedText(rig.name[localeKey], word)}
              </CenterContents>
              <CenterContents>
                <TextSpan>{rig.info.durability}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{rig.info.capacity}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{rig.info.class_value}</TextSpan>
              </CenterContents>
              <CenterContents isCol>
                {rig.info.zones &&
                  rig.info.zones[getZonesLocaleKey(locale)].map(
                    (area, index) => (
                      <TextSpan key={`${index}-area-${rig.id}`}>
                        {area}
                      </TextSpan>
                    )
                  )}
              </CenterContents>
              <CenterContents>
                <TextSpan>{rig.info.weight} kg</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}

      {hasMatchInList(rig_data.no_class_rig, word) && (
        <TableColumn
          columnDesign={4}
          columnData={rigNoClassTableColumn}
          isKey
        />
      )}
      {rig_data.no_class_rig.map(
        (rig) =>
          filteringData(word, rig.name.en, rig.name.ko, rig.name.ja) && (
            <DefineGrid
              id={rig.id}
              gap="8px"
              pageId={pageId}
              key={rig.id}
              isDetail
              detailLink={`/item/${rig.url_mapping}`}
              cols="4"
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
              <CenterContents colSpan="2">
                {highlightMatchedText(rig.name[localeKey], word)}
              </CenterContents>
              <CenterContents>
                <TextSpan>{rig.info.weight} kg</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
