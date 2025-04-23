"use client";

import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import type { HeadsetList } from "./headsetTypes";
import { useState } from "react";
import { filteringData, highlightMatchedText } from "@/lib/func/jsxfunction";
import { Input } from "@/components/ui/input";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { headsetTableColumn } from "@/lib/consts/columnConsts";

export default function HeadsetClient({ headsetList }: HeadsetList) {
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
      <TableColumn columnDesign={2} columnData={headsetTableColumn} />
      {headsetList.map(
        (headset) =>
          filteringData(
            word,
            headset.name_en,
            headset.name_kr,
            headset.name_kr
          ) && (
            <DefineGrid
              cols="2"
              id={headset.id}
              pageId={pageId}
              key={headset.id}
              isDetail
              detailLink={`/item/${headset.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={headset.image}
                  alt={headset.name_en}
                  popWidth={headset.image_width * 128}
                  popHeight={headset.image_height * 128}
                  size={(headset.image_width * 64).toString()}
                  wrapWidth={headset.image_width * 64}
                  wrapHeight={headset.image_height * 64}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(headset.name_kr, word)}
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
