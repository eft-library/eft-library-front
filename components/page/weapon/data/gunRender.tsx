"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import type { GunRender } from "./weaponTypes";
import {
  filteringData,
  hasMatchInList,
  highlightMatchedText,
} from "@/lib/func/jsxfunction";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { gunTableColumn } from "@/lib/consts/columnConsts";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";

export default function GunRender({ gunList, searchWord }: GunRender) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="flex flex-col gap-4 w-full">
      {hasMatchInList(gunList, searchWord) && (
        <TableColumn columnData={gunTableColumn} columnDesign={2} />
      )}
      {gunList.map(
        (gun) =>
          filteringData(searchWord, gun.name.en, gun.name.ko, gun.name.ja) && (
            <DefineGrid
              cols="2"
              id={gun.id}
              key={gun.id}
              isDetail
              detailLink={`/item/${gun.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={gun.image}
                  alt={gun.name.en}
                  popWidth={gun.image_width * 128}
                  popHeight={gun.image_height * 128}
                  size={(gun.image_width * 64).toString()}
                  wrapWidth={gun.image_width * 64}
                  wrapHeight={gun.image_height * 64}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(gun.name[localeKey], searchWord)}
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
