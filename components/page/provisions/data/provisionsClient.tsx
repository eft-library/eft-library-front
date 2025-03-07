"use client";

import EffectText from "./effectText";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import TextSpan from "../../../custom/gridContents/textSpan";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import {
  checkPlus,
  getPlusMinus,
  filterStimEffects,
  returnQuestText,
} from "@/lib/func/jsxfunction";
import type { ProvisionsList } from "./provisionsTypes";

export default function ProvisionsClient({ provisionsList }: ProvisionsList) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, provisionsList);

  return (
    <div className="w-full">
      {provisionsList.map((provisions) => (
        <DefineGrid
          key={provisions.id}
          id={provisions.id}
          cols="9"
          pageId={pageId}
        >
          <CenterContents>
            <ImageView
              src={provisions.image}
              alt={provisions.name_en}
              popWidth={provisions.width * 128}
              popHeight={provisions.height * 128}
              size={(provisions.width * 64).toString()}
              wrapWidth={provisions.width * 64}
              wrapHeight={provisions.height * 64}
            />
          </CenterContents>

          <CenterContents colSpan="2">
            <TextSpan>{provisions.name_kr}</TextSpan>
          </CenterContents>

          <CenterContents>
            <TextSpan textColor={checkPlus(provisions.energy)}>
              {getPlusMinus(provisions.energy)}
            </TextSpan>
          </CenterContents>

          <CenterContents>
            <TextSpan textColor={checkPlus(provisions.hydration)}>
              {getPlusMinus(provisions.hydration)}
            </TextSpan>
          </CenterContents>

          <div className="flex flex-col justify-center col-span-2">
            {provisions.stim_effects.length > 0 ? (
              filterStimEffects(provisions.stim_effects).map(
                (effect, index) => (
                  <EffectText
                    effect={effect}
                    key={`${effect.krSkill}-${index}-${provisions.id}`}
                  />
                )
              )
            ) : (
              <TextSpan>-</TextSpan>
            )}
          </div>

          <div className="flex flex-col justify-center col-span-2">
            {provisions.notes.length > 0 ? (
              <div>
                <TextSpan isCenter={false}>퀘스트</TextSpan>
                {provisions.notes.map((quest) => (
                  <div key={`${provisions.id}-${quest.url_mapping}`}>
                    {returnQuestText(quest)}
                  </div>
                ))}
              </div>
            ) : (
              <TextSpan>-</TextSpan>
            )}
          </div>
        </DefineGrid>
      ))}
    </div>
  );
}
