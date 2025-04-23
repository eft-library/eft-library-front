"use client";

import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { KnifeRender } from "./weaponTypes";
import {
  filteringData,
  hasMatchInList,
  highlightMatchedText,
} from "@/lib/func/jsxfunction";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { knifeTableColumn } from "@/lib/consts/columnConsts";

export default function KnifeRender({ knifeList, searchWord }: KnifeRender) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";

  return (
    <div className="flex flex-col gap-4 w-full">
      {hasMatchInList(knifeList, searchWord) && (
        <TableColumn columnData={knifeTableColumn} columnDesign={5} />
      )}

      {knifeList.map(
        (knife) =>
          filteringData(
            searchWord,
            knife.name_en,
            knife.name_kr,
            knife.name_kr
          ) && (
            <DefineGrid
              cols="5"
              id={knife.id}
              pageId={pageId}
              key={knife.id}
              isDetail
              detailLink={`/item/${knife.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={knife.image}
                  alt={knife.name_en}
                  popWidth={knife.image_width * 128}
                  popHeight={knife.image_height * 128}
                  size={(knife.image_width * 64).toString()}
                  wrapWidth={knife.image_width * 64}
                  wrapHeight={knife.image_height * 64}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(knife.name_kr, searchWord)}
              </CenterContents>
              <CenterContents>
                <TextSpan>{knife.info.slash_damage}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{knife.info.stab_damage}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{knife.info.hit_radius} m</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
