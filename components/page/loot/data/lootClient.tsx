"use client";

import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import TextSpan from "../../../custom/gridContents/textSpan";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import { checkCategory } from "@/lib/func/jsxfunction";
import type { LootClient } from "./lootTypes";

export default function LootClient({ lootList }: LootClient) {
  const { lootCategory } = useAppStore((state) => state);
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, lootList, "LOOT");

  return (
    <div className="w-full">
      {lootList.map(
        (loot) =>
          checkCategory(loot.info.loot_category, lootCategory) && (
            <DefineGrid id={loot.id} pageId={pageId} cols="2" key={loot.id}>
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
                <TextSpan>{loot.name_kr}</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
