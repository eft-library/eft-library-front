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
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function KnifeRender({ knifeList, searchWord }: KnifeRender) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
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
            knife.name.en,
            knife.name.ko,
            knife.name.ja
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
                  alt={knife.name.en}
                  popWidth={knife.image_width * 128}
                  popHeight={knife.image_height * 128}
                  size={(knife.image_width * 64).toString()}
                  wrapWidth={knife.image_width * 64}
                  wrapHeight={knife.image_height * 64}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(knife.name[localeKey], searchWord)}
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
