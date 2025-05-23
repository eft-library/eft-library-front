"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { AmmoClient } from "./ammoTypes";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { ammoTableColumn } from "@/lib/consts/columnConsts";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { filteringData, highlightMatchedText } from "@/lib/func/jsxfunction";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { placeHolderText } from "@/lib/consts/i18nConsts";

export default function AmmoClient({ ammoList }: AmmoClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [word, setWord] = useState<string>("");

  const getEfficiencyColor = (val: number) => {
    switch (val) {
      case 6:
        return "bg-VividGreen";
      case 5:
        return "bg-ForestGreen";
      case 4:
        return "bg-AmberGold";
      case 3:
        return "bg-WalnutBrown";
      case 2:
        return "bg-ChestnutBrown";
      case 1:
        return "bg-DeepBurgundy";
      case 0:
        return "bg-DarkMahogany";
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex gap-2 mb-2 justify-end">
        <Input
          className="text-base font-bold border-white placeholder:text-SilverGray w-[400px] border-2"
          value={word}
          placeholder={placeHolderText.search[localeKey]}
          onChange={(e) => setWord(e.currentTarget.value)}
        />
      </div>
      <TableColumn
        columnDesign={7}
        columnData={ammoTableColumn}
        isAmmoProvisions
      />
      {ammoList.map(
        (item) =>
          filteringData(word, item.name.en, item.name.ko, item.name.ja) && (
            <DefineGrid
              cols="7"
              id={item.id}
              key={item.id}
              isDetail
              detailLink={`/item/${item.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={item.image}
                  alt={item.name.en}
                  popWidth={140}
                  popHeight={140}
                  wrapHeight={item.image_height * 64}
                  wrapWidth={item.image_width * 64}
                  size={(item.image_width * 64).toString()}
                />
              </CenterContents>

              <CenterContents colSpan="2">
                {highlightMatchedText(item.name[localeKey], word)}
              </CenterContents>

              <CenterContents>
                <TextSpan>{item.info.damage}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{item.info.penetration_power}</TextSpan>
              </CenterContents>

              <CenterContents colSpan="2">
                {item.info.efficiency &&
                  item.info.efficiency.map((efficiency, index) => (
                    <div
                      key={`${efficiency}-${index}`}
                      className={`${getEfficiencyColor(
                        efficiency
                      )} flex items-center justify-center rounded w-10 h-10 border-white border-solid border-[1px] ml-2`}
                    >
                      <TextSpan size="lg" isCenter={false}>
                        {efficiency}
                      </TextSpan>
                    </div>
                  ))}
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
