import TextSpan from "../../../custom/gridContents/textSpan";
import type { EffectText } from "./provisionsTypes";
import { useLocale } from "next-intl";
import { getLocaleKey, getEffectLocalizedKey } from "@/lib/func/localeFunction";
import { effectI18N } from "@/lib/consts/i18nConsts";
import {
  checkSkillPlus,
  checkValuePlus,
  getPlusMinus,
  noReturnSkill,
} from "@/lib/func/jsxfunction";

export default function EffectText({ effect }: EffectText) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div>
      {effect.delay && effect.duration && (
        <TextSpan isCenter={false} textColor="PaleYellow">
          {effect.skill_name_en === "Painkiller"
            ? `${effect.duration} ${effectI18N.duration[localeKey]}`
            : `${effect.delay} ${effectI18N.delay[localeKey]} / ${effect.duration} ${effectI18N.duration[localeKey]}`}
        </TextSpan>
      )}
      <div className="flex">
        <TextSpan isCenter={false}>-&nbsp;</TextSpan>
        {effect.skill_name_en && (
          <TextSpan
            isCenter={false}
            textColor={checkSkillPlus(effect.skill_name_en)}
          >
            {effect[getEffectLocalizedKey(localeKey)]}&nbsp;
          </TextSpan>
        )}

        {effect.skill_name_en &&
          !noReturnSkill.includes(effect.skill_name_en) && (
            <TextSpan isCenter={false} textColor={checkValuePlus(effect.value)}>
              {` ${getPlusMinus(effect.value)}`}
            </TextSpan>
          )}
      </div>
    </div>
  );
}
