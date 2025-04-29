"use client";

import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { BackpackList } from "./backpackTypes";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { backpackTableColumn } from "@/lib/consts/columnConsts";
import { useState } from "react";
import { filteringData, highlightMatchedText } from "@/lib/func/jsxfunction";
import { Input } from "@/components/ui/input";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function BackpackClient({ backpackList }: BackpackList) {
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
        columnDesign={7}
        columnData={backpackTableColumn}
        isArmorVest
      />
      {backpackList.map(
        (backpack) =>
          filteringData(
            word,
            backpack.name.en,
            backpack.name.ko,
            backpack.name.ja
          ) && (
            <DefineGrid
              cols="7"
              id={backpack.id}
              pageId={pageId}
              key={backpack.id}
              isDetail
              detailLink={`/item/${backpack.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={backpack.image}
                  alt={backpack.name.en}
                  popWidth={backpack.image_width * 72}
                  popHeight={backpack.image_height * 72}
                  wrapWidth={backpack.image_width * 36}
                  wrapHeight={backpack.image_height * 36}
                  size={(backpack.image_width * 36).toString()}
                />
              </CenterContents>
              <CenterContents colSpan="3">
                {highlightMatchedText(backpack.name[localeKey], word)}
              </CenterContents>
              <CenterContents>
                <TextSpan>{backpack.info.capacity}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>
                  {backpack.info.grids[0].width} X
                  {backpack.info.grids[0].height}
                </TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{backpack.info.weight} kg</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
