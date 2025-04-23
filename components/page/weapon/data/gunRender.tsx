"use client";

import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { GunRender } from "./weaponTypes";
import {
  filteringData,
  hasMatchInList,
  highlightMatchedText,
} from "@/lib/func/jsxfunction";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { gunTableColumn } from "@/lib/consts/columnConsts";

export default function GunRender({ gunList, searchWord }: GunRender) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";

  const sliceDefaultAmmo = (defaultAmmo: string) => {
    if (!defaultAmmo) return "";

    const pattern = "mm";
    const handGunPattern = "ACP";

    const index = defaultAmmo.indexOf(pattern);
    const handGunIndex = defaultAmmo.indexOf(handGunPattern);

    if (index !== -1) {
      return defaultAmmo.substring(0, index + pattern.length);
    } else if (handGunIndex !== -1) {
      return defaultAmmo.substring(0, handGunIndex + handGunPattern.length);
    } else {
      return defaultAmmo;
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {hasMatchInList(gunList, searchWord) && (
        <TableColumn columnData={gunTableColumn} isGun columnDesign={9} />
      )}
      {gunList.map(
        (gun) =>
          filteringData(searchWord, gun.name_en, gun.name_kr, gun.name_kr) && (
            <DefineGrid
              cols="9"
              id={gun.id}
              pageId={pageId}
              key={gun.id}
              isDetail
              detailLink={`/item/${gun.url_mapping}`}
            >
              <CenterContents colSpan="2">
                <ImageView
                  src={gun.image}
                  alt={gun.name_en}
                  popWidth={gun.image_width * 128}
                  popHeight={gun.image_height * 128}
                  size={(gun.image_width * 64).toString()}
                  wrapWidth={gun.image_width * 64}
                  wrapHeight={gun.image_height * 64}
                />
              </CenterContents>
              <CenterContents>
                {highlightMatchedText(gun.name_kr, searchWord)}
              </CenterContents>
              <CenterContents>
                <TextSpan>{sliceDefaultAmmo(gun.info.default_ammo)}</TextSpan>
              </CenterContents>
              <CenterContents isCol>
                {gun.info.modes_kr.map((mode, index) => (
                  <TextSpan key={`mode-${mode}-${index}`}>{mode}</TextSpan>
                ))}
              </CenterContents>
              <CenterContents>
                <TextSpan>{gun.info.fire_rate}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{gun.info.ergonomics}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{gun.info.recoil_horizontal}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{gun.info.recoil_vertical}</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
