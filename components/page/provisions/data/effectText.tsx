import TextSpan from "../../../custom/gridContents/textSpan";
import type { EffectText } from "./provisionsTypes";
import { useLocale } from "next-intl";
import { getLocaleKey, getEffectLocalizedKey } from "@/lib/func/localeFunction";
import { effectI18N } from "@/lib/consts/i18nConsts";

export default function EffectText({ effect }: EffectText) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const noReturnSkill = ["Painkiller", "HandsTremor"];

  const getPlusMinus = (text: number | string) => {
    if (typeof text === "number") {
      if (text === 0) return "0";
      return text > 0 ? `+${text}` : `${text}`;
    }
    return "";
  };

  const checkSkillPlus = (skill_name_en: string) => {
    switch (skill_name_en) {
      case "HandsTremor":
        return "Red";
      case "Painkiller":
        return "BrightCyan";
      default:
        return "white";
    }
  };

  const checkValuePlus = (effect: number) => {
    if (effect == 0) {
      return "white";
    } else if (effect > 0) {
      return "BrightCyan";
    } else {
      return "Red";
    }
  };

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
