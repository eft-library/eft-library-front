"use client";

import EffectText from "./effectText";
import ImageView from "../../../custom/imageView/imageView";
import TextSpan from "../../../custom/gridContents/textSpan";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { provisionsTableColumn } from "@/lib/consts/columnConsts";
import {
  checkPlus,
  getPlusMinus,
  filterStimEffects,
  highlightMatchedText,
} from "@/lib/func/jsxfunction";
import type { ProvisionsList } from "./provisionsTypes";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { placeHolderText } from "@/lib/consts/i18nConsts";

export default function ProvisionsClient({ provisionsList }: ProvisionsList) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [word, setWord] = useState<string>("");
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
        columnData={provisionsTableColumn}
        isAmmoProvisions
      />
      {provisionsList.map((provisions) => (
        <DefineGrid
          key={provisions.id}
          id={provisions.id}
          cols="7"
          isDetail
          detailLink={`/item/${provisions.url_mapping}`}
        >
          <CenterContents>
            <ImageView
              src={provisions.image}
              alt={provisions.name.en}
              popWidth={provisions.image_width * 128}
              popHeight={provisions.image_height * 128}
              size={(provisions.image_width * 64).toString()}
              wrapWidth={provisions.image_width * 64}
              wrapHeight={provisions.image_height * 64}
            />
          </CenterContents>

          <CenterContents colSpan="2">
            <TextSpan>
              {highlightMatchedText(provisions.name[localeKey], word)}
            </TextSpan>
          </CenterContents>

          <CenterContents>
            <TextSpan textColor={checkPlus(provisions.info.energy)}>
              {getPlusMinus(provisions.info.energy)}
            </TextSpan>
          </CenterContents>

          <CenterContents>
            <TextSpan textColor={checkPlus(provisions.info.hydration)}>
              {getPlusMinus(provisions.info.hydration)}
            </TextSpan>
          </CenterContents>

          <div className="flex flex-col justify-center col-span-2">
            {provisions.info.stim_effects.length > 0 ? (
              filterStimEffects(provisions.info.stim_effects).map(
                (effect, index) => (
                  <EffectText
                    effect={effect}
                    key={`${index}-${provisions.id}`}
                  />
                )
              )
            ) : (
              <TextSpan>-</TextSpan>
            )}
          </div>
        </DefineGrid>
      ))}
    </div>
  );
}
