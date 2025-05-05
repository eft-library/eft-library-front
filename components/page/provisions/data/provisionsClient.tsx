"use client";

import EffectText from "./effectText";
import ImageView from "../../../custom/imageView/imageView";
import TextSpan from "../../../custom/gridContents/textSpan";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import {
  checkPlus,
  getPlusMinus,
  filterStimEffects,
} from "@/lib/func/jsxfunction";
import type { ProvisionsList } from "./provisionsTypes";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function ProvisionsClient({ provisionsList }: ProvisionsList) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="w-full">
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
            <TextSpan>{provisions.name[localeKey]}</TextSpan>
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
