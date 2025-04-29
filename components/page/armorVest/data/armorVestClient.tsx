"use client";

import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { ArmorVestList } from "./armorVestTypes";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { filteringData, highlightMatchedText } from "@/lib/func/jsxfunction";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { armorVestTableColumn } from "@/lib/consts/columnConsts";
import { useLocale } from "next-intl";
import { getLocaleKey, getZonesLocaleKey } from "@/lib/func/localeFunction";

export default function ArmorVestClient({ armorVestList }: ArmorVestList) {
  const [word, setWord] = useState<string>("");
  const param = useSearchParams();
  const pageId = param.get("id") || "";
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
      <TableColumn
        columnDesign={8}
        columnData={armorVestTableColumn}
        isArmorVest
      />
      {armorVestList.map(
        (armorVest) =>
          filteringData(
            word,
            armorVest.name.en,
            armorVest.name.ko,
            armorVest.name.ja
          ) && (
            <DefineGrid
              cols="8"
              id={armorVest.id}
              pageId={pageId}
              key={armorVest.id}
              isDetail
              detailLink={`/item/${armorVest.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={armorVest.image}
                  alt={armorVest.name.en}
                  popWidth={armorVest.image_width * 96}
                  popHeight={armorVest.image_height * 96}
                  wrapWidth={armorVest.image_width * 48}
                  wrapHeight={armorVest.image_height * 48}
                  size={(armorVest.image_width * 48).toString()}
                />
              </CenterContents>
              <CenterContents colSpan="3">
                {highlightMatchedText(armorVest.name[localeKey], word)}
              </CenterContents>
              <CenterContents>
                <TextSpan>{armorVest.info.durability}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{armorVest.info.class_value}</TextSpan>
              </CenterContents>
              <CenterContents isCol>
                {armorVest.info.zones &&
                  armorVest.info.zones[getZonesLocaleKey(locale)].map(
                    (zone, index) => (
                      <TextSpan key={`${index}-zone-${armorVest.id}`}>
                        {zone}
                      </TextSpan>
                    )
                  )}
              </CenterContents>
              <CenterContents>
                <TextSpan>{armorVest.info.weight} kg</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
