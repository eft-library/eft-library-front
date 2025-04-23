"use client";

import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { lootTableColumn } from "@/lib/consts/columnConsts";
import type { LootClient } from "./lootTypes";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { filteringData, highlightMatchedText } from "@/lib/func/jsxfunction";

export default function LootClient({ lootList }: LootClient) {
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
      <TableColumn columnDesign={2} columnData={lootTableColumn} />
      {lootList.map(
        (loot) =>
          filteringData(word, loot.name_en, loot.name_kr, loot.name_kr) && (
            <DefineGrid
              id={loot.id}
              pageId={pageId}
              cols="2"
              key={loot.id}
              isDetail
              detailLink={`/item/${loot.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={loot.image}
                  alt={loot.name_en}
                  popWidth={loot.image_width * 128}
                  popHeight={loot.image_height * 128}
                  size={(loot.image_width * 64).toString()}
                  wrapWidth={loot.image_width * 64}
                  wrapHeight={loot.image_height * 64}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(loot.name_kr, word)}
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
